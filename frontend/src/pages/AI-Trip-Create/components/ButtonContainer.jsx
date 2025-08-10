export default function ButtonContainer({handleBack, handleNext}) {
    return (
        <div className='w-1/4 grid grid-cols-2 gap-2 mt-5 mb-5'>
            <SecondaryButton 
                text='Back'
                onClick={handleBack}
            />
            <PrimaryButton
                text='Next'
                onClick={handleNext}
            />
        </div>
    )
}
