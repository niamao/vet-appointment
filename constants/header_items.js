import NotificationsIcon from '../public/assets/svg/nav_notifations.svg';
import NotificationsIconHovered from '../public/assets/svg/nav_notifations_hovered.svg';
import SettingsIcon from '../public/assets/svg/nav_settings.svg';
import SettingsIconHovered from '../public/assets/svg/nav_settings_hovered.svg';
import LogoutIcon from '../public/assets/svg/nav_logout.svg';
import LogoutIconHovered from '../public/assets/svg/nav_logout_hovered.svg';
import LogoutIconActive from '../public/assets/svg/nav_logout_active.svg';

export const HEADER_ITEMS = [
  { 
    name: 'Notifications', 
    icon: <NotificationsIcon alt="NotificationsIcon Icon" style={{ width: 36, height: 36 }} />, 
    activeIcon: <NotificationsIconHovered alt="NotificationsIcon Icon" fill="#FF630B" stroke="white" style={{ width: 36, height: 36 }} />, 
    hoveredIcon: <NotificationsIconHovered alt="NotificationsIcon Icon" fill="#FFE0CE" stroke="#FF630B" style={{ width: 36, height: 36 }} /> 
  },
  { 
    name: 'Settings', 
    icon: <SettingsIcon alt="SettingsIcon Icon" style={{ width: 36, height: 36 }} />, 
    activeIcon: <SettingsIconHovered alt="SettingsIcon Icon" fill="#FF630B" stroke="white" style={{ width: 36, height: 36 }} />, 
    hoveredIcon: <SettingsIconHovered alt="SettingsIcon Icon" fill="#FFE0CE" stroke="#FF630B" style={{ width: 36, height: 36 }} /> 
  },
  { 
    name: 'Logout', 
    icon: <LogoutIcon alt="LogoutIcon Icon" style={{ width: 36, height: 36 }} />, 
    activeIcon: <LogoutIconActive alt="LogoutIcon Icon" style={{ width: 36, height: 36 }} />, 
    hoveredIcon: <LogoutIconHovered alt="LogoutIcon Icon" style={{ width: 36, height: 36 }} /> 
  },
];