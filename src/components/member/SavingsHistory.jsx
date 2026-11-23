import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  CreditCard, 
  Filter, 
  Calendar, 
  HelpCircle, 
  Download, 
  FileText,
  Search,
  ArrowUpRight
} from 'lucide-react'

export const SavingsHistory = () => {
  const { currentUser, savings, openHelp, setActiveTab } = useApp()
  const [filterType, setFilterType] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')

  const userSavings = savings.filter((s) => s.anggota_id === currentUser?.id)

  const filtered = userSavings.filter((item) => {
    const matchesType = filterType === 'semua' || item.jenis === filterType
    const matchesSearch = item.keterangan?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const totalFiltered = filtered.reduce((acc, curr) => acc + curr.nominal, 0)

  return (
    <div className="space-y-6">
      {/* Back to Dashboard Breadcrumb */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
      >
        <span>← Kembali ke Beranda / Dashboard</span>
      </button>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Riwayat Transaksi Simpanan
            </h1>
            <button
              onClick={() => openHelp('simpanan')}
              className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ketentuan Simpanan</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Daftar lengkap seluruh setoran Simpanan Pokok, Wajib, dan Sukarela Anda.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block">Total Ditampilkan:</span>
          <span className="text-lg font-bold text-emerald-700">
            Rp {totalFiltered.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Type Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'semua', label: 'Semua Simpanan' },
            { id: 'wajib', label: 'Simpanan Wajib' },
            { id: 'sukarela', label: 'Simpanan Sukarela' },
            { id: 'pokok', label: 'Simpanan Pokok' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari keterangan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-slate-700">Tidak ada transaksi yang cocok</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Tidak ditemukan catatan transaksi untuk filter atau pencarian saat ini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">No</th>
                  <th className="py-3.5 px-4">Tanggal Transaksi</th>
                  <th className="py-3.5 px-4">Jenis Simpanan</th>
                  <th className="py-3.5 px-4">Keterangan Setoran</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{index + 1}</td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-medium">
                      {new Date(item.tanggal_transaksi).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-semibold capitalize text-[11px] ${
                        item.jenis === 'pokok' ? 'bg-purple-100 text-purple-700' :
                        item.jenis === 'wajib' ? 'bg-teal-100 text-teal-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.jenis}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">
                      {item.keterangan || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-medium rounded-full text-[10px]">
                        Tercatat
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm whitespace-nowrap">
                      Rp {item.nominal.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
