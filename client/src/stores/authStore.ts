import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  username: string
  email: string
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  isLoggedIn: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
  setUser: (user: AuthUser) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      login: (token, user) =>
        set({ token, user, isLoggedIn: true }),

      logout: () =>
        set({ token: null, user: null, isLoggedIn: false }),

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
