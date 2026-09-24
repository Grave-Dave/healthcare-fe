import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import CircularLoader from "../../../../reusableComponents/CircularLoader";
import actions from "../../actions.tsx";
import layoutActions from "../../../../layouts/Layout/actions.tsx";
import {useAppDispatch} from "../../../../hooks/reduxHooks.ts";
import {SmoothSnackbarEnum} from "../../../../layouts/Layout/types.ts";
import {ROUTES} from "../../../../constants.ts";

export default function GoogleLoginSuccess() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');

    const displayNotification = () => {
        dispatch(layoutActions.showSnackBar({
            message: 'Wystąpił błąd z logowaniem przy użyciu konta Google...',
            type: SmoothSnackbarEnum.ERROR,
            autoHideDuration: 10000,
        }))
    }

    useEffect(() => {
        if (success) {
            dispatch(actions.loginWithGoogle(navigate))
        } else {
            displayNotification()
            navigate(ROUTES.LOGIN);
        }
    }, []);

    return <CircularLoader isLoading/>;
}
