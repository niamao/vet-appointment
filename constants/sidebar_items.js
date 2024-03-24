import HomeIcon from '../public/assets/svg/ic_contacts.svg';
import AppointmentsIcon from '../public/assets/svg/ic_appointments.svg';
import MessagesIcon from '../public/assets/svg/ic_messages.svg';
import ContactsIcon from '../public/assets/svg/ic_contacts.svg';
import DataAnalyticsIcon from '../public/assets/svg/ic_data_analytics.svg';
import SubscriptionIcon from '../public/assets/svg/ic_subscription.svg';
import HelpCenterIcon from '../public/assets/svg/ic_help_center.svg';
import SettingsIcon from '../public/assets/svg/ic_settings.svg';

export const SIDEBAR_ITEMS = [
  { name: 'Home', url: '/home', icon: <HomeIcon alt="Home Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <HomeIcon alt="Home Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Appointments', url: '/appointments', icon: <AppointmentsIcon alt="Appointments Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <AppointmentsIcon alt="Appointments Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Messages', url: '/messages', icon: <MessagesIcon alt="Messages Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <MessagesIcon alt="Messages Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Contacts', url: '/contacts', icon: <ContactsIcon alt="Contacts Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <ContactsIcon alt="Contacts Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Data Analytics', url: '/analytics', icon: <DataAnalyticsIcon alt="Data Analytics Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <DataAnalyticsIcon alt="Data Analytics Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Subscription', url: '/subscription', icon: <SubscriptionIcon alt="Subscription Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <SubscriptionIcon alt="Subscription Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Help Center', url: '/help', icon: <HelpCenterIcon alt="Help Center Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <HelpCenterIcon alt="Help Center Icon" fill="#FF630B" style={{ width: '20px' }} /> },
  { name: 'Settings', url: '/settings', icon: <SettingsIcon alt="Settings Icon" fill="white" style={{ width: '20px' }} />, activeIcon: <SettingsIcon alt="Settings Icon" fill="#FF630B" style={{ width: '20px' }} /> }
];