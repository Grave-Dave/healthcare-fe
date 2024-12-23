import BaseService from "../../../services/api-service.ts";
import {CurrentMonthYearType} from "../../../reusableComponents/VisitCalendar/types.ts";

export default class Service extends BaseService {
    getTerms = (selectedDate: string): Promise<any> => {

        return this.post('/terms', {date: selectedDate});
    }

    getMonthTerms = (currentMonthYear: CurrentMonthYearType): Promise<any> => {

        return this.post('/month-terms', {month:currentMonthYear.month, year: currentMonthYear.year});
    }
}
