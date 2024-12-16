import React, {useState} from "react";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./Register.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import FormInput from "../../reusableComponents/FormInput/FormInput.tsx";
import PasswordAdornment from "../../reusableComponents/PasswordAdornment/PasswordAdornment.tsx";
import {RegisterForm, ShowPassword} from "./types.ts";
import {EMAIL_REGEX, REGISTER_FORM_KEYS} from "./constants.ts";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";

const Register = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const [formValues, setFormValues] = useState<RegisterForm>({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    })
    const [formError, setFormError] = useState({
        name: false,
        surname: false,
        email: false,
        phone: false,
        password: false,
        password2: false
    })
    const [showPassword, setShowPassword] = useState<ShowPassword>({
        password: false,
        password2: false
    })

    const handleClickShowPassword = (field: keyof ShowPassword) => setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field]
    }));

    const handleFormChange = (key: string, value: string) => {
        setFormValues(prevState => {
            return {...prevState, [key]: value.trim()};
        });

        if (value.trim() === '') {
            setFormError(prevState => ({...prevState, [key]: true}));
        } else {
            setFormError(prevState => ({...prevState, [key]: false}));
        }
    }

    const validateEmail = () => {
        const emailRegEx = EMAIL_REGEX
        const emailText = formValues.email || '';

        if (!emailRegEx.test(emailText)) {
            setFormError(prevState => ({...prevState, email: true}));
        }
    }

    const getInput = (field: keyof RegisterForm, fieldValue: string, label: string) => {

        switch (field) {
            case REGISTER_FORM_KEYS.PASSWORD:
            case REGISTER_FORM_KEYS.PASSWORD2:
                return (
                    <FormInput
                        required
                        error={formError[field]}
                        label={label}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                        type={showPassword[field] ? 'text' : 'password'}
                        endAdornment={<PasswordAdornment showPassword={showPassword[field]}
                                                         onClick={() => handleClickShowPassword(field)}/>}
                    />)
            case REGISTER_FORM_KEYS.NAME:
            case REGISTER_FORM_KEYS.SURNAME:
                return (
                    <FormInput
                        required
                        error={formError[field]}
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
                        type='number'
                        error={formError[field]}
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
                        error={formError[field]}
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
                {getInput(REGISTER_FORM_KEYS.NAME, formValues.name, 'Imię')}
                {getInput(REGISTER_FORM_KEYS.SURNAME, formValues.surname, 'Nazwisko')}
                {getInput(REGISTER_FORM_KEYS.EMAIL, formValues.email, 'Adres e-mail')}
                {getInput(REGISTER_FORM_KEYS.PHONE, formValues.phone, 'Telefon')}
                {getInput(REGISTER_FORM_KEYS.PASSWORD, formValues.password, 'Hasło')}
                {getInput(REGISTER_FORM_KEYS.PASSWORD2, formValues.password2, 'Powtórz hasło')}
            </div>
        )
    }

    const actionsContainer = () => {
        return (
            <div className={classNames(classes.actionsContainer, {[classes.mobileActionsContainer]: isSmall})}>
                <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Zarejestruj się'}/>
            </div>
        )
    }

    return (
        <MyPaper withBackButton paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
            <Typography className={classes.registerHeader} variant="h2">Zarejestruj się</Typography>
            <Scrollbars>
                {inputsContainer()}
            </Scrollbars>
            {actionsContainer()}
        </MyPaper>
    )
}

export default Register
