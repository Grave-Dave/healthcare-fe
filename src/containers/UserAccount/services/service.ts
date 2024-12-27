import BaseService from "../../../services/api-service.ts";
import {RegisterForm} from "../../Register/types.ts";

export default class Service extends BaseService {
    updateUserAccount(userAccountForm: RegisterForm): Promise<any> {
        return this.post('/user-update', userAccountForm);
    }

    deleteUserAccount(): Promise<any> {
        return this.delete(`/user-delete`);
    }
}
