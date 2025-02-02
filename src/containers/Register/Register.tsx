import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Checkbox, FormControlLabel, Typography} from "@mui/material";

import MyPaper from "../../reusableComponents/MyPaper";
import FormInput from "../../reusableComponents/FormInput";
import PasswordAdornment from "../../reusableComponents/PasswordAdornment";
import CircularLoader from "../../reusableComponents/CircularLoader";
import TermsAndConditions from "../../reusableComponents/TermsAndConditions";
import AtomButton from "../../atoms/AtomButton";
import {EMAIL_REGEX, REGISTER_FORM_KEYS} from "./constants.ts";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import {enterKeyListener} from "../../utils/utils.ts";
import {RegisterForm, ShowPassword} from "./types.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./Register.style.ts";
import selectors from "./selectors.ts";
import actions from "./actions.tsx";
import authSelectors from "../../auth/selectors.ts";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const Register = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const registerForm = useAppSelector(selectors.getRegisterForm);
    const registerFormError = useAppSelector(selectors.getRegisterFormError)
    const isLoading = useAppSelector(authSelectors.getIsLoading)

    const [isSubmittable, setIsSubmittable] = useState(false);
    const [isConditionChecked, setIsConditionChecked] = useState(false);
    const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
    const [showPassword, setShowPassword] = useState<ShowPassword>({
        password: false,
        password_confirmation: false
    })

    useEffect(() => {
        const isFormFilled = Object.keys(registerForm).every(prop => {
            const key = prop as keyof RegisterForm;
            return registerForm[key] !== undefined
                && registerForm[key] !== ''
                && registerFormError[key] === false;
        });

        setIsSubmittable(isFormFilled && isConditionChecked);
    }, [registerForm, registerFormError, isConditionChecked]);

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
    }, [registerForm]);

    const handleClickShowPassword = (field: keyof ShowPassword) => setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field]
    }));

    const handleFormChange = (key: string, value: string) => {
        dispatch(actions.setRegisterForm({key, value}))

        if (value.trim() === '') {
            dispatch(actions.setRegisterFormError({[key]: true}))
        } else {
            dispatch(actions.setRegisterFormError({[key]: false}))
        }
    }

    const handleCheckboxChange = () => {
        setIsConditionChecked(prevState => !prevState)
    }

    const validateEmail = () => {
        const emailRegEx = EMAIL_REGEX
        const emailText = registerForm.email || '';

        if (!emailRegEx.test(emailText)) {
            dispatch(actions.setRegisterFormError({email: true}))
        }
    }

    const validatePassword = () => {
        if (registerForm.password !== '' && registerForm.password_confirmation !== '') {
            if (registerForm.password !== registerForm.password_confirmation) {
                dispatch(actions.setRegisterFormError({password: true, password_confirmation: true}))
            } else {
                dispatch(actions.setRegisterFormError({password: false, password_confirmation: false}))
            }
        }
    }

    const handleOnSubmit = () => {
        dispatch(actions.register(registerForm, navigate))
    }

    const getInput = (field: keyof RegisterForm, fieldValue: string, label: string) => {

        switch (field) {
            case REGISTER_FORM_KEYS.PASSWORD:
            case REGISTER_FORM_KEYS.CONFIRMATION:
                return (
                    <FormInput
                        required
                        onBlur={() => validatePassword()}
                        error={registerFormError[field]}
                        label={label}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                        type={showPassword[field] ? 'text' : 'password'}
                        endAdornment={<PasswordAdornment showPassword={showPassword[field]}
                                                         onClick={() => handleClickShowPassword(field)}/>}
                    />)
            case REGISTER_FORM_KEYS.FIRST_NAME:
            case REGISTER_FORM_KEYS.LAST_NAME:
                return (
                    <FormInput
                        required
                        autoFocus={field === REGISTER_FORM_KEYS.FIRST_NAME && !isSmall}
                        error={registerFormError[field]}
                        label={label}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                    />
                )
            case REGISTER_FORM_KEYS.PHONE:
                return (
                    <FormInput
                        required
                        type='tel'
                        error={registerFormError[field]}
                        label={label}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                    />
                )
            case REGISTER_FORM_KEYS.EMAIL:
                return (
                    <FormInput
                        required
                        type='email'
                        onBlur={() => validateEmail()}
                        error={registerFormError[field]}
                        label={label}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                    />
                )
            default:
                break;
        }
    }

    const getConditionsCheckbox = () => {
        return (
            <FormControlLabel
                required
                control={<Checkbox checked={isConditionChecked} onChange={handleCheckboxChange} color="secondary"/>}
                label={<AtomButton
                    onClick={() => setIsTermsDialogOpen(true)}
                    buttonVariant={AtomButtonVariants.TEXT}
                    buttonClassName={classes.conditionsBtn}
                    text={'Warunki korzystania'}/>
                }/>
        )
    }

    const inputsContainer = () => {
        return (
            <div className={classes.inputsContainer}>
                {getInput(REGISTER_FORM_KEYS.FIRST_NAME, registerForm.firstName, 'Imię')}
                {getInput(REGISTER_FORM_KEYS.LAST_NAME, registerForm.lastName, 'Nazwisko')}
                {getInput(REGISTER_FORM_KEYS.EMAIL, registerForm.email, 'Adres e-mail')}
                {getInput(REGISTER_FORM_KEYS.PHONE, registerForm.phone, 'Telefon')}
                {getInput(REGISTER_FORM_KEYS.PASSWORD, registerForm.password, 'Hasło')}
                {getInput(REGISTER_FORM_KEYS.CONFIRMATION, registerForm.password_confirmation, 'Powtórz hasło')}
                {getConditionsCheckbox()}
            </div>
        )
    }

    const actionsContainer = () => {
        return (
            <div className={classNames(classes.actionsContainer, {[classes.mobileActionsContainer]: isSmall})}>
                <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Zarejestruj się'}
                            disabled={!isSubmittable || isLoading}
                            onClick={handleOnSubmit}/>
            </div>
        )
    }

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <MyPaper withBackButton={!isSmall} paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
                <Typography className={classes.registerHeader} variant="h2">Zarejestruj się</Typography>
                <Scrollbars>
                    {isLoading
                        ? <CircularLoader isLoading={isLoading}/>
                        : inputsContainer()}
                </Scrollbars>
                {actionsContainer()}
                <TermsAndConditions isOpen={isTermsDialogOpen} onClose={() => setIsTermsDialogOpen(false)}/>
            </MyPaper>
        </>
    )
}

export default Register
