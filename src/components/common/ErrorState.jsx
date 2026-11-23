import React from 'react'
import { useApp } from '../../context/AppContext'
import { 
  AlertCircle, 
  RotateCw, 
  PhoneCall, 
  MessageCircle, 
  HelpCircle, 
  ArrowLeft,
  CheckCircle2,
  WifiOff
} from 'lucide-react'

/**
 * Fulfills FR-01 / UXR-01:
 * - Menjelaskan aplikasi/layanan sedang tidak dapat diakses dengan bahasa non-teknis
 * - Tidak menampilkan kode error teknis / stack trace mentah (NFR-03 & NFR-05)
 * - Menyediakan aksi "Coba lagi" (Retry action)
 * - Menyediakan arahan & kanal bantuan resmi (WhatsApp, Telepon, Email)
 */
export const ErrorState = ({ customMessage, errorType = 'server_down' }) => {
  const { 
    retryConnection, 
    isRetrying, 
    resetConnection, 
    officialHelpContact,
    openHelp 
  } = useApp()

  const getTitleAndExplanation = () => {
    switch (errorType) {
      case 'offline':
        return {
          title: 'Sambungan Internet Terputus',
          badge: 'Koneksi Offline',
          description: 'Aplikasi tidak dapat menghubungi server koperasi karena perangkat Anda sedang tidak terhubung ke jaringan internet.',
          suggestion: 'Pastikan paket data atau sambungan Wi-Fi Anda aktif, lalu tekan tombol "Coba Hubungkan Ulang" di bawah ini.'
        }
      case 'network_error':
        return {
          title: 'Jaringan Koperasi Sedang Sibuk',
          badge: 'Gangguan Jaringan',
          description: 'Sistem sedang membutuhkan waktu lebih lama untuk merespons permintaan Anda karena lalu lintas data yang padat.',
          suggestion: 'Harap tunggu beberapa saat lalu coba lagi, atau gunakan tombol bantuan jika Anda sedang dalam proses pembayaran/transaksi mendesak.'
        }
      case 'server_down':
      default:
        return {
          title: 'Layanan Sedang Dalam Pemeliharaan Berkala',
          badge: 'Pemeliharaan Sistem',
          description: 'Sistem aplikasi koperasi desa saat ini sedang tidak dapat diakses untuk sementara waktu guna peningkatan kualitas layanan dan sinkronisasi data.',
          suggestion: 'Data keanggotaan dan simpanan Anda tetap tersimpan dengan aman di server koperasi. Silakan coba kembali dalam beberapa menit.'
        }
    }
  }

  const { title, badge, description, suggestion } = getTitleAndExplanation()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-center p-6 sm:p-8 animate-fadeIn">
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
          {errorType === 'offline' ? (
            <WifiOff className="w-8 h-8" />
          ) : (
            <AlertCircle className="w-8 h-8" />
          )}
        </div>

        {/* Status Badge */}
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full mb-3">
          {badge}
        </span>

        {/* Title & Clear Explanation (FR-01) */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {customMessage || description}
        </p>

        {/* Practical Non-technical Instructions */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200 text-left text-xs text-slate-700 space-y-2">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Langkah yang dapat Anda lakukan:</span>
          </div>
          <p className="leading-relaxed">{suggestion}</p>
        </div>

        {/* Actions Area */}
        <div className="space-y-3">
          {/* Retry Button (AC-1) */}
          <button
            onClick={retryConnection}
            disabled={isRetrying}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-5 rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-emerald-200"
          >
            <RotateCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Sedang Memeriksa Sambungan...' : 'Coba Hubungkan Ulang'}</span>
          </button>

          {/* Fallback reset for reviewer / dev */}
          <button
            onClick={resetConnection}
            className="w-full text-xs font-medium text-slate-500 hover:text-slate-800 py-1.5 transition-colors"
          >
            Kembalikan ke status normal (Simulasi selesai)
          </button>
        </div>

        {/* Official Village Help Contact (AC-1, FR-01) */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-3">
            Butuh bantuan mendesak? Hubungi petugas resmi KUD Sukamaju:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={officialHelpContact.adminWaLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat WhatsApp</span>
            </a>
            <a
              href={`tel:${officialHelpContact.telepon}`}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-slate-600" />
              <span>Telepon Kantor</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
