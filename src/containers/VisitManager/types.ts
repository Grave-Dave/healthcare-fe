import {Dayjs} from "dayjs";
import {AvailableTermStatusEnum} from "./constants.ts";

export interface VisitManagerPageReducerState {
    selectedDate: Dayjs
    selectedTermId: number | null
    allTerms: Dayjs[]
    visitItemsData: VisitItemInterface[]
    isCreateVisitDialogOpen: boolean
    locations: LocationInterface[]
    isLocationsSelectorLoading:boolean
    isLoading: boolean
    isCalendarLoading: boolean
}

export interface VisitItemInterface {
    id: number
    location: LocationInterface,
    date: string,
    time: string,
    status: AvailableTermStatusEnum
}

export interface LocationInterface {
    id: number,
    name: string
}
