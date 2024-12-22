import {get} from "lodash";
import dayjs, {Dayjs} from "dayjs";

import {actions as staticActions} from './reducer';
import Service from "./services/service.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
import {extractValidationMessages} from "../../utils/utils.ts";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {formatDayJs} from "./utils.ts";

dayjs.locale('pl');

const service = new Service();

const fetchAvailableTerms = (selectedDate: Dayjs) => (dispatch: any) => {
    dispatch(staticActions.setIsLoading(true))

    return service.getTerms(formatDayJs(selectedDate)).then((response) => {
        const terms = get(response, "data", [])

        const convertedTerms =  terms.map((term: any)=>({
            ...term,
            date: dayjs(term.date).format('dddd, D MMMM YYYY')
        }))
        console.log(convertedTerms)

        // todo improve term reducer state to add also locations and think about stored date format in db


        if (terms) {
            dispatch(staticActions.setVisitItemsData(terms))
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
    fetchAvailableTerms,
    addNewAvailableTerms,
    deleteAvailableTerm,
    createNewUserVisit,
}

export default {
    ...asyncActions,
    ...staticActions,
};
