import classNames from "classnames";

import {Button} from "@mui/material";

import {AtomButtonProps} from "./types.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {AtomButtonVariants} from "./constants.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";

const getStylesForVariant = (buttonVariant: AtomButtonVariants, isMobile: boolean) => {
    let stylesForVariant;
    let stylesForMobile;

    switch (buttonVariant) {
        case AtomButtonVariants.STANDARD_BUTTON_VARIANT:
            stylesForVariant = {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                    backgroundColor:theme.palette.secondary.dark,
                },
            }
            break;
        case AtomButtonVariants.TEXT:
            stylesForVariant = {
                padding: theme.spacing(1),
                color:theme.palette.secondary.contrastText,
                background:'none',
                boxShadow:'none',
                '&:hover': {
                    background:'none',
                    boxShadow:'none',
                    color:theme.palette.secondary.main,
                },
            }
            break;
        case AtomButtonVariants.CANCEL:
            stylesForVariant = {
                padding: theme.spacing(1)
            }
            break;
        case AtomButtonVariants.FLOATING_BUTTON_VARIANT:
            stylesForVariant = {
                padding: theme.spacing(1)
            }
            break;
        case AtomButtonVariants.CTA_BUTTON_VARIANT:
            stylesForVariant = {
                position: 'fixed',
                padding: theme.spacing(2, 3),
                textTransform: 'uppercase',
                letterSpacing: 1,
                backgroundColor: theme.palette.secondary.main,
                transition: 'background-color .3s ease',
                '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                },
            }
            break;
        default:
            break;
    }

    switch (true) {
        case isMobile:
            stylesForMobile = {
                height: 60,
                borderRadius: 1
            }
            break;
        default:
            break;
    }

    return {
        ...stylesForVariant,
        ...stylesForMobile
    }
}

const AtomButton = ({
                        classes,
                        buttonVariant,
                        buttonClassName,
                        text,
                        ...otherProps
                    }: AtomButtonProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    return (
        <Button
            variant={"contained"}
            sx={getStylesForVariant(buttonVariant, isMobile)}
            fullWidth={isMobile}
            className={classNames(
                classes,
                buttonClassName,
            )}
            {...otherProps}>
            {text}
        </Button>
    )
}

export default AtomButton;