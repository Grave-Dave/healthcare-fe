import BaseService from "../../../services/api-service.ts";
import {PasswordForm} from "../types.ts";

export default class Service extends BaseService {
    sendPasswordResetLink(email: string): Promise<any> {
        return this.post('/password/email', {email});
    }

    resetPassword({password, password_confirmation}: PasswordForm, email: string, token: string): Promise<any> {
        return this.post('/password/reset', {password, password_confirmation, email, token});
    }
}
