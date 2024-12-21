import BaseService from "../../../services/api-service.ts";
import {RegisterForm} from "../types.ts";

export default class Service extends BaseService {
    register(registerForm: RegisterForm): Promise<boolean> {
        return this.post('/register', registerForm);
    }
}
