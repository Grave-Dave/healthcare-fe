import React, {useState} from "react";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    FormControl
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {useStyles} from "./Login.style.ts";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import {LoginForm} from "./types.ts";
import {LOGIN_FORM_KEYS} from "./constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";

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
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                ? <FormControl variant="outlined" required error={formError[field]}>
                    <InputLabel>{label}</InputLabel>
                    <OutlinedInput
                        label={label}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                    />
                </FormControl>
                : <FormControl variant="outlined" required error={formError[field]}>
                    <InputLabel>{label}</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={fieldValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleFormChange(field, event.target.value);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label}
                    />
                </FormControl>
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
                            link={'/register'}
                            text={'lub zarejestruj się'}/>
            </div>
        )
    }

    return (
        <MyPaper paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
            <Typography className={classes.loginHeader} variant="h2">Zaloguj się</Typography>
            <Scrollbars>
                {inputsContainer()}
            </Scrollbars>
            {actionsContainer()}
        </MyPaper>
    )
}

export default Login
