import {NavigateFunction} from "react-router-dom";
import {get} from "lodash";
import {Dayjs} from "dayjs";
import {t} from "i18next";

import {actions as staticActions} from './reducer';
import layoutActions from "../../layouts/Layout/actions.tsx";
import visitActions from "../UserVisitOverview/actions.tsx";
import Service from "./services/service.ts";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {
    formatDayJsToRegularString,
    formatRegularStringToCertainDayString,
    formatRegularStringToMyDateString
} from "./utils/utils.ts";
import {CurrentMonthYearType} from "../../reusableComponents/VisitCalendar/types.ts";
import {getVisitItemsData} from "./selectors.ts";
import {VisitItemInterface} from "./types.ts";
import {LocationItemType} from "../UserVisitOverview/types.ts";
import {getUserIncomingVisitsData} from "../UserVisitOverview/selectors.ts";
import {ROUTES} from "../../constants.ts";


const service = new Service();

const fetchMonthAvailableTerms = (currentMonthYear: CurrentMonthYearType) => (dispatch: any) => {
    dispatch(staticActions.setIsCalendarLoading(true))
    return service.getMonthTerms(currentMonthYear).then((response) => {
        const terms = get(response, "data", [])

        const convertedTerms = terms.map((term: string) => Number(formatRegularStringToCertainDayString(term)))

        if (convertedTerms) {
            dispatch(staticActions.setFutureTerms(convertedTerms))
        }

    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(staticActions.setIsCalendarLoading(false))
    )
}

const fetchAvailableTerms = (selectedDate: Dayjs) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.getTerms(formatDayJsToRegularString(selectedDate)).then((response) => {
        const terms = get(response, "data", [])

        const convertedTerms = terms.map((term: VisitItemInterface) => ({
            ...term,
            date: formatRegularStringToMyDateString(term.date)
        }))

        if (convertedTerms) {
            dispatch(staticActions.setVisitItemsData(convertedTerms))
        }
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

const addNewAvailableTerms = (selectedDate: Dayjs, hourRange: number[], selectedLocation: LocationItemType) => (dispatch: any, getState: any) => {
    dispatch(staticActions.setIsLoading(true))
    const state = getState();
    const visitItemsData = getVisitItemsData(state)

    return service.addAvailableTerms(formatDayJsToRegularString(selectedDate), hourRange, selectedLocation).then((response) => {
        const newTerms = get(response, "data", [])

        const convertedNewTerms = newTerms.map((term: VisitItemInterface) => ({
            ...term,
            date: formatRegularStringToMyDateString(term.date)
        }))

        dispatch(staticActions.setVisitItemsData([...visitItemsData, ...convertedNewTerms]))
        dispatch(staticActions.setIsCreateVisitDialogOpen(false))
        dispatch(layoutActions.showSnackBar({
            message: 'Dodano nowe terminy!',
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

const deleteAvailableTerm = (termId: number) => (dispatch: any, getState: any) => {
    dispatch(staticActions.setIsLoading(true))
    const state = getState();
    const visitItemsData = getVisitItemsData(state)

    return service.deleteTerm(termId).then(() => {
        dispatch(staticActions.setVisitItemsData(visitItemsData.filter(visitItem => visitItem.id !== termId)))

        dispatch(layoutActions.showSnackBar({
            message: 'Termin został usunięty!',
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

const createNewUserVisit = (availableTermId: number, navigate: NavigateFunction) => (dispatch: any, getState: any) => {
    dispatch(staticActions.setIsLoading(true))
    const state = getState();
    const userIncomingVisitsData = getUserIncomingVisitsData(state)

    return service.addNewVisit(availableTermId).then((response) => {
        const newVisit = get(response, "data", [])

        dispatch(visitActions.setUserIncomingVisits(
            [...userIncomingVisitsData,
                {
                    ...newVisit,
                    date: formatRegularStringToMyDateString(newVisit.availableTerm.date),
                    time: newVisit.availableTerm.time,
                    location: newVisit.availableTerm.location
                }
            ]))
        dispatch(staticActions.setIsCreateVisitDialogOpen(false))
        navigate(ROUTES.MY_VISITS)
        dispatch(layoutActions.showSnackBar({
            message: 'Dodano nową wizytę!',
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
            dispatch(staticActions.setIsCreateVisitDialogOpen(false))
        }).finally(() =>
            dispatch(staticActions.setIsLoading(false))
        )
}

const fetchLocations = () => (dispatch: any) => {
    dispatch(staticActions.setIsLocationSelectorLoading(true))
    return service.getLocations().then((response) => {
        const locations = get(response, "data", [])

        if (locations) {
            dispatch(staticActions.setLocations(locations))
        }

    }).catch((error) => {
        dispatch(layoutActions.showSnackBar({
            message: t(extractValidationMessages(error)[0]) ?? error.message,
            autoHideDuration: 5000,
            type: SmoothSnackbarEnum.ERROR
        }))
    }).finally(() =>
        dispatch(staticActions.setIsLocationSelectorLoading(false))
    )
}


const asyncActions = {
    fetchMonthAvailableTerms,
    fetchAvailableTerms,
    addNewAvailableTerms,
    deleteAvailableTerm,
    createNewUserVisit,
    fetchLocations
}

export default {
    ...asyncActions,
    ...staticActions,
};
