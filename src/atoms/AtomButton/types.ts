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
     * Button Link
     */
    link?: string;
    /**
     * Button Tooltip
     */
    withTooltip?: boolean;
    /**
     * Button Tooltip Text
     */
    tooltipText?: string;
    /**
     * Classes for button
     */
    buttonClassName?: string;
}
