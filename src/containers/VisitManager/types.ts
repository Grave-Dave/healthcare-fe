import {Dayjs} from "dayjs";
import {VisitItemInterface} from "../UserVisitOverview/types.ts";

export type LocationType = {
    value: number,
    name: string
}

export interface VisitManagerPageReducerState {
    selectedDate: Dayjs
    selectedTermId: number | null
    visitItemsData: VisitItemInterface[]
    isCreateVisitDialogOpen: boolean
    isLoading: boolean
}
