import Main from './Main'
import Title from '../components/Title'

export default function Header() {
    return (
        <Main>
            <div className='flex justify-between'>
                <div>
                    <Title
                        title='travel.lk'
                        size='text-[28px]'
                        font='font-[600]'
                    />
                </div>
                <div>

                </div>
            </div>
        </Main>
    )
}
