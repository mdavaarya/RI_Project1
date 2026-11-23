import React from 'react'
import { useApp } from './context/AppContext'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { ErrorState } from './components/common/ErrorState'
import { HelpModal } from './components/common/HelpModal'
import { Toast } from './components/common/Toast'
import { DevToolbar } from './components/common/DevToolbar'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { MemberDashboard } from './components/member/MemberDashboard'
import { SavingsHistory } from './components/member/SavingsHistory'
import { MemberProfile } from './components/member/MemberProfile'
import { PengurusDashboard } from './components/admin/PengurusDashboard'

export default function App() {
  const { 
    currentUser, 
    authView, 
    activeTab, 
    simulatedError, 
    isOnline 
  } = useApp()

  // FR-01: When simulated connection failure or offline occurs
  const hasAccessFailure = Boolean(simulatedError || !isOnline)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {hasAccessFailure ? (
          <ErrorState errorType={simulatedError || 'offline'} />
        ) : !currentUser ? (
          <div className="py-6 sm:py-12 flex items-center justify-center">
            {authView === 'register' ? <RegisterForm /> : <LoginForm />}
          </div>
        ) : currentUser.role === 'pengurus' ? (
          <PengurusDashboard />
        ) : (
          <div>
            {activeTab === 'dashboard' && <MemberDashboard />}
            {activeTab === 'simpanan' && <SavingsHistory />}
            {activeTab === 'profil' && <MemberProfile />}
          </div>
        )}
      </main>

      {/* Village Cooperative Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <HelpModal />
      <Toast />
      <DevToolbar />
    </div>
  )
}
