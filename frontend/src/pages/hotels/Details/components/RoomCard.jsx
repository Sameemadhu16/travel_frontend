import React from 'react'
import Title from '../../../../components/Title'
import FormatText from '../../../../components/FormatText'

export default function RoomCard({room}) {
    return (
        <div className='border rounded-[8px]  overflow-hidden '>
            <div className='h-[400px] w-full'>
                <img 
                    className='h-full w-full object-cover'
                    src={room.images[0]} alt="room image" />
            </div>
            <div className='px-4'>
                <Title
                    title={room.roomType}
                    size='text-[24px]'
                />
                <div className='flex flex-wrap'>
                    <FormatText text={room.description}/>
                </div>
            </div>
        </div>
    )
}
