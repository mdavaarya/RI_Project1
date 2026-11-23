import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  initialProfiles,
  initialSavings,
  initialDomicileRequests,
  initialDeletionRequests,
  initialHelpdeskTickets,
  initialHelpContent,
  officialHelpContact
} from '../data/initialData'
import { isSupabaseConfigured } from '../lib/supabase'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  // 1. Storage Initializers
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('simkopdes_profiles')
    return saved ? JSON.parse(saved) : initialProfiles
  })

  // FR-03 / US-01: Permohonan Domisili
  const [domicileRequests, setDomicileRequests] = useState(() => {
    const saved = localStorage.getItem('simkopdes_domicile_requests')
    return saved ? JSON.parse(saved) : initialDomicileRequests
  })

  // FR-04 / US-03: Pengajuan Hapus Akun
  const [deletionRequests, setDeletionRequests] = useState(() => {
    const saved = localStorage.getItem('simkopdes_deletion_requests')
    return saved ? JSON.parse(saved) : initialDeletionRequests
  })

  // FR-05 & FR-06: Helpdesk Internal
  const [helpdeskTickets, setHelpdeskTickets] = useState(() => {
    const saved = localStorage.getItem('simkopdes_helpdesk_tickets')
    return saved ? JSON.parse(saved) : initialHelpdeskTickets
  })

  const [savings, setSavings] = useState(() => {
    const saved = localStorage.getItem('simkopdes_savings')
    return saved ? JSON.parse(saved) : initialSavings
  })

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('simkopdes_audit_logs')
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        aksi: 'System Initialization PRD v2.0',
        user: 'Sistem SIMKOPDES',
        timestamp: new Date().toISOString(),
        detail: 'Sistem diinisialisasi dengan modul Kendali Akun dan Helpdesk Internal'
      }
    ]
  })

  // 2. Active Session & Navigation
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('simkopdes_current_user')
    return saved ? JSON.parse(saved) : initialProfiles[0]
  })

  const [authView, setAuthView] = useState('login') // 'login' | 'register' | 'forgot_password'
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'kendali_akun' | 'helpdesk' | 'simpanan' | 'kelola_pengurus'
  const [accountSubTab, setAccountSubTab] = useState('domisili') // 'domisili' | 'hapus_akun' | 'profil'

  // 3. FR-01 / UXR-01: Connection & Error Handling State
  const [simulatedError, setSimulatedError] = useState(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // 4. FR-08: Contextual Help State
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [activeHelpTopic, setActiveHelpTopic] = useState(null)

  // 5. Toast Notification State
  const [toast, setToast] = useState(null)

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('simkopdes_profiles', JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    localStorage.setItem('simkopdes_domicile_requests', JSON.stringify(domicileRequests))
  }, [domicileRequests])

  useEffect(() => {
    localStorage.setItem('simkopdes_deletion_requests', JSON.stringify(deletionRequests))
  }, [deletionRequests])

  useEffect(() => {
    localStorage.setItem('simkopdes_helpdesk_tickets', JSON.stringify(helpdeskTickets))
  }, [helpdeskTickets])

  useEffect(() => {
    localStorage.setItem('simkopdes_savings', JSON.stringify(savings))
  }, [savings])

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
    
    if (simulatedError) {
      return { success: false, message: 'Layanan sedang tidak dapat diakses saat ini. Silakan coba sesaat lagi.' }
    }

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

    if (!password || password.length < 6) {
      return {
        success: false,
        field: 'password',
        message: 'Kata sandi minimal 6 karakter. Pastikan Anda memasukkan kata sandi yang sesuai.'
      }
    }

    if (foundUser.status === 'pending') {
      logAudit('Login Ditolak', foundUser.nama, 'Status keanggotaan masih menunggu verifikasi pengurus')
      return {
        success: false,
        statusPending: true,
        user: foundUser,
        message: 'Pendaftaran akun Anda masih dalam proses peninjauan oleh pengurus koperasi (status: Menunggu Verifikasi).'
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

    if (foundUser.role === 'pengurus') {
      setActiveTab('kelola_pengurus')
    } else {
      setActiveTab('dashboard')
    }

    return { success: true, user: foundUser }
  }

  const switchUserDirectly = (profileId) => {
    const target = profiles.find((p) => p.id === profileId)
    if (target) {
      setCurrentUser(target)
      showToast(`Beralih peran ke: ${target.nama} (${target.role})`, 'info')
      if (target.role === 'pengurus') {
        setActiveTab('kelola_pengurus')
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

  // --- FR-07: Member Registration ---
  const registerMember = (formData) => {
    const { nama, nik, no_hp, alamat, email } = formData
    
    const existing = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase() || p.nik === nik)
    if (existing) {
      return {
        success: false,
        message: existing.nik === nik 
          ? 'NIK ini sudah terdaftar sebagai anggota.' 
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
      koperasi_asal: 'KUD Sukamaju',
      status: 'pending',
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

  // --- FR-03 / US-01: Permohonan Pindah Domisili / Koperasi ---
  const submitDomicileRequest = ({ alamat_baru, koperasi_tujuan, alasan }) => {
    if (!currentUser) return { success: false, message: 'Harus login terlebih dahulu' }

    const newReq = {
      id: `dom-${Date.now()}`,
      profile_id: currentUser.id,
      nama_pemohon: currentUser.nama,
      nomor_anggota: currentUser.nomor_anggota,
      alamat_lama: currentUser.alamat,
      alamat_baru: alamat_baru.trim(),
      koperasi_asal: currentUser.koperasi_asal || 'KUD Sukamaju',
      koperasi_tujuan: koperasi_tujuan ? koperasi_tujuan.trim() : 'KUD Sukamaju',
      alasan: alasan.trim(),
      status: 'dikirim',
      catatan_pengurus: 'Menunggu peninjauan pengurus koperasi',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setDomicileRequests((prev) => [newReq, ...prev])
    logAudit('Pengajuan Pindah Domisili', currentUser.nama, `Alamat baru: ${alamat_baru}`)
    showToast('Permohonan perpindahan domisili berhasil dikirim dan dicatat.', 'success')
    return { success: true, data: newReq }
  }

  // Update status permohonan domisili oleh pengurus (US-02)
  const updateDomicileRequest = (requestId, status, catatan) => {
    setDomicileRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          if (status === 'disetujui') {
            setProfiles((pList) =>
              pList.map((p) =>
                p.id === r.profile_id
                  ? { ...p, alamat: r.alamat_baru, koperasi_asal: r.koperasi_tujuan || p.koperasi_asal }
                  : p
              )
            )
            if (currentUser && currentUser.id === r.profile_id) {
              setCurrentUser((c) => ({
                ...c,
                alamat: r.alamat_baru,
                koperasi_asal: r.koperasi_tujuan || c.koperasi_asal
              }))
            }
          }
          return {
            ...r,
            status,
            catatan_pengurus: catatan || r.catatan_pengurus,
            updated_at: new Date().toISOString()
          }
        }
        return r
      })
    )

    logAudit('Tindak Lanjut Permohonan Domisili', currentUser?.nama || 'Pengurus', `Status: ${status}`)
    showToast(`Status permohonan domisili diperbarui menjadi: ${status}`, 'success')
  }

  // --- FR-04 / US-03: Pengajuan Penghapusan Akun ---
  const submitDeletionRequest = ({ alasan, konfirmasi_konsekuensi }) => {
    if (!currentUser) return { success: false, message: 'Harus login terlebih dahulu' }
    if (!konfirmasi_konsekuensi) {
      return { success: false, message: 'Anda harus menyetujui pemahaman konsekuensi penghapusan akun.' }
    }

    const newReq = {
      id: `del-${Date.now()}`,
      profile_id: currentUser.id,
      nama_pemohon: currentUser.nama,
      nomor_anggota: currentUser.nomor_anggota,
      alasan: alasan.trim(),
      konfirmasi_konsekuensi: true,
      status: 'dikirim',
      catatan_pengurus: 'Menunggu peninjauan hak simpanan & kewajiban retensi data',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setDeletionRequests((prev) => [newReq, ...prev])
    setProfiles((prev) =>
      prev.map((p) => (p.id === currentUser.id ? { ...p, status: 'menunggu_penghapusan' } : p))
    )
    setCurrentUser((prev) => ({ ...prev, status: 'menunggu_penghapusan' }))

    logAudit('Pengajuan Penghapusan Akun', currentUser.nama, `Alasan: ${alasan}`)
    showToast('Permohonan penghapusan akun berhasil dikirim untuk ditinjau pengurus.', 'warning')
    return { success: true, data: newReq }
  }

  const updateDeletionRequest = (requestId, status, catatan) => {
    setDeletionRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          if (status === 'disetujui') {
            setProfiles((pList) =>
              pList.map((p) => (p.id === r.profile_id ? { ...p, status: 'nonaktif' } : p))
            )
            if (currentUser && currentUser.id === r.profile_id) {
              setCurrentUser((c) => ({ ...c, status: 'nonaktif' }))
            }
          } else if (status === 'ditolak') {
            setProfiles((pList) =>
              pList.map((p) => (p.id === r.profile_id ? { ...p, status: 'aktif' } : p))
            )
            if (currentUser && currentUser.id === r.profile_id) {
              setCurrentUser((c) => ({ ...c, status: 'aktif' }))
            }
          }
          return {
            ...r,
            status,
            catatan_pengurus: catatan || r.catatan_pengurus,
            updated_at: new Date().toISOString()
          }
        }
        return r
      })
    )

    logAudit('Tindak Lanjut Hapus Akun', currentUser?.nama || 'Pengurus', `Status: ${status}`)
    showToast(`Status pengajuan penghapusan akun diubah menjadi: ${status}`, 'info')
  }

  // --- FR-05 & FR-06: Helpdesk Internal ---
  const createHelpdeskTicket = ({ kategori, judul, deskripsi }) => {
    if (!currentUser) return { success: false, message: 'Harus login terlebih dahulu' }

    const ticketNumber = `HD-2611-${Math.floor(100 + Math.random() * 900)}`
    const newTicket = {
      id: `tik-${Date.now()}`,
      nomor_tiket: ticketNumber,
      profile_id: currentUser.id,
      nama_pelapor: currentUser.nama,
      kategori,
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      status: 'dikirim',
      tanggapan_pengurus: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setHelpdeskTickets((prev) => [newTicket, ...prev])
    logAudit('Tiket Helpdesk Dibuat', currentUser.nama, `Nomor: ${ticketNumber} (${kategori})`)
    showToast(`Tiket Helpdesk ${ticketNumber} berhasil dibuat dan dikirim langsung ke sistem pengurus!`, 'success')
    return { success: true, data: newTicket }
  }

  const updateTicketStatus = (ticketId, status, tanggapan) => {
    setHelpdeskTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status,
              tanggapan_pengurus: tanggapan || t.tanggapan_pengurus,
              updated_at: new Date().toISOString()
            }
          : t
      )
    )

    logAudit('Pembaruan Status Tiket Helpdesk', currentUser?.nama || 'Pengurus', `Tiket ID: ${ticketId} -> ${status}`)
    showToast(`Status laporan Helpdesk diperbarui menjadi: ${status}`, 'success')
  }

  const updateProfile = (updatedFields) => {
    if (!currentUser) return
    const updated = { ...currentUser, ...updatedFields }
    setCurrentUser(updated)
    setProfiles((prev) => prev.map((p) => (p.id === currentUser.id ? updated : p)))
    logAudit('Pembaruan Kontak Profil', currentUser.nama, 'Data kontak diperbarui')
    showToast('Profil Anda berhasil diperbarui.', 'success')
  }

  const approveMember = (memberId) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === memberId ? { ...p, status: 'aktif' } : p))
    )
    const target = profiles.find((p) => p.id === memberId)
    logAudit('Persetujuan Pendaftaran Anggota', currentUser?.nama || 'Pengurus', `Anggota: ${target?.nama}`)
    showToast(`Keanggotaan ${target?.nama} berhasil disetujui & aktif!`, 'success')
  }

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
        accountSubTab,
        setAccountSubTab,

        // FR-03: Domicile Requests
        domicileRequests,
        submitDomicileRequest,
        updateDomicileRequest,

        // FR-04: Account Deletion Requests
        deletionRequests,
        submitDeletionRequest,
        updateDeletionRequest,

        // FR-05 & FR-06: Helpdesk Internal
        helpdeskTickets,
        createHelpdeskTicket,
        updateTicketStatus,

        // General
        savings,
        helpContent: initialHelpContent,
        officialHelpContact,
        auditLogs,
        approveMember,

        // FR-01: Connection & Error state
        simulatedError,
        simulateConnectionError,
        resetConnection,
        retryConnection,
        isRetrying,
        isOnline,

        // FR-08: Help & Guides
        isHelpModalOpen,
        activeHelpTopic,
        openHelp,
        closeHelp,

        // UI Feedback
        toast,
        showToast,
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
