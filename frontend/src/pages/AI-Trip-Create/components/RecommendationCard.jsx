import { FaStar } from 'react-icons/fa'

export default function RecommendationCard({ 
    icon: IconComponent, 
    title, 
    items, 
    isMissing, 
    missingMessage, 
    missingDescription,
    priceUnit,
    extraField,
    extraFieldLabel
}) {
    return (
        <div className="bg-white border border-border-light rounded-lg p-4">
            <h4 className="font-semibold text-content-primary mb-3 flex items-center">
                <IconComponent className="mr-2 text-brand-primary" />
                {title}
            </h4>
            <div className="space-y-3">
                {isMissing ? (
                    <div className="text-center py-6 bg-surface-secondary rounded-lg">
                        <IconComponent className="text-gray-400 text-3xl mx-auto mb-3" />
                        <p className="text-content-secondary font-medium mb-2">{missingMessage}</p>
                        <p className="text-sm text-content-secondary">
                            {missingDescription}
                        </p>
                    </div>
                ) : items?.map((item, i) => (
                    <div key={item.id || i} className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-content-primary">{item.name}</p>
                            <div className="flex items-center">
                                <FaStar className="text-warning text-xs mr-1" />
                                <span className="text-xs text-content-secondary">{item.rating} ({item.reviews}+ reviews)</span>
                            </div>
                            {extraField && item[extraField] && (
                                <p className="text-xs text-brand-primary">
                                    {extraFieldLabel ? `${extraFieldLabel}: ${item[extraField]}` : item[extraField]}
                                </p>
                            )}
                        </div>
                        <span className="text-sm font-bold text-brand-primary">LKR {item.price}/{priceUnit}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
