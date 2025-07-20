import React from 'react';

export default function OrderSummary() {
    const tourItems = [
        {
            name: 'Sri Lanka Heritage Tour',
            duration: '7 Days / 6 Nights',
            guests: 2,
            price: 1299.99
        },
        {
            name: 'Professional Guide',
            duration: 'Full Tour',
            guests: 1,
            price: 249.99
        }
    ];

    const subtotal = tourItems.reduce((sum, item) => sum + (item.price * item.guests), 0);
    const serviceFee = 75.00;
    const tax = 156.50;
    const total = subtotal + serviceFee + tax;

    return (
        <div className="bg-surface-primary rounded-lg p-6 border border-brand-primary">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Tour Summary</h3>
            
            {/* Tour Items */}
            <div className="space-y-4 mb-6">
                {tourItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                            <span className="text-brand-primary">🏛️</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-content-primary">{item.name}</h4>
                            <p className="text-sm text-content-tertiary">{item.duration}</p>
                            <p className="text-xs text-content-tertiary">{item.guests} Guest{item.guests > 1 ? 's' : ''}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-content-primary">${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-border-light pt-4 space-y-3">
                <div className="flex justify-between text-content-secondary">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-content-secondary">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-content-secondary">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border-light pt-3">
                    <div className="flex justify-between text-lg font-bold text-content-primary">
                        <span>Total</span>
                        <span className="text-brand-primary">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-content-tertiary mt-1">USD</p>
                </div>
            </div>

            {/* Pay Now Button */}
            <button className="w-full bg-brand-primary hover:opacity-90 text-surface-primary font-semibold py-4 px-6 rounded-lg transition-opacity mt-6 flex items-center justify-center space-x-2">
                <span>✈️</span>
                <span>Pay Now</span>
            </button>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-start space-x-2">
                    <span className="text-warning">🔒</span>
                    <div>
                        <p className="text-xs text-content-secondary">
                            Your payment is secured with 256-bit SSL encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
