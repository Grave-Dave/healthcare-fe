import React, {useState} from "react";
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
import {ROUTES} from "../../constants.ts";

const Login = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const [formValues, setFormValues] = useState<LoginForm>({
        email: '',
        password: ''
    })
    const [formError, setFormError] = useState({
        email: false,
        password: false
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    const getInput = (field: keyof LoginForm, fieldValue: string, label: string) => {
        return (
            field !== LOGIN_FORM_KEYS.PASSWORD
                ? <FormInput
                    required
                    error={formError[field]}
                    label={label}
                    value={fieldValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleFormChange(field, event.target.value);
                    }}
                />
                : <FormInput
                    required
                    error={formError[field]}
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
                {getInput(LOGIN_FORM_KEYS.EMAIL, formValues.email, 'Adres e-mail')}
                {getInput(LOGIN_FORM_KEYS.PASSWORD, formValues.password, 'Hasło')}
            </div>
        )
    }

    const actionsContainer = () => {
        return (
            <div className={classNames(classes.actionsContainer, {[classes.mobileActionsContainer]: isSmall})}>
                <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Zaloguj się'}/>
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
                {inputsContainer()}
            </Scrollbars>
            {actionsContainer()}
        </MyPaper>
    )
}

export default Login
