import React from 'react'
import Title from '../../../components/Title'
import Navigate from '../../../components/Navigate'

export default function TermsAndPrivacy() {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            <Title 
                title="By signing in or creating an account, you agree with our"
                size="text-[14px]"
                font="font-[400]"
            />
            <Navigate path="" className="hover:underline text-brand-primary">
                <Title 
                    title="Terms & conditions "
                    size="text-[14px]"
                    font="font-[400]"
                    color="text-brand-primary"
                />   
            </Navigate>
            <Title 
                title="and"
                size="text-[14px]"
                font="font-[400]"
            />
            <Navigate path="" className="hover:underline text-brand-primary">
                <Title 
                    title="Privacy statement"
                    size="text-[14px]"
                    font="font-[400]"
                    color="text-brand-primary"
                />   
            </Navigate>
        </div>
    )
}
