import React, { useState } from 'react';

export default function CardDetails() {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });

    const handleInputChange = (field, value) => {
        setCardData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    return (
        <div className="bg-surface-primary rounded-lg p-6 border border-brand-primary">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Card Details</h3>
            
            <div className="space-y-4">
                {/* Card Number */}
                <div>
                    <label className="block text-sm font-medium text-content-secondary mb-2">
                        Card Number
                    </label>
                    <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        maxLength="19"
                        className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                    />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', formatExpiry(e.target.value))}
                            maxLength="5"
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-content-secondary mb-2">
                            CVV
                        </label>
                        <input
                            type="text"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                            maxLength="4"
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                        />
                    </div>
                </div>

                {/* Cardholder Name */}
                <div>
                    <label className="block text-sm font-medium text-content-secondary mb-2">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={cardData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-content-primary"
                    />
                </div>
            </div>
        </div>
    );
}
