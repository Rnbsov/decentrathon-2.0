import Image from 'next/image'

import { servicesList } from '@/core/constants'
import { cn } from '@/core/utils'

interface Props {
  className?: string
}

function Services({ className }: Props) {
  return (
    <div className={cn(className, 'overflow-x-auto flex gap-2')}>
      {servicesList.map((service, index) => (
        <div key={index} className={cn(service.bgColor, 'rounded-3xl min-w-32 p-5 text-white flex flex-col gap-5')}>
          <div>
            <Image src={service.icon} alt={service.title} />
          </div>
          <div>
            <p className='font-bold'>{service.title}</p>
            <p className=''>{service.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Services }
