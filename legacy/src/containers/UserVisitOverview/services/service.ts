import BaseService from "../../../services/api-service.ts";

export default class Service extends BaseService {
    getUserVisits = (): Promise<any> => {
        return this.get('/user-visits');
    }

    deleteUserVisit = (visitId: number): Promise<any> => {
        return this.delete(`/delete-visit/${visitId}`);
    }
}
