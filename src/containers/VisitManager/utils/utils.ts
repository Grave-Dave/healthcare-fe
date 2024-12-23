import dayjs, {Dayjs} from "dayjs";

export const formatStringToCertainDayString = (dateString: string) => {
    return dayjs(dateString).locale('pl').format('DD')
}

export const formatStringToDayjsString = (dateString: string) => {
    return dayjs(dateString).locale('pl').format('dddd, D MMMM YYYY')
}

export const formatDayJsToString = (date: Dayjs) => {
    return date.toDate().toISOString().split('T')[0]
}
