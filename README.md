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

Dokumentasi riwayat implementasi fitur, pembaruan antarmuka, dan perbaikan aplikasi secara bertahap:

### Versi 2.1 (23 November 2026 — Malam)
**Fokus Pembaruan:** Tata Letak Navigasi Samping (Sidebar), Menu Hamburger Mobile, dan Pengembalian Beranda Dashboard Utama

- **Pembaruan Navigasi Samping (Sidebar Desktop):**
  - **Bagian yang diubah:** Memindahkan navigasi menu dari posisi atas (*top bar*) menjadi bilah navigasi samping kiri (*Sidebar*) permanen di layar desktop.
  - **Alasan perubahan:** Memberikan tata letak yang lebih lapang, ergonomis, dan mempermudah akses cepat ke seluruh modul aplikasi.
  - **File yang berubah:** `src/components/common/Sidebar.jsx`, `src/App.jsx`
  - **Hasil pengujian:** Sidebar tampil rapi di sebelah kiri dengan indikator menu aktif dan informasi profil anggota.
  - **Status:** Selesai (Done)

- **Pembaruan Menu Hamburger (Mobile Navigation):**
  - **Bagian yang diubah:** Penyediaan bilah atas ramping (*TopNavbar*) khusus perangkat mobile dengan tombol **Menu Hamburger (☰)** yang membuka laci navigasi samping (*slide-over drawer*).
  - **Alasan perubahan:** Memastikan pengalaman pengguna di perangkat layar kecil/smartphone tetap nyaman tanpa memenuhi layar.
  - **File yang berubah:** `src/components/common/TopNavbar.jsx`, `src/components/common/Sidebar.jsx`
  - **Hasil pengujian:** Tombol hamburger berfungsi mulus, membuka drawer navigasi, dan menutup otomatis saat menu dipilih atau backdrop diklik.
  - **Status:** Selesai (Done)

- **Restrukturisasi Dashboard sebagai Beranda Utama:**
  - **Bagian yang diubah:** Menetapkan halaman Dashboard sebagai halaman pembuka pertama saat pengguna login, dilengkapi kartu-kartu aksi menuju fitur Helpdesk, Pindah Domisili, dan Pengajuan Hapus Akun.
  - **Alasan perubahan:** Memenuhi kebutuhan alur kerja di mana pengguna disambut terlebih dahulu di beranda utama untuk memilih layanan yang ingin digunakan.
  - **File yang berubah:** `src/components/member/MemberDashboard.jsx`, `src/context/AppContext.jsx`, `src/App.jsx`
  - **Hasil pengujian:** Setelah login, pengguna langsung masuk ke Beranda Utama dan dapat mengklik kartu layanan untuk langsung membuka fitur terkait.
  - **Status:** Selesai (Done)

- **Penambahan Tombol Breadcrumb Kembali ke Beranda:**
  - **Bagian yang diubah:** Penambahan tombol *"← Kembali ke Beranda / Dashboard"* pada halaman Helpdesk, Kendali Akun, dan Riwayat Simpanan.
  - **Alasan perubahan:** Mempermudah pengguna kembali ke halaman utama setelah menyelesaikan aktivitas di modul fitur.
  - **File yang berubah:** `src/components/account/AccountSettings.jsx`, `src/components/helpdesk/HelpdeskInternal.jsx`, `src/components/member/SavingsHistory.jsx`
  - **Hasil pengujian:** Tombol kembali berfungsi mengembalikan tampilan langsung ke Dashboard Beranda Utama.
  - **Status:** Selesai (Done)

---

### Versi 2.0 (23 November 2026 — Sore)
**Fokus Pembaruan:** Penguatan Kendali Akun, Perpindahan Domisili, Pengajuan Hapus Akun, dan Helpdesk Internal Terintegrasi

- **FR-03 / US-01, US-02: Pengajuan Perubahan Domisili atau Perpindahan Koperasi**
  - **Bagian yang diubah:** Pembuatan formulir pengajuan pembaruan domisili dan mutasi unit koperasi beserta riwayat pemantauan status permohonan.
  - **Alasan perubahan:** Temuan WS1 & WS2 menunjukkan tidak tersedianya fasilitas perpindahan domisili bagi anggota yang berpindah tempat tinggal.
  - **File yang berubah:** `src/components/account/AccountSettings.jsx`, `src/context/AppContext.jsx`, `supabase/schema.sql`
  - **Hasil pengujian:** Form pengajuan berhasil disubmit, tersimpan di riwayat anggota, dan pengurus dapat menyetujui/menolak permohonan.
  - **Status:** Selesai (Done)

- **FR-04 / US-03: Pengajuan Penghapusan Akun & Transparansi Konsekuensi**
  - **Bagian yang diubah:** Penyediaan fitur pengajuan penghapusan akun transparan dengan penjelasan konsekuensi hak suara, penyelesaian sisa simpanan, dan aturan retensi kearsipan desa.
  - **Alasan perubahan:** Temuan WS1 & WS2 menunjukkan ketiadaan opsi penghapusan akun sehingga pengguna membutuhkan kendali transparan atas akunnya.
  - **File yang berubah:** `src/components/account/AccountSettings.jsx`, `src/context/AppContext.jsx`, `supabase/schema.sql`
  - **Hasil pengujian:** Form mewajibkan persetujuan pemahaman konsekuensi dan tercatat di pengurus tanpa penghapusan permanen sepihak.
  - **Status:** Selesai (Done)

- **FR-05 / US-04: Layanan Helpdesk Internal Langsung di Aplikasi**
  - **Bagian yang diubah:** Pembuatan sistem tiket laporan kendala di dalam aplikasi dengan nomor tiket otomatis (`HD-2611-xxx`).
  - **Alasan perubahan:** Temuan WS1 mengidentifikasi alur bantuan sebelumnya yang mengarahkan ke WhatsApp/SMS eksternal sering memicu kendala nomor tidak tersimpan.
  - **File yang berubah:** `src/components/helpdesk/HelpdeskInternal.jsx`, `src/context/AppContext.jsx`, `supabase/schema.sql`
  - **Hasil pengujian:** Anggota berhasil membuat laporan dengan nomor tiket otomatis tanpa perlu meninggalkan aplikasi.
  - **Status:** Selesai (Done)

- **FR-06 / US-05, US-06: Pelacakan Status & Tindak Lanjut Tiket oleh Pengurus**
  - **Bagian yang diubah:** Antarmuka pemantauan status tiket bagi anggota (`Dikirim`, `Sedang Ditinjau`, `Sedang Ditangani`, `Selesai`, `Ditolak`) dan panel respons penanganan bagi pengurus.
  - **Alasan perubahan:** Memastikan anggota dapat memantau status kendalanya secara transparan dan pengurus dapat memberikan solusi terpusat.
  - **File yang berubah:** `src/components/helpdesk/HelpdeskInternal.jsx`, `src/components/admin/PengurusDashboard.jsx`
  - **Hasil pengujian:** Pengurus dapat memperbarui status tiket dan tanggapan/solusi langsung terbaca oleh pelapor.
  - **Status:** Selesai (Done)

- **Scope v2.0: Penyesuaian Ruang Lingkup Bisnis**
  - **Bagian yang diubah:** Memusatkan fitur aplikasi pada kendali akun keanggotaan dan helpdesk internal, serta mengeluarkan modul finansial baru dan LMS Corporate University dari cakupan.
  - **Alasan perubahan:** Mematuhi batasan *Out of Scope* PRD v2.0 poin 9 dan Lampiran C agar implementasi terarah pada permasalahan Design Challenge WS2.
  - **File yang berubah:** `src/data/initialData.js`, `supabase/schema.sql`
  - **Hasil pengujian:** Navigasi dan data terfokus pada inti kebutuhan tugas tanpa modul yang tidak berdasar.
  - **Status:** Selesai (Done)

---

### Versi 1.1 (23 November 2026 — Pagi)
**Fokus Pembaruan:** Stabilitas Akses Awal, Kejelasan Login, dan Pemeliharaan Pendaftaran Anggota

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

---

### Versi 1.0 (23 November 2026 — Awal)
**Fokus Pembaruan:** Inisialisasi Proyek dan Skema Database Awal

- **Inisialisasi Proyek Web:**
  - **Bagian yang diubah:** Pengaturan fondasi project React + Vite, integrasi Tailwind CSS, dan Lucide Icons.
  - **Alasan perubahan:** Memulai pembangunan aplikasi web SIMKOPDES dari nol sesuai *Feature List & Data Model*.
  - **File yang berubah:** `package.json`, `vite.config.js`, `tailwind.config.js`, `src/main.jsx`
  - **Hasil pengujian:** Aplikasi dapat terkompilasi dan berjalan normal pada server lokal.
  - **Status:** Selesai (Done)

- **Penyusunan Skema Database Supabase & RLS:**
  - **Bagian yang diubah:** Pembuatan skema PostgreSQL Supabase awal dengan kebijakan keamanan Row Level Security (RLS).
  - **Alasan perubahan:** Menyediakan struktur data yang aman untuk profil anggota, transaksi simpanan, dan audit log (NFR-02 & NFR-03).
  - **File yang berubah:** `supabase/schema.sql`
  - **Hasil pengujian:** Skema SQL siap dieksekusi di Supabase dengan RLS dan trigger otomatis.
  - **Status:** Selesai (Done)
