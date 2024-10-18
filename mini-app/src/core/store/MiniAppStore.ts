import { LaunchParams, ThemeParams, initDataState, miniAppState, viewportState } from '@telegram-apps/sdk-react'
import { create } from 'zustand'

interface MiniAppState {
  initData: typeof initDataState | null
  lp: LaunchParams | null
  miniApp: typeof miniAppState | null
  themeParams: ThemeParams | null
  viewport: typeof viewportState | null
  setInitData: (data: typeof initDataState) => void
  setLaunchParams: (params: LaunchParams) => void
  setMiniApp: (app: typeof miniAppState) => void
  setThemeParams: (params: ThemeParams) => void
  setViewport: (viewport: typeof viewportState) => void
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
