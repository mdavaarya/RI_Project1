import React, { useState } from 'react'
import { useApp } from './context/AppContext'
import { Sidebar } from './components/common/Sidebar'
import { TopNavbar } from './components/common/TopNavbar'
import { Footer } from './components/common/Footer'
import { ErrorState } from './components/common/ErrorState'
import { HelpModal } from './components/common/HelpModal'
import { Toast } from './components/common/Toast'
import { DevToolbar } from './components/common/DevToolbar'
import { LoginForm } from './components/auth/LoginForm'
import { RegisterForm } from './components/auth/RegisterForm'
import { MemberDashboard } from './components/member/MemberDashboard'
import { AccountSettings } from './components/account/AccountSettings'
import { HelpdeskInternal } from './components/helpdesk/HelpdeskInternal'
import { SavingsHistory } from './components/member/SavingsHistory'
import { PengurusDashboard } from './components/admin/PengurusDashboard'

export default function App() {
  const { 
    currentUser, 
    authView, 
    activeTab, 
    simulatedError, 
    isOnline 
  } = useApp()

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // FR-01: When simulated connection failure or offline occurs
  const hasAccessFailure = Boolean(simulatedError || !isOnline)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {hasAccessFailure ? (
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
          <ErrorState errorType={simulatedError || 'offline'} />
        </div>
      ) : !currentUser ? (
        // Public / Auth View (Login & Register)
        <div className="min-h-screen flex flex-col justify-between">
          <TopNavbar onOpenMobileMenu={() => {}} />
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:py-12 flex items-center justify-center">
            {authView === 'register' ? <RegisterForm /> : <LoginForm />}
          </div>
          <Footer />
        </div>
      ) : (
        // Authenticated App with Sidebar Navigation on the side & Hamburger on mobile
        <div className="flex min-h-screen">
          {/* Left Side Navigation (Desktop Fixed & Mobile Slide-over Drawer) */}
          <Sidebar 
            isMobileOpen={isMobileNavOpen} 
            setIsMobileOpen={setIsMobileNavOpen} 
          />

          {/* Right Main Content Column */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Navigation Bar with Mobile Hamburger Trigger */}
            <TopNavbar onOpenMobileMenu={() => setIsMobileNavOpen(true)} />

            {/* Main Application Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {currentUser.role === 'pengurus' ? (
                <PengurusDashboard />
              ) : (
                <div>
                  {(activeTab === 'dashboard' || !activeTab) && <MemberDashboard />}
                  {activeTab === 'kendali_akun' && <AccountSettings />}
                  {activeTab === 'helpdesk' && <HelpdeskInternal />}
                  {activeTab === 'simpanan' && <SavingsHistory />}
                </div>
              )}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      )}

      {/* Global Modals & Notifications */}
      <HelpModal />
      <Toast />
      <DevToolbar />
    </div>
  )
}
