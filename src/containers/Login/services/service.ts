import BaseService from "../../../services/base-service.ts";
import {LoginForm} from "../types.ts";

export default class Service extends BaseService {
    login(loginForm: LoginForm): Promise<boolean> {
        return this.post('/login', loginForm);
    }
}
