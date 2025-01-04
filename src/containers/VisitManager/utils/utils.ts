import dayjs, {Dayjs} from "dayjs";

export const formatRegularStringToCertainDayString = (dateString: string) => {
    return dayjs(dateString).locale('pl').format('DD')
}

export const formatRegularStringToMyDateString = (dateString: string) => {
    return dayjs(dateString).locale('pl').format('dddd, D MMMM YYYY')
}

export const formatDayJsToRegularString = (date: Dayjs) => {
    return date.locale('pl').format('YYYY-MM-DD')
}

export const formatDayjsToMyDateString = (selectedDate: Dayjs) => {
    return selectedDate?.locale('pl').format('dddd, D MMMM YYYY')
}

