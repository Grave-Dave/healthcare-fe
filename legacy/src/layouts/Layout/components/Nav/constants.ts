import {NavType} from "./types.ts";
import {ROUTES} from "../../../../constants.ts";
import calendarIconWithPen from '../../../../public/images/calendar-lines-pen-svgrepo-com.svg'
import calendarIcon from '../../../../public/images/calendar-lines-svgrepo-com.svg'
import infoIcon from '../../../../public/images/file-info-alt-svgrepo-com.svg'
import mapIcon from '../../../../public/images/map-location-pin-svgrepo-com.svg'
import phoneIcon from '../../../../public/images/phone-office-svgrepo-com.svg'
import adminIcon from '../../../../public/images/user-shield-alt-1-svgrepo-com.svg'
import userIcon from '../../../../public/images/default-avatar.svg'
import logIcon from '../../../../public/images/logout-svgrepo-com.svg'
import homeIcon from '../../../../public/images/home-alt-svgrepo-com.svg'

export const defaultNav: NavType[] = [
    {
        path: ROUTES.MAKE_VISIT,
        name: 'Umów wizytę',
        icon: calendarIconWithPen
    },
    {
        path: ROUTES.MY_VISITS,
        name: 'Moje wizyty',
        icon: calendarIcon
    },
    {
        path: ROUTES.ABOUT_ME,
        name: 'O mnie',
        icon: infoIcon
    },
    {
        path: ROUTES.COMMUTE,
        name: 'Dojazd',
        icon: mapIcon
    },
    {
        path: ROUTES.CONTACT,
        name: 'Kontakt',
        icon: phoneIcon
    },
]
export const adminNav: NavType[] = [
    {
        path: ROUTES.ADMIN,
        name: 'Admin panel',
        icon: adminIcon
    },
    {
        path: ROUTES.CALENDAR,
        name: 'Kalendarz',
        icon: calendarIconWithPen
    },
    {
        path: ROUTES.VISITS,
        name: 'Wizyty',
        icon: calendarIcon
    },
    {
        path: ROUTES.ABOUT_ME,
        name: 'O mnie',
        icon: infoIcon
    },
    {
        path: ROUTES.COMMUTE,
        name: 'Dojazd',
        icon: mapIcon
    },
    {
        path: ROUTES.CONTACT,
        name: 'Kontakt',
        icon: phoneIcon
    },
]

export const userItems: NavType[] = [
    {
        path: ROUTES.USER,
        name: 'Mój profil',
        icon: userIcon
    },
    {
        path: ROUTES.HOME,
        name: 'Wyloguj',
        icon: logIcon
    }
]

export const loginItem: NavType[] = [
    {
        path: ROUTES.LOGIN,
        name: 'Zaloguj',
        icon: logIcon
    }
]

export const homeNavItem = {
    path: ROUTES.HOME,
    name: 'Strona główna',
    icon: homeIcon
}
