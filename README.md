# SIMKOPDES — Sistem Informasi Manajemen Koperasi Desa

### Peningkatan Pengalaman Pengguna: Penguatan Kendali Akun dan Integrasi Layanan Helpdesk (PRD v2.0)

Aplikasi web layanan koperasi desa ini dikembangkan untuk memenuhi tugas Rekayasa Kebutuhan (Project 1). Pengembangan berdasar pada dokumen **PRD SIMKOPDES v2.0** yang merupakan hasil sintesis dan perumusan masalah dari tahapan penelitian Worksheet **WS1, WS2, WS3, WS5, WS6, WS7, dan WS8**.

Fokus utama perbaikan antarmuka dan alur pengguna adalah memberikan kendali yang fleksibel kepada anggota terhadap akun dan data keanggotaannya (pengajuan perpindahan domisili & penghapusan akun) serta menyediakan layanan bantuan **Helpdesk internal terintegrasi di dalam aplikasi** tanpa perlu dialihkan ke aplikasi pihak ketiga (WhatsApp/SMS).

---

## 📌 Latar Belakang & Ruang Lingkup Tugas

Berdasarkan analisis awal (WS1) dan Design Challenge (WS2), ditemukan kendala nyata pada aplikasi koperasi:
1. **Keterbatasan Kendali Akun & Data Keanggotaan:** Anggota tidak memiliki fasilitas untuk mengajukan perubahan domisili ketika berpindah tempat tinggal serta tidak adanya opsi pengajuan penghapusan akun.
2. **Alur Helpdesk yang Terputus:** Menu bantuan sebelumnya mengarahkan anggota ke WhatsApp eksternal yang sering memicu kendala peralihan ke SMS saat nomor belum tersimpan.
3. **Kendala Akses Awal & Login:** Menangani kendala akses membuka aplikasi (U1) dan proses masuk akun (U2) melalui penanganan kegagalan yang ramah non-teknis serta kejelasan validasi input.
4. **Batasan Ruang Lingkup (Out of Scope PRD v2.0):** Sesuai arahan PRD v2.0, sistem tidak menambahkan modul keuangan/simpan pinjam baru di luar scope dan tidak mengintegrasikan Corporate University / LMS eksternal, agar fokus pengembangan terpusat pada kendali akun dan helpdesk internal.

---

## 🛠️ Arsitektur & Tech Stack
- **Frontend:** React 18 + Vite
- **Styling & UI:** Tailwind CSS + Lucide Icons (desain ramah pengguna desa dan perangkat mobile)
- **Database & Auth:** Supabase (PostgreSQL + Row Level Security + Triggers)
- **Engine Data:** Mendukung koneksi live Supabase dan mode *Local Store* terintegrasi dengan data realistis KUD Sukamaju untuk memudahkan demonstrasi dan pengujian langsung tanpa hambatan koneksi.

---

## 🗄️ Skema Database Supabase

Berkas skema lengkap dengan RLS (Row Level Security) tersedia pada:
[`supabase/schema.sql`](file:///c:/Users/davaa/Documents/TUGAS%20KAMPUS/RI/Project%201/supabase/schema.sql)

Struktur tabel utama:
1. `profiles`: Data profil pengguna dan peran (`anggota`, `pengurus`).
2. `anggota`: Data nomor anggota unik, NIK 16 digit, alamat domisili, dan status keanggotaan.
3. `permohonan_domisili`: Data pengajuan perpindahan domisili / koperasi (FR-03).
4. `pengajuan_hapus_akun`: Data pengajuan penghapusan akun beserta persetujuan konsekuensi (FR-04).
5. `helpdesk_tiket`: Tiket kendala bantuan internal dan tanggapan pengurus (FR-05 & FR-06).
6. `audit_log`: Catatan audit aktivitas sistem untuk keandalan dan kepatuhan (NFR-02 & NFR-03).

---

## 🚀 Cara Menjalankan Aplikasi

1. **Pastikan Node.js terpasang** (versi 18+ disarankan).
2. **Install dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
4. Buka peramban di **`http://localhost:5173`**.

Untuk kompilasi produksi (*production build*):
```bash
npm run build
npm run preview
```

---

## 🧪 Pengujian

Aplikasi telah dilengkapi panel pengujian cepat di pojok kiri bawah layar (**Panel Penguji PRD v2.0**) untuk mempermudah simulasi seluruh skenario:

1. **Pengujian Pindah Domisili (FR-03):** Masuk sebagai Budi Santoso (Anggota), buka menu *Kendali Akun & Domisili*, ajukan alamat baru. Beralih ke akun Pak Joko (Pengurus) untuk meninjau dan menyetujui permohonan tersebut.
2. **Pengujian Pengajuan Hapus Akun (FR-04):** Buka tab *Pengajuan Hapus Akun*, baca poin konsekuensi retensi data kearsipan desa, centang persetujuan konsekuensi, dan kirim permohonan.
3. **Pengujian Helpdesk Internal (FR-05 & FR-06):** Buka menu *Helpdesk Internal*, kirim laporan baru. Beralih ke akun Pengurus untuk memberikan tanggapan/solusi dan memperbarui status tiket (`Sedang Ditangani` atau `Selesai`).
4. **Pengujian Kegagalan Akses (FR-01):** Klik *Simulasi Server Down* pada panel penguji untuk memeriksa tampilan pesan ramah non-teknis dan tombol pemulihan (*Retry*), lalu klik *Reset ke Normal*.
5. **Pengujian Audit Log (NFR-02 & NFR-03):** Klik tautan *Lihat Audit Log* pada panel penguji untuk melihat riwayat aktivitas sistem secara real-time tanpa mengekspos data kredensial sensitif.

---

## 📝 Catatan Perubahan (Changelog)

Dokumentasi riwayat implementasi fitur dan penyesuaian kebutuhan aplikasi:

### Versi 2.0 (23 November 2026)
Fokus: Penguatan Kendali Akun dan Integrasi Layanan Helpdesk Internal

- **FR-03 / US-01, US-02: Pengajuan Perubahan Domisili atau Perpindahan Koperasi**
  - **Bagian yang diubah:** Penambahan modul formulir pengajuan pindah domisili & riwayat status di menu Pengaturan Akun.
  - **Alasan perubahan:** Temuan WS1 & WS2 menunjukkan tidak tersedianya fasilitas perpindahan domisili bagi anggota yang berpindah tempat tinggal.
  - **File yang berubah:** `src/components/account/AccountSettings.jsx`, `src/context/AppContext.jsx`, `supabase/schema.sql`
  - **Hasil pengujian:** Form pengajuan berhasil disubmit, tersimpan di riwayat anggota, dan pengurus dapat menyetujui/menolak permohonan.
  - **Status:** Selesai (Done)

- **FR-04 / US-03: Pengajuan Penghapusan Akun & Transparansi Konsekuensi**
  - **Bagian yang diubah:** Penambahan fitur pengajuan penghapusan akun dengan verifikasi pemahaman konsekuensi hak & retensi kearsipan.
  - **Alasan perubahan:** Temuan WS1 & WS2 menunjukkan ketiadaan opsi penghapusan akun, sehingga pengguna membutuhkan kendali transparan atas akunnya.
  - **File yang berubah:** `src/components/account/AccountSettings.jsx`, `src/context/AppContext.jsx`, `supabase/schema.sql`
  - **Hasil pengujian:** Form mewajibkan persetujuan pemahaman konsekuensi dan tercatat di pengurus tanpa penghapusan permanen sepihak.
  - **Status:** Selesai (Done)

- **FR-05 / US-04: Layanan Helpdesk Internal (Ticketing Masuk)**
  - **Bagian yang diubah:** Pembuatan modul Helpdesk internal berbasis formulir tiket langsung di dalam aplikasi.
  - **Alasan perubahan:** Temuan WS1 mengidentifikasi alur bantuan sebelumnya yang melempar ke WhatsApp/SMS eksternal sering memicu kendala nomor tidak tersimpan.
  - **File yang berubah:** `src/components/helpdesk/HelpdeskInternal.jsx`, `src/context/AppContext.jsx`, `supabase/schema.sql`
  - **Hasil pengujian:** Anggota berhasil membuat laporan dengan nomor tiket otomatis (`HD-2611-xxx`) tanpa meninggalkan aplikasi.
  - **Status:** Selesai (Done)

- **FR-06 / US-05, US-06: Pemantauan Status & Penanganan Tiket Helpdesk**
  - **Bagian yang diubah:** Penambahan antarmuka pelacakan status tiket bagi anggota dan panel respons penanganan tiket bagi pengurus koperasi.
  - **Alasan perubahan:** Memastikan anggota dapat memantau status tindak lanjut kendalanya dan pengurus dapat memberikan solusi terpusat.
  - **File yang berubah:** `src/components/helpdesk/HelpdeskInternal.jsx`, `src/components/admin/PengurusDashboard.jsx`
  - **Hasil pengujian:** Pengurus dapat memperbarui status tiket (`Sedang Ditangani`, `Selesai`, dll) dan tanggapan langsung terbaca oleh pelapor.
  - **Status:** Selesai (Done)

- **Scope v2.0: Penyesuaian Ruang Lingkup Aplikasi**
  - **Bagian yang diubah:** Penataan ulang navigasi utama dengan memusatkan fitur pada Kendali Akun, Layanan Helpdesk, dan Operasional Pengurus.
  - **Alasan perubahan:** Mematuhi batasan *Out of Scope* PRD v2.0 poin 9 (tidak menambah modul keuangan baru atau LMS eksternal).
  - **File yang berubah:** `src/components/common/Header.jsx`, `src/App.jsx`, `src/data/initialData.js`
  - **Hasil pengujian:** Navigasi bersih, fokus pada kendali akun keanggotaan dan helpdesk sesuai kebutuhan tugas.
  - **Status:** Selesai (Done)

---

### Versi 1.1 (23 November 2026)
Fokus: Stabilitas Akses Awal, Kejelasan Login, dan Pemeliharaan Pendaftaran Anggota

- **FR-01 / UXR-01: Informasi Kondisi Akses dan Pemulihan**
  - **Bagian yang diubah:** Komponen penanganan error akses saat aplikasi memuat atau jaringan terputus.
  - **Alasan perubahan:** Menjawab ulasan pengguna (U1) mengenai kegagalan membuka aplikasi setelah instalasi/pembaruan.
  - **File yang berubah:** `src/components/common/ErrorState.jsx`
  - **Hasil pengujian:** Pesan tampil ramah tanpa kebocoran kode error teknis/stack trace (NFR-03), tombol *Retry* berfungsi normal.
  - **Status:** Selesai (Done)

- **FR-02 / UXR-02: Kejelasan Proses Login & Autentikasi**
  - **Bagian yang diubah:** Formulir login dengan dukungan Nomor Anggota atau Email, validasi inline, dan pemulihan kata sandi.
  - **Alasan perubahan:** Menjawab ulasan pengguna (U2) yang menilai proses login merepotkan.
  - **File yang berubah:** `src/components/auth/LoginForm.jsx`
  - **Hasil pengujian:** Validasi real-time inline berjalan responsif, pesan error spesifik dan berorientasi tindakan.
  - **Status:** Selesai (Done)

- **FR-07: Mempertahankan Kemudahan Pendaftaran Anggota**
  - **Bagian yang diubah:** Formulir pendaftaran anggota baru yang ringkas dengan data esensial (Nama, NIK, No. HP, Alamat, Email, Sandi).
  - **Alasan perubahan:** Mempertahankan ulasan positif pengguna (U3) bahwa proses pendaftaran anggota mudah dan tidak berbelit-belit.
  - **File yang berubah:** `src/components/auth/RegisterForm.jsx`
  - **Hasil pengujian:** Pendaftaran berjalan lancar, menerbitkan nomor anggota sementara, dan status menunggu verifikasi pengurus.
  - **Status:** Selesai (Done)
