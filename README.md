# SIMKOPDES — Sistem Informasi Manajemen Koperasi Desa

### Penguatan Kendali Akun dan Integrasi Layanan Helpdesk (PRD v2.0)

Aplikasi web layanan koperasi desa yang dibangun berdasarkan **PRD SIMKOPDES v2.0** (berdasarkan sintesis Worksheet WS1, WS2, WS3, WS5, WS6, WS7, dan WS8). Fokus utama pembaruan ini adalah memberikan kendali yang fleksibel kepada anggota terhadap akun dan data keanggotaannya (perubahan domisili & penghapusan akun) serta menyediakan layanan bantuan **Helpdesk internal terintegrasi di dalam aplikasi** tanpa perlu beralih ke WhatsApp atau SMS.

---

## 📑 Catatan Perubahan (Changelog Repository & PRD)

Sesuai instruksi dan format standar dokumentasi perubahan (*PRD Lampiran C*), berikut adalah catatan lengkap seluruh perubahan implementasi yang dilakukan:

| Versi PRD | Requirement Terkait | Bagian yang Diubah | Alasan Perubahan (Dasar Masalah) | File yang Berubah | Hasil Pengujian | Status |
|---|---|---|---|---|---|---|
| **v1.1** | **FR-01 / UXR-01** | Modul Akses & State Kegagalan | Menangani laporan pengguna yang gagal membuka aplikasi (U1). Menyediakan pesan ramah non-teknis tanpa bocoran stack trace mentah, tombol *Retry*, dan hotline resmi. | `src/components/common/ErrorState.jsx` | Berhasil menangani status offline dan gangguan jaringan dengan simulasi retry normal. | **Done** |
| **v1.1** | **FR-02 / UXR-02** | Modul Login & Autentikasi | Menangani temuan U2 (login merepotkan). Menyediakan input fleksibel Nomor Anggota/Email, validasi *inline real-time*, pesan error actionable, dan toggle lihat sandi. | `src/components/auth/LoginForm.jsx` | Berhasil memvalidasi login, mendeteksi akun pending/salah kata sandi, dan autofill akun demo. | **Done** |
| **v1.1** | **FR-07** | Pendaftaran Anggota Baru | Mempertahankan pengalaman pendaftaran anggota yang dinilai mudah (U3) tanpa menambah syarat data yang memberatkan. | `src/components/auth/RegisterForm.jsx` | Berhasil mendaftarkan anggota dengan nomor anggota sementara dan status menunggu verifikasi. | **Done** |
| **v2.0** | **FR-03 / US-01, US-02** | Pengaturan Akun: Perubahan Domisili & Perpindahan Koperasi | Temuan WS1 & WS2: Tidak ada opsi perpindahan domisili saat anggota pindah tempat tinggal. Fitur ini memungkinkan anggota mengajukan alamat baru/koperasi tujuan tanpa kehilangan riwayat akun. | `src/components/account/AccountSettings.jsx`<br>`src/context/AppContext.jsx`<br>`supabase/schema.sql` | Form berhasil disubmit, tercatat di riwayat anggota, dan pengurus dapat menyetujui/menolak permohonan. | **Done** |
| **v2.0** | **FR-04 / US-03** | Pengaturan Akun: Pengajuan Penghapusan Akun | Temuan WS1 & WS2: Tidak tersedianya opsi penghapusan akun. Sistem kini menyediakan mekanisme pengajuan transparan dengan penjelasan konsekuensi hak & retensi data kearsipan desa. | `src/components/account/AccountSettings.jsx`<br>`src/context/AppContext.jsx`<br>`supabase/schema.sql` | Form meminta persetujuan konsekuensi, tercatat di sistem pengurus, dan tidak langsung melakukan *hard delete* data keuangan. | **Done** |
| **v2.0** | **FR-05 / US-04** | Layanan Helpdesk Internal (Ticketing Masuk) | Temuan WS1: Kontak bantuan sebelumnya melempar ke WhatsApp/SMS eksternal yang sering gagal. Sekarang anggota dapat mengirim laporan kendala langsung di aplikasi. | `src/components/helpdesk/HelpdeskInternal.jsx`<br>`src/context/AppContext.jsx`<br>`supabase/schema.sql` | Anggota berhasil membuat tiket kendala dengan nomor tiket unik otomatis (`HD-2611-xxx`). | **Done** |
| **v2.0** | **FR-06 / US-05, US-06** | Pemantauan & Penanganan Tiket Helpdesk | Memungkinkan anggota memantau perkembangan laporan (`Dikirim`, `Sedang Ditinjau`, `Sedang Ditangani`, `Selesai`, `Ditolak`) dan membaca tanggapan resmi pengurus di aplikasi. | `src/components/helpdesk/HelpdeskInternal.jsx`<br>`src/components/admin/PengurusDashboard.jsx` | Status tiket dapat diubah oleh pengurus disertai tanggapan solusi yang langsung tampil di akun anggota. | **Done** |
| **v2.0** | **Scope v2.0** | Penyesuaian Ruang Lingkup Bisnis | Mengikuti batasan *Out of Scope* PRD v2.0 poin 9 & Lampiran C: Modul finansial baru tidak dibuat; fokus diarahkan penuh pada kendali akun keanggotaan dan Helpdesk internal. | `src/components/common/Header.jsx`<br>`src/App.jsx`<br>`src/data/initialData.js` | Navigasi aplikasi berfokus pada Kendali Akun, Layanan Helpdesk, dan Operasional Pengurus. | **Done** |

---

## 🛠️ Arsitektur & Tech Stack
- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **Database & Auth Schema:** Supabase (PostgreSQL + RLS + Auto Trigger)
- **Engine Operasional:** Mendukung koneksi live Supabase dan *Interactive Local Store* dengan data realistis KUD Sukamaju untuk mempermudah evaluasi dan pengujian dosen.

---

## 🚀 Cara Menjalankan Aplikasi

1. **Pastikan Node.js terpasang** di komputer Anda (versi 18+).
2. **Install dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
4. Buka alamat **`http://localhost:5173`** pada peramban web.

Untuk build kompilasi produksi:
```bash
npm run build
npm run preview
```

---

## 🧪 Panduan Pengujian untuk Dosen / Penilai (DevToolbar)

Aplikasi dilengkapi panel pengujian melayang di pojok kiri bawah (**Panel Penguji PRD v2.0**):

1. **Uji FR-03 (Pindah Domisili):** Masuk sebagai Budi Santoso (Anggota), buka menu *Kendali Akun & Domisili*, ajukan alamat baru. Kemudian beralih ke akun Pak Joko (Pengurus) untuk meninjau dan menyetujui permohonan tersebut.
2. **Uji FR-04 (Hapus Akun):** Buka tab *Pengajuan Hapus Akun*, baca poin konsekuensi retensi data, centang konfirmasi, dan kirim. Status permohonan akan terverifikasi secara transparan.
3. **Uji FR-05 & FR-06 (Helpdesk Internal):** Buka menu *Helpdesk Internal*, kirim laporan baru. Beralih ke Pengurus untuk membalas dan mengubah status menjadi *Sedang Ditangani* atau *Selesai*.
4. **Uji FR-01 (Kegagalan Akses):** Tekan *Simulasi Server Down* pada panel penguji untuk melihat respons penanganan error non-teknis, lalu tekan *Reset ke Normal*.
5. **Uji NFR-02 & NFR-03 (Keandalan & Audit Log):** Buka tautan *Lihat Audit Log* pada panel penguji untuk melihat riwayat aktivitas sistem secara real-time.

---

## 🗄️ Skema Database Supabase

Berkas skema lengkap dengan RLS (Row Level Security) siap pakai tersedia di:
[`supabase/schema.sql`](file:///c:/Users/davaa/Documents/TUGAS%20KAMPUS/RI/Project%201/supabase/schema.sql)

Tabel skema:
1. `profiles`: Profil anggota dan peran pengguna (`anggota`, `pengurus`).
2. `anggota`: Data nomor anggota, NIK, dan status keanggotaan.
3. `permohonan_domisili`: Data pengajuan perpindahan domisili / koperasi (FR-03).
4. `pengajuan_hapus_akun`: Data pengajuan penghapusan akun dan persetujuan konsekuensi (FR-04).
5. `helpdesk_tiket`: Tiket kendala bantuan internal dan tanggapan pengurus (FR-05 & FR-06).
6. `audit_log`: Catatan audit aktivitas sistem untuk keandalan dan kepatuhan.
