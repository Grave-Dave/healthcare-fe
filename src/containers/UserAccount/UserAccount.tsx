import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Typography} from "@mui/material";

import MyPaper from "../../reusableComponents/MyPaper";
import CircularLoader from "../../reusableComponents/CircularLoader";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./UserAccount.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import {RegisterForm, RegisterFormError, ShowPassword} from "../Register/types.ts";
import {DEFAULT_REGISTER_FORM, EMAIL_REGEX, REGISTER_FORM_KEYS} from "../Register/constants.ts";
import FormInput from "../../reusableComponents/FormInput";
import PasswordAdornment from "../../reusableComponents/PasswordAdornment";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "./selectors.ts";
import authSelectors from "../../auth/selectors.ts";
import {enterKeyListener} from "../../utils/utils.ts";
import actions from "./actions.tsx";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {checkFormStillKeepsInitialValues} from "./utils.ts";
import DeleteAccountDialog from "./components/DeleteAccountDialog";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const UserAccount = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const user = useAppSelector(authSelectors.getUser);
    const userDataForm = useAppSelector(selectors.getUserDataForm);
    const userDataFormError = useAppSelector(selectors.getUserDataFormError)
    const isLoading = useAppSelector(selectors.getIsLoading)
    const userBaseData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    }

    const formDataToCheck = Object.keys(userDataForm).filter(prop => prop !== REGISTER_FORM_KEYS.PASSWORD && prop !== REGISTER_FORM_KEYS.CONFIRMATION)
    const passwordToCheck = Object.keys(userDataForm)
        .filter(prop => prop === REGISTER_FORM_KEYS.PASSWORD || prop === REGISTER_FORM_KEYS.CONFIRMATION)

    const [isSubmittable, setIsSubmittable] = useState(false);
    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false)
    const [showPassword, setShowPassword] = useState<ShowPassword>({
        password: false,
        password_confirmation: false
    })

    useEffect(() => {
        dispatch(actions.setUserDataForm(userBaseData))
        return () => {
            dispatch(actions.resetUserDataForm(DEFAULT_REGISTER_FORM))
        }
    }, [])

    useEffect(() => {
        const isUserFormDataChanged = !checkFormStillKeepsInitialValues(formDataToCheck, userDataForm, userBaseData)

        const isPasswordChanged = passwordToCheck.every(prop => {
            const key = prop as keyof RegisterForm;
            return userDataForm[key] !== undefined
                && userDataForm[key] !== ''
        })

        const isFilledProperly = Object.keys(userDataFormError).every(prop => {
            const key = prop as keyof RegisterFormError;
            return userDataFormError[key] === false
        })

        setIsSubmittable(isFilledProperly && (isUserFormDataChanged || isPasswordChanged));
    }, [userDataForm, userDataFormError]);

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
    }, [userDataForm]);

    const handleClickShowPassword = (field: keyof ShowPassword) => setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field]
    }));

    const handleFormChange = (key: string, value: string) => {
        dispatch(actions.setUserDataFormInput({key, value}))

        if (value.trim() === '') {
            dispatch(actions.setUserDataFormError({[key]: true}))
        } else {
            dispatch(actions.setUserDataFormError({[key]: false}))
        }
    }

    const validateEmail = () => {
        const emailRegEx = EMAIL_REGEX
        const emailText = userDataForm.email || '';

        if (!emailRegEx.test(emailText)) {
            dispatch(actions.setUserDataFormError({email: true}))
        }
    }

    const validatePassword = () => {
        if (userDataForm.password !== userDataForm.password_confirmation) {
            dispatch(actions.setUserDataFormError({password: true, password_confirmation: true}))
        } else {
            dispatch(actions.setUserDataFormError({password: false, password_confirmation: false}))
        }
    }

    const handleOnSubmit = () => {
        dispatch(actions.updateAccount(userDataForm, navigate))
    }

    const handleAccountDelete = () => {
        dispatch(actions.deleteAccount(navigate))
        onDeleteDialogClose()
    }

    const onDeleteDialogClose = () => {
        setIsDeleteAccountDialogOpen(false)
    }

    const onDeleteDialogOpen = () => {
        setIsDeleteAccountDialogOpen(true)
    }

    const getInput = (field: keyof RegisterForm, fieldValue: string, label: string) => {

        switch (field) {
            case REGISTER_FORM_KEYS.PASSWORD:
            case REGISTER_FORM_KEYS.CONFIRMATION:
                return (
                    <FormInput
                        required
                        onBlur={() => validatePassword()}
                        error={userDataFormError[field]}
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
                        error={userDataFormError[field]}
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
                        error={userDataFormError[field]}
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
                        error={userDataFormError[field]}
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

    const inputsContainer = () => {
        return (
            <div className={classes.inputsContainer}>
                {getInput(REGISTER_FORM_KEYS.FIRST_NAME, userDataForm.firstName, 'Imię')}
                {getInput(REGISTER_FORM_KEYS.LAST_NAME, userDataForm.lastName, 'Nazwisko')}
                {getInput(REGISTER_FORM_KEYS.EMAIL, userDataForm.email, 'Adres e-mail')}
                {getInput(REGISTER_FORM_KEYS.PHONE, userDataForm.phone, 'Telefon')}
                {getInput(REGISTER_FORM_KEYS.PASSWORD, userDataForm.password, 'Nowe hasło')}
                {getInput(REGISTER_FORM_KEYS.CONFIRMATION, userDataForm.password_confirmation, 'Powtórz hasło')}
            </div>
        )
    }

    const actionsContainer = () => {
        return (
            <div className={classNames(classes.actionsContainer, {[classes.mobileActionsContainer]: isSmall})}>
                <AtomButton buttonVariant={AtomButtonVariants.CANCEL}
                            text={'USUŃ KONTO'}
                            onClick={onDeleteDialogOpen}/>
                <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Zapisz zmiany'}
                            disabled={!isSubmittable || isLoading}
                            onClick={handleOnSubmit}/>
            </div>
        )
    }

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <MyPaper withBackButton={!isSmall}  paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
                <Typography className={classes.userAccountHeader} variant="h2">Ustawienia konta</Typography>
                <Scrollbars>
                    {isLoading
                        ? <CircularLoader isLoading={isLoading}/>
                        : inputsContainer()}
                </Scrollbars>
                {actionsContainer()}
            </MyPaper>
            <DeleteAccountDialog
                open={isDeleteAccountDialogOpen}
                onClose={onDeleteDialogClose}
                onDelete={handleAccountDelete}/>
        </>
    )
}

export default UserAccount
