import {User} from "../../layouts/Layout/types.ts";
import {VisitItemInterface} from "../VisitManager/types.ts";

export interface VisitItemInterfaceWithUser extends VisitItemInterface {
    user: User
}

export type LocationItemType = {
    value: number,
    name: string
}
