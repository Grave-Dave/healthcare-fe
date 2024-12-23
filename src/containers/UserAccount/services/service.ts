import BaseService from "../../../services/api-service.ts";
import {RegisterForm} from "../../Register/types.ts";

export default class Service extends BaseService {
    updateUserAccount(userAccountForm: RegisterForm): Promise<any> {
        return this.post('/update-account', userAccountForm);
    }

    deleteUserAccount(userId: number): Promise<any> {
        return this.delete(`/delete-account/${userId}`);
    }
}
