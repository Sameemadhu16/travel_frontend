import React from 'react'
import BlurPage from './BlurPage';

export default function Spinner() {

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
};

    return (
        <BlurPage>
            <div className="w-full h-full flex items-center justify-center">
                <div className={`animate-spin rounded-full border-brand-primary border-4 border-t-transparent w-24 h-24`} />
            </div>
        </BlurPage>
    )
}
