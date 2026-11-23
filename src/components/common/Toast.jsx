import React from 'react'
import { useApp } from '../../context/AppContext'
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'

export const Toast = () => {
  const { toast } = useApp()

  if (!toast) return null

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: CheckCircle,
          bg: 'bg-emerald-800 text-white border-emerald-700',
          iconColor: 'text-emerald-300'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-800 text-white border-amber-700',
          iconColor: 'text-amber-300'
        }
      case 'error':
        return {
          icon: AlertTriangle,
          bg: 'bg-rose-800 text-white border-rose-700',
          iconColor: 'text-rose-300'
        }
      case 'info':
      default:
        return {
          icon: Info,
          bg: 'bg-slate-800 text-white border-slate-700',
          iconColor: 'text-cyan-300'
        }
    }
  }

  const { icon: Icon, bg, iconColor } = getStyle()

  return (
    <div className="fixed bottom-20 right-4 z-50 max-w-sm w-full animate-bounce-short">
      <div className={`p-4 rounded-xl shadow-xl border flex items-start gap-3 ${bg}`}>
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
        <div className="text-xs sm:text-sm font-medium leading-snug flex-1">
          {toast.message}
        </div>
      </div>
    </div>
  )
}
