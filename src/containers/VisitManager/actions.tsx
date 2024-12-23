import {get} from "lodash";
import {Dayjs} from "dayjs";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
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
            message: extractValidationMessages(error)[0] ?? error.message,
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
                message: extractValidationMessages(error)[0] ?? error.message,
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
                message: extractValidationMessages(error)[0] ?? error.message,
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
    })
        .catch((error) => {
            dispatch(layoutActions.showSnackBar({
                message: extractValidationMessages(error)[0] ?? error.message,
                autoHideDuration: 5000,
                type: SmoothSnackbarEnum.ERROR
            }))
        }).finally(() =>
            dispatch(staticActions.setIsLoading(false))
        )
}

const createNewUserVisit = () => (dispatch: any) => {

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
            message: extractValidationMessages(error)[0] ?? error.message,
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
