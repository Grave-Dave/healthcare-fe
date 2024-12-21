import BaseService from "../../../services/api-service.ts";

export default class Service extends BaseService {
    checkAuth(): Promise<boolean> {
        return this.get('/user');
    }

    refreshAuth(): Promise<boolean> {
        return this.post('/auth/refresh');
    }

    logout(): Promise<boolean> {
        return this.post('/logout');
    }
}
