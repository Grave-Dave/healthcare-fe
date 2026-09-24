import {VisitItemInterfaceWithUser} from "../UserVisitOverview/types.ts";

export interface AdminVisitOverviewPageReducerState {
    incomingPendingVisitsData: VisitItemInterfaceWithUser[],
    incomingConfirmedVisitsData: VisitItemInterfaceWithUser[],
    isLoading: boolean
}
