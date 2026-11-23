import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  initialProfiles,
  initialSavings,
  initialLoans,
  initialHelpContent,
  officialHelpContact
} from '../data/initialData'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  // 1. Storage Initializers
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('simkopdes_profiles')
    return saved ? JSON.parse(saved) : initialProfiles
  })

  const [savings, setSavings] = useState(() => {
    const saved = localStorage.getItem('simkopdes_savings')
    return saved ? JSON.parse(saved) : initialSavings
  })

  const [loans, setLoans] = useState(() => {
    const saved = localStorage.getItem('simkopdes_loans')
    return saved ? JSON.parse(saved) : initialLoans
  })

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('simkopdes_audit_logs')
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        aksi: 'System Initialization',
        user: 'Sistem SIMKOPDES',
        timestamp: new Date().toISOString(),
        detail: 'Sistem diinisialisasi dalam mode aman'
      }
    ]
  })

  // 2. Active Session & Navigation
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('simkopdes_current_user')
    // Default to Budi Santoso (Anggota) for quick demonstration, or null
    return saved ? JSON.parse(saved) : initialProfiles[0]
  })

  const [authView, setAuthView] = useState('login') // 'login' | 'register' | 'forgot_password'
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'simpanan' | 'pinjaman' | 'profil' | 'kelola_anggota' | 'panduan' | 'bantuan'

  // 3. FR-01 / UXR-01: Connection & Error Handling State
  // simulatedError: null | 'network_error' | 'server_down' | 'offline'
  const [simulatedError, setSimulatedError] = useState(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // 4. FR-05 / UXR-05: Contextual Help State
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [activeHelpTopic, setActiveHelpTopic] = useState(null)

  // 5. Toast Notification State
  const [toast, setToast] = useState(null)

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('simkopdes_profiles', JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    localStorage.setItem('simkopdes_savings', JSON.stringify(savings))
  }, [savings])

  useEffect(() => {
    localStorage.setItem('simkopdes_loans', JSON.stringify(loans))
  }, [loans])

  useEffect(() => {
    localStorage.setItem('simkopdes_audit_logs', JSON.stringify(auditLogs))
  }, [auditLogs])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('simkopdes_current_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('simkopdes_current_user')
    }
  }, [currentUser])

  // Listen to browser online/offline events (FR-01)
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      showToast('Koneksi internet kembali terhubung.', 'success')
    }
    const handleOffline = () => {
      setIsOnline(false)
      showToast('Anda sedang offline. Periksa sambungan data atau Wi-Fi Anda.', 'warning')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const showToast = (message, type = 'info') => {
    const id = Date.now()
    setToast({ id, message, type })
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev))
    }, 4500)
  }

  const logAudit = (aksi, user = currentUser?.nama || 'Tamu', detail = '') => {
    const newLog = {
      id: `log-${Date.now()}`,
      aksi,
      user,
      timestamp: new Date().toISOString(),
      detail: typeof detail === 'string' ? detail : JSON.stringify(detail)
    }
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 99)])
  }

  // --- FR-01: Connection Failure & Recovery Action ---
  const simulateConnectionError = (errorType) => {
    setSimulatedError(errorType)
    logAudit('Simulasi Gangguan Akses', 'Penguji', `Jenis: ${errorType}`)
  }

  const resetConnection = () => {
    setSimulatedError(null)
    setIsRetrying(false)
    showToast('Koneksi sistem berhasil dipulihkan secara normal.', 'success')
  }

  const retryConnection = () => {
    setIsRetrying(true)
    setTimeout(() => {
      setIsRetrying(false)
      setSimulatedError(null)
      showToast('Berhasil terhubung kembali ke layanan SIMKOPDES!', 'success')
      logAudit('Pemulihan Akses Berhasil', currentUser?.nama || 'Pengguna', 'Pengguna melakukan retry dan berhasil terhubung')
    }, 1200)
  }

  // --- FR-02: Login Action with Actionable & Specific Messages ---
  const login = ({ identifier, password }) => {
    const cleanId = identifier.trim().toLowerCase()
    
    // Check if error state simulated
    if (simulatedError) {
      return { success: false, message: 'Layanan sedang tidak dapat diakses saat ini. Silakan coba sesaat lagi.' }
    }

    // Match by nomor_anggota or email
    const foundUser = profiles.find((p) => 
      p.email.toLowerCase() === cleanId || 
      (p.nomor_anggota && p.nomor_anggota.toLowerCase() === cleanId)
    )

    if (!foundUser) {
      logAudit('Gagal Login', identifier, 'Identitas akun tidak ditemukan')
      return {
        success: false,
        field: 'identifier',
        message: 'Nomor Anggota atau Email tidak terdaftar dalam sistem. Silakan periksa kembali atau lakukan pendaftaran bagi anggota baru.'
      }
    }

    // Default mock password check: allows 'password123' or 'demo' or anything >= 6 chars for testing
    // If user enters invalid password format:
    if (!password || password.length < 6) {
      return {
        success: false,
        field: 'password',
        message: 'Kata sandi minimal 6 karakter. Pastikan Anda memasukkan kata sandi yang sesuai.'
      }
    }

    // Verification check for pending members
    if (foundUser.status === 'pending') {
      logAudit('Login Ditolak', foundUser.nama, 'Status keanggotaan masih menunggu verifikasi pengurus')
      return {
        success: false,
        statusPending: true,
        user: foundUser,
        message: 'Pendaftaran akun Anda masih dalam proses peninjauan oleh pengurus koperasi (status: Menunggu Verifikasi). Hubungi pengurus koperasi jika memerlukan percepatan.'
      }
    }

    if (foundUser.status === 'nonaktif') {
      return {
        success: false,
        message: 'Status keanggotaan ini sedang non-aktif. Silakan hubungi pengurus koperasi desa untuk informasi lebih lanjut.'
      }
    }

    setCurrentUser(foundUser)
    logAudit('Berhasil Login', foundUser.nama, `Masuk ke akun role ${foundUser.role}`)
    showToast(`Selamat datang kembali, ${foundUser.nama}!`, 'success')

    // Navigate to appropriate tab based on role
    if (foundUser.role === 'pengurus') {
      setActiveTab('kelola_anggota')
    } else {
      setActiveTab('dashboard')
    }

    return { success: true, user: foundUser }
  }

  // Quick switch role (helps testers easily test Anggota vs Pengurus)
  const switchUserDirectly = (profileId) => {
    const target = profiles.find((p) => p.id === profileId)
    if (target) {
      setCurrentUser(target)
      showToast(`Beralih peran ke: ${target.nama} (${target.role})`, 'info')
      if (target.role === 'pengurus') {
        setActiveTab('kelola_anggota')
      } else {
        setActiveTab('dashboard')
      }
      logAudit('Beralih Profil Pengujian', target.nama, `Role: ${target.role}`)
    }
  }

  const logout = () => {
    if (currentUser) {
      logAudit('Keluar Akun', currentUser.nama, 'Pengguna keluar dari aplikasi')
    }
    setCurrentUser(null)
    setAuthView('login')
    setActiveTab('dashboard')
    showToast('Anda telah berhasil keluar dari akun.', 'info')
  }

  // --- FR-03: Member Registration ---
  const registerMember = (formData) => {
    const { nama, nik, no_hp, alamat, email } = formData
    
    // Check if email or NIK already registered
    const existing = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase() || p.nik === nik)
    if (existing) {
      return {
        success: false,
        message: existing.nik === nik 
          ? 'NIK ini sudah terdaftar sebagai anggota. Silakan hubungi pengurus bila merasa ada kesalahan data.' 
          : 'Alamat Email ini sudah digunakan. Silakan gunakan email lain atau masuk ke akun Anda.'
      }
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const newNomorAnggota = `KOP-2611-${randomSuffix}`

    const newProfile = {
      id: `user-${Date.now()}`,
      email: email.trim().toLowerCase(),
      nama: nama.trim(),
      no_hp: no_hp.trim(),
      role: 'anggota',
      nomor_anggota: newNomorAnggota,
      nik: nik.trim(),
      alamat: alamat.trim(),
      status: 'pending', // Menunggu persetujuan pengurus sesuai PRD business rules
      tanggal_daftar: new Date().toISOString(),
    }

    setProfiles((prev) => [newProfile, ...prev])
    logAudit('Pendaftaran Anggota Baru', newProfile.nama, `Nomor Anggota yang diajukan: ${newNomorAnggota}`)

    return {
      success: true,
      data: newProfile,
      message: 'Pendaftaran anggota berhasil dikirim!'
    }
  }

  // --- FR-04: Member Actions & Savings ---
  const addSavingsRecord = ({ anggota_id, jenis, nominal, keterangan }) => {
    const newSavings = {
      id: `sav-${Date.now()}`,
      anggota_id,
      jenis,
      nominal: Number(nominal),
      tanggal_transaksi: new Date().toISOString(),
      keterangan: keterangan || `Setoran simpanan ${jenis}`,
      status: 'sukses',
    }
    setSavings((prev) => [newSavings, ...prev])
    
    const member = profiles.find((p) => p.id === anggota_id)
    logAudit('Pencatatan Simpanan', currentUser?.nama || 'Pengurus', `Nominal: Rp ${Number(nominal).toLocaleString('id-ID')} untuk ${member?.nama || anggota_id}`)
    showToast(`Setoran simpanan ${jenis} sebesar Rp ${Number(nominal).toLocaleString('id-ID')} berhasil dicatat.`, 'success')
    return { success: true }
  }

  const applyLoan = ({ anggota_id, jumlah_pengajuan, keperluan }) => {
    const newLoan = {
      id: `loan-${Date.now()}`,
      anggota_id,
      jumlah_pengajuan: Number(jumlah_pengajuan),
      keperluan,
      status: 'diajukan',
      tanggal_pengajuan: new Date().toISOString(),
      keterangan: 'Menunggu peninjauan pengurus'
    }
    setLoans((prev) => [newLoan, ...prev])
    logAudit('Pengajuan Pinjaman', currentUser?.nama || 'Anggota', `Pengajuan pinjaman: Rp ${Number(jumlah_pengajuan).toLocaleString('id-ID')}`)
    showToast('Pengajuan pinjaman Anda berhasil diajukan dan sedang ditinjau pengurus.', 'success')
    return { success: true }
  }

  const updateProfile = (updatedFields) => {
    if (!currentUser) return
    const updated = { ...currentUser, ...updatedFields }
    setCurrentUser(updated)
    setProfiles((prev) => prev.map((p) => (p.id === currentUser.id ? updated : p)))
    logAudit('Pembaruan Profil', currentUser.nama, 'Data kontak profil diperbarui')
    showToast('Profil Anda berhasil diperbarui.', 'success')
  }

  // --- Pengurus Admin Actions (US-05) ---
  const approveMember = (memberId) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === memberId ? { ...p, status: 'aktif' } : p))
    )
    const target = profiles.find((p) => p.id === memberId)
    logAudit('Persetujuan Anggota', currentUser?.nama || 'Pengurus', `Menyetujui anggota: ${target?.nama || memberId}`)
    showToast(`Keanggotaan ${target?.nama || 'calon anggota'} berhasil disetujui & aktif!`, 'success')
  }

  const toggleMemberStatus = (memberId) => {
    let nextStatus = 'aktif'
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === memberId) {
          nextStatus = p.status === 'aktif' ? 'nonaktif' : 'aktif'
          return { ...p, status: nextStatus }
        }
        return p
      })
    )
    const target = profiles.find((p) => p.id === memberId)
    logAudit('Ubah Status Anggota', currentUser?.nama || 'Pengurus', `Ubah status ${target?.nama} menjadi ${nextStatus}`)
    showToast(`Status keanggotaan diubah menjadi: ${nextStatus}.`, 'info')
  }

  // --- FR-05: Contextual Help Modal Trigger ---
  const openHelp = (topic = null) => {
    setActiveHelpTopic(topic)
    setIsHelpModalOpen(true)
  }

  const closeHelp = () => {
    setIsHelpModalOpen(false)
    setActiveHelpTopic(null)
  }

  return (
    <AppContext.Provider
      value={{
        // Auth & User
        currentUser,
        setCurrentUser,
        profiles,
        login,
        logout,
        registerMember,
        switchUserDirectly,
        updateProfile,
        authView,
        setAuthView,
        activeTab,
        setActiveTab,

        // Data
        savings,
        loans,
        addSavingsRecord,
        applyLoan,
        helpContent: initialHelpContent,
        officialHelpContact,
        auditLogs,

        // Pengurus actions
        approveMember,
        toggleMemberStatus,

        // FR-01: Connection & Error state
        simulatedError,
        simulateConnectionError,
        resetConnection,
        retryConnection,
        isRetrying,
        isOnline,

        // FR-05: Help & Guides
        isHelpModalOpen,
        activeHelpTopic,
        openHelp,
        closeHelp,

        // UI Feedback
        toast,
        showToast,

        // Supabase info
        isSupabaseConfigured,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
