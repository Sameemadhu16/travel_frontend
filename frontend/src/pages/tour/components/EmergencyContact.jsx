import React from 'react';

export default function EmergencyContact() {
    return (
        <div className="bg-surface-primary rounded-lg border-l-4 border-danger p-6 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-content-primary mb-4">
                <span className="text-danger">📞</span>
                Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-danger" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-content-primary">+94 77 123 4567</p>
                        <p className="text-sm text-content-tertiary">24/7 Emergency</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-danger" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-content-primary">emergency@sri-lanka-tours.com</p>
                        <p className="text-sm text-content-tertiary">Email Support</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
