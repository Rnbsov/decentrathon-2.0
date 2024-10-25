'use client'

import { Avatar, Headline, List, Subheadline } from '@telegram-apps/telegram-ui'
import { Edit } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { xiorClassic } from '@/api/instance'

import styles from './styles.module.css'
import { profileLinks } from '@/core/constants'
import { useMiniAppStore } from '@/core/store/MiniAppStore'
import { cn } from '@/core/utils'

function Profile() {
  const initData = useMiniAppStore((state) => state.initData)
  const [src, setSrc] = useState<string | undefined>(initData?.user?.photoUrl)

  useEffect(() => {
    const user = initData?.user
    const fetchProfilePicture = async () => {
      if (user?.id) {
        try {
          const response = await xiorClassic.get(`/${user.id}`)
          const data = await response.data
          setSrc(data.src)
        } catch (error) {
          console.error('Error fetching profile picture:', error)
        }
      }
    }

    fetchProfilePicture()
  }, [initData])

  return (
    <List className='w-full min-h-screen text-black font-nunito'>
      <h2 className='h2-bold flex-center'>Profile</h2>
      <div className='relative'>
        <div className='relative bg-primary/50  w-full h-32 rounded-xl'>
          <button className='bg-black/50 rounded-full p-2 absolute right-1 top-1'>
            <Edit className='stroke-white' size={18} />
          </button>
        </div>
        <div className='absolute left-1/2 top-[95%] transform -translate-x-1/2 -translate-y-1/2 flex-center flex-col'>
          <div className='size-[128px] rounded-full relative overflow-hidden'>
            <Image
              alt='avatar'
              src={src || 'https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649'}
              className='object-cover'
              fill
            />
          </div>
          <Headline weight='1'>{(initData?.user?.firstName ?? '') + ' ' + (initData?.user?.lastName ?? '')}</Headline>
          <Subheadline className='text-slate-500'>@{initData?.user?.username}</Subheadline>
        </div>
      </div>

      <div className='mt-24'>
        <div className='mt-2 flex gap-3 flex-col px-2'>
          {profileLinks.map((link) => (
            <button className='px-4 py-3 border-b border-black/10 last:border-b-0' key={link.label}>
              <Link href={link.route} className='flex gap-3'>
                <link.icon className='stroke-primary-500 ' />
                <Subheadline className='font-medium'>{link.label}</Subheadline>
              </Link>
            </button>
          ))}
        </div>

        <div className='bg-primaryPurple rounded-2xl min-h-32 my-3 p-4 mx-2'>
          <p className={cn(styles.needhelp, 'font-bold p-4 text-xl')}>Need help?</p>

          <p className='p-4'>
            <p className='text-black/70'> Feel free to write to an email:</p>
            <br />
            <span className='font-bold'>help@med.kz</span>
          </p>
        </div>
      </div>
    </List>
  )
}

export default Profile
