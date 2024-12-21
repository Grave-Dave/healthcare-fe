import {NavigateFunction} from "react-router-dom";
import {get} from "lodash";

import {actions as staticActions} from './reducer';
import layoutActions from '../../layouts/Layout/actions.tsx';
import authActions from "../../auth/actions.tsx";
import Service from "./services/service.ts";
import {RegisterForm} from "./types.ts";
import {ROUTES} from "../../constants.ts";
import {extractValidationMessages} from "../../utils/utils.ts";
import {DEFAULT_REGISTER_FORM, DEFAULT_REGISTER_FORM_ERROR} from "./constants.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";

const service = new Service();

const register = (registerForm: RegisterForm, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(authActions.setIsLoading(true))

    return service.register(registerForm).then((response) => {
        const access_token = get(response, "data.access_token", "")
        if (access_token) {
            dispatch(authActions.setAccessToken(access_token))
        }
    }).then(() => {
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Utworzono konto',
            autoHideDuration: 5000
        }))
        dispatch(authActions.checkAuth())
        dispatch(staticActions.resetRegisterForm(DEFAULT_REGISTER_FORM))
        dispatch(staticActions.resetRegisterFormError(DEFAULT_REGISTER_FORM_ERROR))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: extractValidationMessages(error)[0] ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(authActions.setIsLoading(false))
    )
}

const asyncActions = {
    register
}

export default {
    ...asyncActions,
    ...staticActions,
};
