
import {actions as staticActions} from './reducer';
const getTestValue = () => (dispatch, getState) =>{
    // const userId = getCurrentUserId(getState());
}

const asyncActions ={
    getTestValue
}

export default {
    ...asyncActions,
    ...staticActions,
};