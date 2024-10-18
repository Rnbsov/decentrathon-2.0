import '@telegram-apps/telegram-ui/dist/styles.css'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import 'normalize.css/normalize.css'
import type { PropsWithChildren } from 'react'

import { Bottombar } from '@/components/BottomBar/Bottombar'
import { Root } from '@/components/Root/Root'

import './_assets/globals.css'
import { I18nProvider } from '@/core/i18n/provider'

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here'
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <Root>
            <div className='w-full md:flex max-w-[100vw]'>
              {/* <Topbar /> */}

              <section className='flex flex-1'>{children}</section>

              <Bottombar />
            </div>
          </Root>
        </I18nProvider>
      </body>
    </html>
  )
}
