// import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card'; // Adjust path as needed

const Icon = ({ type, className = "w-5 h-5" }) => {
    const paths = {
        location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
        card: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
        bell: "M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5m5-5v10",
        settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        money: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
        check: "M5 13l4 4L19 7",
        user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        dollar: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
        calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
        bulb: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        trend: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        chevron: "M19 9l-7 7-7-7"
    };
    
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[type]} />
        </svg>
    );
};

Icon.propTypes = {
    type: PropTypes.oneOf([
        'location', 'card', 'bell', 'settings', 'money', 'check', 
        'user', 'clock', 'dollar', 'calendar', 'edit', 'bulb', 'trend', 'chevron'
    ]).isRequired,
    className: PropTypes.string
};

const NotificationCard = ({ 
    icon, 
    bgColor, 
    title, 
    badge, 
    description, 
    metadata, 
    badgeColor = "bg-red-100 text-red-800",
    onAction
}) => {
    return (
        <Card>
            <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon type={icon} className={`w-5 h-5 ${bgColor.replace('bg-', 'text-').replace('-100', '-600')}`} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        {badge && (
                            <span className={`${badgeColor} text-xs px-2 py-1 rounded-full font-medium`}>
                                {badge}
                            </span>
                        )}
                    </div>
                    <p className="text-gray-700 mb-3">{description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        {metadata.map((item, index) => (
                            <span key={index} className={`flex items-center gap-1 ${item.color || ''}`}>
                                <Icon type={item.icon} className="w-4 h-4" />
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>
                <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => onAction && onAction()}
                >
                    <Icon type="chevron" />
                </button>
            </div>
        </Card>
    );
};

NotificationCard.propTypes = {
    icon: PropTypes.oneOf([
        'location', 'card', 'bell', 'settings', 'money', 'check', 
        'user', 'clock', 'dollar', 'calendar', 'edit', 'bulb', 'trend', 'chevron'
    ]).isRequired,
    bgColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    badge: PropTypes.string,
    description: PropTypes.string.isRequired,
    metadata: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            color: PropTypes.string
        })
    ).isRequired,
    badgeColor: PropTypes.string,
    onAction: PropTypes.func
};

export default NotificationCard;