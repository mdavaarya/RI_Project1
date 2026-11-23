// Data inisial realistis untuk Koperasi Desa 'KUD Sukamaju'
// Diperbarui sesuai PRD v2.0 (Kendali Akun, Perpindahan Domisili, Hapus Akun, Helpdesk Internal)

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
    koperasi_asal: 'KUD Sukamaju',
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
    koperasi_asal: 'KUD Sukamaju',
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
    koperasi_asal: 'KUD Sukamaju',
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
    koperasi_asal: 'KUD Sukamaju',
    status: 'aktif',
    tanggal_daftar: '2024-01-01T00:00:00Z',
  }
];

// FR-03 / US-01: Permohonan Perubahan Domisili atau Perpindahan Koperasi
export const initialDomicileRequests = [
  {
    id: 'dom-001',
    profile_id: 'user-001',
    nama_pemohon: 'Budi Santoso',
    nomor_anggota: 'KOP-2601-0089',
    alamat_lama: 'Dusun Sukatani RT 02 / RW 01, Desa Sukamaju',
    alamat_baru: 'Jl. Merak No. 14 RT 03 / RW 05, Desa Sukamukti, Kec. Sukatani',
    koperasi_asal: 'KUD Sukamaju',
    koperasi_tujuan: 'KUD Sukamukti Mandiri',
    alasan: 'Pindah tempat tinggal karena mutasi kerja ke pabrik wilayah Sukamukti',
    status: 'ditinjau', // 'dikirim' | 'ditinjau' | 'disetujui' | 'ditolak'
    catatan_pengurus: 'Sedang diverifikasi dengan pihak RT/RW desa tujuan',
    created_at: '2026-11-21T10:30:00Z',
    updated_at: '2026-11-22T08:15:00Z'
  }
];

// FR-04 / US-03: Pengajuan Penghapusan Akun
export const initialDeletionRequests = [
  {
    id: 'del-001',
    profile_id: 'user-002',
    nama_pemohon: 'Siti Aminah',
    nomor_anggota: 'KOP-2602-0104',
    alasan: 'Sudah tidak berdomisili di wilayah Jawa Barat dan ingin menutup rekening keanggotaan',
    konfirmasi_konsekuensi: true,
    status: 'dikirim', // 'dikirim' | 'ditinjau' | 'disetujui' | 'ditolak'
    catatan_pengurus: 'Menunggu peninjauan penarikan simpanan pokok dan wajib',
    created_at: '2026-11-22T14:00:00Z',
    updated_at: '2026-11-22T14:00:00Z'
  }
];

// FR-05 & FR-06 / US-04, US-05, US-06: Helpdesk Internal
export const initialHelpdeskTickets = [
  {
    id: 'tik-001',
    nomor_tiket: 'HD-2611-001',
    profile_id: 'user-001',
    nama_pelapor: 'Budi Santoso',
    kategori: 'akses_login',
    judul: 'Aplikasi sempat lambat saat login di ponsel Android',
    deskripsi: 'Saat membuka aplikasi tadi pagi setelah pembaruan, proses login memakan waktu sekitar 15 detik sebelum masuk ke dashboard.',
    status: 'ditangani', // 'dikirim' | 'ditinjau' | 'ditangani' | 'selesai' | 'ditolak'
    tanggapan_pengurus: 'Halo Pak Budi, terima kasih laporannya. Kami sedang mengoptimalkan cache server desa agar proses login lebih cepat.',
    created_at: '2026-11-23T08:30:00Z',
    updated_at: '2026-11-23T09:10:00Z'
  },
  {
    id: 'tik-002',
    nomor_tiket: 'HD-2611-002',
    profile_id: 'user-002',
    nama_pelapor: 'Siti Aminah',
    kategori: 'keanggotaan',
    judul: 'Konfirmasi pembaruan alamat domisili RT/RW',
    deskripsi: 'Apakah pengajuan pindah domisili saya sudah mulai diproses oleh pengurus koperasi?',
    status: 'selesai',
    tanggapan_pengurus: 'Data pengajuan Ibu Siti Aminah sudah kami terima dan tercatat di sistem balai desa. Terima kasih.',
    created_at: '2026-11-20T11:00:00Z',
    updated_at: '2026-11-21T13:45:00Z'
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
    tanggal_transaksi: '2026-11-05T11:00:00Z',
    keterangan: 'Simpanan Wajib Bulan November 2026',
    status: 'sukses',
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
    id: 'help-domisili',
    kategori: 'keanggotaan',
    judul: 'Bagaimana alur mengajukan perpindahan domisili atau koperasi?',
    konten: 'Buka menu "Pengaturan Akun", pilih tab "Pindah Domisili/Koperasi". Isi alamat baru dan alasan kepindahan. Data keanggotaan dan riwayat Anda tidak akan hilang.',
    ringkas: 'Ajukan melalui menu Pengaturan Akun tanpa membuat akun baru.'
  },
  {
    id: 'help-hapus',
    kategori: 'keanggotaan',
    judul: 'Bagaimana ketentuan pengajuan penghapusan akun?',
    konten: 'Pengajuan penghapusan akun dilakukan melalui menu "Pengaturan Akun > Hapus Akun". Sistem tidak otomatis langsung menghapus data permanen demi mematuhi ketentuan retensi data koperasi. Pengurus akan meninjau dan menyelesaikan hak simpanan Anda.',
    ringkas: 'Ajukan melalui Pengaturan Akun, pengurus akan meninjau sesuai kebijakan koperasi.'
  },
  {
    id: 'help-helpdesk',
    kategori: 'helpdesk',
    judul: 'Bagaimana cara menyampaikan kendala melalui Helpdesk Internal?',
    konten: 'Pilih menu "Helpdesk Internal", klik "Buat Tiket Laporan Baru", pilih kategori kendala, dan jelaskan permasalahan Anda. Anda dapat memantau status tindak lanjut pengurus secara langsung di dalam aplikasi tanpa perlu pindah ke WhatsApp atau SMS.',
    ringkas: 'Kirim laporan langsung di aplikasi dan pantau statusnya kapan saja.'
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
