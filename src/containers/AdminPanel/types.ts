import {VisitItemInterfaceWithUser} from "../UserVisitOverview/types.ts";
import  {Dayjs} from "dayjs";
import {User} from "../../layouts/Layout/types.ts";

export interface AdminPanelPageReducerState {
    selectedDate: Dayjs,
    pastTerms: number[],
    pastVisitsData: VisitItemInterfaceWithUser[],
    userVisitsData: VisitItemInterfaceWithUser[],
    usersData: User[],
    isSelectorLoading: boolean,
    isLoading: boolean,
    isCalendarLoading: boolean
}