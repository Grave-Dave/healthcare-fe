import {Dayjs} from "dayjs";
import {get} from "lodash";
import {t} from "i18next";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import {CurrentMonthYearType} from "../../reusableComponents/VisitCalendar/types.ts";
import {
    formatDayJsToRegularString,
    formatRegularStringToCertainDayString,
} from "../VisitManager/utils/utils.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {convertUserVisitData} from "../UserVisitOverview/utils.ts";

const service = new Service();

const fetchMonthPastTerms = (currentMonthYear: CurrentMonthYearType) => (dispatch: any) => {
    dispatch(staticActions.setIsCalendarLoading(true))
    return service.getMonthPastTerms(currentMonthYear).then((response) => {
        const terms = get(response, "data", [])

        const convertedTerms = terms.map((term: string) => Number(formatRegularStringToCertainDayString(term)))

        if (convertedTerms) {
            dispatch(staticActions.setPastTerms(convertedTerms))
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

const fetchPastVisits = (selectedDate: Dayjs) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.getPastVisits(formatDayJsToRegularString(selectedDate)).then((response) => {
        const visits = get(response, "data", [])

        const convertedVisits = convertUserVisitData(visits)

        dispatch(staticActions.setPastVisitsData(convertedVisits))
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

const fetchUsers = (query: string) => (dispatch: any) => {
    dispatch(staticActions.setIsSelectorLoading(true))

    return service.getUsers(query).then((response) => {
        const users = get(response, "data", [])

        dispatch(staticActions.setUsersData(users))
    })
        .catch((error) => {
            dispatch(layoutActions.showSnackBar({
                message: t(extractValidationMessages(error)[0]) ?? error.message,
                autoHideDuration: 5000,
                type: SmoothSnackbarEnum.ERROR
            }))
        }).finally(() =>
            dispatch(staticActions.setIsSelectorLoading(false))
        )
}

const fetchUserVisits = (userId: number) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.getUserVisits(userId).then((response) => {
        const userVisits = get(response, "data", [])

        const convertedUserVisits = convertUserVisitData(userVisits)
        dispatch(staticActions.setUserVisitsData(convertedUserVisits))
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
    fetchMonthPastTerms,
    fetchPastVisits,
    fetchUsers,
    fetchUserVisits
}

export default {
    ...asyncActions,
    ...staticActions,
};
