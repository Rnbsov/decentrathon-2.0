'use client'

import { useMiniAppStore } from '@/core/store/MiniAppStore'
import { Avatar, Headline, List, Subheadline } from '@telegram-apps/telegram-ui'
import { Edit } from 'lucide-react'

function Profile() {
  const initData = useMiniAppStore((state) => state.initData)

  return (
    <List className='w-full min-h-screen text-black'>
      <h2  className='h2-bold flex-center'>
        Profile
      </h2>
      <div className='relative'>
        <div className='relative bg-primary/50  w-full h-32 rounded-xl'>
          <button className='bg-black/50 rounded-full p-2 absolute right-1 top-1'>
            <Edit className='stroke-white' size={18} />
          </button>
        </div>
        <div className='absolute left-1/2 top-[95%] transform -translate-x-1/2 -translate-y-1/2 flex-center flex-col'>
          <Avatar size={128} src={initData?.user?.photoUrl || 'https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649'} />
          <Headline weight='1'>{(initData?.user?.firstName ?? '') + ' ' + (initData?.user?.lastName ?? '')}</Headline>
          <Subheadline className='text-slate-500'>@{initData?.user?.username}</Subheadline>
        </div>
      </div>
    </List>
  )
}

export default Profile