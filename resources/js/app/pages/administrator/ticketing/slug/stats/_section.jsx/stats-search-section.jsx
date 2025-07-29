import React from 'react'

export default function StatsSearchSection() {
  return (
    <div className='flex gap-3 items-center justify-center justify-evenly w-full '>
        <div className='bg-red-500 w-full'>
            Location
        </div>
        <div className='bg-blue-500 w-full'>
            Department
        </div>
        <div className='bg-green-500 w-full'>
            Date
        </div>
         <div className='bg-fuchsia-500 w-full'>
            Search
        </div>
    </div>
  )
}
