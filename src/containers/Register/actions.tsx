import {NavigateFunction} from "react-router-dom";
import {get} from "lodash";

import {actions as staticActions} from './reducer';
import layoutActions from '../../layouts/Layout/actions.tsx';
import Service from "./services/service.ts";
import {RegisterForm} from "./types.ts";
import {ROUTES} from "../../constants.ts";
import {extractValidationMessages} from "../../utils/utils.ts";
import {DEFAULT_REGISTER_FORM, DEFAULT_REGISTER_FORM_ERROR} from "./constants.ts";

const service = new Service();

const register = (registerForm: RegisterForm, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.register(registerForm).then((response) => {
        const access_token = get(response, "data.access_token", "")
        if (access_token) {
            localStorage.setItem('access_token', access_token)
        }
    }).then(() => {
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Utworzono konto',
            autoHideDuration: 5000
        }))
        dispatch(layoutActions.checkAuth())
        dispatch(staticActions.resetRegisterForm(DEFAULT_REGISTER_FORM))
        dispatch(staticActions.resetRegisterFormError(DEFAULT_REGISTER_FORM_ERROR))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: extractValidationMessages(error)[0] ?? error.message,
            autoHideDuration: 5000
        }))
    }).finally(() =>
        dispatch(staticActions.setIsLoading(false))
    )
}

const asyncActions = {
    register
}

export default {
    ...asyncActions,
    ...staticActions,
};
