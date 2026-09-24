import {RootState} from "../../main.tsx";
import {REDUCER_KEY} from "./reducer.ts";

export const getIsLoading = (state: RootState) => state[REDUCER_KEY].isLoading;

export default {
    getIsLoading
}
