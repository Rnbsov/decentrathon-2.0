import { cn } from '@/core/utils'

interface Props {
  className?: string
}

function SearchBar({ className }: Props) {
  return (
    <div className={cn(className, 'flex items-center bg-gray-100 rounded-2xl shadow-sm px-6 py-4')}>
      <input
        type='text'
        placeholder='Search Medicine & Health Products'
        className='flex-grow bg-transparent outline-none text-gray-600 placeholder-gray-400'
      />
      <button className='focus:outline-none'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-4.35-4.35M16.65 9.85A6.75 6.75 0 1113.75 3 6.75 6.75 0 0116.65 9.85z'
          />
        </svg>
      </button>
    </div>
  )
}

export { SearchBar }
