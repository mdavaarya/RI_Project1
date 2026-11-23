import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { 
  UserCheck, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Building,
  User,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Lock
} from 'lucide-react'

/**
 * Fulfills FR-03 / UXR-03 (Priority: Low - Pertahankan Kemudahan, Jangan Dibuat Rumit):
 * - Form pendaftaran minimal: Nama, NIK (16 digit), Alamat, No. HP, Email, Password (AC-5)
 * - Validasi ringan inline tanpa step membingungkan
 * - Konfirmasi pendaftaran & status jelas
 */
export const RegisterForm = () => {
  const { registerMember, setAuthView, openHelp, officialHelpContact } = useApp()

  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    no_hp: '',
    alamat: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registeredSuccess, setRegisteredSuccess] = useState(null)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Inline lightweight validation (AC-5)
    const newErrors = { ...errors }
    if (field === 'nik') {
      if (value && (!/^\d*$/.test(value) || value.length > 16)) {
        newErrors.nik = 'NIK harus berupa 16 angka sesuai KTP.'
      } else if (value.length === 16) {
        delete newErrors.nik
      }
    }
    if (field === 'no_hp') {
      if (value && !/^[0-9+\s-]*$/.test(value)) {
        newErrors.no_hp = 'Nomor handphone hanya boleh memuat angka.'
      } else {
        delete newErrors.no_hp
      }
    }
    if (field === 'confirmPassword' || field === 'password') {
      if (field === 'confirmPassword' && value !== formData.password) {
        newErrors.confirmPassword = 'Konfirmasi kata sandi tidak sama.'
      } else {
        delete newErrors.confirmPassword
      }
    }
    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    const currentErrors = {}
    if (!formData.nama.trim()) currentErrors.nama = 'Nama lengkap wajib diisi sesuai KTP.'
    if (!formData.nik.trim()) {
      currentErrors.nik = 'NIK 16 digit wajib diisi.'
    } else if (formData.nik.trim().length !== 16) {
      currentErrors.nik = 'NIK harus tepat 16 angka.'
    }
    if (!formData.no_hp.trim()) currentErrors.no_hp = 'Nomor HP aktif wajib diisi untuk koordinasi koperasi.'
    if (!formData.alamat.trim()) currentErrors.alamat = 'Alamat domisili RT/RW di desa wajib diisi.'
    if (!formData.email.trim()) {
      currentErrors.email = 'Email wajib diisi untuk akses login.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      currentErrors.email = 'Format email belum valid.'
    }
    if (!formData.password) {
      currentErrors.password = 'Kata sandi minimal 6 karakter.'
    } else if (formData.password.length < 6) {
      currentErrors.password = 'Kata sandi minimal 6 karakter.'
    }
    if (formData.password !== formData.confirmPassword) {
      currentErrors.confirmPassword = 'Kata sandi dan konfirmasi belum cocok.'
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const result = registerMember(formData)
      setIsSubmitting(false)

      if (result.success) {
        setRegisteredSuccess(result.data)
      } else {
        setErrors({ general: result.message })
      }
    }, 500)
  }

  // Success Confirmation Screen
  if (registeredSuccess) {
    return (
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 text-center animate-fadeIn">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Pendaftaran Berhasil Dikirim!
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Terima kasih telah mendaftar sebagai anggota KUD Sukamaju Makmur Mandiri.
        </p>

        {/* Member Preview Card */}
        <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 text-xs space-y-2 mb-6">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Nomor Anggota Sementara:</span>
            <span className="font-bold font-mono text-emerald-700">{registeredSuccess.nomor_anggota}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Lengkap:</span>
            <span className="font-semibold text-slate-800">{registeredSuccess.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status Keanggotaan:</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold text-[10px]">
              Menunggu Verifikasi Pengurus
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Alamat Domisili:</span>
            <span className="text-slate-700 text-right max-w-[200px] truncate">{registeredSuccess.alamat}</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 text-left border border-emerald-200 mb-6 space-y-1">
          <p className="font-semibold">Langkah Selanjutnya:</p>
          <p>
            Pengurus koperasi akan memverifikasi NIK Anda dalam 1x24 jam kerja. Anda dapat langsung mencoba masuk atau menghubungi pengurus bila memerlukan verifikasi langsung di kantor balai desa.
          </p>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setAuthView('login')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm text-sm transition-all"
          >
            Menuju Halaman Masuk / Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        {/* Back Link */}
        <button
          onClick={() => setAuthView('login')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke halaman masuk</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Pendaftaran Anggota Koperasi
            </h2>
            <button
              onClick={() => openHelp('pendaftaran')}
              className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Syarat Pendaftaran</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Isi formulir sederhana di bawah ini untuk menjadi anggota resmi KUD Sukamaju.
          </p>
        </div>

        {errors.general && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errors.general}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Nama Lengkap */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nama Lengkap (Sesuai KTP) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                placeholder="Contoh: Siti Rahmawati"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.nama ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-600'
                }`}
              />
            </div>
            {errors.nama && <p className="text-[11px] text-rose-600 mt-1">{errors.nama}</p>}
          </div>

          {/* 2. NIK (16 Digit) */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nomor Induk Kependudukan (NIK 16 Digit) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                maxLength={16}
                required
                value={formData.nik}
                onChange={(e) => handleChange('nik', e.target.value)}
                placeholder="3201xxxxxxxxxxxx"
                className={`w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-white border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.nik ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-600'
                }`}
              />
            </div>
            {errors.nik ? (
              <p className="text-[11px] text-rose-600 mt-1">{errors.nik}</p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">NIK digunakan untuk verifikasi kependudukan desa.</p>
            )}
          </div>

          {/* 3. Kontak (No HP & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nomor WhatsApp / HP <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={formData.no_hp}
                  onChange={(e) => handleChange('no_hp', e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
              </div>
              {errors.no_hp && <p className="text-[11px] text-rose-600 mt-1">{errors.no_hp}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Alamat Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* 4. Alamat Domisili */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Alamat Domisili di Desa <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={formData.alamat}
                onChange={(e) => handleChange('alamat', e.target.value)}
                placeholder="Contoh: Dusun Sukatani RT 02 / RW 01, Desa Sukamaju"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
              />
            </div>
            {errors.alamat && <p className="text-[11px] text-rose-600 mt-1">{errors.alamat}</p>}
          </div>

          {/* 5. Kata Sandi & Konfirmasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Buat Kata Sandi <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Ulangi Kata Sandi <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Ketik ulang sandi"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Data pribadi Anda dilindungi dengan standar keamanan koperasi desa dan hanya digunakan untuk keperluan pelayanan keanggotaan resmi KUD Sukamaju.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-emerald-200 text-sm mt-3"
          >
            {isSubmitting ? 'Mengirim Formulir...' : 'Kirim Pendaftaran Anggota'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-600">
          Sudah punya akun anggota?{' '}
          <button
            onClick={() => setAuthView('login')}
            className="font-semibold text-emerald-700 hover:underline"
          >
            Masuk di sini
          </button>
        </div>
      </div>
    </div>
  )
}
