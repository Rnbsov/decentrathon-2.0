import { HealthCheckList } from '@/core/constants'
import { cn } from '@/core/utils'

interface Props {
  className?: string
}

function CheckHealth({ className }: Props) {
  return (
    <div className={cn(className, 'flex flex-col gap-5')}>
      <div className='flex-between'>
        <h2 className='text-[25px] font-bold leading-[140%] tracking-tighter'>Check Your Own Health</h2>
        <button className='text-primary'>See more</button>
      </div>

      <div className='flex gap-3 overflow-x-auto'>
        {HealthCheckList.map((item, index) => (
          <div key={index} className='flex flex-col items-center min-w-24'>
            <item.icon className='mb-2 stroke-primary' size={38} />
            <p className='text-lg text-center'>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { CheckHealth }
