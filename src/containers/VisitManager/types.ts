import {Dayjs} from "dayjs";

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
    status: boolean
}

export interface LocationInterface {
    id: number,
    name: string
}
