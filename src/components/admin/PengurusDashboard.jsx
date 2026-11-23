import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  CreditCard, 
  BookOpen, 
  HelpCircle, 
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Phone,
  MapPin
} from 'lucide-react'

/**
 * Fulfills US-05 & PRD Section 2.6:
 * - Didesain khusus ramah bagi pengurus koperasi yang masih belajar teknologi
 * - Tampilan visual dengan tombol jelas, istilah bahasa Indonesia sederhana
 * - Persetujuan pendaftaran anggota (Approve Pending Member)
 * - Pencatatan simpanan warga
 * - Panduan langkah-demi-langkah bagi pengurus
 */
export const PengurusDashboard = () => {
  const { 
    profiles, 
    savings, 
    approveMember, 
    toggleMemberStatus, 
    addSavingsRecord,
    activeTab, 
    setActiveTab,
    openHelp 
  } = useApp()

  const [memberFilter, setMemberFilter] = useState('pending') // 'semua' | 'pending' | 'aktif'
  const [searchMember, setSearchMember] = useState('')

  // Form Catat Simpanan Warga
  const [selectedMemberId, setSelectedMemberId] = useState(profiles.find(p => p.status === 'aktif')?.id || '')
  const [savingsType, setSavingsType] = useState('wajib')
  const [nominal, setNominal] = useState(50000)
  const [notes, setNotes] = useState('')

  // Calculate statistics
  const totalMembers = profiles.filter((p) => p.role !== 'pengurus').length
  const pendingMembers = profiles.filter((p) => p.status === 'pending').length
  const activeMembers = profiles.filter((p) => p.status === 'aktif' && p.role !== 'pengurus').length
  const totalKasSimpanan = savings.reduce((acc, curr) => acc + curr.nominal, 0)

  // Filtered members list
  const filteredMembers = profiles
    .filter((p) => p.role !== 'pengurus')
    .filter((p) => {
      if (memberFilter === 'pending') return p.status === 'pending'
      if (memberFilter === 'aktif') return p.status === 'aktif'
      return true
    })
    .filter((p) => 
      p.nama.toLowerCase().includes(searchMember.toLowerCase()) ||
      p.nik.includes(searchMember) ||
      (p.nomor_anggota && p.nomor_anggota.toLowerCase().includes(searchMember.toLowerCase()))
    )

  const handleRecordSavings = (e) => {
    e.preventDefault()
    if (!selectedMemberId) return

    addSavingsRecord({
      anggota_id: selectedMemberId,
      jenis: savingsType,
      nominal: Number(nominal),
      keterangan: notes || `Setoran ${savingsType} dicatat oleh pengurus`
    })

    setNotes('')
    setActiveTab('kelola_anggota')
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Summary Cards */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-950/60 border border-purple-500/40 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
              <span>Ruang Pengurus Koperasi Desa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Sistem Operasional Pengurus
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
              Kelola data pendaftaran anggota warga desa dan pencatatan kas simpanan secara mudah dan rapi.
            </p>
          </div>

          <button
            onClick={() => openHelp('pengurus')}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all backdrop-blur-sm"
          >
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span>Buka Panduan Pengurus</span>
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-purple-800/60">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Menunggu Persetujuan</span>
            <div className="text-2xl font-bold text-amber-300 mt-1">
              {pendingMembers} <span className="text-xs font-normal text-purple-200">Warga</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Anggota Aktif Resmi</span>
            <div className="text-2xl font-bold text-emerald-300 mt-1">
              {activeMembers} <span className="text-xs font-normal text-purple-200">Orang</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Total Pendaftar</span>
            <div className="text-2xl font-bold text-white mt-1">
              {totalMembers} <span className="text-xs font-normal text-purple-200">Data</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <span className="text-[11px] text-purple-200 block">Total Kas Simpanan</span>
            <div className="text-xl font-bold text-emerald-400 mt-1 truncate">
              Rp {totalKasSimpanan.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Views for Pengurus */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('kelola_anggota')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            activeTab === 'kelola_anggota'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Kelola & Setujui Anggota ({pendingMembers > 0 ? `${pendingMembers} Menunggu` : 'Semua'})
        </button>
        <button
          onClick={() => setActiveTab('catat_simpanan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            activeTab === 'catat_simpanan'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Catat Setoran Simpanan
        </button>
        <button
          onClick={() => setActiveTab('panduan_pengurus')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            activeTab === 'panduan_pengurus'
              ? 'bg-purple-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Panduan Pengurus Baru
        </button>
      </div>

      {/* VIEW 1: KELOLA ANGGOTA */}
      {activeTab === 'kelola_anggota' && (
        <div className="space-y-4">
          {/* Filter & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setMemberFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  memberFilter === 'pending'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Menunggu Verifikasi ({pendingMembers})
              </button>
              <button
                onClick={() => setMemberFilter('aktif')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  memberFilter === 'aktif'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Anggota Aktif ({activeMembers})
              </button>
              <button
                onClick={() => setMemberFilter('semua')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  memberFilter === 'semua'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Data ({totalMembers})
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari nama, NIK, atau nomor anggota..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Members List Cards / Table */}
          <div className="space-y-3">
            {filteredMembers.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-sm text-slate-700">Tidak ada data anggota</p>
                <p className="text-xs text-slate-400 mt-1">
                  {memberFilter === 'pending'
                    ? 'Semua calon anggota telah diverifikasi dan disetujui!'
                    : 'Tidak ada data yang sesuai dengan pencarian Anda.'}
                </p>
              </div>
            ) : (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                    member.status === 'pending'
                      ? 'border-amber-300 bg-amber-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900">{member.nama}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                          member.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          member.status === 'aktif' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          ● {member.status === 'pending' ? 'Menunggu Persetujuan' : member.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span>No. Anggota: <strong className="text-slate-700 font-mono">{member.nomor_anggota}</strong></span>
                        <span>NIK: <strong className="text-slate-700 font-mono">{member.nik}</strong></span>
                        <span>HP/WA: <strong className="text-slate-700">{member.no_hp || '-'}</strong></span>
                      </div>

                      <div className="text-xs text-slate-600 flex items-start gap-1 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{member.alamat}</span>
                      </div>
                    </div>

                    {/* Actions for Pengurus */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {member.status === 'pending' ? (
                        <button
                          onClick={() => approveMember(member.id)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Setujui Menjadi Anggota</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleMemberStatus(member.id)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                            member.status === 'aktif'
                              ? 'border-slate-300 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
                              : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {member.status === 'aktif' ? 'Nonaktifkan' : 'Aktifkan Kembali'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CATAT SIMPANAN */}
      {activeTab === 'catat_simpanan' && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="mb-5 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              Formulir Pencatatan Simpanan Warga
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Digunakan oleh pengurus saat menerima setoran uang tunai atau bukti transfer dari anggota.
            </p>
          </div>

          <form onSubmit={handleRecordSavings} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Pilih Anggota Penyetor <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {profiles
                  .filter((p) => p.role !== 'pengurus' && p.status === 'aktif')
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama} ({p.nomor_anggota}) - RT/RW {p.alamat.slice(0, 20)}...
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Jenis Simpanan
                </label>
                <select
                  value={savingsType}
                  onChange={(e) => {
                    const st = e.target.value
                    setSavingsType(st)
                    if (st === 'wajib') setNominal(50000)
                    if (st === 'pokok') setNominal(100000)
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="wajib">Simpanan Wajib (Bulanan)</option>
                  <option value="sukarela">Simpanan Sukarela (Tabungan)</option>
                  <option value="pokok">Simpanan Pokok (Awal)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nominal (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={10000}
                  step={5000}
                  required
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Catatan / Keterangan Kwitansi
              </label>
              <input
                type="text"
                placeholder="Contoh: Setoran tunai di balai desa / Iuran November"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all"
            >
              Simpan & Terbitkan Kwitansi Setoran
            </button>
          </form>
        </div>
      )}

      {/* VIEW 3: PANDUAN PENGURUS BARU (US-05) */}
      {activeTab === 'panduan_pengurus' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Panduan Praktis Pengurus Koperasi Desa
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Petunjuk sederhana bagi pengurus yang baru pertama kali menggunakan sistem komputer/aplikasi (US-05).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">Cara Menyetujui Anggota Baru</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ketika ada warga desa mendaftar lewat ponselnya, namanya akan muncul di tab <strong>"Menunggu Verifikasi"</strong>. Periksa NIK dan alamatnya, lalu cukup klik tombol hijau <strong>"Setujui Menjadi Anggota"</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">Cara Mencatat Setoran Simpanan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka tab <strong>"Catat Setoran Simpanan"</strong>, pilih nama warga yang menyetor uang, masukkan nominal rupiah yang diterima, lalu klik tombol simpan. Saldo tabungan warga akan bertambah otomatis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">Keamanan & Kerahasiaan Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sistem tidak pernah memperlihatkan kata sandi anggota. Bila warga lupa sandi, minta mereka menekan "Lupa Kata Sandi" di halaman awal atau laporkan ke admin desa.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900">Bila Ada Kendala Jaringan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bila muncul pesan "Layanan Sedang Mengalami Kendala Akses", jangan panik. Data tetap aman di server. Cukup tekan tombol <strong>"Coba Hubungkan Ulang"</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
