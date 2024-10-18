'use client'

import { useTranslations } from 'next-intl'

import { Page } from '@/components/Page'

import { useMiniAppStore } from '@/core/store/MiniAppStore'

export default function Home() {
  const t = useTranslations('i18n')

  const initData = useMiniAppStore((state) => state.initData)

  return (
    <Page back={false}>
      <div className='text-black p-3'>
        <p className='font-nunito'>
          {t('greeting')},<br />
          <span className='font-bold'>
            {(initData?.user?.firstName ?? '') + ' ' + (initData?.user?.lastName ?? '')}
          </span>{' '}
          👋
        </p>
      </div>
    </Page>
  )
}
