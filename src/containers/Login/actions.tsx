import {NavigateFunction} from "react-router-dom";
import {get} from "lodash";

import {actions as staticActions} from './reducer';
import layoutActions from '../../layouts/Layout/actions.tsx';
import Service from "./services/service.ts";
import {LoginForm} from "./types.ts";
import {ROUTES} from "../../constants.ts";
import {extractValidationMessages} from "../../utils/utils.ts";
import {
    DEFAULT_LOGIN_FORM,
    DEFAULT_LOGIN_FORM_ERROR,
} from "./constants.ts";

const service = new Service();

const login = (loginForm: LoginForm, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.login(loginForm).then((response) => {
        const access_token = get(response, "data.access_token", "")
        if (access_token) {
            localStorage.setItem('access_token', access_token)
        }
    }).then(() => {
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Zalogowano pomyślnie!',
            autoHideDuration: 5000
        }))
        dispatch(layoutActions.checkAuth())
        dispatch(staticActions.resetLoginForm(DEFAULT_LOGIN_FORM))
        dispatch(staticActions.resetLoginFormError(DEFAULT_LOGIN_FORM_ERROR))
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
    login
}

export default {
    ...asyncActions,
    ...staticActions,
};
