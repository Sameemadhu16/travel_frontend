import React from 'react'
import Title from '../../../../components/Title'
import PrimaryButton from '../../../../components/PrimaryButton'
import { navigateTo } from '../../../../core/navigateHelper'

export default function PropertyCard({property}) {
    return (
        <div className='w-full border border-border-dark flex flex-col gap-4 items-center rounded-[8px] text-center flex-wrap justify-center p-4'>
            <property.icon 
                className='text-brand-secondary'
                size={60}/>
            <div className='h-[150px]'>
                    <Title
                        title={property.name}
                        size='text-[20px]'
                        font='font-[600]'
                    />
                    <Title
                        title={property.description}
                        size='text-[16px]'
                        font='font-[400]'
                    />
            </div>
            <PrimaryButton
                text='Register'
                onClick={() => navigateTo(property.path)}
            />
        </div>
    )
}
