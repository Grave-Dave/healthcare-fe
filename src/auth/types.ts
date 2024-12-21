import {User} from "../layouts/Layout/types.ts";

export interface AuthReducerState {
    accessToken: string | null,
    isAuthenticated?: boolean
    isAdmin: boolean
    isLoading: boolean
    userState: {
        user: User
    }
}
