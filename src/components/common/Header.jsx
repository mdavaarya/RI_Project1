import React from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Building2, 
  HelpCircle, 
  LogOut, 
  User, 
  ShieldCheck, 
  WifiOff,
  UserCheck,
  LifeBuoy,
  Settings
} from 'lucide-react'

export const Header = () => {
  const { 
    currentUser, 
    logout, 
    openHelp, 
    activeTab, 
    setActiveTab, 
    setAuthView,
    isOnline,
    simulatedError
  } = useApp()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      {/* Top village announcement / status banner if offline */}
      {(!isOnline || simulatedError) && (
        <div className="bg-amber-500 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>Perhatian: Layanan sedang berada dalam status gangguan atau koneksi terbatas.</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Cooperative Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">SIMKOPDES</span>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                KUD Sukamaju Makmur Mandiri
              </p>
            </div>
          </div>

          {/* Navigation Links (when logged in) */}
          {currentUser && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl text-sm font-medium">
              {currentUser.role === 'pengurus' ? (
                <>
                  <button
                    onClick={() => setActiveTab('kelola_pengurus')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'kelola_pengurus'
                        ? 'bg-purple-900 text-white shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Ruang Kerja Pengurus (Helpdesk & Permohonan)
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('kendali_akun')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'kendali_akun'
                        ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Kendali Akun & Domisili (FR-03, FR-04)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('helpdesk')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'helpdesk'
                        ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <LifeBuoy className="w-4 h-4" />
                    <span>Helpdesk Internal (FR-05)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('simpanan')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      activeTab === 'simpanan'
                        ? 'bg-white text-emerald-700 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Riwayat Simpanan
                  </button>
                </>
              )}
            </nav>
          )}

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Quick Contextual Help Trigger (FR-08) */}
            <button
              onClick={() => openHelp(currentUser?.role === 'pengurus' ? 'pengurus' : 'umum')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 px-3 py-2 rounded-lg transition-colors border border-slate-200"
              title="Bantuan & Petunjuk Penggunaan"
              aria-label="Pusat Bantuan"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Bantuan</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {currentUser.nama}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium capitalize">
                    {currentUser.role === 'pengurus' ? 'Pengurus Koperasi' : `Anggota (${currentUser.nomor_anggota || 'Baru'})`}
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Keluar dari Akun"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthView('login')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-3 py-2 rounded-lg"
                >
                  Masuk
                </button>
                <button
                  onClick={() => setAuthView('register')}
                  className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg shadow-sm transition-colors"
                >
                  Daftar Anggota
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
