import Main from './Main'
import Title from '../components/Title'
import room from '../assets/rooms/room1.png'
import Navigate from './Navigate'
import { useSelector } from 'react-redux';
import { checkTokenExpiration } from '../core/authChecker';

export default function Header() {

    const { user, token } = useSelector((state) => state.auth);
    const isExpired = checkTokenExpiration(token);

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
                {
                    token && !isExpired && (
                        <div className='flex gap-1 items-center'>
                            <Navigate 
                                path={'/partner-details'} 
                                className='p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'
                            >
                                <Title
                                    title='List your property'
                                    size='text-[16px]'
                                    font='font-[500]'
                                />
                            </Navigate>
                            <div className='flex items-center w-[300px] gap-2 p-2 hover:bg-surface-tertiary cursor-pointer rounded-[8px]'>
                                <div className='h-[40px] w-[40px] border-2 border-brand-primary rounded-full overflow-hidden'>
                                    <img src={room} alt="room" className='h-full w-full object-cover'/>
                                </div>
                                <div className='flex flex-col overflow-hidden'>
                                    <Title
                                        title={user.data.email}
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
                    )
                }
            </div>
        </Main>
    )
}
