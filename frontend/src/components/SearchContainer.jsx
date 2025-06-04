import React from 'react'

export default function SearchContainer() {
    return (
        <div className='h-[60px] p-4 bg-white flex flex-row items-center justify-between shadow-md rounded-[16px]'>

            {/* get from location */}
            <div className='flex flex-col items-center cursor-pointer'>
                <div className='flex gap-1'>
                    <h1 className='text-gray-400 text-[20px]'>From:</h1>
                    <h1 className='text-primary text-[20px]'> Colombo</h1>
                </div>
                <h2 className='text-gray-400 text-[14px]'>Click here to change</h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* get to location */}
            <div className='flex flex-col items-center cursor-pointer'>
                <h1 className='text-black text-[20px]'>Destination</h1>
                <h2 className='text-gray-400 text-[14px]'>Search where you want to go</h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* get date */}
            <div className='flex flex-col items-center cursor-pointer'>
                <h1 className='text-black text-[20px]'>Date</h1>
                <h2 className='text-gray-400 text-[14px]'>Select date</h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* search button */}
            <div className='flex flex-col items-center cursor-pointer'>
                <div className='bg-orange-400 text-white p-2 rounded-lg'>
                    Search
                </div>
            </div>
        </div>
    )
}
