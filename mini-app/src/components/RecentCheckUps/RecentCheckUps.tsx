import { ChevronRight, HeartPulse, SearchCheck } from 'lucide-react'

import { cn } from '@/core/utils'

interface Props {
  className?: string
}

function RecentCheckUps({ className }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      <div className='flex-between'>
        <h2 className='text-[25px] font-bold leading-[140%] tracking-tighter'>Recent Medical Check-up</h2>
        <button className='text-primary'>See more</button>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='bg-secondaryBg w-full flex-between rounded-[20px] p-5'>
          <div className='flex gap-3'>
            <HeartPulse className='stroke-red-500' strokeWidth={2} size={28} />
            <p className='text-lg'>General Blood Analysis</p>
          </div>

          <ChevronRight />
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='bg-secondaryBg w-full flex-between rounded-[20px] p-5'>
          <div className='flex gap-3'>
            <SearchCheck className='stroke-primary' strokeWidth={2} size={28} />
            <p className='text-lg'>Swab Antigen</p>
          </div>

          <ChevronRight />
        </div>
      </div>
    </div>
  )
}

export { RecentCheckUps }
