import { PropsWithChildren } from 'react'

import { Bottombar } from '@/components/BottomBar/Bottombar'

import { cn } from '@/core/utils'

export default async function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <section className={cn('flex-1')}>{children}</section>

      <Bottombar />
    </>
  )
}
