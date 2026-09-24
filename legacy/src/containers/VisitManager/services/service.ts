import BaseService from "../../../services/api-service.ts";
import {CurrentMonthYearType} from "../../../reusableComponents/VisitCalendar/types.ts";
import {LocationItemType} from "../../UserVisitOverview/types.ts";

export default class Service extends BaseService {
    getTerms = (selectedDate: string): Promise<any> => {
        return this.post('/terms', {date: selectedDate});
    }

    getMonthTerms = (currentMonthYear: CurrentMonthYearType): Promise<any> => {

        return this.post('/month-terms', {month: currentMonthYear.month, year: currentMonthYear.year});
    }

    deleteTerm = (termId: number): Promise<any> => {

        return this.delete(`/term/${termId}`);
    }

    addAvailableTerms = (selectedDate: string, hourRange: number[], selectedLocation: LocationItemType): Promise<any> => {

        return this.post('/new-terms', {date: selectedDate, time: hourRange, locationId: selectedLocation.value});
    }

    getLocations = (): Promise<any> => {

        return this.get('/locations');
    }

    addNewVisit = (availableTermId: number): Promise<any> => {

        return this.post('/new-visit', {availableTermId});
    }
}
