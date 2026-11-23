import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  User, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Save, 
  HelpCircle,
  Building 
} from 'lucide-react'

export const MemberProfile = () => {
  const { currentUser, updateProfile, openHelp } = useApp()

  const [formData, setFormData] = useState({
    no_hp: currentUser?.no_hp || '',
    alamat: currentUser?.alamat || ''
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      updateProfile(formData)
      setIsSaving(false)
    }, 400)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Profil Anggota Koperasi
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola data kontak dan informasi keanggotaan Anda di KUD Sukamaju.
            </p>
          </div>
          <button
            onClick={() => openHelp('umum')}
            className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Bantuan Profil</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Read-Only Identity Fields (Preserving Integrity) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Nomor Anggota (Permanen):</span>
              <span className="font-bold font-mono text-emerald-800 text-sm">
                {currentUser?.nomor_anggota}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Status Keanggotaan:</span>
              <span className="font-semibold text-emerald-700 capitalize">
                ● {currentUser?.status}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Nama Lengkap (Sesuai KTP):</span>
              <span className="font-semibold text-slate-800">
                {currentUser?.nama}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">NIK (Kependudukan):</span>
              <span className="font-mono text-slate-700">
                {currentUser?.nik}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 px-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Perubahan NIK atau Nama Resmi harus melalui verifikasi langsung di kantor koperasi.</span>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nomor WhatsApp / Handphone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.no_hp}
                  onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Digunakan untuk pemberitahuan SHU tahunan atau informasi penting koperasi.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Alamat Domisili Tempat Tinggal
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows={3}
                  required
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Alamat Email Login
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm text-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
