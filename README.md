# SIMKOPDES — Sistem Informasi Manajemen Koperasi Desa

Aplikasi web layanan koperasi desa yang dibangun berdasarkan **PRD v1.1** dan dokumen pendamping **SIMKOPDES Feature List & Data Model**. Fokus utama pengembangan adalah perbaikan pengalaman pengguna (UX) terhadap kendala akses dan proses masuk, sambil mempertahankan kemudahan pendaftaran dan fitur simpanan yang telah dinilai positif.

---

## 🛠️ Tech Stack yang Ditetapkan
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **Backend / Database:** Supabase (Postgres + Auth + API) + Skema RLS
- **Mode Dual-Engine:** Mendukung koneksi live Supabase maupun *Interactive Demo Store* lokal dengan data awal realistis sehingga siap diuji kapan saja tanpa dependensi jaringan.

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
4. Buka peramban di `http://localhost:5173`.

Untuk build produksi:
```bash
npm run build
npm run preview
```

---

## 📋 Pemetaan Fitur ke PRD & Acceptance Criteria

| ID PRD | Fitur & Implementasi | Acceptance Ref |
|---|---|---|
| **FR-01 / UXR-01** (High) | **Informasi Kondisi Akses & Pemulihan**<br>• Tampilan ramah non-teknis saat gangguan jaringan/server.<br>• Tidak menampilkan *raw stack trace* / kode error teknis mentah (NFR-03 & NFR-05).<br>• Tombol aksi *Coba Hubungkan Ulang* (Retry Action).<br>• Kanal bantuan resmi KUD Sukamaju (WhatsApp, Telepon kantor, Email). | AC-1, AC-2 |
| **FR-02 / UXR-02** (High) | **Kejelasan Proses Login**<br>• Input fleksibel: Nomor Anggota (KOP-xxxx-xxxx) atau Email.<br>• Label berbahasa Indonesia yang jelas.<br>• Validasi *real-time inline* saat mengetik.<br>• Pesan error spesifik & berorientasi tindakan (bukan sekadar "Error").<br>• Fitur Show/Hide Password & dialog pemulihan Lupa Sandi. | AC-3, AC-4 |
| **FR-03 / UXR-03** (Low - Pertahankan) | **Kemudahan Pendaftaran Anggota**<br>• Formulir ringkas dan minimal (Nama, NIK 16 digit, No. HP, Alamat, Email, Sandi).<br>• Tidak menambah langkah/biaya baru yang membingungkan.<br>• Layar konfirmasi pendaftaran dengan nomor anggota sementara. | AC-5 |
| **FR-04 / UXR-04** (Low - Pertahankan) | **Kemudahan Fitur Utama Anggota**<br>• Dashboard ringkasan Simpanan Pokok, Wajib, dan Sukarela.<br>• Riwayat transaksi simpanan transparan dengan filter & pencarian.<br>• Empty state yang ramah dan instruktif.<br>• Pengaturan profil data kontak. | AC-6 |
| **FR-05 / UXR-05** (Medium) | **Panduan & Navigasi Mudah**<br>• Tombol Pusat Bantuan & Petunjuk (? Bantuan) di header dan setiap form.<br>• Modal FAQ kontekstual dengan pencarian dan kategori.<br>• Istilah non-teknis yang mudah dimengerti warga desa. | AC-7 |
| **US-05** | **Modul Khusus Pengurus Desa**<br>• Ringkasan jumlah anggota & total kas kasir desa.<br>• Persetujuan pendaftaran anggota baru (1-click Approve).<br>• Pencatatan setoran simpanan warga secara langsung.<br>• Tab khusus *"Panduan Pengurus Baru"* langkah-demi-langkah bagi pengurus yang masih belajar teknologi. | US-05 |

---

## 🧪 Panel Penguji PRD & Evaluasi UX (DevToolbar)

Di pojok kiri bawah layar aplikasi terdapat **"Panel Penguji PRD & UX"** yang disediakan untuk mempermudah dosen/penilai menguji skenario PRD:
1. **Uji FR-01:** Klik *Simulasi Server Down*, *Simulasi Jaringan Sibuk*, atau *Simulasi Mode Offline* untuk melihat respon penanganan kegagalan akses dan tombol pemulihan.
2. **Uji Peran Pengguna (US-02, US-03, US-05):** Berpindah langsung antara:
   - **Budi Santoso:** Anggota aktif resmi (melihat dashboard simpanan).
   - **Agus Salim:** Calon anggota status pending (menguji alur verifikasi).
   - **Pak Joko (Ketua):** Pengurus koperasi (menguji persetujuan anggota & pencatatan kas).
3. **Uji NFR-03 (Audit Log):** Membuka rekaman log audit keamanan secara *real-time* tanpa kebocoran data sensitif.

---

## 🗄️ Skema Database Supabase (Postgres & RLS)

File skema lengkap tersedia di:
[`supabase/schema.sql`](file:///c:/Users/davaa/Documents/TUGAS%20KAMPUS/RI/Project%201/supabase/schema.sql)

Struktur tabel:
1. `profiles` — Terhubung 1-1 ke `auth.users`, menyimpan nama, no HP, role (`anggota`, `pengurus`, `calon_anggota`).
2. `anggota` — Menyimpan Nomor Anggota unik, NIK 16 digit, alamat domisili desa, status (`pending`, `aktif`, `nonaktif`).
3. `simpanan` — Transaksi setoran simpanan (`pokok`, `wajib`, `sukarela`).
4. `pinjaman` — Placeholder pengajuan pinjaman usaha produktif.
5. `help_content` — Data konten panduan dan petunjuk FAQ.
6. `audit_log` — Catatan aktivitas sistem untuk kepatuhan dan keandalan (NFR-03).
7. Row Level Security (RLS) policies aktif pada seluruh tabel untuk melindungi privasi data warga.
