'use client'

import { bottombarLinks } from '@/core/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Bottombar = () => {
  const pathname = usePathname()

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route

        return (
          <Link
            href={link.route}
            key={link.label}
            className={` flex-center flex-col gap-1 p-2 transition`}
          >
            <link.icon size={24}  className={`${isActive && 'stroke-primary-500'}`} />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export { Bottombar }
