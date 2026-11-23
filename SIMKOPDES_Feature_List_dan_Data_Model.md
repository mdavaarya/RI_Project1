# SIMKOPDES — Feature List & Data Model
## Dokumen Pendamping PRD v1.1 (untuk pembangunan aplikasi dari nol)

**Tanggal:** 23 November 2026
**Status:** Draft — melengkapi gap PRD v1.1 (FR-04 & Assumptions) agar implementasi terarah
**Tech Stack (ditetapkan):** React + Vite · Tailwind + shadcn/ui · Supabase (Postgres + Auth + API)
**Catatan dasar:** PRD v1.1 SIMKOPDES disusun sebagai *perbaikan UX atas aplikasi yang sudah ada*, sehingga sengaja tidak mendefinisikan fitur konkret, data model, atau stack teknis. Karena aplikasi ini dibangun **dari nol** (bukan mengedit repo asli), dokumen ini mendefinisikan asumsi dasar fitur "yang dianggap sudah ada" agar FR-01 s/d FR-05 bisa diimplementasikan secara nyata.

**Penting:** Semua definisi fitur dan data di bawah ini adalah **asumsi kerja (working assumption)** yang dibuat untuk mengisi gap PRD, bukan hasil audit repository asli (karena repo asli tidak tersedia). Ini perlu ditandai sebagai *interpretasi tambahan di luar bukti WS5–WS8* saat dilaporkan ke dosen/penilai.

---

## 1. Ruang Lingkup Aplikasi (Working Scope)

SIMKOPDES versi web ini mensimulasikan sistem informasi manajemen koperasi desa dengan fokus pada perbaikan UX sesuai PRD. Modul bisnis koperasi yang **tidak** disebutkan di WS5–WS8 (misal: perhitungan SHU detail, pinjaman multi-tier, dll) dibuat **minimal/placeholder saja**, sesuai batasan "Out of Scope" PRD poin 1 (tidak menambah modul bisnis baru yang tidak berdasar).

### Peran Pengguna (Roles)
| Role | Deskripsi |
|---|---|
| **Calon Anggota** | Pengguna publik yang belum terdaftar, mengakses alur pendaftaran (US-03) |
| **Anggota** | Pengguna terdaftar, login dan menggunakan fitur utama (US-02, US-04) |
| **Pengurus** | Mengelola data anggota & operasional koperasi, termasuk yang masih belajar teknologi (US-05) |
| **Admin/Super Admin** *(asumsi tambahan, opsional)* | Pengelolaan sistem tingkat atas — tandai sebagai blocked item bila tidak relevan dengan PRD |

---

## 2. Feature List (Pemetaan ke FR & UXR)

### 2.1 Modul Akses & Kegagalan Akses — FR-01 / UXR-01 (Priority: High)

| Fitur | Deskripsi | Acceptance ref |
|---|---|---|
| Splash/loading state | Tampilan saat aplikasi memuat data awal | AC-1, AC-2 |
| Error/offline state | Halaman/komponen pesan saat server tidak terjangkau atau terjadi error, bahasa non-teknis | AC-1, AC-2 |
| Retry action | Tombol "Coba lagi" pada state gagal akses | AC-1 |
| Kanal bantuan | Link/kontak bantuan resmi (WA/email koperasi) ditampilkan pada error state, jika tersedia | AC-1 |

> Catatan: Pesan error tidak boleh menampilkan stack trace / kode error mentah ke pengguna (lihat NFR-03, NFR-05).

### 2.2 Modul Login — FR-02 / UXR-02 (Priority: High)

| Fitur | Deskripsi | Acceptance ref |
|---|---|---|
| Form login | Input: Username/Nomor Anggota, Password — label berbahasa Indonesia yang jelas | AC-3 |
| Validasi real-time | Validasi field kosong, format salah, ditampilkan inline | AC-3 |
| Pesan error login | Pesan spesifik & actionable (bukan generik "Error") — mis. "Nomor anggota tidak ditemukan" vs "Password salah" (tanpa membocorkan info sensitif berlebihan) | AC-3 |
| Lupa password | Alur reset password via `supabase.auth.resetPasswordForEmail()` | FR-02 |
| Show/hide password | Toggle visibilitas password | NFR-02 |
| Session handling | Ditangani otomatis oleh Supabase Auth (JWT di-generate & dikelola Supabase, disimpan di session client via `supabase-js`) | NFR-05 |

### 2.3 Modul Pendaftaran Anggota — FR-03 / UXR-03 (Priority: Low — *pertahankan kemudahan, jangan dibuat rumit*)

| Fitur | Deskripsi | Acceptance ref |
|---|---|---|
| Form pendaftaran | Data minimal: Nama, NIK, Alamat, No. HP, Email, Password | AC-5 |
| Validasi ringan | Validasi format (NIK 16 digit, email valid, dll), tidak menambah step tanpa dasar | AC-5 |
| Konfirmasi pendaftaran | Notifikasi sukses & status (menunggu verifikasi pengurus, jika alur approval ada) | FR-03 |

### 2.4 Modul Fitur Utama Anggota — FR-04 / UXR-04 (Priority: Low — *pertahankan*)

> PRD tidak menyebut nama fitur spesifik. Working assumption berikut mewakili "fitur utama" koperasi desa yang umum, dibuat **sederhana**:

| Fitur | Deskripsi | Acceptance ref |
|---|---|---|
| Dashboard anggota | Ringkasan saldo simpanan & status keanggotaan | AC-6 |
| Riwayat simpanan | Daftar transaksi simpanan (pokok/wajib/sukarela) | AC-6 |
| Riwayat pinjaman *(opsional, placeholder)* | Status pengajuan & cicilan pinjaman, jika in-scope | Out of scope jika tak ada dasar |
| Profil anggota | Lihat & edit data pribadi dasar | AC-6 |

### 2.5 Modul Panduan & Navigasi — FR-05 / UXR-05 (Priority: Medium)

| Fitur | Deskripsi | Acceptance ref |
|---|---|---|
| Tooltip/contextual hint | Ikon bantuan (?) di field/area yang kompleks | AC-7 |
| Halaman bantuan/FAQ | Panduan singkat dapat diakses ulang dari menu | AC-7 |
| Label menu sederhana | Istilah umum, hindari jargon teknis | NFR-02 |
| Empty state yang informatif | Saat data kosong, tampilkan instruksi langkah selanjutnya | FR-05 |

### 2.6 Modul Pengurus (ringkas, mendukung US-05)

| Fitur | Deskripsi |
|---|---|
| Dashboard pengurus | Ringkasan jumlah anggota, aktivitas terbaru |
| Kelola anggota | Lihat/approve pendaftaran anggota baru |
| Panduan pengurus | Instruksi penggunaan sistem untuk pengurus yang masih belajar teknologi |

---

## 3. Data Model (Skema Awal)

> Dengan Supabase, tabel `auth.users` (email, password terenkripsi, dll) sudah disediakan otomatis oleh Supabase Auth — **tidak perlu dibuat manual**. Tabel `profiles` di bawah ini adalah tabel tambahan di skema `public` yang menyimpan data profil/role, terhubung ke `auth.users` lewat `id` yang sama (foreign key ke `auth.users.id`).

```
profiles  (1-1 dengan auth.users, dibuat via trigger saat sign up)
- id (PK, FK -> auth.users.id)
- role (enum: anggota | pengurus | admin)
- nama
- no_hp
- created_at
- updated_at

Anggota (relasi 1-1 ke profiles, untuk role=anggota)
- id (PK)
- profile_id (FK -> profiles.id)
- nomor_anggota (unique)
- nik
- alamat
- status (enum: pending | aktif | nonaktif)
- tanggal_daftar

Simpanan
- id (PK)
- anggota_id (FK -> Anggota.id)
- jenis (enum: pokok | wajib | sukarela)
- nominal
- tanggal_transaksi
- keterangan

Pinjaman (opsional/placeholder)
- id (PK)
- anggota_id (FK -> Anggota.id)
- jumlah_pengajuan
- status (enum: diajukan | disetujui | ditolak | lunas)
- tanggal_pengajuan

HelpContent (untuk FR-05)
- id (PK)
- halaman_terkait (mis. "login", "pendaftaran", "dashboard")
- judul
- konten
- urutan_tampil

AuditLog (opsional, mendukung NFR-03 — Reliability)
- id (PK)
- user_id (FK, nullable)
- aksi
- timestamp
- detail (tanpa menyimpan data sensitif mentah)
```

**Catatan keamanan (NFR-05):** Password tidak pernah disimpan/ditangani manual di kode aplikasi — sepenuhnya dikelola Supabase Auth (hashing, token, session). Aktifkan **Row Level Security (RLS)** di semua tabel `public` (Anggota, Simpanan, Pinjaman, dll) supaya anggota hanya bisa akses datanya sendiri, dan pengurus/admin punya policy akses lebih luas. Error log tidak boleh menyertakan token/session Supabase.

---

## 4. Keputusan Teknis

Sesuai Lampiran C PRD poin 7 ("catat sebagai blocked item dan minta konfirmasi"), status keputusan teknis:

| # | Keputusan | Status |
|---|---|---|
| 1 | Frontend framework | ✅ **React + Vite** |
| 2 | Backend / DB / Auth | ✅ **Supabase** (Postgres + Auth + auto-API, tidak pakai Express/FastAPI terpisah kecuali ada logic kompleks yang butuh Edge Function) |
| 3 | Metode autentikasi | ✅ **Supabase Auth** (JWT dikelola otomatis di baliknya) |
| 4 | Styling/UI | ✅ **Tailwind + shadcn/ui** |
| 5 | Alur approval pendaftaran | ⏳ Belum ditentukan: Otomatis aktif vs menunggu approval pengurus |
| 6 | Modul pinjaman | ⏳ Belum ditentukan: diimplementasikan penuh / placeholder / di-skip |

> Poin 5 dan 6 masih perlu kamu putuskan karena berkaitan langsung dengan aturan bisnis koperasi (Business Rules PRD poin 6: *"Penambahan atau perubahan aturan keanggotaan... harus mendapatkan konfirmasi dari pemilik produk"*).

---

## 5. Urutan Implementasi yang Disarankan

1. Setup project: init React+Vite, konfigurasi Tailwind+shadcn, buat project Supabase (ambil URL + anon key), buat tabel sesuai §3 + aktifkan RLS.
2. Modul Auth: Register → Login via `supabase-js` (FR-02, FR-03 — prioritas High & dasar untuk modul lain).
3. Modul Akses/Error handling (FR-01 — High, tapi bergantung pada app sudah berjalan dulu).
4. Modul Anggota: Dashboard, Simpanan, Profil (FR-04).
5. Modul Pengurus: Kelola anggota (mendukung US-05).
6. Modul Panduan/Help content (FR-05 — Medium, bisa menyusul di akhir).
7. Testing fungsional & usability dasar (sesuai §12 PRD — Acceptance Criteria).

---

*Dokumen ini melengkapi PRD_SIMKOPDES_v1.1.md — gunakan keduanya bersamaan sebagai acuan agent/developer yang membangun aplikasi.*
