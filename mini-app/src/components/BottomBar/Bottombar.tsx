'use client'

import { bottombarLinks } from '@/core/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/core/utils'

import styles from './styles.module.css'

const Bottombar = () => {
  const pathname = usePathname()

  return (
    <section className={styles.bottombar}>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route

        return (
          <Link
            href={link.route}
            key={link.label}
            className={` flex-center flex-col gap-1 p-2 transition`}
          >
            <link.icon size={24}  className={cn(isActive ? 'stroke-primaryPurple' : 'stroke-primary/30')} />
            <p className='tiny-medium text-emerald-900'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export { Bottombar }
