import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  FileText, 
  Building2, 
  Info,
  HelpCircle,
  AlertCircle
} from 'lucide-react'

/**
 * Fulfills FR-03 & FR-04:
 * - Pengajuan Perubahan Domisili atau Perpindahan Koperasi (US-01)
 * - Pengajuan Penghapusan Akun dengan Transparansi & Konsekuensi (US-03)
 * - Pemantauan Status Permohonan Anggota
 */
export const AccountSettings = () => {
  const { 
    currentUser, 
    updateProfile, 
    domicileRequests, 
    submitDomicileRequest,
    deletionRequests,
    submitDeletionRequest,
    openHelp,
    setActiveTab,
    accountSubTab,
    setAccountSubTab
  } = useApp()

  const activeSubTab = accountSubTab || 'domisili'
  const setActiveSubTab = setAccountSubTab

  // Form State: Domisili
  const [domicileForm, setDomicileForm] = useState({
    alamat_baru: '',
    koperasi_tujuan: 'KUD Sukamukti Mandiri',
    alasan: ''
  })
  const [domicileSubmitting, setDomicileSubmitting] = useState(false)

  // Form State: Hapus Akun
  const [deletionForm, setDeletionForm] = useState({
    alasan: 'Pindah domisili ke luar kota dan tidak lagi beraktivitas di desa',
    alasan_lain: '',
    konfirmasi_konsekuensi: false
  })
  const [deletionSubmitting, setDeletionSubmitting] = useState(false)

  // Filter requests for current user
  const myDomicileRequests = domicileRequests.filter((r) => r.profile_id === currentUser?.id)
  const myDeletionRequests = deletionRequests.filter((r) => r.profile_id === currentUser?.id)

  const handleDomicileSubmit = (e) => {
    e.preventDefault()
    if (!domicileForm.alamat_baru.trim() || !domicileForm.alasan.trim()) return

    setDomicileSubmitting(true)
    setTimeout(() => {
      submitDomicileRequest({
        alamat_baru: domicileForm.alamat_baru,
        koperasi_tujuan: domicileForm.koperasi_tujuan,
        alasan: domicileForm.alasan
      })
      setDomicileForm({ alamat_baru: '', koperasi_tujuan: 'KUD Sukamukti Mandiri', alasan: '' })
      setDomicileSubmitting(false)
    }, 400)
  }

  const handleDeletionSubmit = (e) => {
    e.preventDefault()
    if (!deletionForm.konfirmasi_konsekuensi) return

    const reason = deletionForm.alasan === 'Lainnya' 
      ? deletionForm.alasan_lain 
      : deletionForm.alasan

    setDeletionSubmitting(true)
    setTimeout(() => {
      submitDeletionRequest({
        alasan: reason,
        konfirmasi_konsekuensi: deletionForm.konfirmasi_konsekuensi
      })
      setDeletionSubmitting(false)
    }, 400)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disetujui':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">● Disetujui</span>
      case 'ditinjau':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">● Sedang Ditinjau</span>
      case 'ditolak':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">● Ditolak</span>
      case 'dikirim':
      default:
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">● Permohonan Dikirim</span>
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back to Dashboard Breadcrumb */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
      >
        <span>← Kembali ke Beranda / Dashboard</span>
      </button>

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Pengaturan Akun & Kendali Keanggotaan
            </h1>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              PRD v2.0
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Fasilitas mandiri bagi anggota untuk mengelola data identitas, mengajukan perpindahan domisili, dan kendali akun.
          </p>
        </div>

        <button
          onClick={() => openHelp('domisili')}
          className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Panduan Kendali Akun</span>
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('domisili')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            activeSubTab === 'domisili'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Pindah Domisili / Koperasi (FR-03)
        </button>
        <button
          onClick={() => setActiveSubTab('hapus_akun')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            activeSubTab === 'hapus_akun'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Pengajuan Hapus Akun (FR-04)
        </button>
        <button
          onClick={() => setActiveSubTab('profil')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            activeSubTab === 'profil'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Data Profil Saya
        </button>
      </div>

      {/* TAB 1: PINDAH DOMISILI / KOPERASI (FR-03 / US-01) */}
      {activeSubTab === 'domisili' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulir Pengajuan (2 Kolom) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Formulir Pengajuan Perubahan Domisili / Perpindahan Koperasi
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pindah tempat tinggal tidak menghilangkan nomor anggota dan riwayat Anda di sistem SIMKOPDES.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Alamat Domisili Saat Ini:</strong> {currentUser?.alamat} (Koperasi Asal: {currentUser?.koperasi_asal || 'KUD Sukamaju'}).
              </span>
            </div>

            <form onSubmit={handleDomicileSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Alamat Domisili Baru (Lengkap RT/RW, Dusun, Desa, Kecamatan) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Jl. Merak No. 14 RT 03 / RW 05, Desa Sukamukti, Kec. Sukatani"
                  value={domicileForm.alamat_baru}
                  onChange={(e) => setDomicileForm({ ...domicileForm, alamat_baru: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Koperasi Tujuan (Bila ada perpindahan unit cabang desa)
                </label>
                <select
                  value={domicileForm.koperasi_tujuan}
                  onChange={(e) => setDomicileForm({ ...domicileForm, koperasi_tujuan: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="KUD Sukamaju (Tetap di koperasi ini, hanya ganti RT/RW)">
                    Tetap di KUD Sukamaju (Hanya perubahan RT/RW desa)
                  </option>
                  <option value="KUD Sukamukti Mandiri">KUD Sukamukti Mandiri (Kec. Sukatani)</option>
                  <option value="KUD Harapan Jaya Karanganyar">KUD Harapan Jaya Karanganyar</option>
                  <option value="Koperasi Unit Desa Wilayah Lainnya">Koperasi Unit Desa Wilayah Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Alasan Perpindahan Domisili <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pindah rumah domisili keluarga / Mutasi tempat kerja"
                  value={domicileForm.alasan}
                  onChange={(e) => setDomicileForm({ ...domicileForm, alasan: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={domicileSubmitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{domicileSubmitting ? 'Mengirim Pengajuan...' : 'Kirim Permohonan Perubahan Domisili'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Riwayat Permohonan Domisili (1 Kolom) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Status Permohonan Anda</span>
            </h3>

            {myDomicileRequests.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Belum ada riwayat permohonan domisili yang dikirim.
              </div>
            ) : (
              <div className="space-y-3">
                {myDomicileRequests.map((req) => (
                  <div key={req.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(req.created_at).toLocaleDateString('id-ID')}
                      </span>
                      {getStatusBadge(req.status)}
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Tujuan Baru:</span>
                      <p className="font-semibold text-slate-800 leading-snug">{req.alamat_baru}</p>
                    </div>
                    <div className="pt-1 border-t border-slate-200 text-[11px] text-slate-600">
                      <strong>Catatan Pengurus:</strong> {req.catatan_pengurus || 'Menunggu verifikasi'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PENGAJUAN HAPUS AKUN (FR-04 / US-03) */}
      {activeSubTab === 'hapus_akun' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Pengajuan Penghapusan Akun Keanggotaan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fasilitas hak pengguna untuk mengajukan penutupan akun secara transparan (PRD FR-04).
              </p>
            </div>
          </div>

          {/* Konsekuensi Penghapusan Akun (Ketentuan PRD) */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 space-y-2.5">
            <div className="font-bold flex items-center gap-1.5 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Harap Perhatikan Konsekuensi Berikut:</span>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-rose-800/90 leading-relaxed text-[11px] sm:text-xs">
              <li>Akun SIMKOPDES Anda tidak dapat digunakan lagi untuk masuk atau melihat riwayat.</li>
              <li>Hak suara dan partisipasi dalam Rapat Anggota Tahunan (RAT) koperasi akan dinonaktifkan.</li>
              <li>
                <strong>Sesuai kebijakan koperasi & hukum kearsipan desa:</strong> Data riwayat transaksi keuangan tetap diarsipkan oleh pengurus untuk keperluan audit keuangan koperasi.
              </li>
              <li>Hak simpanan sukarela dan simpanan pokok yang tersisa akan diselesaikan melalui kasir kantor koperasi balai desa.</li>
            </ul>
          </div>

          {/* Riwayat Pengajuan Hapus Akun yang Sudah Ada */}
          {myDeletionRequests.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span>Pengajuan Penghapusan Akun Aktif</span>
                {getStatusBadge(myDeletionRequests[0].status)}
              </div>
              <p className="text-[11px] leading-relaxed">
                Pengajuan Anda pada tanggal {new Date(myDeletionRequests[0].created_at).toLocaleDateString('id-ID')} sedang diproses oleh pengurus koperasi.
              </p>
              <div className="text-[11px] bg-white p-2 rounded border border-amber-200 text-slate-700">
                <strong>Catatan Pengurus:</strong> {myDeletionRequests[0].catatan_pengurus}
              </div>
            </div>
          )}

          {/* Form Pengajuan Baru */}
          <form onSubmit={handleDeletionSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Pilih Alasan Pengajuan Penutupan / Hapus Akun <span className="text-rose-500">*</span>
              </label>
              <select
                value={deletionForm.alasan}
                onChange={(e) => setDeletionForm({ ...deletionForm, alasan: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="Pindah domisili ke luar kota dan tidak lagi beraktivitas di desa">
                  Pindah domisili ke luar kota / provinsi
                </option>
                <option value="Tidak lagi berprofesi di wilayah desa">
                  Tidak lagi berprofesi/berusaha di wilayah desa
                </option>
                <option value="Ingin menarik seluruh tabungan dan berhenti menjadi anggota">
                  Ingin menarik seluruh tabungan & berhenti menjadi anggota
                </option>
                <option value="Lainnya">Alasan Lainnya (tulis penjelasan)</option>
              </select>
            </div>

            {deletionForm.alasan === 'Lainnya' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Jelaskan Alasan Anda <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={deletionForm.alasan_lain}
                  onChange={(e) => setDeletionForm({ ...deletionForm, alasan_lain: e.target.value })}
                  placeholder="Tuliskan alasan penutupan akun Anda..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            )}

            {/* Checklist Konfirmasi Pemahaman */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={deletionForm.konfirmasi_konsekuensi}
                  onChange={(e) => setDeletionForm({ ...deletionForm, konfirmasi_konsekuensi: e.target.checked })}
                  className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                />
                <span className="text-xs text-slate-700 leading-relaxed font-medium">
                  Saya telah membaca dan memahami seluruh konsekuensi penonaktifan akun keanggotaan ini, serta menyetujui bahwa permohonan akan ditinjau oleh pengurus KUD Sukamaju sesuai ketentuan kearsipan.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={deletionSubmitting || !deletionForm.konfirmasi_konsekuensi}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all"
            >
              {deletionSubmitting ? 'Mengirim Permohonan...' : 'Kirim Permohonan Penghapusan Akun'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: PROFIL DATA BIASA */}
      {activeSubTab === 'profil' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 max-w-2xl mx-auto">
          <h2 className="text-base font-bold text-slate-900">
            Data Identitas Keanggotaan Terdaftar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block mb-0.5">Nama Lengkap:</span>
              <span className="font-bold text-slate-800 text-sm">{currentUser?.nama}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Nomor Anggota:</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">{currentUser?.nomor_anggota}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">NIK (KTP):</span>
              <span className="font-mono text-slate-700">{currentUser?.nik}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Koperasi Induk:</span>
              <span className="font-semibold text-slate-700">{currentUser?.koperasi_asal || 'KUD Sukamaju'}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-xs mb-1">Alamat Domisili Terdaftar:</span>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">{currentUser?.alamat}</p>
          </div>
        </div>
      )}
    </div>
  )
}
