import {formatRegularStringToMyDateString} from "../VisitManager/utils/utils.ts";
import {VisitItemInterfaceWithUser} from "./types.ts";

export const convertUserVisitData  = (userVisitsData: any): VisitItemInterfaceWithUser[] => {
    return userVisitsData.map((visit: any) => ({
        ...visit,
        date: formatRegularStringToMyDateString(visit.availableTerm.date),
        time: visit.availableTerm.time,
        location: visit.availableTerm.location
    }))
}