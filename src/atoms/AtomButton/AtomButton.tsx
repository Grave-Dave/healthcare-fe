import classNames from "classnames";
import {Link} from "react-router-dom";

import {Button} from "@mui/material";

import {AtomButtonProps} from "./types.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {AtomButtonVariants} from "./constants.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";

const getStylesForVariant = (buttonVariant: AtomButtonVariants, isMobile: boolean, isSmall: boolean) => {
    let stylesForVariant;
    let stylesForMobile;

    switch (buttonVariant) {
        case AtomButtonVariants.STANDARD_BUTTON_VARIANT:
            stylesForVariant = {}
            break;
        case AtomButtonVariants.TEXT:
            stylesForVariant = {
                color: theme.palette.secondary.contrastText,
                background: 'none',
                boxShadow: 'none',
                '&:hover': {
                    background: 'none',
                    boxShadow: 'none',
                    color: theme.palette.secondary.main,
                },
            }
            break;
        case AtomButtonVariants.LINK:
            stylesForVariant = {
                padding: 0,
                color: theme.palette.secondary.contrastText,
                background: 'none',
                boxShadow: 'none',
                '&:hover': {
                    background: 'none',
                    boxShadow: 'none',
                    color: theme.palette.secondary.main,
                },
            }
            break;
        case AtomButtonVariants.CANCEL:
            stylesForVariant = {
                background: 'none',
                boxShadow: 'none',
                color: theme.palette.error.main,
                '&:hover': {
                    background: 'none',
                    boxShadow: 'none',
                    color: theme.palette.error.light,
                }
            }
            break;
        case AtomButtonVariants.FLOATING_BUTTON_VARIANT:
            stylesForVariant = {
                position: isSmall ? 'fixed' : 'absolute',
                bottom: 15,
                right: isSmall ? 15 : '50%',
                transform: isSmall ? 'none' : 'translate(50%)',
                width: isSmall ? 60 : 250,
                textTransform: 'uppercase',
                borderRadius: 2,
                padding: theme.spacing(2, 3),
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px'
            }
            break;
        case AtomButtonVariants.CTA_BUTTON_VARIANT:
            stylesForVariant = {
                position: 'fixed',
                padding: theme.spacing(2, 3),
                textTransform: 'uppercase',
                width: 250,
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
        case isSmall && buttonVariant === AtomButtonVariants.FLOATING_BUTTON_VARIANT:
            stylesForMobile = {
                height: 64,
                borderRadius: '50%'
            }
            break;
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
                        children,
                        classes,
                        buttonVariant,
                        buttonClassName,
                        text,
                        link = '/',
                        ...otherProps
                    }: AtomButtonProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;
    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    let buttonText

    switch (buttonVariant) {
        case AtomButtonVariants.LINK:
            buttonText =
                <Link style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: theme.spacing(1, 2),
                    width: '100%'
                }}
                      to={link}>{text ?? children}</Link>
            break;
        default:
            buttonText = text
    }

    return (
        <Button
            variant={"contained"}
            sx={getStylesForVariant(buttonVariant, isMobile, isSmall)}
            fullWidth={isMobile && buttonVariant !== AtomButtonVariants.LINK}
            className={classNames(
                classes,
                buttonClassName,
            )}
            {...otherProps}>
            {buttonText}
        </Button>
    )
}

export default AtomButton;
