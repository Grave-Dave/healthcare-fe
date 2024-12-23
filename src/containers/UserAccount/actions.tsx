import {NavigateFunction} from "react-router-dom";

import {actions as staticActions} from './reducer';
import layoutActions from '../../layouts/Layout/actions.tsx';
import authActions from "../../auth/actions.tsx";
import Service from "./services/service.ts";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {RegisterForm} from "../Register/types.ts";
import {ROUTES} from "../../constants.ts";

const service = new Service();

const updateAccount = (userDataForm: RegisterForm, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.updateUserAccount(userDataForm).then(() => {
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Zaktualizowano konto.',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: extractValidationMessages(error)[0] ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(staticActions.setIsLoading(false))
    )
}

const deleteAccount = (userId: number, navigate: NavigateFunction) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.deleteUserAccount(userId).then(() => {
        dispatch(authActions.logout())
        navigate(ROUTES.HOME)
        dispatch(layoutActions.showSnackBar({
            message: 'Usunięto konto.',
            autoHideDuration: 5000
        }))
    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: extractValidationMessages(error)[0] ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(staticActions.setIsLoading(false))
    )
}


const asyncActions = {
    updateAccount,
    deleteAccount
}

export default {
    ...asyncActions,
    ...staticActions,
};
