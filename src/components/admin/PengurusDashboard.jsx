import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Users, 
  LifeBuoy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  BookOpen, 
  HelpCircle, 
  MessageSquare, 
  AlertTriangle,
  ArrowRight,
  Filter,
  Send
} from 'lucide-react'

/**
 * Fulfills US-02, US-03, US-06:
 * - Meninjau & Memproses Permohonan Pindah Domisili Anggota (US-02)
 * - Meninjau & Memproses Pengajuan Penghapusan Akun (US-03)
 * - Menangani & Menjawab Laporan Helpdesk Warga (US-06)
 * - Verifikasi pendaftaran anggota baru (FR-07)
 */
export const PengurusDashboard = () => {
  const { 
    profiles, 
    approveMember, 
    domicileRequests, 
    updateDomicileRequest,
    deletionRequests,
    updateDeletionRequest,
    helpdeskTickets,
    updateTicketStatus,
    activeTab, 
    setActiveTab,
    openHelp 
  } = useApp()

  const [pengurusTab, setPengurusTab] = useState('helpdesk') // 'helpdesk' | 'domisili' | 'hapus_akun' | 'pendaftaran' | 'panduan'

  // Response dialog state for Helpdesk
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [ticketResponse, setTicketResponse] = useState('')
  const [ticketNextStatus, setTicketNextStatus] = useState('ditangani')

  // Catatan for domicile/deletion
  const [actionNote, setActionNote] = useState('')

  // Statistics
  const pendingMembers = profiles.filter((p) => p.status === 'pending').length
  const pendingDomicile = domicileRequests.filter((r) => r.status === 'dikirim' || r.status === 'ditinjau').length
  const pendingDeletion = deletionRequests.filter((r) => r.status === 'dikirim' || r.status === 'ditinjau').length
  const openTickets = helpdeskTickets.filter((t) => t.status !== 'selesai' && t.status !== 'ditolak').length

  const handleTicketSubmit = (e) => {
    e.preventDefault()
    if (!selectedTicket) return

    updateTicketStatus(selectedTicket.id, ticketNextStatus, ticketResponse)
    setSelectedTicket(null)
    setTicketResponse('')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-950/60 border border-purple-500/40 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
              <span>Ruang Kerja Pengurus Koperasi Desa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Pusat Tindak Lanjut Layanan & Akun Anggota
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
              Tangani laporan Helpdesk warga, verifikasi permohonan domisili, dan proses kendali akun keanggotaan (PRD v2.0).
            </p>
          </div>

          <button
            onClick={() => openHelp('pengurus')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all backdrop-blur-sm"
          >
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span>Panduan Pengurus</span>
          </button>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-purple-800/60">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Tiket Helpdesk Masuk</span>
            <div className="text-2xl font-bold text-amber-300 mt-1">
              {openTickets} <span className="text-xs font-normal text-purple-200">Laporan</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Permohonan Pindah Domisili</span>
            <div className="text-2xl font-bold text-cyan-300 mt-1">
              {pendingDomicile} <span className="text-xs font-normal text-purple-200">Warga</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Permohonan Hapus Akun</span>
            <div className="text-2xl font-bold text-rose-300 mt-1">
              {pendingDeletion} <span className="text-xs font-normal text-purple-200">Data</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Pendaftaran Anggota Baru</span>
            <div className="text-2xl font-bold text-emerald-300 mt-1">
              {pendingMembers} <span className="text-xs font-normal text-purple-200">Warga</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setPengurusTab('helpdesk')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            pengurusTab === 'helpdesk'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Laporan Helpdesk Warga ({openTickets})
        </button>
        <button
          onClick={() => setPengurusTab('domisili')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            pengurusTab === 'domisili'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Permohonan Domisili ({pendingDomicile})
        </button>
        <button
          onClick={() => setPengurusTab('hapus_akun')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            pengurusTab === 'hapus_akun'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Pengajuan Hapus Akun ({pendingDeletion})
        </button>
        <button
          onClick={() => setPengurusTab('pendaftaran')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
            pengurusTab === 'pendaftaran'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Verifikasi Anggota Baru ({pendingMembers})
        </button>
      </div>

      {/* TAB 1: LAPORAN HELPDESK (US-06) */}
      {pengurusTab === 'helpdesk' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Daftar Tiket Kendala Helpdesk Masuk
            </h2>
            <span className="text-xs text-slate-500">
              Pengurus menanggapi kendala anggota secara terpusat langsung di dalam aplikasi.
            </span>
          </div>

          <div className="space-y-3">
            {helpdeskTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded">
                      {ticket.nomor_tiket}
                    </span>
                    <span className="font-semibold text-sm text-slate-900">
                      {ticket.nama_pelapor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {new Date(ticket.created_at).toLocaleDateString('id-ID')}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                      ticket.status === 'selesai' ? 'bg-emerald-100 text-emerald-800' :
                      ticket.status === 'ditangani' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      ● {ticket.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-800">{ticket.judul}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ticket.deskripsi}</p>
                </div>

                {ticket.tanggapan_pengurus && (
                  <div className="p-3 bg-purple-50/70 rounded-xl text-xs border border-purple-100">
                    <span className="font-semibold text-purple-900 block mb-0.5">Tanggapan Sebelumnya:</span>
                    <p className="text-slate-700">{ticket.tanggapan_pengurus}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedTicket(ticket)
                      setTicketResponse(ticket.tanggapan_pengurus || '')
                      setTicketNextStatus(ticket.status === 'dikirim' ? 'ditangani' : ticket.status)
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Tindak Lanjut & Balas Laporan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PERMOHONAN PINDAH DOMISILI (US-02) */}
      {pengurusTab === 'domisili' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Peninjauan Permohonan Pindah Domisili / Koperasi
            </h2>
          </div>

          <div className="space-y-3">
            {domicileRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-base text-slate-900">{req.nama_pemohon}</span>
                    <span className="text-xs text-slate-400 font-mono ml-2">({req.nomor_anggota})</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                    req.status === 'disetujui' ? 'bg-emerald-100 text-emerald-800' :
                    req.status === 'ditolak' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    ● {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Alamat Lama:</span>
                    <span className="text-slate-700">{req.alamat_lama}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Alamat Domisili Baru:</span>
                    <span className="font-semibold text-slate-800">{req.alamat_baru}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[11px]">Alasan Kepindahan & Koperasi Tujuan:</span>
                    <span className="text-slate-800">{req.alasan} (Tujuan: {req.koperasi_tujuan})</span>
                  </div>
                </div>

                {req.status !== 'disetujui' && req.status !== 'ditolak' && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => updateDomicileRequest(req.id, 'ditolak', 'Dokumen keterangan domisili RT/RW belum lengkap')}
                      className="px-3.5 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold"
                    >
                      Tolak
                    </button>
                    <button
                      onClick={() => updateDomicileRequest(req.id, 'disetujui', 'Data domisili baru telah diverifikasi dan disetujui')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                    >
                      Setujui Perubahan Domisili
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PENGAJUAN HAPUS AKUN (US-03) */}
      {pengurusTab === 'hapus_akun' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Peninjauan Pengajuan Penghapusan Akun
            </h2>
            <span className="text-xs text-slate-500">
              Sesuai PRD: Memerlukan verifikasi retensi data & hak simpanan sebelum penonaktifan.
            </span>
          </div>

          <div className="space-y-3">
            {deletionRequests.map((del) => (
              <div key={del.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-base text-slate-900">{del.nama_pemohon}</span>
                    <span className="text-xs text-slate-400 font-mono ml-2">({del.nomor_anggota})</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                    del.status === 'disetujui' ? 'bg-slate-200 text-slate-800' :
                    del.status === 'ditolak' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    ● {del.status}
                  </span>
                </div>

                <div className="text-xs bg-rose-50/60 p-3 rounded-xl border border-rose-100 text-slate-700 space-y-1">
                  <span className="font-semibold text-rose-900 block">Alasan Pengajuan Hapus:</span>
                  <p>{del.alasan}</p>
                </div>

                {del.status !== 'disetujui' && del.status !== 'ditolak' && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => updateDeletionRequest(del.id, 'ditolak', 'Masih terdapat hak simpanan sukarela yang harus diselesaikan di kantor')}
                      className="px-3.5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
                    >
                      Tolak
                    </button>
                    <button
                      onClick={() => updateDeletionRequest(del.id, 'disetujui', 'Hak simpanan telah diselesaikan dan akun dinonaktifkan sesuai aturan')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                    >
                      Setujui Penonaktifan Akun
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIKASI PENDAFTARAN ANGGOTA (FR-07) */}
      {pengurusTab === 'pendaftaran' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Pendaftaran Anggota Baru yang Menunggu Verifikasi
          </h2>

          <div className="space-y-3">
            {profiles.filter((p) => p.status === 'pending').length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                Tidak ada pendaftaran anggota yang menunggu persetujuan.
              </div>
            ) : (
              profiles.filter((p) => p.status === 'pending').map((m) => (
                <div key={m.id} className="bg-white rounded-2xl border border-amber-300 bg-amber-50/20 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-base text-slate-900">{m.nama}</div>
                    <div className="text-slate-600">NIK: <strong className="font-mono">{m.nik}</strong> | No. HP: {m.no_hp}</div>
                    <div className="text-slate-500">Alamat: {m.alamat}</div>
                  </div>
                  <button
                    onClick={() => approveMember(m.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                  >
                    Setujui Menjadi Anggota
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal Tindak Lanjut Tiket Helpdesk */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  {selectedTicket.nomor_tiket}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">
                  Tindak Lanjut Laporan: {selectedTicket.judul}
                </h3>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-200">
              <span className="text-slate-400 block mb-0.5">Keluhan dari {selectedTicket.nama_pelapor}:</span>
              <p className="text-slate-700 leading-relaxed">{selectedTicket.deskripsi}</p>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Pilih Status Penanganan Laporan
                </label>
                <select
                  value={ticketNextStatus}
                  onChange={(e) => setTicketNextStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ditinjau">Sedang Ditinjau</option>
                  <option value="ditangani">Sedang Ditangani oleh Petugas</option>
                  <option value="selesai">Selesai Ditangani</option>
                  <option value="ditolak">Tidak Dapat Diproses</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tanggapan / Solusi Resmi Pengurus Koperasi
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan penjelasan atau solusi untuk anggota..."
                  value={ticketResponse}
                  onChange={(e) => setTicketResponse(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  Kirim Tanggapan & Perbarui Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
