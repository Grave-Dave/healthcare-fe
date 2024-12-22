import {User} from "../../layouts/Layout/types.ts";

export interface VisitItemInterface {
    id: number
    address: string,
    date: string,
    time: string,
    status: boolean
}

export interface VisitItemInterfaceWithUser extends VisitItemInterface {
    user: User
}
