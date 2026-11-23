import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Building2, 
  LifeBuoy, 
  MapPin, 
  ShieldAlert, 
  CreditCard, 
  UserCheck, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  FileText,
  Wallet,
  Settings,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

/**
 * Halaman Utama (Dashboard Anggota SIMKOPDES):
 * Menyajikan beranda utama, status keanggotaan, ringkasan simpanan,
 * dan kartu-kartu menu untuk mengakses seluruh fitur PRD v2.0:
 * 1. Layanan Helpdesk Internal (FR-05, FR-06)
 * 2. Pengajuan Pindah Domisili / Koperasi (FR-03)
 * 3. Pengajuan Penghapusan Akun (FR-04)
 * 4. Riwayat Simpanan Anggota
 */
export const MemberDashboard = () => {
  const { 
    currentUser, 
    setActiveTab, 
    savings, 
    helpdeskTickets, 
    domicileRequests,
    deletionRequests,
    openHelp 
  } = useApp()

  // Data aggregations
  const userSavings = savings.filter((s) => s.anggota_id === currentUser?.id)
  const totalSimpanan = userSavings.reduce((acc, curr) => acc + curr.nominal, 0)
  
  const myTickets = helpdeskTickets.filter((t) => t.profile_id === currentUser?.id)
  const openTicketCount = myTickets.filter((t) => t.status !== 'selesai' && t.status !== 'ditolak').length

  const myDomicile = domicileRequests.filter((r) => r.profile_id === currentUser?.id)
  const activeDomicile = myDomicile.find((r) => r.status === 'dikirim' || r.status === 'ditinjau')

  const myDeletion = deletionRequests.filter((r) => r.profile_id === currentUser?.id)
  const activeDeletion = myDeletion.find((r) => r.status === 'dikirim' || r.status === 'ditinjau')

  return (
    <div className="space-y-6">
      {/* 1. Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-950/40 backdrop-blur-sm border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Nomor Anggota: {currentUser?.nomor_anggota || 'KOP-2601-0089'}</span>
              <span className="text-emerald-300">● {currentUser?.status === 'aktif' ? 'Anggota Aktif' : currentUser?.status}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Selamat Datang, {currentUser?.nama}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Selamat datang di portal layanan mandiri KUD Sukamaju. Anda dapat mengelola data domisili, memantau simpanan, dan menyampaikan kendala secara terintegrasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => openHelp('umum')}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all backdrop-blur-sm"
            >
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span>Panduan Layanan</span>
            </button>
            <button
              onClick={() => setActiveTab('helpdesk')}
              className="inline-flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>Buka Helpdesk</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Circles */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 2. Notification / Active Process Banner (If any) */}
      {(activeDomicile || activeDeletion || openTicketCount > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeDomicile && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="font-bold block">Permohonan Pindah Domisili Sedang Diproses</span>
                  <span className="text-[11px] text-blue-700">Tujuan baru: {activeDomicile.alamat_baru.slice(0, 35)}...</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('kendali_akun')}
                className="text-xs font-bold text-blue-700 hover:underline shrink-0 ml-2"
              >
                Lihat Status →
              </button>
            </div>
          )}

          {openTicketCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <LifeBuoy className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold block">{openTicketCount} Tiket Helpdesk Sedang Ditindaklanjuti</span>
                  <span className="text-[11px] text-amber-700">Petugas sedang meninjau keluhan Anda.</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('helpdesk')}
                className="text-xs font-bold text-amber-800 hover:underline shrink-0 ml-2"
              >
                Cek Tiket →
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. MENU KARTU FITUR UTAMA (Sesuai Permintaan: Gunakan Fitur di Sini) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Layanan & Fitur Aplikasi
            </h2>
            <p className="text-xs text-slate-500">
              Pilih menu layanan di bawah ini untuk mengakses kebutuhan akun dan bantuan koperasi desa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* KARTU FITUR 1: HELPDESK INTERNAL (FR-05 & FR-06) */}
          <div 
            onClick={() => setActiveTab('helpdesk')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 flex items-center justify-center transition-colors mb-4">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Helpdesk Internal
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  FR-05 & FR-06
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kirim laporan kendala aplikasi atau pertanyaan langsung ke pengurus koperasi tanpa perlu dialihkan ke WhatsApp atau SMS.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>{myTickets.length > 0 ? `${myTickets.length} Tiket Tercatat` : 'Kirim Laporan Baru'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* KARTU FITUR 2: PINDAH DOMISILI / KOPERASI (FR-03) */}
          <div 
            onClick={() => setActiveTab('kendali_akun')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 group-hover:bg-blue-600 group-hover:text-white text-blue-700 flex items-center justify-center transition-colors mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                  Pindah Domisili & Koperasi
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                  FR-03
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ajukan pembaruan alamat tempat tinggal baru atau perpindahan unit koperasi tanpa kehilangan akun dan riwayat simpanan Anda.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>Ajukan Perubahan Domisili</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* KARTU FITUR 3: PENGAJUAN HAPUS AKUN (FR-04) */}
          <div 
            onClick={() => setActiveTab('kendali_akun')}
            className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-rose-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 group-hover:bg-rose-600 group-hover:text-white text-rose-700 flex items-center justify-center transition-colors mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-700 transition-colors">
                  Pengajuan Hapus Akun
                </h3>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded-full">
                  FR-04
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kendali transparan penutupan akun dengan penjelasan konsekuensi hak suara dan aturan retensi kearsipan desa.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-700">
              <span>Pengaturan Hak Akun</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ringkasan Simpanan & Identitas Anggota */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Ringkasan Simpanan (2 Kolom) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>Ringkasan Simpanan Anggota</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simpanan Pokok, Wajib, dan Sukarela yang tercatat di pembukuan koperasi.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('simpanan')}
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Riwayat Transaksi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Total Saldo:</span>
              <span className="text-lg font-bold text-slate-900">
                Rp {totalSimpanan.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Simpanan Wajib:</span>
              <span className="text-base font-bold text-slate-800">
                Rp {userSavings.filter(s => s.jenis === 'wajib').reduce((a, c) => a + c.nominal, 0).toLocaleString('id-ID')}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">Simpanan Pokok:</span>
              <span className="text-base font-bold text-slate-800">
                Rp {userSavings.filter(s => s.jenis === 'pokok').reduce((a, c) => a + c.nominal, 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Profil & Domisili Singkat (1 Kolom) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Data Domisili Terdaftar</span>
          </h3>

          <div className="text-xs space-y-2 text-slate-600">
            <div>
              <span className="text-slate-400 block text-[11px]">Nama Lengkap:</span>
              <span className="font-semibold text-slate-800">{currentUser?.nama}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">NIK Kependudukan:</span>
              <span className="font-mono text-slate-700">{currentUser?.nik}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Alamat Saat Ini:</span>
              <span className="text-slate-800 font-medium leading-relaxed">{currentUser?.alamat}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('kendali_akun')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors"
            >
              Ubah Domisili / Pengaturan Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
