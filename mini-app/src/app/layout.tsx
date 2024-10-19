import '@telegram-apps/telegram-ui/dist/styles.css'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { Nova_Square, Nunito } from 'next/font/google'
import 'normalize.css/normalize.css'
import type { PropsWithChildren } from 'react'

import { Root } from '@/components/Root/Root'

import './_assets/globals.css'
import { I18nProvider } from '@/core/i18n/provider'
import { cn } from '@/core/utils'

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here'
}

const novaSquare = Nova_Square({
  subsets: ['latin'],
  weight: '400'
})

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <Root>
            <div className={cn(nunito.className, novaSquare.className)}>{children}</div>

            <div
              className={cn(
                nunito.variable,
                novaSquare.className,
                'w-full md:flex max-w-[100vw] flex flex-col h-screen'
              )}
            >
              {children}
            </div>
          </Root>
        </I18nProvider>
      </body>
    </html>
  )
}
