import React from 'react'
import { Building2, Loader2 } from 'lucide-react'

export const LoadingSpinner = ({ message = 'Memuat layanan SIMKOPDES...' }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Building2 className="w-7 h-7" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow">
          <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
        </div>
      </div>
      <h3 className="font-semibold text-slate-800 text-base mb-1">
        {message}
      </h3>
      <p className="text-xs text-slate-500 max-w-xs">
        Mohon tunggu sebentar, sistem sedang mempersiapkan data koperasi Anda secara aman.
      </p>
    </div>
  )
}
