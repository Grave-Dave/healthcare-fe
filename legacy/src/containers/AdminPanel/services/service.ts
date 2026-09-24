import BaseService from "../../../services/api-service.ts";
import {CurrentMonthYearType} from "../../../reusableComponents/VisitCalendar/types.ts";

export default class Service extends BaseService {
    getMonthPastTerms = (currentMonthYear: CurrentMonthYearType): Promise<any> => {
        return this.post('/admin-month-terms', {month: currentMonthYear.month, year: currentMonthYear.year});
    }

    getPastVisits = (selectedDate: string): Promise<any> => {
        return this.post('/admin-visits', {date: selectedDate});
    }

    getUsers = (query: string): Promise<any> => {
        return this.get(`/users?limit=5&q=${query}&order=firstName`);
    }

    getUserVisits = (userId: number): Promise<any> => {
        return this.get(`/admin-user-visits/${userId}`);
    }

    impersonateUser = (userId: number): Promise<any> => {
        return this.post(`/impersonate/${userId}`);
    }
}
