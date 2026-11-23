# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## SIMKOPDES — Usulan Peningkatan Pengalaman Akses dan Penggunaan

**Versi:** 1.1
**Tanggal:** 23 November 2026
**Status:** Draft
**Jenis Produk:** Aplikasi layanan koperasi — peningkatan pengalaman pengguna
**Dasar Penyusunan:** WS5, WS6, WS7, dan WS8

---

## 1. Product Overview

### 1.1 Latar Belakang

SIMKOPDES merupakan aplikasi yang menjadi objek analisis dalam tugas UX. Berdasarkan lima ulasan publik App Store yang dianalisis pada WS5, ditemukan beberapa pengalaman pengguna yang berbeda ketika menggunakan aplikasi.

Salah satu ulasan menyebutkan bahwa aplikasi tetap tidak dapat dibuka setelah pengguna mencoba mengunduh, memasang, dan memasang ulang aplikasi. Ulasan lainnya menyebutkan bahwa proses login terasa merepotkan. Di sisi lain, terdapat ulasan yang menyatakan bahwa proses pendaftaran anggota mudah dilakukan dan fitur utama aplikasi mudah digunakan.

Selain itu, terdapat ulasan yang menunjukkan bahwa sebagian pengurus koperasi masih dalam proses mempelajari penggunaan teknologi.

Temuan tersebut menunjukkan perlunya perhatian pada pengalaman akses awal, kejelasan proses login, dan kemudahan penggunaan aplikasi bagi pengguna dengan tingkat pengalaman digital yang beragam. Namun, kemudahan pendaftaran anggota dan penggunaan fitur utama yang telah dinilai positif juga perlu dipertahankan.

**Batasan data penelitian:** temuan tersebut berasal dari lima ulasan publik, bukan hasil wawancara atau pengujian langsung. Oleh karena itu, temuan tidak dapat dianggap mewakili seluruh pengguna SIMKOPDES. Penyebab teknis kegagalan aplikasi, detail sistem autentikasi, nama fitur, dan proses bisnis aplikasi belum dapat dipastikan dari data tersebut.

### 1.2 Product Vision

Membantu pengguna SIMKOPDES mengakses dan memahami penggunaan aplikasi dengan lebih jelas, praktis, dan mudah dipelajari, tanpa menghilangkan kemudahan pendaftaran anggota serta fitur utama yang telah mendapatkan penilaian positif.

### 1.3 Target Pengguna

Target pengguna yang menjadi perhatian dalam pengembangan ini meliputi:

1. Anggota koperasi yang menggunakan aplikasi untuk mengakses layanan atau melakukan pendaftaran.
2. Pengurus koperasi yang menggunakan aplikasi untuk mendukung aktivitas koperasi.
3. Pengguna dengan pengalaman digital yang beragam, termasuk pengurus yang masih mempelajari penggunaan teknologi.

Informasi spesifik mengenai usia, perangkat, tingkat kemampuan digital setiap individu, serta pembagian hak akses belum diketahui dari hasil penelitian WS5.

---

## 2. User Problem

Berdasarkan hasil analisis lima ulasan publik pada WS5, ditemukan beberapa permasalahan dan kebutuhan pengguna:

1. Pengguna mengalami kendala ketika membuka aplikasi, bahkan setelah mencoba memasang ulang aplikasi.
2. Proses login dinilai merepotkan oleh salah satu pengulas.
3. Sebagian pengurus koperasi masih mempelajari penggunaan teknologi sehingga membutuhkan antarmuka dan instruksi yang mudah dipahami.

Selain permasalahan tersebut, terdapat pengalaman positif yang perlu dipertahankan:

1. Proses pendaftaran anggota dinilai mudah dan tidak rumit.
2. Fitur utama aplikasi dinilai mudah digunakan.

### Problem Statement

Pengguna SIMKOPDES membutuhkan pengalaman akses yang lebih jelas dan dapat diandalkan, proses login yang mudah dipahami, serta panduan sederhana agar dapat menggunakan aplikasi dengan lebih percaya diri. Pada saat yang sama, kemudahan pendaftaran anggota dan penggunaan fitur utama yang telah dinilai positif perlu tetap dipertahankan.

### Sumber Temuan

| ID | Temuan WS5 | Implikasi terhadap kebutuhan |
|---|---|---|
| U1 | Aplikasi dilaporkan tetap tidak dapat dibuka setelah mencoba mengunduh, memasang, dan memasang ulang aplikasi. | Pengalaman akses dan informasi pemulihan perlu diperhatikan. |
| U2 | Proses login dinilai merepotkan. | Proses login perlu lebih jelas dan mudah dipahami. |
| U3 | Pendaftaran anggota dinilai mudah. | Kemudahan proses pendaftaran perlu dipertahankan. |
| U4 | Fitur utama aplikasi dinilai mudah digunakan. | Kemudahan penggunaan fitur utama perlu dipertahankan. |
| U5 | Sebagian pengurus koperasi masih belajar menggunakan teknologi. | Antarmuka, navigasi, dan panduan perlu mudah dipahami. |

*Sumber: Ulasan SIMKOPDES di App Store, ditelaah pada 17 Oktober 2026.*

---

## 3. User Persona

**Persona:** Pengguna SIMKOPDES dengan pengalaman digital yang beragam.

Persona ini merupakan hasil sintesis dari temuan ulasan publik pada WS5 dan pengolahan kebutuhan pengguna pada WS6.

### Karakteristik

- Pengguna memiliki peran sebagai anggota atau pengurus koperasi.
- Sebagian pengurus masih mempelajari penggunaan teknologi.
- Pengguna berinteraksi dengan aplikasi melalui proses akses, login atau pendaftaran, dan penggunaan fitur utama.
- Tingkat kemampuan digital pengguna dapat berbeda-beda.

### Goals

- Membuka dan mengakses aplikasi dengan lancar.
- Memahami proses login atau pendaftaran anggota.
- Menemukan dan menggunakan fitur utama aplikasi.
- Menyelesaikan aktivitas dalam aplikasi tanpa kebingungan yang tidak perlu.

### Pain Points

- Aplikasi dilaporkan tidak dapat dibuka oleh salah satu pengulas.
- Proses login dinilai merepotkan.
- Sebagian pengurus masih belajar menggunakan teknologi.
- Pengguna dapat mengalami kesulitan memahami navigasi apabila instruksi tidak cukup jelas.

### Needs

- Informasi kondisi akses dan langkah pemulihan yang jelas.
- Proses login yang mudah dipahami tanpa mengurangi keamanan.
- Pendaftaran anggota yang tetap sederhana.
- Navigasi dan istilah menu yang mudah dikenali.
- Panduan singkat yang dapat diakses kembali ketika diperlukan.

**Catatan:** Persona ini merupakan persona sintetis berdasarkan pola temuan lima ulasan publik. Persona bukan profil satu orang yang diwawancarai. Informasi seperti usia, perangkat, pekerjaan spesifik, dan latar belakang pengguna tidak ditambahkan karena tidak tersedia dalam sumber penelitian.

---

## 4. Product Goals

Produk memiliki tujuan sebagai berikut:

1. Membantu pengguna memahami kondisi ketika aplikasi gagal diakses dan mengetahui tindakan berikutnya.
2. Membuat proses login lebih jelas dan mudah dipahami.
3. Mempertahankan kemudahan proses pendaftaran anggota.
4. Mempertahankan kemudahan penggunaan fitur utama aplikasi.
5. Membantu pengguna dengan pengalaman digital yang beragam memahami navigasi dan instruksi aplikasi.

### Success Metrics

| Indikator | Metode Pengukuran | Target Awal |
|---|---|---|
| Keberhasilan membuka aplikasi | Pengujian fungsional pada skenario akses aplikasi | Baseline ditentukan setelah pengujian awal |
| Pemahaman pesan kegagalan akses | Usability testing pada skenario kegagalan akses | Pengguna dapat memahami pesan dan tindakan berikutnya |
| Keberhasilan menyelesaikan login | Task completion, waktu penyelesaian, dan jumlah kesalahan | Baseline ditentukan setelah pengujian awal |
| Kemudahan pendaftaran anggota | Usability testing pada proses pendaftaran | Kemudahan proses tidak menurun setelah perubahan |
| Kemudahan menemukan fitur utama | Task-based usability testing | Pengguna dapat menemukan fitur yang diuji |
| Pemahaman panduan aplikasi | Pengujian pemahaman instruksi dan navigasi | Pengguna dapat mengikuti instruksi yang tersedia |

**Catatan:** target numerik belum ditetapkan karena belum tersedia baseline maupun hasil pengujian usability. Indikator tersebut merupakan usulan pengukuran yang masih perlu divalidasi.

---

## 5. Functional Requirements

Functional Requirements berikut diturunkan dari lima UX Requirements pada WS8. Implementasinya perlu disesuaikan dengan hasil pemeriksaan aplikasi dan repository yang tersedia.

### FR-01: Informasi Kondisi Akses dan Pemulihan

Sistem perlu menyampaikan informasi yang mudah dipahami ketika pengguna tidak dapat mengakses aplikasi.

**Ketentuan:**
- Sistem menampilkan pesan yang menjelaskan bahwa aplikasi atau layanan sedang tidak dapat diakses.
- Pesan tidak boleh menyatakan penyebab teknis tertentu apabila penyebab tersebut belum terverifikasi.
- Jika tersedia langkah pemulihan yang aman dan relevan, sistem menampilkan instruksi yang dapat dilakukan pengguna.
- Sistem dapat menyediakan arahan untuk mencoba kembali atau menghubungi kanal bantuan resmi apabila mekanisme tersebut memang tersedia.
- Pesan teknis mentah tidak boleh menjadi satu-satunya informasi yang diterima pengguna.

### FR-02: Kejelasan Proses Login

Sistem perlu menyediakan proses login yang lebih jelas dan mudah dipahami.

**Ketentuan:**
- Label pada kolom input harus menggunakan istilah yang mudah dipahami.
- Instruksi pengisian informasi login harus jelas.
- Validasi input harus memberikan informasi mengenai kesalahan yang terjadi.
- Pesan kesalahan harus membantu pengguna memahami tindakan yang perlu dilakukan.
- Perbaikan proses login tidak boleh mengurangi mekanisme keamanan autentikasi yang sudah diterapkan.
- Perubahan metode autentikasi hanya dapat dilakukan apabila didukung oleh sistem yang tersedia dan telah diverifikasi secara teknis.

### FR-03: Mempertahankan Kemudahan Pendaftaran Anggota

Sistem perlu mempertahankan proses pendaftaran anggota yang telah dinilai mudah berdasarkan ulasan WS5.

**Ketentuan:**
- Alur pendaftaran yang tersedia harus diperiksa sebelum dilakukan perubahan.
- Perubahan tidak boleh menambah langkah atau meminta data baru tanpa dasar kebutuhan yang terverifikasi.
- Label, instruksi, dan validasi pada proses pendaftaran harus tetap mudah dipahami.
- Fungsi pendaftaran anggota yang telah tersedia tidak boleh dihilangkan akibat perubahan UX.

### FR-04: Mempertahankan Kemudahan Penggunaan Fitur Utama

Sistem perlu mempertahankan kemudahan penggunaan fitur utama yang telah memperoleh penilaian positif.

**Ketentuan:**
- Fitur utama harus diidentifikasi berdasarkan aplikasi dan repository yang benar-benar tersedia.
- Fungsi dan alur inti yang sudah berjalan harus dipertahankan.
- Perubahan tampilan atau navigasi tidak boleh menghilangkan fungsi yang tersedia.
- Nama dan detail fitur tidak ditentukan dalam PRD ini karena tidak disebutkan secara spesifik dalam bukti penelitian WS5–WS8.

### FR-05: Panduan dan Navigasi yang Mudah Dipahami

Sistem perlu membantu pengguna dengan pengalaman digital yang beragam agar dapat memahami cara menggunakan aplikasi.

**Ketentuan:**
- Label menu dan instruksi menggunakan bahasa yang ringkas dan mudah dipahami.
- Petunjuk kontekstual disediakan pada bagian yang memerlukan penjelasan.
- Panduan dapat ditemukan kembali ketika pengguna membutuhkannya.
- Panduan tidak boleh menghalangi pengguna dalam menjalankan aktivitas utama di aplikasi.

---

## 6. Non-Functional Requirements

### NFR-01: Usability
- Informasi penting harus mudah ditemukan oleh pengguna.
- Pesan kesalahan harus menggunakan bahasa yang jelas dan berorientasi pada tindakan.
- Alur yang telah dinilai mudah tidak boleh dibuat lebih rumit tanpa alasan yang terverifikasi.

### NFR-02: Accessibility and Readability
- Teks, label, dan instruksi harus dapat dibaca dengan jelas.
- Informasi penting tidak boleh disampaikan hanya melalui penggunaan warna.
- Elemen interaktif harus memiliki label yang dapat dipahami.

### NFR-03: Reliability
- Perubahan tidak boleh menurunkan fungsi akses dan fitur aplikasi yang sudah berjalan.
- Error yang relevan perlu ditangani secara terkendali.
- Informasi teknis yang sensitif tidak boleh ditampilkan secara langsung kepada pengguna.
- Penyebab gangguan aplikasi harus ditelusuri melalui pemeriksaan teknis, bukan diasumsikan berdasarkan ulasan.

### NFR-04: Compatibility and Responsiveness
- Aplikasi harus mempertahankan kompatibilitas dengan platform dan perangkat yang saat ini didukung.
- Jika aplikasi mendukung beberapa ukuran layar, tampilan harus tetap dapat digunakan pada ukuran tersebut.
- Platform dan rentang perangkat yang didukung harus diverifikasi melalui repository atau dokumentasi proyek.

### NFR-05: Security
- Penyederhanaan proses login tidak boleh menghilangkan kontrol keamanan yang sudah ada.
- Informasi autentikasi dan data pengguna tidak boleh ditampilkan dalam pesan error atau log yang dapat diakses oleh pengguna lain.
- Mekanisme autentikasi harus mengikuti implementasi sistem yang sudah tersedia.

---

## 7. Business Rules

Aturan berikut merupakan batasan produk yang diturunkan dari kebutuhan UX. Aturan bisnis koperasi yang belum didukung sumber penelitian tidak ditetapkan dalam PRD ini.

1. Perbaikan pengalaman login tidak boleh menonaktifkan kontrol keamanan autentikasi yang sudah berlaku.
2. Proses pendaftaran anggota yang telah tersedia harus tetap dapat digunakan setelah perubahan.
3. Fitur utama yang sudah tersedia harus tetap berfungsi setelah perubahan UX.
4. Pesan kegagalan akses tidak boleh menyatakan penyebab tertentu apabila penyebab tersebut belum terverifikasi.
5. Panduan yang ditambahkan harus sesuai dengan fitur dan alur yang benar-benar tersedia dalam aplikasi.
6. Penambahan atau perubahan aturan keanggotaan, verifikasi, transaksi, maupun layanan koperasi harus mendapatkan konfirmasi dari pemilik produk atau pihak terkait.

---

## 8. User Stories

**US-01: Memahami Kegagalan Akses**
Sebagai pengguna, saya ingin mendapatkan informasi yang jelas ketika aplikasi tidak dapat diakses agar saya mengetahui tindakan berikutnya.

**US-02: Login dengan Jelas**
Sebagai pengguna terdaftar, saya ingin memahami langkah login dan pesan validasinya agar dapat masuk ke aplikasi tanpa kebingungan.

**US-03: Mendaftar sebagai Anggota**
Sebagai calon anggota, saya ingin menyelesaikan pendaftaran melalui alur yang sederhana agar dapat mendaftar tanpa langkah yang membingungkan.

**US-04: Menggunakan Fitur Utama**
Sebagai pengguna, saya ingin tetap dapat menggunakan fitur utama dengan alur yang mudah agar aktivitas saya tidak terganggu oleh perubahan tampilan.

**US-05: Memahami Navigasi dan Panduan**
Sebagai pengguna yang masih mempelajari aplikasi, saya ingin menemukan petunjuk yang sederhana agar dapat memahami cara menggunakan aplikasi.

---

## 9. Scope

### In Scope
- Evaluasi pengalaman membuka aplikasi dan penyampaian kondisi kegagalan akses.
- Perbaikan pesan kesalahan dan arahan pemulihan yang mudah dipahami.
- Evaluasi serta perbaikan kejelasan proses login.
- Mempertahankan kemudahan pendaftaran anggota.
- Mempertahankan kemudahan fitur utama dan konsistensi navigasi.
- Penyediaan panduan singkat dan kontekstual bagi pengguna dengan pengalaman digital beragam.
- Pengujian UX terhadap alur yang mengalami perubahan.

### Out of Scope
- Penambahan modul bisnis koperasi yang tidak disebutkan dalam WS5–WS8.
- Perubahan kebijakan keanggotaan atau proses verifikasi identitas.
- Penggantian total backend, database, atau arsitektur aplikasi.
- Integrasi layanan eksternal yang belum menjadi bagian sistem.
- Penetapan penyebab gangguan aplikasi sebelum dilakukan pemeriksaan teknis.
- Penggantian total proses pendaftaran anggota yang telah dinilai mudah.

---

## 10. Assumptions & Dependencies

### Assumptions
- Aplikasi dan repository SIMKOPDES yang akan dikerjakan merupakan sumber implementasi yang benar.
- Proses login, pendaftaran anggota, dan fitur utama yang saat ini tersedia akan dipertahankan kecuali terdapat temuan teknis atau persetujuan perubahan.
- Lima ulasan publik merupakan indikasi awal untuk merumuskan kebutuhan UX, tetapi belum cukup untuk menyimpulkan kondisi seluruh pengguna.
- Detail yang belum diketahui harus diverifikasi sebelum implementasi dan tidak boleh diisi menggunakan asumsi yang tidak memiliki dasar.

### Dependencies
- Repository dan dokumentasi aplikasi yang aktif.
- Sistem autentikasi yang saat ini digunakan aplikasi.
- API/backend dan layanan yang mendukung akses, pendaftaran, serta fitur utama.
- Kanal bantuan atau dukungan resmi, apabila tersedia.
- Konfirmasi pemilik produk atau pihak pengelola apabila terdapat perubahan proses bisnis.
- Lingkungan pengujian serta perangkat dan platform yang didukung aplikasi.

---

## 11. Expected Deliverables

Implementasi berdasarkan PRD ini diharapkan menghasilkan:

1. Hasil audit singkat terhadap struktur aplikasi dan alur yang sudah tersedia.
2. Perbaikan tampilan pesan kondisi akses dan arahan pemulihan sesuai hasil pemeriksaan teknis.
3. Perbaikan kejelasan tampilan dan validasi pada proses login.
4. Proses pendaftaran anggota yang tetap berfungsi dan tidak mengalami regresi.
5. Fitur utama yang tetap berfungsi setelah perubahan.
6. Navigasi, label, atau panduan kontekstual yang lebih mudah dipahami sesuai hasil audit.
7. Pengujian fungsional dan usability untuk alur yang mengalami perubahan.
8. Catatan perubahan pada repository, termasuk ringkasan perubahan, alasan perubahan, dan hasil pengujian.

Deliverable teknis dan visual secara spesifik harus mengikuti struktur proyek yang ditemukan. PRD ini tidak menetapkan framework, bahasa pemrograman, API, atau arsitektur baru.

---

## 12. Product Acceptance Criteria

Implementasi dapat dinyatakan memenuhi kebutuhan apabila:

1. Pengguna menerima pesan yang mudah dipahami ketika terjadi kondisi gagal akses yang dapat ditangani aplikasi.
2. Pesan kegagalan tidak menyampaikan penyebab teknis yang belum terverifikasi.
3. Pengguna dapat memahami label, instruksi, dan validasi pada proses login.
4. Mekanisme keamanan autentikasi yang sudah tersedia tetap dipertahankan.
5. Proses pendaftaran anggota yang tersedia tetap dapat digunakan.
6. Fitur utama yang sudah tersedia tetap berfungsi setelah perubahan.
7. Panduan atau petunjuk yang ditambahkan sesuai dengan alur aplikasi yang benar-benar tersedia.
8. Tidak terdapat regresi kritis pada akses, login, pendaftaran, dan fitur yang terdampak.
9. Perubahan telah diuji pada platform dan perangkat yang didukung proyek.
10. Hasil implementasi dan pengujian telah dicatat pada repository/GitHub.

---

## Lampiran A. User Journey Map (Ringkasan WS7)

Journey berikut merupakan skenario sintesis berdasarkan temuan WS5 dan pengolahan WS7. Tahap login dan pendaftaran merupakan jalur alternatif, bukan dua aktivitas yang harus dilakukan oleh setiap pengguna.

| Tahap | Tujuan | Aktivitas | Touchpoint | Pemikiran Pengguna | Emosi | Hambatan | Kebutuhan | Peluang UX |
|---|---|---|---|---|---|---|---|---|
| 1. Membuka aplikasi | Mengakses SIMKOPDES | Membuka aplikasi setelah instalasi | Aplikasi dan proses instalasi | Asumsi: Pengguna berharap aplikasi dapat dibuka dengan normal. | Asumsi: Bingung atau frustrasi jika aplikasi tidak terbuka. | U1: Aplikasi dilaporkan tetap tidak dapat dibuka setelah instal ulang. | Akses aplikasi yang dapat diandalkan dan informasi kondisi akses. | Menyediakan pesan kegagalan yang jelas dan arahan pemulihan sesuai kondisi teknis. |
| 2. Login atau mendaftar | Masuk ke aplikasi atau membuat akun | Pengguna lama melakukan login; calon anggota melakukan pendaftaran | Tampilan login dan pendaftaran | Asumsi: Pengguna ingin menyelesaikan proses masuk atau pendaftaran tanpa kebingungan. | Asumsi: Kurang nyaman saat proses login terasa rumit; lebih nyaman saat pendaftaran mudah. | U2: Login dinilai merepotkan. U3: Pendaftaran dinilai mudah. | Login yang jelas dan pendaftaran yang tetap sederhana. | Memperjelas instruksi login dan mempertahankan alur pendaftaran yang sudah dinilai positif. |
| 3. Mengenali fitur | Memahami menu dan menemukan fitur | Melihat menu serta memahami fungsi yang tersedia | Beranda, navigasi, dan label menu yang perlu diverifikasi | Asumsi: Pengguna ingin mengetahui bagian aplikasi yang harus dipilih. | Asumsi: Dapat merasa ragu ketika istilah atau navigasi tidak familiar. | U5: Sebagian pengurus masih belajar menggunakan teknologi. | Istilah yang familiar dan navigasi yang mudah dikenali. | Menyediakan label yang jelas serta panduan singkat dan kontekstual. |
| 4. Menggunakan fitur utama | Menjalankan aktivitas dalam aplikasi | Memilih dan menggunakan fitur utama yang tersedia | Area fitur utama | Asumsi: Pengguna berharap fitur dapat digunakan tanpa langkah yang membingungkan. | Asumsi: Cenderung lebih nyaman apabila alur penggunaan mudah dipahami. | U4: Fitur utama dinilai mudah digunakan. Nama fitur spesifik tidak disebutkan. | Mempertahankan kemudahan interaksi. | Mempertahankan fungsi dan pola interaksi yang sudah dinilai positif. |
| 5. Mengevaluasi pengalaman | Menilai pengalaman menggunakan aplikasi | Memberikan penilaian atau masukan | Ulasan publik App Store | Asumsi: Pengguna menilai pengalaman berdasarkan kemudahan dan kendala yang ditemui. | Asumsi: Dapat positif atau negatif sesuai pengalaman. | Pengalaman pengguna menunjukkan penilaian yang berbeda-beda. | Pengalaman yang lebih jelas dan konsisten. | Menggunakan masukan pengguna sebagai bahan evaluasi dan iterasi UX. |

**Catatan interpretasi:** kolom pemikiran dan emosi merupakan asumsi yang digunakan untuk melengkapi pemetaan perjalanan pengguna. Informasi tersebut bukan kutipan langsung dari pengulas dan belum divalidasi melalui wawancara.

**Moment of Truth (MOT):** Tahap 1, yaitu membuka aplikasi. Tahap ini menjadi titik kritis karena kegagalan akses dapat menghentikan perjalanan pengguna sebelum mencapai tahap berikutnya. Hambatan penting berikutnya terdapat pada Tahap 2, yaitu proses login.

---

## Lampiran B. Prioritas UX Requirements (WS8)

| ID | UX Requirement | Prioritas | Dasar Penentuan |
|---|---|---|---|
| UXR-01 | Informasi kegagalan akses dan pemulihan | High | U1: Kegagalan akses dapat menghentikan perjalanan pengguna. |
| UXR-02 | Proses login yang jelas dan praktis | High | U2: Proses login dinilai merepotkan. |
| UXR-03 | Mempertahankan kemudahan pendaftaran anggota | Low | U3: Pendaftaran sudah dinilai mudah sehingga perlu dipertahankan. |
| UXR-04 | Mempertahankan kemudahan fitur utama dan navigasi | Low | U4: Fitur utama dinilai mudah digunakan sehingga perlu dipertahankan. |
| UXR-05 | Panduan sederhana untuk pengguna dengan pengalaman digital beragam | Medium | U5: Sebagian pengurus masih belajar menggunakan teknologi. |

Prioritas tersebut merupakan hasil penilaian kualitatif pada WS8, bukan hasil pengukuran statistik. Prioritas Low tidak berarti kebutuhan tersebut dihapus, melainkan menunjukkan bahwa pengalaman positif yang sudah ada perlu dijaga agar tidak mengalami penurunan.

---

## Lampiran C. Catatan Implementasi untuk Coding Agent

1. Lakukan audit terhadap repository, dokumentasi, struktur aplikasi, serta alur yang sudah berjalan sebelum melakukan perubahan kode.
2. Identifikasi platform, framework, sistem autentikasi, API, backend, dan fitur yang benar-benar tersedia. Jangan mengarang stack atau endpoint.
3. Petakan setiap Functional Requirement dan UX Requirement ke halaman, komponen, atau modul yang sudah tersedia.
4. Prioritaskan perbaikan akses dan login karena keduanya memiliki prioritas High.
5. Jangan menghapus atau mengganti alur pendaftaran dan fitur utama yang telah dinilai positif.
6. Jangan membuat modul bisnis koperasi baru hanya berdasarkan asumsi.
7. Apabila terdapat detail teknis atau aturan bisnis yang belum jelas, catat sebagai pertanyaan atau pekerjaan yang terhambat (blocked item) dan minta konfirmasi.
8. Tambahkan atau perbarui pengujian yang relevan. Jalankan pengujian yang tersedia dan catat hasilnya.
9. Buat commit yang terfokus dan deskriptif. Perbarui catatan perubahan di GitHub agar perubahan dan alasannya dapat ditelusuri.
10. Setelah implementasi, laporkan file yang diubah, perilaku sebelum dan sesudah perubahan, hasil pengujian, keterbatasan, serta pertanyaan yang masih terbuka.

### Format Pencatatan Perubahan GitHub

Setiap perubahan penting sebaiknya dicatat melalui commit, Pull Request, atau changelog repository.

Contoh format catatan perubahan:

| Informasi | Keterangan |
|---|---|
| Versi PRD | v1.1 |
| Requirement terkait | FR-02 / UXR-02 |
| Bagian yang diubah | Halaman atau komponen login |
| Alasan perubahan | Memperjelas proses login berdasarkan temuan U2 |
| File yang berubah | Diisi berdasarkan implementasi aktual |
| Pengujian | Diisi berdasarkan hasil pengujian |
| Status | Planned / In Progress / Done |

### Riwayat Perubahan PRD

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 23 November 2026 | Draft awal berdasarkan hasil WS6–WS8. |
| 1.1 | 23 November 2026 | Struktur disesuaikan dengan contoh PRD. Ditambahkan Problem Statement, Business Rules, Dependencies, Expected Deliverables, Product Acceptance Criteria, serta lampiran User Journey Map, prioritas UX Requirements, dan instruksi coding agent. |

---

*End of PRD v1.1*
