import {get} from "lodash";
import {t} from "i18next";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
import {extractValidationMessages} from "../../utils/utils.ts";
import {convertUserVisitData} from "./utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {getUserIncomingVisitsData} from "./selectors.ts";


const service = new Service();

const fetchUserVisits = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.getUserVisits().then((response) => {
        const userIncomingVisitsData = get(response, "data.incoming_visits", [])
        const userPastVisitsData = get(response, "data.past_visits", [])

        const incomingVisits = convertUserVisitData(userIncomingVisitsData)
        const pastVisits = convertUserVisitData(userPastVisitsData)

        dispatch(staticActions.setUserIncomingVisits(incomingVisits))
        dispatch(staticActions.setUserPastVisits(pastVisits))
    })
        .catch((error) => {
            dispatch(layoutActions.showSnackBar({
                message: t(extractValidationMessages(error)[0]) ?? error.message,
                autoHideDuration: 5000,
                type: SmoothSnackbarEnum.ERROR
            }))
        }).finally(() =>
            dispatch(staticActions.setIsLoading(false))
        )
}

const deleteUserVisit = (visitId: number) => (dispatch: any, getState: any) => {
    dispatch(staticActions.setIsLoading(true))
    const state = getState();
    const incomingVisitsData = getUserIncomingVisitsData(state)

    return service.deleteUserVisit(visitId).then(() => {

        dispatch(staticActions.setUserIncomingVisits(incomingVisitsData.filter(visit => visit.id !== visitId)))

        dispatch(layoutActions.showSnackBar({
            message: 'Wizyta została usunięta!',
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.SUCCESS
        }))
    })
        .catch((error) => {
            dispatch(layoutActions.showSnackBar({
                message: t(extractValidationMessages(error)[0]) ?? error.message,
                autoHideDuration: 5000,
                type: SmoothSnackbarEnum.ERROR
            }))
        }).finally(() =>
            dispatch(staticActions.setIsLoading(false))
        )
}

const asyncActions = {
    fetchUserVisits,
    deleteUserVisit
}

export default {
    ...asyncActions,
    ...staticActions,
};
