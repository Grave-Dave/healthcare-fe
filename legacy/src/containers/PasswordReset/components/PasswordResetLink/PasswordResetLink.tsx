import React, {useEffect, useState} from "react";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Typography} from "@mui/material";

import FormInput from "../../../../reusableComponents/FormInput";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import AtomButton from "../../../../atoms/AtomButton";
import CircularLoader from "../../../../reusableComponents/CircularLoader";
import MyPaper from "../../../../reusableComponents/MyPaper";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {useStyles} from "./PasswordResetLink.style.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import {BREAKPOINT_NUMBERS} from "../../../../layouts/Layout/constants.ts";
import authSelectors from "../../../../auth/selectors.ts";
import actions from "../../actions.tsx";
import {enterKeyListener} from "../../../../utils/utils.ts";
import {DESCRIPTION, KEYWORDS, TITLE} from "../../constants.ts";
import Helmet from "../../../../reusableComponents/Helmet";

const PasswordResetLink = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const isLoading = useAppSelector(authSelectors.getIsLoading)

    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [isSubmittable, setIsSubmittable] = useState(false);

    useEffect(() => {
        const isSubmittable = () => {
            return email !== undefined
                && email !== ''
                && !error;
        }

        setIsSubmittable(isSubmittable);
    }, [email, error]);

    useEffect(() => {
        const callBackFn = (event: KeyboardEvent) => {
            if (isSubmittable) {
                enterKeyListener(event, handleSendResetLink)
            }
        };

        document.addEventListener("keydown", callBackFn);
        return () => {
            document.removeEventListener("keydown", callBackFn);
        };
    }, [email]);

    const handleEmailInput = (value: string) => {
        setEmail(value)

        if (value.trim() === '') {
            setError(true)
        } else {
            setError(false)
        }
    }

    const handleSendResetLink = () => {
        dispatch(actions.sendPasswordResetLink(email))
    }

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <MyPaper withBackButton paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
                <Typography className={classes.resetHeader} variant="h2">Zresetuj hasło</Typography>
                <Scrollbars>
                    {isLoading
                        ? <CircularLoader isLoading={isLoading}/>
                        : <div className={classes.inputContainer}>
                            <FormInput
                                required
                                autoFocus
                                error={error}
                                label={'Adres e-mail'}
                                value={email}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleEmailInput(event.target.value);
                                }}
                            />
                        </div>
                    }
                </Scrollbars>
                <div className={classNames(classes.buttonContainer, {[classes.mobileButtonContainer]: isSmall})}>
                    <AtomButton
                        buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                        text={'Zresetuj hasło'}
                        disabled={!isSubmittable || isLoading}
                        onClick={handleSendResetLink}/>
                </div>
            </MyPaper>
        </>
    )
}

export default PasswordResetLink
