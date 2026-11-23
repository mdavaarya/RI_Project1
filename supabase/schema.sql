-- ==============================================================
-- SIMKOPDES Database Schema & RLS Policies (Supabase Postgres)
-- Dokumen Pendamping PRD v1.1 SIMKOPDES
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
  status text not null check (status in ('pending', 'aktif', 'nonaktif')) default 'pending',
  tanggal_daftar timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. SIMPANAN TABLE (Transaksi Simpanan Anggota)
create table if not exists public.simpanan (
  id uuid default uuid_generate_v4() primary key,
  anggota_id uuid references public.anggota(id) on delete cascade not null,
  jenis text not null check (jenis in ('pokok', 'wajib', 'sukarela')),
  nominal numeric(15, 2) not null check (nominal > 0),
  tanggal_transaksi timestamp with time zone default timezone('utc'::text, now()) not null,
  keterangan text
);

-- 4. PINJAMAN TABLE (Opsional/Placeholder pengajuan pinjaman anggota)
create table if not exists public.pinjaman (
  id uuid default uuid_generate_v4() primary key,
  anggota_id uuid references public.anggota(id) on delete cascade not null,
  jumlah_pengajuan numeric(15, 2) not null check (jumlah_pengajuan > 0),
  status text not null check (status in ('diajukan', 'disetujui', 'ditolak', 'lunas')) default 'diajukan',
  tanggal_pengajuan timestamp with time zone default timezone('utc'::text, now()) not null,
  keterangan text
);

-- 5. HELP_CONTENT TABLE (Panduan & Navigasi Mudah - FR-05)
create table if not exists public.help_content (
  id uuid default uuid_generate_v4() primary key,
  halaman_terkait text not null, -- 'login', 'pendaftaran', 'dashboard', 'simpanan', 'pengurus', 'umum'
  judul text not null,
  konten text not null,
  urutan_tampil integer default 0
);

-- 6. AUDIT_LOG TABLE (Catatan Aktivitas - NFR-03 & Reliability)
create table if not exists public.audit_log (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  aksi text not null,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  detail jsonb default '{}'::jsonb
);

-- Trigger untuk update updated_at pada profiles
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Trigger otomatis membuat profile saat user mendaftar di auth.users
create or replace function public.handle_new_user()
returns trigger as $$
declare
  user_role text;
  user_nama text;
  user_nik text;
  user_no_hp text;
  user_alamat text;
  new_anggota_id uuid;
begin
  user_role := coalesce(new.raw_user_meta_data->>'role', 'anggota');
  user_nama := coalesce(new.raw_user_meta_data->>'nama', new.email);
  user_nik := coalesce(new.raw_user_meta_data->>'nik', '3201000000000000');
  user_no_hp := coalesce(new.raw_user_meta_data->>'no_hp', '');
  user_alamat := coalesce(new.raw_user_meta_data->>'alamat', 'Desa Sukamaju');

  insert into public.profiles (id, role, nama, no_hp)
  values (new.id, user_role, user_nama, user_no_hp);

  if user_role in ('anggota', 'calon_anggota', 'pengurus') then
    insert into public.anggota (profile_id, nomor_anggota, nik, alamat, status)
    values (
      new.id,
      'KOP-' || to_char(now(), 'YYMM') || '-' || substr(md5(random()::text), 1, 4),
      user_nik,
      user_alamat,
      case when user_role = 'pengurus' then 'aktif' else 'aktif' end
    );
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================

alter table public.profiles enable row level security;
alter table public.anggota enable row level security;
alter table public.simpanan enable row level security;
alter table public.pinjaman enable row level security;
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
create policy "User dapat melihat profil sendiri"
  on public.profiles for select
  using (auth.uid() = id or public.is_pengurus(auth.uid()));

create policy "User dapat mengupdate profil sendiri"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Policies for anggota
create policy "Anggota dapat melihat data keanggotaan sendiri atau Pengurus dapat melihat semua"
  on public.anggota for select
  using (profile_id = auth.uid() or public.is_pengurus(auth.uid()));

create policy "Pengurus dapat mengupdate status anggota"
  on public.anggota for update
  using (public.is_pengurus(auth.uid()));

create policy "User dapat mendaftar anggota"
  on public.anggota for insert
  with check (profile_id = auth.uid() or public.is_pengurus(auth.uid()));

-- 3. Policies for simpanan
create policy "Anggota dapat melihat riwayat simpanan sendiri atau Pengurus melihat semua"
  on public.simpanan for select
  using (
    anggota_id in (select id from public.anggota where profile_id = auth.uid())
    or public.is_pengurus(auth.uid())
  );

create policy "Hanya pengurus yang dapat mencatat simpanan"
  on public.simpanan for insert
  with check (public.is_pengurus(auth.uid()));

-- 4. Policies for pinjaman
create policy "Anggota dapat melihat pengajuan pinjaman sendiri atau Pengurus melihat semua"
  on public.pinjaman for select
  using (
    anggota_id in (select id from public.anggota where profile_id = auth.uid())
    or public.is_pengurus(auth.uid())
  );

create policy "Anggota dapat mengajukan pinjaman"
  on public.pinjaman for insert
  with check (
    anggota_id in (select id from public.anggota where profile_id = auth.uid())
  );

create policy "Pengurus dapat memperbarui status pinjaman"
  on public.pinjaman for update
  using (public.is_pengurus(auth.uid()));

-- 5. Policies for help_content (Publik dapat membaca panduan)
create policy "Semua orang dapat membaca panduan"
  on public.help_content for select
  using (true);

create policy "Pengurus dapat mengelola panduan"
  on public.help_content for all
  using (public.is_pengurus(auth.uid()));

-- 6. Policies for audit_log
create policy "Pengurus dapat melihat audit log"
  on public.audit_log for select
  using (public.is_pengurus(auth.uid()));

create policy "Sistem/User dapat menambah audit log"
  on public.audit_log for insert
  with check (true);

-- ==============================================================
-- INITIAL SEED DATA (HELP CONTENT & PANDUAN SIMKOPDES)
-- ==============================================================

insert into public.help_content (halaman_terkait, judul, konten, urutan_tampil)
values
('login', 'Bagaimana cara masuk ke akun SIMKOPDES?', 'Masukkan Nomor Anggota atau alamat Email Anda beserta kata sandi yang telah didaftarkan. Bila lupa kata sandi, klik tautan "Lupa Kata Sandi?" untuk panduan pemulihan.', 1),
('login', 'Format Nomor Anggota', 'Nomor Anggota memiliki format seperti KOP-2611-ABCD. Anda juga dapat menggunakan Email terdaftar untuk login.', 2),
('pendaftaran', 'Syarat Pendaftaran Anggota Koperasi', 'Pendaftaran hanya memerlukan NIK (16 digit sesuai KTP), Nama Lengkap, Nomor HP aktif, dan Alamat tempat tinggal. Tidak ada biaya pendaftaran formulir.', 1),
('pendaftaran', 'Berapa lama proses verifikasi?', 'Setelah mendaftar, akun Anda akan diverifikasi oleh pengurus koperasi dalam 1x24 jam kerja.', 2),
('dashboard', 'Mengenal Jenis Simpanan', '1. Simpanan Pokok: Dibayar sekali saat menjadi anggota.\n2. Simpanan Wajib: Dibayar rutin setiap bulan.\n3. Simpanan Sukarela: Dapat disetor dan ditarik sewaktu-waktu sesuai ketentuan.', 1),
('pengurus', 'Panduan Pengurus Baru', 'Sebagai pengurus, Anda dapat menyetujui pendaftaran anggota baru melalui menu "Kelola Anggota", mencatat setoran simpanan warga, dan melihat ringkasan keuangan kas koperasi.', 1)
on conflict do nothing;
