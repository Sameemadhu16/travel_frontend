import cover from '../../../assets/images/cover.png'
import CustomSelector from '../../../components/CustomSelector'
import Main from '../../../components/Main'
import SearchContainer from '../../../components/SearchContainer'
import Title from '../../../components/Title'
import { travelPlaces } from '../../../core/constant'

export default function Search() {

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <div className='w-full relative'>
                <img 
                    src={cover} 
                    alt="cover" 
                    className='h-full w-full object-fit'
                />
                <div>
                    <div className='absolute top-24 left-1/2 transform -translate-x-1/2 w-1/2'>
                        <SearchContainer/>
                    </div>
                </div>
            </div>
            <Main>
                <div className='flex gap-2 mt-5'>

                    {/* for filter */}
                    <div className='w-1/4'>

                    </div>

                    {/* for item list */}
                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between'>
                            <Title 
                                title='Kandy: 27 matches'
                                size='text-[16px]'
                            />
                            <CustomSelector
                                options={travelPlaces}
                                placeholder="Recommended"
                                onChange={handleSelect}
                            />
                        </div>
                    </div>
                </div>
            </Main>
        </>
        
    )
}
