import Title from '../../../../components/Title'

export default function ReviewCard({review}) {
    return (
        <div className='border-2 p-4 border-brand-primary w-full rounded-[8px]'>
            <Title
                title={review.quote}
                size='text-[16px]'
                font='font-[400]'
            />
            <div className='flex mt-5 items-center gap-4'>
                <div className='h-14 w-14 rounded-full overflow-hidden'>
                    <img 
                        className='h-full w-full object-cover'
                        src={review.img} 
                        alt="user image" 
                    />
                </div>
                <div className='flex flex-col'>
                    <Title
                        title={review.author}
                        size='text-[16px]'
                        font='font-[600]'
                    />
                    <Title
                        title={review.affiliation}
                        size='text-[16px]'
                        font='font-[400]'
                        color='text-content-secondary'
                    />
                </div>
            </div>
        </div>
    )
}
