'use client'

import { backButton } from '@telegram-apps/sdk-react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

import { Page } from '@/components/Page'
import { SearchBar } from '@/components/SearchBar/SearchBar'

function Pharmacy() {
  useEffect(() => {
    backButton.mount()
    return () => {
      backButton.hide()
    }
  }, [])

  return (
    <Page>
      <SearchBar className='mt-3' />

      <div className='p-4 flex-center flex-col'>
        <div className='bg-primaryPurple p-6 rounded-2xl shadow-md max-w-sm w-full'>
          <h2 className='text-lg font-bold text-gray-800 mb-2'>UPLOAD PRESCRIPTION</h2>
          <p className='text-black mb-4'>Upload a Prescription and Tell Us what you Need. We do the Rest.!</p>
          <div className='flex-between'>
            <p className='text-sm font-bold text-gray-800 mb-6'>
              FLAT 25% OFF <br /> ON MEDICINES*
            </p>
            <button className='bg-[#5b49de] text-white font-bold py-2 px-6 rounded-2xl hover:bg-purple-700 focus:outline-none'>
              ORDER NOW
            </button>
          </div>
        </div>

        <div className='bg-[#C7F4C2] p-6 rounded-2xl font-nunito shadow-md flex items-center justify-between mt-2 w-full'>
          <div className='max-w-xs'>
            <div className='flex items-end'>
              <div className='flex'>
                <p className='text-sm font-bold text-gray-800 tracking-wide mb-1 [writing-mode:sideways-lr]'>UPTO</p>
                <h2 className='text-5xl font-extrabold text-gray-800 mb-1'>80%</h2>
              </div>

              {/* Offer text positioned at the bottom right */}
            </div>
            <p className='right-0 bottom-0 text-sm text-gray-600 ml-14'>OFFER*</p>
            <p className='text-lg font-bold text-gray-800 mb-4'>On Health Products</p>

            <button className='bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 focus:outline-none mb-2'>
              SHOP NOW
            </button>

            <p className='text-sm text-gray-600'>
              Homeopathy, Ayurvedic, <br /> Personal Care & More
            </p>
          </div>

          {/* Right Section: Medicine Images */}
          <div className='relative flex items-end space-x-2'>
            {/* Green Circle/Blob */}
            <div className='absolute bg-[#dff7d9] rounded-full size-28 -right-5 -top-8 z-0'></div>

            <Image src='/medecines.png' alt='Product 1' height={128} width={156} className='relative z-10' />
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-3 font-nunito'>
          <div className='flex-between'>
            <h2 className='text-[25px] font-bold leading-[140%] tracking-tighter text-black'>Popular Categories</h2>
            <div className='flex'>
              <button className='text-black'>See all</button>
              <ChevronRight className='stroke-black' />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            {[
              { title: 'Homeopathy', imageSrc: '/lemonlimeelectrolyte_png.png' },
              { title: 'Ayurvedic', imageSrc: '/c2.png' },
              { title: 'Vitamins & Supplement', imageSrc: '/c3.png' },
              { title: 'Herbal', imageSrc: '/c4.png' },
              { title: 'Supplements', imageSrc: '/c5.png' },
              { title: 'Diabetes Care', imageSrc: '/c6.png' }
            ].map((category) => (
              <div className='flex flex-col gap-2 items-center' key={category.title}>
                <div className='w-16 h-16 border-[#EFEDE9] border-[1.5px] rounded-xl p-2'>
                  <Image
                    src={category.imageSrc}
                    alt={category.title}
                    width={64}
                    height={64}
                    className='object-cover w-full h-full'
                  />
                </div>
                <p className='text-black font-semibold text-center'>{category.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Pharmacy
