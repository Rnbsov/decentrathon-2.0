'use client'

import { initData, miniApp, themeParams, useLaunchParams, useSignal, viewport } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { LoaderCircle } from 'lucide-react'
import { type PropsWithChildren, useEffect } from 'react'
import 'regenerator-runtime/runtime'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ErrorPage } from '@/components/ErrorPage'

import { useClientOnce } from '@/hooks/useClientOnce'
import { useDidMount } from '@/hooks/useDidMount'
import { useTelegramMock } from '@/hooks/useTelegramMock'

import { xiorClassic } from '@/api/instance'

import './styles.css'
import { setLocale } from '@/core/i18n/locale'
import { init } from '@/core/init'
import { useMiniAppStore } from '@/core/store/MiniAppStore'

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development'

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock()
  }

  const initDataState = useSignal(initData.state)
  const lp = useLaunchParams()
  const miniAppState = useSignal(miniApp.state)
  const themeParamsState = useSignal(themeParams.state)
  const viewportState = useSignal(viewport.state)
  const debug = isDev || lp.startParam === 'debug'

  const setInitData = useMiniAppStore((state) => state.setInitData)
  const setLaunchParams = useMiniAppStore((state) => state.setLaunchParams)
  const setMiniApp = useMiniAppStore((state) => state.setMiniApp)
  const setThemeParams = useMiniAppStore((state) => state.setThemeParams)
  const setViewport = useMiniAppStore((state) => state.setViewport)

  useEffect(() => {
    setInitData(initDataState)
    setLaunchParams(lp)
    setMiniApp(miniAppState)
    setThemeParams(themeParamsState)
    setViewport(viewportState)
  }, [
    initDataState,
    lp,
    miniAppState,
    themeParamsState,
    viewportState,
    setInitData,
    setLaunchParams,
    setMiniApp,
    setThemeParams,
    setViewport
  ])

  // Sent initData to backend
  useEffect(() => {
    const sendInitData = async () => {
      try {
        const userData = initDataState?.user

        if (userData) {
          const dataToSend = {
            tg_id: userData.id,

            ...userData
          }

          const response = await xiorClassic.post('/auth', { user: dataToSend }) // Send to the backend
          console.log('Init data sent successfully:', response.data)
        }
      } catch (error) {
        console.error('Error sending init data:', error)
      }
    }

    sendInitData()
  }, [initDataState])

  // Initialize the library.
  useClientOnce(() => {
    init(debug)
  })

  const isDark = useSignal(miniApp.isDark)
  const initDataUser = useSignal(initData.user)

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.languageCode)
  }, [initDataUser])

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    debug && import('eruda').then((lib) => lib.default.init())
  }, [debug])

  return (
    <TonConnectUIProvider manifestUrl='/tonconnect-manifest.json'>
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
        {children}
      </AppRoot>
    </TonConnectUIProvider>
  )
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount()

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className='root__loading animate-spin'>
      <LoaderCircle className='stroke-primaryPurple' size={36} />
    </div>
  )
}
