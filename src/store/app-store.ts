import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserRole } from '../lib/mock-data'

export type Theme = 'light' | 'dark'

interface AppState {
  // Theme
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void

  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void

  // Active role/user (for demo switching)
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void

  // Notifications
  notificationCount: number
  setNotificationCount: (n: number) => void

  // Mobile drawer
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: next })
        if (next === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      setTheme: (theme) => {
        set({ theme })
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      sidebarCollapsed: false,
      toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      activeRole: 'aluno',
      setActiveRole: (role) => set({ activeRole: role }),

      notificationCount: 3,
      setNotificationCount: (n) => set({ notificationCount: n }),

      mobileMenuOpen: false,
      setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
    }),
    {
      name: 'asaia-app-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        activeRole: state.activeRole,
      }),
      onRehydrateStorage: () => (state) => {
        // Apply theme on load
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }
  )
)
