import {User} from "../../layouts/Layout/types.ts";

export interface VisitItemInterface {
    id: number
    location: Location,
    date: string,
    time: string,
    status: boolean
}

export interface VisitItemInterfaceWithUser extends VisitItemInterface {
    user: User
}

export interface Location {
    id: number,
    name: string
}
