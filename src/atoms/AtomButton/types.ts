import {ButtonProps, ButtonTypeMap} from "@mui/material";

import {AtomButtonVariants} from "./constants.ts";

type MuiPropsButton = ButtonTypeMap['props'];

export interface AtomButtonProps extends ButtonProps {
    /**
     * Button Variant
     */
    buttonVariant: AtomButtonVariants
    /**
     * Button Text
     */
    text: MuiPropsButton['children'];
    /**
     * Button Text
     */
    link?: string;
    /**
     * Classes for button
     */
    buttonClassName?: string;
}
