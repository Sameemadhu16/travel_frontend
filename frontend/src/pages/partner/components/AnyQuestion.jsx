import Navigate from '../../../components/Navigate'
import Title from '../../../components/Title'

export default function AnyQuestion() {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            <Title 
                title="Do you have questions about your property or the extranet? Visit"
                size="text-[14px]"
                font="font-[400]"
            />
            <Navigate path="" className="hover:underline text-brand-primary">
                <Title 
                    title=" Partner Help"
                    size="text-[14px]"
                    font="font-[400]"
                    color="text-brand-primary"
                />   
            </Navigate>
            <Title
                title="or ask another question on the"
                size="text-[14px]"
                font="font-[400]"
            />
            <Navigate path="" className="hover:underline text-brand-primary">
                <Title 
                    title="Partner Community."
                    size="text-[14px]"
                    font="font-[400]"
                    color="text-brand-primary"
                />   
            </Navigate>
        </div>
    )
}
