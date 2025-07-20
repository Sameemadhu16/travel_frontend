import React from 'react';
import PropTypes from 'prop-types';
import Card from './guideComponents/Card';
import Main from '../../components/Main';
import PrimaryButton from '../../components/PrimaryButton';
import NotificationCard from './guideComponents/NotificationCard';
import NavBar from './guideComponents/NavBar';

const Notifications = () => {
  const notifications = [
    {
      icon: 'location',
      bgColor: 'bg-orange-100',
      title: 'New Tour Request',
      badge: 'NEW',
      description: 'Thusitha has requested a 3-day historical tour of Kandy starting August 15th, 2025.',
      metadata: [{ icon: 'clock', text: '5 minutes ago' }],
    },
    {
      icon: 'card',
      bgColor: 'bg-green-100',
      title: 'Payment Confirmed',
      badge: 'PAID',
      badgeColor: 'bg-green-100 text-green-800',
      description: 'Payment of Rs. 31000 received for Arugambay Tour with Nimal.',
      metadata: [{ icon: 'clock', text: '2 hours ago' }],
    },
    {
      icon: 'bell',
      bgColor: 'bg-blue-100',
      title: 'Tour Reminder',
      badge: 'REMINDER',
      description: "Nuwaraeliya Tour with Sarath starts tomorrow at 9:00 AM. Meeting point: St. Mark's Square.",
      metadata: [{ icon: 'clock', text: '4 hours ago' }],
    },
    {
      icon: 'location',
      bgColor: 'bg-orange-100',
      title: 'Tour Request Updated',
      badge: null,
      description: 'David Thompson has modified his Paris Art Tour request. New date: December 20th, 2024.',
      metadata: [{ icon: 'clock', text: '6 hours ago' }],
    },
  ];

  return (
    <div className="flex">
      <div className="sticky top-0 h-fit">
        <NavBar />
      </div>
      <div className="flex-1">
        <Main hasNavbar={true}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">Notification Center</h1>
              <p className="text-gray-600 mb-6">Stay updated with your tour guide activities</p>
            </div>
            <div className="min-w-0">
              <PrimaryButton text={'Mark all read'} type="button" className="text-base" />
            </div>
          </div>
          <div className="space-y-4">
            {notifications.map((notification, i) => (
              <NotificationCard key={i} {...notification} />
            ))}
          </div>
        </Main>
      </div>
    </div>
  );
};

export default Notifications;
