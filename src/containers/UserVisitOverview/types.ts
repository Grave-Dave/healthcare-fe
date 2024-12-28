import {User} from "../../layouts/Layout/types.ts";
import {VisitItemInterface} from "../VisitManager/types.ts";
import {UserVisitStatusEnum} from "./constants.ts";

export interface VisitOverviewPageReducerState {
    userIncomingVisitsData: VisitItemInterfaceWithUser[],
    userPastVisitsData: VisitItemInterfaceWithUser[],
    isLoading: boolean
}

export interface VisitItemInterfaceWithUser extends Omit<VisitItemInterface, 'status'> {
    user: User
    status: UserVisitStatusEnum
}

export type LocationItemType = {
    value: number,
    name: string
}
