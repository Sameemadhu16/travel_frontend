import Main from './Main'
import Title from '../components/Title'
import room from '../assets/rooms/room1.png'
import ReserveOptions from './ReserveOptions'

export default function Header() {
    return (
        <Main>
            <div className='flex justify-between items-center mt-2'>
                <div>
                    <Title
                        title='travel.lk'
                        size='text-[28px]'
                        font='font-[600]'
                    />
                </div>
                <div className='flex gap-1 items-center'>
                    <div className='p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'>
                        <Title
                            title='List your property'
                            size='text-[16px]'
                            font='font-[500]'
                        />
                    </div>
                    <div className='flex items-center gap-2 p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'>
                        <div className='h-[40px] w-[40px] border-2 border-brand-primary rounded-full overflow-hidden'>
                            <img src={room} alt="room" className='h-full w-full object-cover'/>
                        </div>
                        <div className='flex flex-col'>
                            <Title
                                title='Sachith'
                                size='text-[16px]'
                                font='font-[600]'
                            />
                            <Title
                                title='Level 1'
                                size='text-[14px]'
                                font='font-[300]'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ReserveOptions/>
            </div>
        </Main>
    )
}
