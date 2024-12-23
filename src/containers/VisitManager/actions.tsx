import {get} from "lodash";
import {Dayjs} from "dayjs";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {formatDayJsToString, formatStringToCertainDayString, formatStringToDayjsString} from "./utils/utils.ts";
import {VisitItemInterface} from "../UserVisitOverview/types.ts";
import {CurrentMonthYearType} from "../../reusableComponents/VisitCalendar/types.ts";


const service = new Service();

const fetchMonthAvailableTerms = (currentMonthYear: CurrentMonthYearType) => (dispatch: any) => {
    dispatch(staticActions.setIsCalendarLoading(true))
    return service.getMonthTerms(currentMonthYear).then((response) => {
        const terms = get(response, "data", [])

        const convertedTerms = terms.map((term: string) => Number(formatStringToCertainDayString(term)))

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

    return service.getTerms(formatDayJsToString(selectedDate)).then((response) => {
        const terms = get(response, "data", [])

        const convertedTerms = terms.map((term: VisitItemInterface) => ({
            ...term,
            date: formatStringToDayjsString(term.date)
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

const addNewAvailableTerms = () => (dispatch: any) => {

}

const deleteAvailableTerm = () => (dispatch: any) => {

}

const createNewUserVisit = () => (dispatch: any) => {

}


const asyncActions = {
    fetchMonthAvailableTerms,
    fetchAvailableTerms,
    addNewAvailableTerms,
    deleteAvailableTerm,
    createNewUserVisit,
}

export default {
    ...asyncActions,
    ...staticActions,
};
