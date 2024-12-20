import BaseService from "../../../services/base-service.ts";

export default class Service extends BaseService {
    checkAuth(): Promise<boolean> {
        return this.get('/user');
    }

    checkAdmin(): Promise<boolean> {
        return this.get('/admin');
    }

    logout(): Promise<boolean> {
        return this.post('/logout');
    }
}
