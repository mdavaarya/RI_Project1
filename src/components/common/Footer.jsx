import React from 'react'
import { useApp } from '../../context/AppContext'
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react'

export const Footer = () => {
  const { officialHelpContact, openHelp } = useApp()

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1: Profil Koperasi */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
              <HeartHandshake className="w-5 h-5 text-emerald-400" />
              <span>{officialHelpContact.namaKoperasi}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Mewujudkan kemandirian ekonomi masyarakat desa melalui layanan simpan pinjam yang transparan, amanah, dan mudah diakses oleh seluruh warga.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-md border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Badan Hukum: {officialHelpContact.nomorBadanHukum}</span>
            </div>
          </div>

          {/* Kolom 2: Kontak Resmi Bantuan (FR-01 / AC-1) */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <span>Kanal Bantuan Resmi</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{officialHelpContact.alamat}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{officialHelpContact.jamOperasional}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={officialHelpContact.adminWaLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors underline underline-offset-2"
                >
                  WhatsApp: {officialHelpContact.whatsapp} (Respon Cepat)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${officialHelpContact.email}`} className="hover:text-emerald-400 transition-colors">
                  {officialHelpContact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan & Informasi Panduan */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Panduan & Navigasi</h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => openHelp('login')}
                className="block text-slate-400 hover:text-white transition-colors text-left"
              >
                • Bantuan Masuk Akun / Lupa Password
              </button>
              <button
                onClick={() => openHelp('pendaftaran')}
                className="block text-slate-400 hover:text-white transition-colors text-left"
              >
                • Syarat & Cara Mendaftar Anggota
              </button>
              <button
                onClick={() => openHelp('simpanan')}
                className="block text-slate-400 hover:text-white transition-colors text-left"
              >
                • Ketentuan Simpanan Pokok & Wajib
              </button>
              <button
                onClick={() => openHelp('pengurus')}
                className="block text-slate-400 hover:text-white transition-colors text-left"
              >
                • Panduan Operasional Pengurus Desa
              </button>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Sesuai standar PRD SIMKOPDES v1.1 — Ramah pengguna desa, aman, dan mudah dipelajari.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 SIMKOPDES — Koperasi Unit Desa Sukamaju. Hak cipta dilindungi.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Dikembangkan dengan prinsip Aksesibilitas & Ramah Pengguna Baru
          </p>
        </div>
      </div>
    </footer>
  )
}
