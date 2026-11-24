-- ==============================================================
-- SIMKOPDES Database Schema & RLS Policies (Supabase Postgres)
-- Dokumen PRD v2.0 SIMKOPDES:
-- Penguatan Kendali Akun dan Integrasi Layanan Helpdesk
-- ==============================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked 1-1 to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text not null check (role in ('calon_anggota', 'anggota', 'pengurus', 'admin')) default 'calon_anggota',
  nama text not null,
  no_hp text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ANGGOTA TABLE (Relasi 1-1 ke profiles untuk anggota & pengurus)
create table if not exists public.anggota (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null unique,
  nomor_anggota text unique,
  nik varchar(16) not null,
  alamat text,
  status text not null check (status in ('pending', 'aktif', 'nonaktif', 'menunggu_penghapusan', 'pindah')) default 'pending',
  tanggal_daftar timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PERMOHONAN_DOMISILI TABLE (FR-03 / US-01: Perpindahan Domisili / Koperasi)
create table if not exists public.permohonan_domisili (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  alamat_lama text not null,
  alamat_baru text not null,
  koperasi_asal text not null default 'KUD Sukamaju',
  koperasi_tujuan text,
  alasan text not null,
  status text not null check (status in ('dikirim', 'ditinjau', 'disetujui', 'ditolak')) default 'dikirim',
  catatan_pengurus text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. PENGAJUAN_HAPUS_AKUN TABLE (FR-04 / US-03: Pengajuan Penghapusan Akun)
create table if not exists public.pengajuan_hapus_akun (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  alasan text not null,
  konfirmasi_konsekuensi boolean not null default false,
  status text not null check (status in ('dikirim', 'ditinjau', 'disetujui', 'ditolak')) default 'dikirim',
  catatan_pengurus text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. HELPDESK_TIKET TABLE (FR-05 & FR-06 / US-04, US-05, US-06: Helpdesk Internal)
create table if not exists public.helpdesk_tiket (
  id uuid default uuid_generate_v4() primary key,
  nomor_tiket text not null unique,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  kategori text not null check (kategori in ('akses_login', 'keanggotaan', 'teknis', 'layanan_desa', 'lainnya')),
  judul text not null,
  deskripsi text not null,
  status text not null check (status in ('dikirim', 'ditinjau', 'ditangani', 'selesai', 'ditolak')) default 'dikirim',
  tanggapan_pengurus text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. SIMPANAN TABLE (Data pendukung simpanan anggota yang sudah tercatat)
create table if not exists public.simpanan (
  id uuid default uuid_generate_v4() primary key,
  anggota_id uuid references public.anggota(id) on delete cascade not null,
  jenis text not null check (jenis in ('pokok', 'wajib', 'sukarela')),
  nominal numeric(15, 2) not null check (nominal > 0),
  tanggal_transaksi timestamp with time zone default timezone('utc'::text, now()) not null,
  keterangan text
);

-- 7. HELP_CONTENT TABLE (Panduan & Navigasi Mudah - FR-08)
create table if not exists public.help_content (
  id uuid default uuid_generate_v4() primary key,
  halaman_terkait text not null,
  judul text not null,
  konten text not null,
  urutan_tampil integer default 0
);

-- 8. AUDIT_LOG TABLE (Catatan Keandalan & Audit Sistem - NFR-02, NFR-03)
create table if not exists public.audit_log (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  aksi text not null,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  detail jsonb default '{}'::jsonb
);

-- ==============================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================

alter table public.profiles enable row level security;
alter table public.anggota enable row level security;
alter table public.permohonan_domisili enable row level security;
alter table public.pengajuan_hapus_akun enable row level security;
alter table public.helpdesk_tiket enable row level security;
alter table public.simpanan enable row level security;
alter table public.help_content enable row level security;
alter table public.audit_log enable row level security;

-- Helper function: cek apakah user adalah pengurus atau admin
create or replace function public.is_pengurus(user_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role in ('pengurus', 'admin')
  );
$$ language sql security definer;

-- 1. Policies for profiles
create policy "User dapat melihat profil sendiri atau pengurus melihat semua"
  on public.profiles for select
  using (auth.uid() = id or public.is_pengurus(auth.uid()));

create policy "User dapat mengupdate profil sendiri"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Policies for anggota
create policy "Anggota dapat melihat data keanggotaan sendiri atau Pengurus melihat semua"
  on public.anggota for select
  using (profile_id = auth.uid() or public.is_pengurus(auth.uid()));

create policy "Pengurus dapat mengupdate status anggota"
  on public.anggota for update
  using (public.is_pengurus(auth.uid()));

-- 3. Policies for permohonan_domisili (FR-03)
create policy "Anggota melihat permohonan domisili miliknya atau pengurus melihat semua"
  on public.permohonan_domisili for select
  using (profile_id = auth.uid() or public.is_pengurus(auth.uid()));

create policy "Anggota dapat mengajukan permohonan domisili"
  on public.permohonan_domisili for insert
  with check (profile_id = auth.uid());

create policy "Pengurus dapat meninjau/mengupdate permohonan domisili"
  on public.permohonan_domisili for update
  using (public.is_pengurus(auth.uid()));

-- 4. Policies for pengajuan_hapus_akun (FR-04)
create policy "Anggota melihat pengajuan hapus akun miliknya atau pengurus melihat semua"
  on public.pengajuan_hapus_akun for select
  using (profile_id = auth.uid() or public.is_pengurus(auth.uid()));

create policy "Anggota dapat mengajukan penghapusan akun"
  on public.pengajuan_hapus_akun for insert
  with check (profile_id = auth.uid());

create policy "Pengurus dapat meninjau/mengupdate pengajuan penghapusan akun"
  on public.pengajuan_hapus_akun for update
  using (public.is_pengurus(auth.uid()));

-- 5. Policies for helpdesk_tiket (FR-05 & FR-06)
create policy "Anggota melihat tiket miliknya atau pengurus melihat semua tiket"
  on public.helpdesk_tiket for select
  using (profile_id = auth.uid() or public.is_pengurus(auth.uid()));

create policy "Anggota dapat membuat tiket helpdesk baru"
  on public.helpdesk_tiket for insert
  with check (profile_id = auth.uid());

create policy "Pengurus dapat memperbarui status dan tanggapan tiket"
  on public.helpdesk_tiket for update
  using (public.is_pengurus(auth.uid()));

-- 6. Policies for simpanan
create policy "Anggota melihat simpanan miliknya atau pengurus melihat semua"
  on public.simpanan for select
  using (
    anggota_id in (select id from public.anggota where profile_id = auth.uid())
    or public.is_pengurus(auth.uid())
  );

-- 7. Policies for help_content & audit_log
create policy "Semua orang dapat membaca panduan"
  on public.help_content for select using (true);

create policy "Pengurus dapat melihat audit log"
  on public.audit_log for select using (public.is_pengurus(auth.uid()));

create policy "Sistem/User dapat menambah audit log"
  on public.audit_log for insert with check (true);

-- ==============================================================
-- INITIAL SEED DATA (HELP CONTENT & PANDUAN SIMKOPDES)
-- ==============================================================
insert into public.help_content (halaman_terkait, judul, konten, urutan_tampil)
values
('login', 'Bagaimana cara masuk jika lupa nomor anggota?', 'Anda dapat masuk menggunakan alamat Email yang didaftarkan saat registrasi sebagai pengganti Nomor Anggota.', 1),
('keanggotaan', 'Bagaimana alur mengajukan perpindahan domisili?', 'Buka menu Kendali Akun, pilih Pindah Domisili. Isi alamat baru dan alasan kepindahan. Riwayat keanggotaan Anda tidak akan hilang.', 2),
('keanggotaan', 'Bagaimana ketentuan pengajuan penghapusan akun?', 'Pengajuan penghapusan akun dilakukan melalui menu Kendali Akun > Hapus Akun. Pengurus akan meninjau dan menyelesaikan hak simpanan Anda.', 3),
('helpdesk', 'Bagaimana cara menyampaikan kendala melalui Helpdesk Internal?', 'Pilih menu Helpdesk Internal, klik Kirim Laporan Baru, pilih kategori kendala, dan jelaskan permasalahan Anda langsung di aplikasi.', 4)
on conflict do nothing;
