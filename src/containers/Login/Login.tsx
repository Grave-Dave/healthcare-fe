import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Typography} from "@mui/material";

import {useStyles} from "./Login.style.ts";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import {LoginForm} from "./types.ts";
import {LOGIN_FORM_KEYS} from "./constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import FormInput from "../../reusableComponents/FormInput";
import PasswordAdornment from "../../reusableComponents/PasswordAdornment";
import {enterKeyListener} from "../../utils/utils.ts";
import {ROUTES} from "../../constants.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "../Login/selectors.ts";
import authSelectors from "../../auth/selectors.ts";
import actions from "../Login/actions.tsx";
import CircularLoader from "../../reusableComponents/CircularLoader";

const Login = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const loginForm = useAppSelector(selectors.getLoginForm);
    const loginFormError = useAppSelector(selectors.getLoginFormError)
    const isLoading = useAppSelector(authSelectors.getIsLoading)

    const [isSubmittable, setIsSubmittable] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const isFormFilled = Object.keys(loginForm).every(prop => {
            const key = prop as keyof LoginForm;
            return loginForm[key] !== undefined
                && loginForm[key] !== ''
                && loginFormError[key] === false;
        });

        setIsSubmittable(isFormFilled);
    }, [loginForm, loginFormError]);

    useEffect(() => {
        const callBackFn = (event: KeyboardEvent) => {
            if (isSubmittable) {
                enterKeyListener(event, handleOnSubmit)
            }
        };

        document.addEventListener("keydown", callBackFn);
        return () => {
            document.removeEventListener("keydown", callBackFn);
        };
    }, [loginForm]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleFormChange = (key: string, value: string) => {
        dispatch(actions.setLoginForm({key, value}))

        if (value.trim() === '') {
            dispatch(actions.setLoginFormError({[key]: true}))
        } else {
            dispatch(actions.setLoginFormError({[key]: false}))
        }
    }

    const handleOnSubmit = () => {
        dispatch(actions.login(loginForm, navigate))
    }

    const getForgotPasswordButton = () => {
        return (
            <AtomButton
                buttonVariant={AtomButtonVariants.LINK}
                text={'Nie pamiętasz hasła?'}
                link={ROUTES.PASSWORD_LINK}
                buttonClassName={classes.forgotPasswordBtn}
            />
        )
    }

    const getInput = (field: keyof LoginForm, fieldValue: string, label: string) => {
        return (
            field !== LOGIN_FORM_KEYS.PASSWORD
                ? <FormInput
                    required
                    autoFocus
                    error={loginFormError[field]}
                    label={label}
                    value={fieldValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleFormChange(field, event.target.value);
                    }}
                />
                : <FormInput
                    required
                    error={loginFormError[field]}
                    label={label}
                    value={fieldValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleFormChange(field, event.target.value);
                    }}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={<PasswordAdornment showPassword={showPassword} onClick={handleClickShowPassword}/>}
                />
        )
    }

    const inputsContainer = () => {
        return (
            <div className={classes.inputsContainer}>
                {getInput(LOGIN_FORM_KEYS.EMAIL, loginForm.email, 'Adres e-mail')}
                <div className={classes.passwordContainer}>
                    {getInput(LOGIN_FORM_KEYS.PASSWORD, loginForm.password, 'Hasło')}
                    {getForgotPasswordButton()}
                </div>
            </div>
        )
    }

    const actionsContainer = () => {
        return (
            <div className={classNames(classes.actionsContainer, {[classes.mobileActionsContainer]: isSmall})}>
                <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Zaloguj się'}
                            disabled={!isSubmittable || isLoading}
                            onClick={handleOnSubmit}/>
                <AtomButton buttonVariant={AtomButtonVariants.LINK}
                            link={ROUTES.REGISTER}
                            text={'lub zarejestruj się'}/>
            </div>
        )
    }

    return (
        <MyPaper withBackButton paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
            <Typography className={classes.loginHeader} variant="h2">Zaloguj się</Typography>
            <Scrollbars>
                {isLoading
                    ? <CircularLoader isLoading={isLoading}/>
                    : inputsContainer()}
            </Scrollbars>
            {actionsContainer()}
        </MyPaper>
    )
}

export default Login
