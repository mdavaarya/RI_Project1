import React from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Menu, 
  HelpCircle, 
  WifiOff, 
  Building2, 
  Bell, 
  User, 
  LogOut,
  ChevronRight
} from 'lucide-react'

export const TopNavbar = ({ onOpenMobileMenu }) => {
  const { 
    currentUser, 
    activeTab, 
    openHelp, 
    isOnline, 
    simulatedError,
    logout 
  } = useApp()

  const getPageTitle = () => {
    switch (activeTab) {
      case 'helpdesk': return 'Layanan Helpdesk Internal'
      case 'kendali_akun': return 'Kendali Akun & Domisili'
      case 'simpanan': return 'Riwayat Simpanan Anggota'
      case 'kelola_pengurus': return 'Ruang Kerja Pengurus Desa'
      case 'dashboard':
      default: return 'Beranda Utama'
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
      {/* Offline/Error Notification Strip */}
      {(!isOnline || simulatedError) && (
        <div className="bg-amber-500 text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>Status: Gangguan Akses / Mode Uji Coba Terbatas</span>
        </div>
      )}

      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Mobile Hamburger Button & Desktop Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          {currentUser && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
              aria-label="Buka Menu Navigasi Samping"
            >
              <Menu className="w-6 h-6 text-slate-700" />
              <span className="text-xs font-bold text-slate-800">Menu</span>
            </button>
          )}

          {/* Mobile Logo Brand if not logged in or alongside button */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-slate-900 tracking-tight">SIMKOPDES</span>
          </div>

          {/* Desktop Breadcrumb / Page Title */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="text-slate-400">SIMKOPDES</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="font-bold text-slate-800 text-sm">
                {getPageTitle()}
              </span>
            </div>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Help Trigger */}
          <button
            onClick={() => openHelp(currentUser?.role === 'pengurus' ? 'pengurus' : 'umum')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors border border-slate-200"
            title="Buka Pusat Bantuan"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Bantuan</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.nama.split(' ')[0]}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold capitalize">
                  {currentUser.role}
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Keluar Akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
