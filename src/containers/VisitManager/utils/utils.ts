import dayjs, {Dayjs} from "dayjs";

export const formatRegularStringToCertainDayString = (dateString: string) => {
    return dayjs(dateString).locale('pl').format('DD')
}

export const formatRegularStringToMyDateString = (dateString: string) => {
    return dayjs(dateString).locale('pl').format('dddd, D MMMM YYYY')
}

export const formatDayJsToRegularString = (date: Dayjs) => {
    return date.toDate().toISOString().split('T')[0]
}

export const formatDayjsToMyDateString = (selectedDate: Dayjs) => {
    return selectedDate?.locale('pl').format('dddd, D MMMM YYYY')
}

