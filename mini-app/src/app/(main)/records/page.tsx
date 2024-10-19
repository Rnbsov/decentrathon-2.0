import { ChevronRight } from 'lucide-react'

import { recordsPageLinks } from '@/core/constants'

interface Props {
  className?: string
}

function RecordsPage({ className }: Props) {
  return (
    <div className={className}>
      <div className='flex flex-col gap-5 m-2'>
        {recordsPageLinks.map((link) => (
          <div key={link.title} className='bg-secondaryBg w-full flex-between rounded-2xl p-5'>
            <div className='flex gap-3'>
              <link.icon size={24} className='stroke-primary' />
              <p className='text-lg text-black'>{link.title}</p>
            </div>
            <ChevronRight className='stroke-primary' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecordsPage
