import {Dayjs} from "dayjs";

export const formatDayJs = (date: Dayjs) => {
    return date.toDate().toISOString().split('T')[0]
}

