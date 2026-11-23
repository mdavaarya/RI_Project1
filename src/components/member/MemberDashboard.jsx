import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Wallet, 
  PiggyBank, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownLeft, 
  UserCheck, 
  Clock, 
  HelpCircle,
  PlusCircle,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react'

/**
 * Fulfills FR-04 / UXR-04:
 * - Mempertahankan kemudahan fitur utama yang dinilai positif (AC-6)
 * - Dashboard ringkasan simpanan, status keanggotaan
 * - Empty state informatif (FR-05)
 */
export const MemberDashboard = () => {
  const { 
    currentUser, 
    savings, 
    loans, 
    setActiveTab, 
    openHelp, 
    addSavingsRecord 
  } = useApp()

  const [showDepositModal, setShowDepositModal] = useState(false)
  const [depositData, setDepositData] = useState({
    jenis: 'wajib',
    nominal: 50000,
    keterangan: 'Setoran simpanan mandiri'
  })

  // Filter savings for current user
  const userSavings = savings.filter((s) => s.anggota_id === currentUser?.id)
  
  // Calculate totals
  const totalPokok = userSavings
    .filter((s) => s.jenis === 'pokok')
    .reduce((acc, curr) => acc + curr.nominal, 0)

  const totalWajib = userSavings
    .filter((s) => s.jenis === 'wajib')
    .reduce((acc, curr) => acc + curr.nominal, 0)

  const totalSukarela = userSavings
    .filter((s) => s.jenis === 'sukarela')
    .reduce((acc, curr) => acc + curr.nominal, 0)

  const totalSemuaSimpanan = totalPokok + totalWajib + totalSukarela

  // Loans for current user
  const userLoans = loans.filter((l) => l.anggota_id === currentUser?.id)

  const handleDepositSubmit = (e) => {
    e.preventDefault()
    addSavingsRecord({
      anggota_id: currentUser.id,
      jenis: depositData.jenis,
      nominal: Number(depositData.nominal),
      keterangan: depositData.keterangan
    })
    setShowDepositModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner & Membership Status */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-950/40 backdrop-blur-sm border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-medium text-emerald-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Nomor Anggota: {currentUser?.nomor_anggota || 'Belum Terbit'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Selamat Datang, {currentUser?.nama}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              Pantau tabungan simpanan dan layanan koperasi desa Anda secara transparan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openHelp('dashboard')}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-white/20 transition-all backdrop-blur-sm"
            >
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span>Petunjuk Dashboard</span>
            </button>
            <button
              onClick={() => setShowDepositModal(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Setor Simpanan</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Simpanan */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Total Simpanan Saya</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            Rp {totalSemuaSimpanan.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            <span>Gabungan pokok, wajib, dan sukarela</span>
          </p>
        </div>

        {/* Simpanan Wajib */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Simpanan Wajib</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            Rp {totalWajib.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Iuran bulanan: Rp 50.000 / bulan
          </p>
        </div>

        {/* Simpanan Sukarela */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Simpanan Sukarela</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            Rp {totalSukarela.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Tabungan bebas dapat ditarik sewaktu-waktu
          </p>
        </div>

        {/* Simpanan Pokok */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500">Simpanan Pokok</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            Rp {totalPokok.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Setoran awal saat resmi menjadi anggota
          </p>
        </div>
      </div>

      {/* Recent Activity & Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Transaksi Terbaru (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-slate-900">
                Riwayat Transaksi Simpanan Terakhir
              </h2>
              <p className="text-xs text-slate-400">
                Pencatatan setoran tabungan anggota
              </p>
            </div>
            <button
              onClick={() => setActiveTab('simpanan')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {userSavings.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium">Belum ada catatan transaksi simpanan</p>
              <p className="text-xs text-slate-400 mt-1">
                Lakukan setoran pertama Anda atau hubungi pengurus koperasi di kantor desa.
              </p>
              <button
                onClick={() => setShowDepositModal(true)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
              >
                Setor Sekarang
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Jenis</th>
                    <th className="py-3 px-4">Keterangan</th>
                    <th className="py-3 px-4 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userSavings.slice(0, 5).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {new Date(item.tanggal_transaksi).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-semibold capitalize text-[10px] ${
                          item.jenis === 'pokok' ? 'bg-purple-100 text-purple-700' :
                          item.jenis === 'wajib' ? 'bg-teal-100 text-teal-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          Simpanan {item.jenis}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium max-w-[200px] truncate">
                        {item.keterangan}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                        +Rp {item.nominal.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Member Info Card & Loan Status (1 column) */}
        <div className="space-y-4">
          {/* Card Info Keanggotaan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Status Keanggotaan</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Status Akun:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Aktif Resmi</span>
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">NIK KTP:</span>
                <span className="font-mono text-slate-700 font-medium">{currentUser?.nik}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Nomor HP / WA:</span>
                <span className="text-slate-700">{currentUser?.no_hp || '-'}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-0.5">Alamat Domisili:</span>
                <span className="text-slate-700 leading-relaxed text-[11px]">{currentUser?.alamat}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('profil')}
              className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Ubah Data Kontak
            </button>
          </div>

          {/* Placeholder / Riwayat Pinjaman (FR-04 Scope) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900">Pinjaman Usaha Desa</h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                Fitur Tambahan
              </span>
            </div>

            {userLoans.length === 0 ? (
              <div className="text-xs text-slate-500 space-y-2">
                <p>Saat ini Anda tidak memiliki tanggungan pinjaman aktif di koperasi.</p>
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[11px] text-emerald-900">
                  Koperasi menyediakan fasilitas pinjaman modal produktif pertanian & UMKM bagi anggota aktif.
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                {userLoans.map((l) => (
                  <div key={l.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between font-semibold">
                      <span>Rp {l.jumlah_pengajuan.toLocaleString('id-ID')}</span>
                      <span className="text-emerald-700 capitalize">{l.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{l.keperluan}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Setor Simpanan Mandiri */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-100 animate-fadeIn">
            <h3 className="font-bold text-lg text-slate-900 mb-1">
              Setor Simpanan Anggota
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Pilih jenis simpanan dan jumlah nominal rupiah yang ingin disetorkan.
            </p>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Jenis Simpanan
                </label>
                <select
                  value={depositData.jenis}
                  onChange={(e) => {
                    const j = e.target.value
                    setDepositData({
                      ...depositData,
                      jenis: j,
                      nominal: j === 'wajib' ? 50000 : j === 'pokok' ? 100000 : 50000
                    })
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="wajib">Simpanan Wajib (Rp 50.000 / bln)</option>
                  <option value="sukarela">Simpanan Sukarela (Tabungan Bebas)</option>
                  <option value="pokok">Simpanan Pokok (Setoran Awal)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nominal Setoran (Rupiah)
                </label>
                <input
                  type="number"
                  min={10000}
                  step={5000}
                  required
                  value={depositData.nominal}
                  onChange={(e) => setDepositData({ ...depositData, nominal: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Keterangan (Opsional)
                </label>
                <input
                  type="text"
                  value={depositData.keterangan}
                  onChange={(e) => setDepositData({ ...depositData, keterangan: e.target.value })}
                  placeholder="Misal: Iuran bulan ini / Tabungan panen"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 border border-emerald-200">
                Penyetoran dapat dilakukan via transfer rekening bank desa atau diserahkan tunai kepada kasir pengurus koperasi.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  Catat Setoran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
