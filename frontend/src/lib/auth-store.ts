import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  fullName?: string
}

interface AuthState {
  user: User | null
  credits: {
    image: number
    video: number
    game: number
  }
  freeUsage: {
    images: number
    videos: number
  }
  setUser: (user: User | null) => void
  setCredits: (credits: { image: number; video: number; game: number }) => void
  decrementCredits: (type: 'image' | 'video' | 'game') => void
  incrementFreeUsage: (type: 'image' | 'video') => void
  canUseFree: (type: 'image' | 'video') => boolean
  reset: () => void
}

const FREE_LIMITS = {
  image: 1,
  video: 1,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      credits: {
        image: 0,
        video: 0,
        game: 0,
      },
      freeUsage: {
        images: 0,
        videos: 0,
      },
      setUser: (user) => set({ user }),
      setCredits: (credits) => set({ credits }),
      decrementCredits: (type) =>
        set((state) => ({
          credits: {
            ...state.credits,
            [type]: Math.max(0, state.credits[type] - 1),
          },
        })),
      incrementFreeUsage: (type) =>
        set((state) => ({
          freeUsage: {
            ...state.freeUsage,
            [type === 'image' ? 'images' : 'videos']: state.freeUsage[type === 'image' ? 'images' : 'videos'] + 1,
          },
        })),
      canUseFree: (type) => {
        const state = get()
        const used = type === 'image' ? state.freeUsage.images : state.freeUsage.videos
        return used < FREE_LIMITS[type]
      },
      reset: () =>
        set({
          user: null,
          credits: { image: 0, video: 0, game: 0 },
          freeUsage: { images: 0, videos: 0 },
        }),
    }),
    {
      name: 'dreamquest-auth',
    }
  )
)
