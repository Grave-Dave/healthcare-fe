import React, {useEffect, useState} from "react";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Typography} from "@mui/material";

import CircularLoader from "../../../../reusableComponents/CircularLoader";
import MyPaper from "../../../../reusableComponents/MyPaper";
import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {useStyles} from "./ChangePassword.style.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import FormInput from "../../../../reusableComponents/FormInput";
import PasswordAdornment from "../../../../reusableComponents/PasswordAdornment";
import {REGISTER_FORM_KEYS} from "../../../Register/constants.ts";
import {PasswordForm, PasswordFormError} from "../../types.ts";
import {BREAKPOINT_NUMBERS} from "../../../../layouts/Layout/constants.ts";
import {enterKeyListener} from "../../../../utils/utils.ts";
import authSelectors from "../../../../auth/selectors.ts";
import actions from "../../actions.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {ShowPassword} from "../../../Register/types.ts";

const ChangePassword = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {token} = useParams();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const isLoading = useAppSelector(authSelectors.getIsLoading)

    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get(REGISTER_FORM_KEYS.EMAIL);

    const [isSubmittable, setIsSubmittable] = useState(false);
    const [showPassword, setShowPassword] = useState<ShowPassword>({
        password: false,
        password_confirmation: false
    })

    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        password: '',
        password_confirmation: ''
    })

    const [error, setError] = useState<PasswordFormError>({
        password: false,
        password_confirmation: false
    })

    useEffect(() => {
        const isSubmittable = Object.keys(passwordForm).every(prop => {
            const key = prop as keyof PasswordForm;
            return passwordForm[key] !== undefined
                && passwordForm[key] !== ''
                && !error[key]
                && token
                && email;
        });

        setIsSubmittable(isSubmittable);
    }, [passwordForm, error]);

    useEffect(() => {
        const callBackFn = (event: KeyboardEvent) => {
            if (isSubmittable) {
                enterKeyListener(event, handlePasswordChange)
            }
        };

        document.addEventListener("keydown", callBackFn);
        return () => {
            document.removeEventListener("keydown", callBackFn);
        };
    }, [passwordForm]);

    const handlePasswordChange = () => {
        if (email && token) {
            dispatch(actions.resetPassword(passwordForm, email, token, navigate))
        }
    }

    const handleClickShowPassword = (field: keyof ShowPassword) => setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field]
    }));

    const handleFormChange = (key: string, value: string) => {
        setPasswordForm(prevState => ({
            ...prevState,
            [key]: value
        }))

        if (value.trim() === '') {
            setError(prevState => ({
                ...prevState,
                [key]: true
            }))
        } else {
            setError(prevState => ({
                ...prevState,
                [key]: false
            }))
        }
    }

    const getInput = (field: keyof PasswordForm, fieldValue: string, label: string) => {
        return (
            <FormInput
                required
                error={error[field]}
                label={label}
                value={fieldValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleFormChange(field, event.target.value);
                }}
                type={showPassword[field] ? 'text' : 'password'}
                endAdornment={<PasswordAdornment showPassword={showPassword[field]}
                                                 onClick={() => handleClickShowPassword(field)}/>}
            />
        )
    }

    const inputsContainer = () => {
        return (
            <div className={classes.inputsContainer}>
                {getInput(REGISTER_FORM_KEYS.PASSWORD, passwordForm.password, 'Hasło')}
                {getInput(REGISTER_FORM_KEYS.CONFIRMATION, passwordForm.password_confirmation, 'Powtórz hasło')}
            </div>
        )
    }

    return (
        <MyPaper withBackButton paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
            <Typography className={classes.changeHeader} variant="h2">Zmień hasło</Typography>
            <Scrollbars>
                {isLoading
                    ? <CircularLoader isLoading={isLoading}/>
                    : inputsContainer()}
            </Scrollbars>
            <div className={classNames(classes.buttonContainer, {[classes.mobileButtonContainer]: isSmall})}>
                <AtomButton
                    buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                    text={'Zmień hasło'}
                    disabled={!isSubmittable || isLoading}
                    onClick={handlePasswordChange}/>
            </div>
        </MyPaper>
    )
}

export default ChangePassword
