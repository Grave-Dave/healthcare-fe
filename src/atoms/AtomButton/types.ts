import React from "react";

import {ButtonProps, ButtonTypeMap} from "@mui/material";

import {AtomButtonVariants} from "./constants.ts";

type MuiPropsButton = ButtonTypeMap['props'];

export interface AtomButtonProps extends ButtonProps {
    /**
     * The content of the button component.
     */
    children?: React.ReactNode;
    /**
     * Button Variant
     */
    buttonVariant: AtomButtonVariants
    /**
     * Button Text
     */
    text?: MuiPropsButton['children'];
    /**
     * Button Text
     */
    link?: string;
    /**
     * Classes for button
     */
    buttonClassName?: string;
}
