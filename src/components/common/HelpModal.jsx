import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  X, 
  HelpCircle, 
  BookOpen, 
  Search, 
  PhoneCall, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  CreditCard,
  Lock,
  Layers
} from 'lucide-react'

/**
 * Fulfills FR-05 / UXR-05:
 * - Panduan kontekstual dan FAQ yang dapat diakses sewaktu-waktu
 * - Label sederhana tanpa istilah teknis rumit
 * - Bantuan login, pendaftaran, simpanan, dan pengurus
 */
export const HelpModal = () => {
  const { 
    isHelpModalOpen, 
    closeHelp, 
    activeHelpTopic, 
    helpContent, 
    officialHelpContact 
  } = useApp()

  const [activeCategory, setActiveCategory] = useState(activeHelpTopic || 'semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  if (!isHelpModalOpen) return null

  const categories = [
    { id: 'semua', label: 'Semua Topik', icon: Layers },
    { id: 'login', label: 'Masuk / Login', icon: Lock },
    { id: 'pendaftaran', label: 'Pendaftaran Anggota', icon: UserCheck },
    { id: 'simpanan', label: 'Simpanan', icon: CreditCard },
    { id: 'pengurus', label: 'Panduan Pengurus', icon: BookOpen },
  ]

  const filteredItems = helpContent.filter((item) => {
    const matchesCategory = activeCategory === 'semua' || item.kategori === activeCategory
    const matchesSearch = 
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.konten.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-100 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-700 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <HelpCircle className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Pusat Bantuan & Petunjuk</h3>
              <p className="text-xs text-emerald-100">
                Panduan praktis penggunaan SIMKOPDES KUD Sukamaju
              </p>
            </div>
          </div>
          <button
            onClick={closeHelp}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Tutup Bantuan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari pertanyaan, misal: lupa sandi, simpanan pokok, setujui anggota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isSelected = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">Tidak ditemukan jawaban untuk pencarian Anda.</p>
              <p className="text-xs mt-1 text-slate-400">
                Silakan hubungi pengurus koperasi melalui kontak di bawah.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedId === item.id
              return (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-colors bg-white shadow-xs"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3"
                  >
                    <span className="font-semibold text-sm text-slate-900">
                      {item.judul}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed whitespace-pre-line">
                      {item.konten}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer Contact */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-600">
            Masih memerlukan bantuan langsung dari petugas?
          </span>
          <div className="flex items-center gap-2">
            <a
              href={officialHelpContact.adminWaLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Koperasi</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
