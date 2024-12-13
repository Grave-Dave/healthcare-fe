import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {rootReducer} from "../reducers";

const reducers = combineReducers(rootReducer);

const store = configureStore({
    reducer: {reducers}
});

export default store;

