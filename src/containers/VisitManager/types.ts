import {Dayjs} from "dayjs";
import {VisitItemInterface} from "../UserVisitOverview/types.ts";

export interface VisitManagerPageReducerState {
    selectedDate: Dayjs
    selectedTermId: number | null
    allTerms: Dayjs[]
    visitItemsData: VisitItemInterface[]
    isCreateVisitDialogOpen: boolean
    isLoading: boolean
    isCalendarLoading: boolean
}

export type LocationItemType = {
    value: number,
    name: string
}
