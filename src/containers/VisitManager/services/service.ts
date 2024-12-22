import BaseService from "../../../services/api-service.ts";

export default class Service extends BaseService {
    getTerms = (selectedDate: string): Promise<any> => {

        return this.post('/terms', {date: selectedDate});
    }
}
