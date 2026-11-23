import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Wrench, 
  Users, 
  AlertOctagon, 
  CheckCircle, 
  Database, 
  FileText, 
  X,
  RefreshCw,
  ExternalLink,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

/**
 * DevToolbar:
 * Menyediakan kontrol uji cepat bagi dosen/evaluator untuk memverifikasi PRD:
 * 1. Uji FR-01: Simulasi Akses Gagal (Server down, Gangguan Jaringan, Offline)
 * 2. Uji FR-02: Beralih pengguna langsung (Anggota aktif, Calon anggota pending, Pengurus)
 * 3. Uji NFR-03 & Reliability: Melihat Audit Log real-time
 * 4. Status Supabase & Database Schema
 */
export const DevToolbar = () => {
  const { 
    currentUser, 
    switchUserDirectly, 
    profiles, 
    simulatedError, 
    simulateConnectionError, 
    resetConnection,
    auditLogs,
    isSupabaseConfigured
  } = useApp()

  const [isOpen, setIsOpen] = useState(false)
  const [showAuditModal, setShowAuditModal] = useState(false)

  return (
    <>
      {/* Floating Toolbar Pill */}
      <aside aria-label="Panel Evaluasi UX" className="fixed bottom-3 left-3 sm:left-6 z-40">
        <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden text-xs">
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Panel Penguji PRD & UX</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 border-l border-slate-700 pl-3">
              <span>Aktif: <strong className="text-white">{currentUser ? currentUser.nama.split(' ')[0] : 'Tamu'}</strong></span>
              {simulatedError && (
                <span className="bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  {simulatedError}
                </span>
              )}
            </div>

            {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
          </div>

          {/* Expanded Drawer */}
          {isOpen && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/95 space-y-4 max-w-md w-full">
              {/* FR-01: Simulasi Gangguan Akses */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  1. Uji FR-01 / UXR-01 (Kegagalan Akses & Recovery):
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => simulateConnectionError('server_down')}
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                      simulatedError === 'server_down'
                        ? 'bg-rose-700 text-white border-rose-500'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    Simulasi Server Down
                  </button>
                  <button
                    onClick={() => simulateConnectionError('network_error')}
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                      simulatedError === 'network_error'
                        ? 'bg-amber-700 text-white border-amber-500'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    Simulasi Jaringan Sibuk
                  </button>
                  <button
                    onClick={() => simulateConnectionError('offline')}
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                      simulatedError === 'offline'
                        ? 'bg-orange-700 text-white border-orange-500'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    Simulasi Mode Offline
                  </button>
                  <button
                    onClick={resetConnection}
                    className="px-2.5 py-1.5 rounded-lg border bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border-emerald-600 text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>Reset ke Normal</span>
                  </button>
                </div>
              </div>

              {/* Ganti Pengguna Cepat */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  2. Beralih Peran Pengguna (US-02, US-03, US-05):
                </label>
                <div className="space-y-1">
                  {profiles.slice(0, 4).map((p) => {
                    const isCurrent = currentUser?.id === p.id
                    return (
                      <button
                        key={p.id}
                        onClick={() => switchUserDirectly(p.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-700'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="font-medium truncate">{p.nama}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          p.role === 'pengurus' ? 'bg-purple-900 text-purple-200' :
                          p.status === 'pending' ? 'bg-amber-900 text-amber-200' :
                          'bg-emerald-950 text-emerald-300'
                        }`}>
                          {p.role === 'pengurus' ? 'Pengurus' : p.status === 'pending' ? 'Pending' : 'Anggota'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Audit Log & Supabase Info */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => setShowAuditModal(true)}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lihat Audit Log ({auditLogs.length})</span>
                </button>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Simulasi Local DB'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Audit Log Modal (NFR-03 & Reliability) */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Catatan Audit Sistem (Audit Log — NFR-03)</h3>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 text-xs flex-1">
              <p className="text-slate-500 text-[11px] mb-3">
                Mencatat aktivitas penting (login, pendaftaran, persetujuan pengurus, transaksi) tanpa membocorkan kata sandi atau data sensitif mentah sesuai NFR-03 & NFR-05.
              </p>
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-slate-800">
                    <span className="font-bold text-emerald-700">{log.aksi}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString('id-ID')}
                    </span>
                  </div>
                  <div className="text-slate-600">Pelaku: <strong className="text-slate-700">{log.user}</strong></div>
                  {log.detail && (
                    <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-100">
                      {log.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
