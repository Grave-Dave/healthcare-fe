import {get} from "lodash";
import {t} from "i18next";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {getIncomingConfirmedVisitsData, getIncomingPendingVisitsData} from "./selectors.ts";
import {convertUserVisitData} from "../UserVisitOverview/utils.ts";
import {UserVisitStatusEnum} from "../UserVisitOverview/constants.ts";


const service = new Service();

const fetchAdminVisits = () => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.fetchAdminVisits().then((response) => {
        const incomingPendingVisitsData = get(response, "data.incoming_pending_visits", [])
        const incomingConfirmedVisitsData = get(response, "data.incoming_confirmed_visits", [])

        const incomingPendingVisits = convertUserVisitData(incomingPendingVisitsData)
        const incomingConfirmedVisits = convertUserVisitData(incomingConfirmedVisitsData)

        dispatch(staticActions.setIncomingPendingVisits(incomingPendingVisits))
        dispatch(staticActions.setIncomingConfirmedVisits(incomingConfirmedVisits))
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

const updateVisit = (visitId: number,) => (dispatch: any, getState: any) => {
    dispatch(staticActions.setIsLoading(true))
    const state = getState();
    const incomingConfirmedVisits = getIncomingConfirmedVisitsData(state)
    const incomingPendingVisits = getIncomingPendingVisitsData(state)

    return service.updateVisit(visitId).then(() => {
        const updatedVisit = incomingPendingVisits.find(visit => visit.id === visitId)

        if (updatedVisit) {
            dispatch(staticActions.setIncomingPendingVisits(incomingPendingVisits.filter(visit => visit.id !== visitId)))

            dispatch(staticActions.setIncomingConfirmedVisits(
                [...incomingConfirmedVisits, {
                    ...updatedVisit,
                    status: UserVisitStatusEnum.Confirmed
                }])
            )
        }

        dispatch(layoutActions.showSnackBar({
            message: 'Wizyta została potwierdzona!',
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

const deleteVisit = (visitId: number, withTerm: boolean) => (dispatch: any, getState: any) => {
    dispatch(staticActions.setIsLoading(true))
    const state = getState();
    const incomingConfirmedVisits = getIncomingConfirmedVisitsData(state)
    const incomingPendingVisits = getIncomingPendingVisitsData(state)

    return service.deleteVisit(visitId, withTerm).then(() => {

        dispatch(staticActions.setIncomingConfirmedVisits(incomingConfirmedVisits.filter(visit => visit.id !== visitId)))
        dispatch(staticActions.setIncomingPendingVisits(incomingPendingVisits.filter(visit => visit.id !== visitId)))

        dispatch(layoutActions.showSnackBar({
            message: 'Wizyta została odwołana!',
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
    fetchAdminVisits,
    deleteVisit,
    updateVisit
}

export default {
    ...asyncActions,
    ...staticActions,
};
