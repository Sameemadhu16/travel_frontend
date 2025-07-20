import React from 'react';
import Main from '../../components/Main';
import PaymentProgress from './components/PaymentProgress';
import PaymentMethodSelection from './components/PaymentMethodSelection';
import CardDetails from './components/CardDetails';
import BillingAddress from './components/BillingAddress';
import OrderSummary from './components/OrderSummary';
import SecurityFeatures from './components/SecurityFeatures';

export default function Payment() {
  return (
    <Main>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-content-primary mb-8">Tour Payment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Details */}
          <div className="lg:col-span-2 space-y-6  border-primary rounded-lg p-6">
            <PaymentProgress />
            <PaymentMethodSelection />
            <CardDetails />
            <BillingAddress />
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6  border-primary rounded-lg p-6">
            <OrderSummary />
            <SecurityFeatures />
          </div>
        </div>
      </div>
    </Main>
  );
}
