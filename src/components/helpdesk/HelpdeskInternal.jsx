import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  LifeBuoy, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  HelpCircle, 
  Send, 
  Search,
  Filter,
  PhoneCall,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

/**
 * Fulfills FR-05 & FR-06 / US-04, US-05:
 * - Helpdesk Internal di dalam aplikasi (tidak lagi melempar keluar ke WhatsApp/SMS)
 * - Formulir laporan kendala dengan kategori, judul, dan deskripsi
 * - Pemantauan status tiket: Dikirim -> Sedang Ditinjau -> Sedang Ditangani -> Selesai / Ditolak
 * - Membaca tanggapan resmi dari pengurus langsung di aplikasi
 */
export const HelpdeskInternal = () => {
  const { 
    currentUser, 
    helpdeskTickets, 
    createHelpdeskTicket, 
    openHelp,
    officialHelpContact,
    setActiveTab: setNavActiveTab
  } = useApp()

  const [activeTab, setActiveTab] = useState('daftar_tiket') // 'daftar_tiket' | 'buat_tiket'
  const [filterStatus, setFilterStatus] = useState('semua')
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    kategori: 'akses_login',
    judul: '',
    deskripsi: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter user's tickets
  const myTickets = helpdeskTickets.filter((t) => t.profile_id === currentUser?.id)
  const filteredTickets = myTickets.filter((t) => {
    if (filterStatus === 'semua') return true
    return t.status === filterStatus
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.judul.trim() || !formData.deskripsi.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      createHelpdeskTicket({
        kategori: formData.kategori,
        judul: formData.judul,
        deskripsi: formData.deskripsi
      })
      setFormData({ kategori: 'akses_login', judul: '', deskripsi: '' })
      setIsSubmitting(false)
      setActiveTab('daftar_tiket')
    }, 400)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'selesai':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">● Selesai</span>
      case 'ditangani':
        return <span className="bg-indigo-100 text-indigo-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">● Sedang Ditangani</span>
      case 'ditinjau':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">● Sedang Ditinjau</span>
      case 'ditolak':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">● Tidak Dapat Diproses</span>
      case 'dikirim':
      default:
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">● Laporan Dikirim</span>
    }
  }

  const getCategoryLabel = (kategori) => {
    switch (kategori) {
      case 'akses_login': return 'Akses & Login'
      case 'keanggotaan': return 'Data Keanggotaan'
      case 'teknis': return 'Kendala Teknis'
      case 'layanan_desa': return 'Layanan Koperasi'
      default: return 'Lainnya'
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back to Dashboard Breadcrumb */}
      <button
        onClick={() => setNavActiveTab('dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
      >
        <span>← Kembali ke Beranda / Dashboard</span>
      </button>

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Layanan Helpdesk Internal Koperasi
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sampaikan kendala Anda langsung di dalam aplikasi tanpa harus beralih ke WhatsApp atau SMS (PRD FR-05 & FR-06).
          </p>
        </div>

        <button
          onClick={() => openHelp('helpdesk')}
          className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Petunjuk Bantuan</span>
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('daftar_tiket')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'daftar_tiket'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Laporan Saya ({myTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('buat_tiket')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'buat_tiket'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Kirim Laporan Baru</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DAFTAR LAPORAN SAYA (FR-06) */}
      {activeTab === 'daftar_tiket' && (
        <div className="space-y-4">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['semua', 'dikirim', 'ditinjau', 'ditangani', 'selesai'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  filterStatus === st
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st === 'semua' ? 'Semua Laporan' : st}
              </button>
            ))}
          </div>

          {filteredTickets.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500">
              <LifeBuoy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-sm text-slate-700">Tidak ada tiket laporan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Bila Anda mengalami kendala saat menggunakan aplikasi SIMKOPDES, klik tombol "Kirim Laporan Baru" di atas.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTickets.map((ticket) => {
                const isSelected = selectedTicketId === ticket.id
                return (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs transition-all hover:border-emerald-300"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {ticket.nomor_tiket}
                        </span>
                        <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                          {getCategoryLabel(ticket.kategori)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(ticket.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 mb-1">
                      {ticket.judul}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {ticket.deskripsi}
                    </p>

                    {/* Official Response from Pengurus Koperasi */}
                    {ticket.tanggapan_pengurus ? (
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                        <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tindak Lanjut / Jawaban Pengurus Koperasi:</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed pl-5">
                          {ticket.tanggapan_pengurus}
                        </p>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 italic">
                        Laporan sedang dalam antrean tindak lanjut pengurus balai desa.
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: FORMULIR BUAT LAPORAN BARU (FR-05) */}
      {activeTab === 'buat_tiket' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Formulir Laporan Kendala Helpdesk Internal
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sampaikan kendala Anda secara terperinci. Petugas pengurus koperasi akan menerima laporan ini langsung di dashboard kerja mereka.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Kategori Kendala <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="akses_login">Kendala Membuka Aplikasi / Akses Login</option>
                <option value="keanggotaan">Data Keanggotaan / NIK / Domisili</option>
                <option value="teknis">Kesalahan Tampilan / Tombol Tidak Merespons</option>
                <option value="layanan_desa">Pertanyaan Layanan Simpanan / Koperasi</option>
                <option value="lainnya">Pertanyaan Lainnya</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Judul Laporan Singkat <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Aplikasi lambat saat membuka riwayat simpanan"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Uraian Kendala / Penjelasan Lengkap <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ceritakan kendala yang Anda alami secara jelas..."
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200">
              💡 <strong>Catatan:</strong> Laporan akan diberi nomor tiket otomatis dan dapat Anda pantau statusnya kapan saja di tab "Laporan Saya".
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('daftar_tiket')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan ke Pengurus'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saluran Bantuan Darurat Tambahan */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>Membutuhkan bantuan mendesak di luar aplikasi?</span>
        <div className="flex items-center gap-3">
          <a
            href={officialHelpContact.adminWaLink}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Hotline Darurat WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
