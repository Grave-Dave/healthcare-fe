import { ButtonProps, ButtonTypeMap} from "@mui/material";
import {WithStyles} from "@mui/styles";

import styles from "./AtomButton.style";
import {AtomButtonVariants} from "./constants.ts";

type MuiPropsButton = ButtonTypeMap['props'];

export interface AtomButtonExposedProps extends ButtonProps{
    /**
     * Button Variant
     */
    buttonVariant: AtomButtonVariants
    /**
     * Button Text
     */
    text: MuiPropsButton['children'];
    /**
     * Classes for button
     */
    buttonClassName?: string;
}

export type AtomButtonProps = AtomButtonExposedProps  & WithStyles<typeof styles>;
