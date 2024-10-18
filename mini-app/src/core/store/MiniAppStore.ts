import { LaunchParams, ThemeParams } from '@telegram-apps/sdk-react'
import { create } from 'zustand'

interface MiniAppState {
  initData: any | null
  lp: LaunchParams | null
  miniApp: any | null
  themeParams: ThemeParams | null
  viewport: any | null
  setInitData: (data: any) => void
  setLaunchParams: (params: LaunchParams) => void
  setMiniApp: (app: any) => void
  setThemeParams: (params: ThemeParams) => void
  setViewport: (viewport: any) => void
}

export const useMiniAppStore = create<MiniAppState>((set) => ({
  initData: null,
  lp: null,
  miniApp: null,
  themeParams: null,
  viewport: null,
  setInitData: (data) => set({ initData: data }),
  setLaunchParams: (params) => set({ lp: params }),
  setMiniApp: (app) => set({ miniApp: app }),
  setThemeParams: (params) => set({ themeParams: params }),
  setViewport: (viewport) => set({ viewport: viewport })
}))
