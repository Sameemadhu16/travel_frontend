import React, { useState } from 'react';

export default function PaymentMethodSelection() {
    const [selectedMethod, setSelectedMethod] = useState('card');

    return (
        <div className="bg-surface-primary rounded-lg p-6 border border-brand-primary">
            <h3 className="text-lg font-semibold text-content-primary mb-4">Payment Method</h3>
            
            <div className="space-y-3">
                {/* Credit/Debit Card */}
                <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMethod === 'card' 
                            ? 'border-brand-primary bg-surface-secondary' 
                            : 'border-border-light hover:border-border-medium'
                    }`}
                    onClick={() => setSelectedMethod('card')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="payment-method"
                                checked={selectedMethod === 'card'}
                                onChange={() => setSelectedMethod('card')}
                                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-border-light"
                            />
                            <div>
                                <p className="font-medium text-content-primary">Credit or Debit Card</p>
                                <p className="text-sm text-content-tertiary">Visa, Mastercard, American Express</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                VISA
                            </div>
                            <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                MC
                            </div>
                        </div>
                    </div>
                </div>

                {/* PayPal */}
                <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedMethod === 'paypal' 
                            ? 'border-brand-primary bg-surface-secondary' 
                            : 'border-border-light hover:border-border-medium'
                    }`}
                    onClick={() => setSelectedMethod('paypal')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                name="payment-method"
                                checked={selectedMethod === 'paypal'}
                                onChange={() => setSelectedMethod('paypal')}
                                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-border-light"
                            />
                            <div>
                                <p className="font-medium text-content-primary">PayPal</p>
                                <p className="text-sm text-content-tertiary">Pay with your PayPal account</p>
                            </div>
                        </div>
                        <div className="w-16 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                            PayPal
                        </div>
                    </div>
                </div>

                
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-surface-secondary rounded-lg border border-border-light">
                <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-brand-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                        <p className="text-sm font-medium text-content-primary">Secure Payment</p>
                        <p className="text-xs text-content-tertiary">All payments are secured with 256-bit SSL encryption</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
