import React from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Building2, 
  LayoutDashboard, 
  LifeBuoy, 
  MapPin, 
  ShieldAlert, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  X, 
  User, 
  ChevronRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react'

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { 
    currentUser, 
    logout, 
    activeTab, 
    setActiveTab, 
    openHelp,
    setAccountSubTab
  } = useApp()

  if (!currentUser) return null

  const handleNavClick = (tab, subTab = null) => {
    setActiveTab(tab)
    if (subTab && setAccountSubTab) {
      setAccountSubTab(subTab)
    }
    if (setIsMobileOpen) {
      setIsMobileOpen(false)
    }
  }

  const isPengurus = currentUser.role === 'pengurus'

  const navItems = isPengurus
    ? [
        {
          id: 'kelola_pengurus',
          label: 'Ruang Kerja Pengurus',
          desc: 'Helpdesk, Domisili & Akun',
          icon: Briefcase,
          badge: 'Pengurus'
        },
        {
          id: 'panduan_pengurus',
          label: 'Panduan Pengurus',
          desc: 'Petunjuk operasional desa',
          icon: HelpCircle
        }
      ]
    : [
        {
          id: 'dashboard',
          label: 'Beranda Utama',
          desc: 'Dashboard ringkasan & menu',
          icon: LayoutDashboard
        },
        {
          id: 'helpdesk',
          label: 'Helpdesk Internal',
          desc: 'Laporan kendala & tiket (FR-05)',
          icon: LifeBuoy,
          badge: 'Internal'
        },
        {
          id: 'kendali_domisili',
          tabTarget: 'kendali_akun',
          subTab: 'domisili',
          label: 'Pindah Domisili & Koperasi',
          desc: 'Pengajuan alamat baru (FR-03)',
          icon: MapPin
        },
        {
          id: 'kendali_hapus',
          tabTarget: 'kendali_akun',
          subTab: 'hapus_akun',
          label: 'Pengajuan Hapus Akun',
          desc: 'Kendali hak & retensi (FR-04)',
          icon: ShieldAlert
        },
        {
          id: 'simpanan',
          label: 'Riwayat Simpanan',
          desc: 'Catatan setoran anggota',
          icon: CreditCard
        }
      ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 select-none">
      {/* 1. Brand & Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div 
          onClick={() => handleNavClick(isPengurus ? 'kelola_pengurus' : 'dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">SIMKOPDES</span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              KUD Sukamaju Makmur
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. User Info Card */}
      <div className="p-4 mx-3 my-3 bg-slate-800/70 rounded-2xl border border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-sm">
            {currentUser.nama.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate leading-tight">
              {currentUser.nama}
            </h4>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">
              {isPengurus ? 'Pengurus Koperasi' : (currentUser.nomor_anggota || 'Anggota')}
            </div>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Status Akun:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="capitalize">{currentUser.status || 'Aktif'}</span>
          </span>
        </div>
      </div>

      {/* 3. Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-none">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Menu Navigasi
        </div>

        {navItems.map((item) => {
          const Icon = item.icon
          const targetTab = item.tabTarget || item.id
          const isActive = activeTab === targetTab || (targetTab === 'dashboard' && !activeTab)

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(targetTab, item.subTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-xs leading-tight truncate">
                  {item.label}
                </div>
                {item.desc && (
                  <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-500 group-hover:text-slate-400'}`}>
                    {item.desc}
                  </div>
                )}
              </div>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-emerald-400 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* 4. Bottom Utilities (Help & Logout) */}
      <div className="p-3 border-t border-slate-800 space-y-1 bg-slate-950/40">
        <button
          onClick={() => {
            openHelp(isPengurus ? 'pengurus' : 'umum')
            if (setIsMobileOpen) setIsMobileOpen(false)
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Pusat Bantuan & Petunjuk</span>
        </button>

        <button
          onClick={() => {
            logout()
            if (setIsMobileOpen) setIsMobileOpen(false)
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside aria-label="Sidebar Navigasi Desktop" className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-800 shrink-0 min-h-screen sticky top-0 h-screen z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (Slide-Over with Backdrop) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
          />

          {/* Drawer Pane */}
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-slideRight">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
