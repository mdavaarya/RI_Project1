// Data inisial realistis untuk Koperasi Desa 'KUD Sukamaju'
// Digunakan sebagai state awal dan fallback mock mode jika Supabase belum dihubungkan.

export const initialProfiles = [
  {
    id: 'user-001',
    email: 'budi.santoso@gmail.com',
    nama: 'Budi Santoso',
    no_hp: '081234567890',
    role: 'anggota',
    nomor_anggota: 'KOP-2601-0089',
    nik: '3201011508850001',
    alamat: 'Dusun Sukatani RT 02 / RW 01, Desa Sukamaju',
    status: 'aktif',
    tanggal_daftar: '2025-01-15T08:00:00Z',
  },
  {
    id: 'user-002',
    email: 'siti.aminah@gmail.com',
    nama: 'Siti Aminah',
    no_hp: '081398765432',
    role: 'anggota',
    nomor_anggota: 'KOP-2602-0104',
    nik: '3201015206900003',
    alamat: 'Dusun Karanganyar RT 01 / RW 03, Desa Sukamaju',
    status: 'aktif',
    tanggal_daftar: '2025-02-10T09:30:00Z',
  },
  {
    id: 'user-003',
    email: 'agus.salim@gmail.com',
    nama: 'Agus Salim (Calon Anggota)',
    no_hp: '085712345678',
    role: 'calon_anggota',
    nomor_anggota: 'KOP-2611-0199',
    nik: '3201011103980002',
    alamat: 'Dusun Sukamukti RT 04 / RW 02, Desa Sukamaju',
    status: 'pending',
    tanggal_daftar: '2026-11-20T14:15:00Z',
  },
  {
    id: 'user-pengurus',
    email: 'pengurus@kudsukamaju.id',
    nama: 'Pak Joko Widodo (Ketua Pengurus)',
    no_hp: '081122334455',
    role: 'pengurus',
    nomor_anggota: 'KOP-PENGURUS-01',
    nik: '3201010101700001',
    alamat: 'Kantor Balai Desa Sukamaju Lt. 2',
    status: 'aktif',
    tanggal_daftar: '2024-01-01T00:00:00Z',
  }
];

export const initialSavings = [
  {
    id: 'sav-101',
    anggota_id: 'user-001',
    jenis: 'pokok',
    nominal: 100000,
    tanggal_transaksi: '2025-01-15T08:30:00Z',
    keterangan: 'Simpanan Pokok awal keanggotaan',
    status: 'sukses',
  },
  {
    id: 'sav-102',
    anggota_id: 'user-001',
    jenis: 'wajib',
    nominal: 50000,
    tanggal_transaksi: '2026-09-05T10:00:00Z',
    keterangan: 'Simpanan Wajib Bulan September 2026',
    status: 'sukses',
  },
  {
    id: 'sav-103',
    anggota_id: 'user-001',
    jenis: 'wajib',
    nominal: 50000,
    tanggal_transaksi: '2026-10-05T09:15:00Z',
    keterangan: 'Simpanan Wajib Bulan Oktober 2026',
    status: 'sukses',
  },
  {
    id: 'sav-104',
    anggota_id: 'user-001',
    jenis: 'wajib',
    nominal: 50000,
    tanggal_transaksi: '2026-11-05T11:00:00Z',
    keterangan: 'Simpanan Wajib Bulan November 2026',
    status: 'sukses',
  },
  {
    id: 'sav-105',
    anggota_id: 'user-001',
    jenis: 'sukarela',
    nominal: 350000,
    tanggal_transaksi: '2026-11-12T13:45:00Z',
    keterangan: 'Setoran hasil panen padi',
    status: 'sukses',
  },
  {
    id: 'sav-106',
    anggota_id: 'user-002',
    jenis: 'pokok',
    nominal: 100000,
    tanggal_transaksi: '2025-02-10T10:00:00Z',
    keterangan: 'Simpanan Pokok awal keanggotaan',
    status: 'sukses',
  },
  {
    id: 'sav-107',
    anggota_id: 'user-002',
    jenis: 'wajib',
    nominal: 50000,
    tanggal_transaksi: '2026-11-02T08:30:00Z',
    keterangan: 'Simpanan Wajib Bulan November 2026',
    status: 'sukses',
  }
];

export const initialLoans = [
  {
    id: 'loan-201',
    anggota_id: 'user-001',
    jumlah_pengajuan: 2500000,
    keperluan: 'Beli pupuk dan bibit jagung',
    status: 'disetujui',
    tanggal_pengajuan: '2026-08-15T10:00:00Z',
    keterangan: 'Disetujui tempo 6 bulan, angsuran berjalan lancar',
  }
];

export const initialHelpContent = [
  {
    id: 'help-1',
    kategori: 'login',
    judul: 'Bagaimana cara masuk jika lupa nomor anggota?',
    konten: 'Anda dapat masuk menggunakan alamat Email yang didaftarkan saat registrasi sebagai pengganti Nomor Anggota.',
    ringkas: 'Gunakan email terdaftar jika nomor anggota tidak diingat.'
  },
  {
    id: 'help-2',
    kategori: 'login',
    judul: 'Mengapa muncul pesan "Nomor Anggota/Email tidak terdaftar"?',
    konten: 'Pastikan format penulisan sudah sesuai (contoh: KOP-2601-0089 atau nama@email.com). Jika baru mendaftar, pastikan formulir pendaftaran sudah berhasil disubmit.',
    ringkas: 'Periksa ejaan atau daftar akun baru bila belum pernah terdaftar.'
  },
  {
    id: 'help-3',
    kategori: 'pendaftaran',
    judul: 'Apa saja syarat mendaftar anggota koperasi desa?',
    konten: 'Cukup menyiapkan: 1. NIK (16 digit sesuai e-KTP), 2. Nama Lengkap, 3. Nomor Handphone aktif (bisa WhatsApp), 4. Alamat domisili di desa. Tidak dipungut biaya formulir pendaftaran.',
    ringkas: 'Hanya butuh NIK, Nama, No. HP, dan Alamat.'
  },
  {
    id: 'help-4',
    kategori: 'pendaftaran',
    judul: 'Berapa lama status verifikasi pendaftaran anggota?',
    konten: 'Pengurus koperasi memverifikasi data pendaftar dalam 1x24 jam pada hari kerja. Anda dapat memantau status secara langsung di halaman dashboard.',
    ringkas: 'Verifikasi maksimal 1x24 jam kerja oleh pengurus.'
  },
  {
    id: 'help-5',
    kategori: 'simpanan',
    judul: 'Apa perbedaan Simpanan Pokok, Wajib, dan Sukarela?',
    konten: '• Simpanan Pokok: Disetor sekali saat menjadi anggota (Rp 100.000) dan tidak dapat ditarik selama masih menjadi anggota.\n• Simpanan Wajib: Disetor rutin setiap bulan (Rp 50.000).\n• Simpanan Sukarela: Tabungan bebas yang dapat disetor atau ditarik kapan saja.',
    ringkas: 'Pokok = 1 kali di awal; Wajib = per bulan; Sukarela = tabungan bebas.'
  },
  {
    id: 'help-6',
    kategori: 'pengurus',
    judul: 'Panduan Praktis Pengurus: Cara Menyetujui Anggota Baru',
    konten: 'Buka menu "Kelola Anggota", pilih tab "Menunggu Verifikasi", lalu periksa kesesuaian data NIK dan domisili calon anggota. Klik tombol hijau "Setujui Anggota" untuk mengaktifkan.',
    ringkas: 'Pilih calon anggota di tab Menunggu, lalu klik Setujui.'
  },
  {
    id: 'help-7',
    kategori: 'pengurus',
    judul: 'Panduan Praktis Pengurus: Mencatat Setoran Simpanan Warga',
    konten: 'Buka menu "Catat Simpanan", pilih nama warga/nomor anggota, pilih jenis simpanan (Wajib/Sukarela), masukkan nominal rupiah yang diterima, dan simpan. Kwitansi otomatis tercatat.',
    ringkas: 'Buka Catat Simpanan, pilih anggota, isi nominal, lalu klik Simpan.'
  }
];

export const officialHelpContact = {
  namaKoperasi: 'Koperasi Desa (KUD) Sukamaju Makmur Mandiri',
  nomorBadanHukum: 'AHU-0004128.AH.01.26.TAHUN 2021',
  alamat: 'Jl. Raya Desa Sukamaju No. 12, Kec. Sukatani, Kab. Bogor',
  jamOperasional: 'Senin – Jumat: 08.00 – 16.00 WIB | Sabtu: 08.00 – 12.00 WIB',
  whatsapp: '0812-3456-7899',
  telepon: '(0251) 8321456',
  email: 'layanan@kudsukamaju.id',
  adminWaLink: 'https://wa.me/6281234567899?text=Halo%20Admin%20SIMKOPDES%20Desa%20Sukamaju,%20saya%20membutuhkan%20bantuan%20terkait%20aplikasi'
};
