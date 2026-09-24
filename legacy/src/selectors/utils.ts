import _get from "lodash/get";

export function getNestedRoot<S = any>(reducerNames: string[] | string): (globalState: Object) => S {
    return function (state) {
        return typeof state === 'function'
            ? _get(state(), reducerNames)
            : _get(state, reducerNames);
    };
}
