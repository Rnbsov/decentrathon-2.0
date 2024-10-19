'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { CheckHealth } from '@/components/CheckHealth/CheckHealth'
import { Page } from '@/components/Page'
import { RecentCheckUps } from '@/components/RecentCheckUps/RecentCheckUps'
import { Services } from '@/components/Services/Services'

import { useMiniAppStore } from '@/core/store/MiniAppStore'

export default function Home() {
  const t = useTranslations('i18n')

  const initData = useMiniAppStore((state) => state.initData)

  return (
    <Page back={false}>
      <div className='text-black p-3 overflow-hidden'>
        <p className='font-nunito'>
          {t('greeting')},<br />
          <span className='font-bold'>
            {(initData?.user?.firstName ?? '') + ' ' + (initData?.user?.lastName ?? '')}
          </span>{' '}
          👋
        </p>

        <Services />

        <RecentCheckUps />

        <CheckHealth />
      </div>

      <Link href='/ai/home'>
        <button className='fixed bottom-[7rem] right-6 bg-[#192521] font-bold size-[58px] flex-center rounded-2xl shadow-lg'>
          <Image src='./fab.svg' alt='fab' width={48} height={48} />
        </button>
      </Link>
    </Page>
  )
}
