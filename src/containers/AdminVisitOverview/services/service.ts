import BaseService from "../../../services/api-service.ts";

export default class Service extends BaseService {
    fetchAdminVisits = (): Promise<any> => {
        return this.get('/admin-visits');
    }

    updateVisit = (visitId: number): Promise<any> => {
        return this.post(`/update-visit/${visitId}`);
    }

    deleteVisit = (visitId: number, withTerm: boolean): Promise<any> => {
        return this.delete(`/admin-delete-visit/${visitId}`, {withTerm});
    }
}
