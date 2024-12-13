import {NavType} from "./types.ts";
import calendarIconWithPen from '../../../../public/images/calendar-lines-pen-svgrepo-com.svg'
import calendarIcon from '../../../../public/images/calendar-lines-svgrepo-com.svg'
import infoIcon from '../../../../public/images/file-info-alt-svgrepo-com.svg'
import mapIcon from '../../../../public/images/map-location-pin-svgrepo-com.svg'
import phoneIcon from '../../../../public/images/phone-office-svgrepo-com.svg'
import adminIcon from '../../../../public/images/user-shield-alt-1-svgrepo-com.svg'
import userIcon from '../../../../public/images/default-avatar.svg'
import logIcon from '../../../../public/images/logout-svgrepo-com.svg'

export const defaultNav: NavType[] = [
    {
        link: '/umow-wizyte',
        name: 'Umów wizytę',
        icon: calendarIconWithPen
    },
    {
        link: '/moje-wizyty',
        name: 'Moje wizyty',
        icon: calendarIcon
    },
    {
        link: '/o-mnie',
        name: 'O mnie',
        icon: infoIcon
    },
    {
        link: '/dojazd',
        name: 'Dojazd',
        icon: mapIcon
    },
    {
        link: '/kontakt',
        name: 'Kontakt',
        icon: phoneIcon
    },
]
export const adminNav: NavType[] = [
    {
        link: '/admin',
        name: 'Admin panel',
        icon: adminIcon
    },
    {
        link: '/kalendarz',
        name: 'Kalendarz',
        icon: calendarIconWithPen
    },
    {
        link: '/wizyty',
        name: 'Wizyty',
        icon: calendarIcon
    },
    {
        link: '/o-mnie',
        name: 'O mnie',
        icon: infoIcon
    },
    {
        link: '/dojazd',
        name: 'Dojazd',
        icon: mapIcon
    },
    {
        link: '/kontakt',
        name: 'Kontakt',
        icon: phoneIcon
    },
]

export const userItems: NavType[] = [
    {
        link: '/user',
        name: 'Mój profil',
        icon: userIcon
    },
    {
        link: '/',
        name: 'Wyloguj',
        icon: logIcon
    }
]

export const loginItem: NavType[] = [
    {
        link: '/login',
        name: 'Zaloguj',
        icon: logIcon
    }
]
