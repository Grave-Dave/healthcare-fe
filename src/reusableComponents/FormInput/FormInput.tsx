import React, {ChangeEvent} from "react";

import {WithStyles, withStyles} from "@mui/styles";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";

import {styles} from "../MyPaper/MyPaper.style.ts";
import classNames from "classnames";


interface FormInputProps extends WithStyles<typeof styles> {
    inputClassName?: string,
    label: string,
    value?: unknown,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onClick?: () => void,
    onBlur?: () => void,
    autoFocus?: boolean,
    error?: boolean,
    required?: boolean,
    type?: string,
    endAdornment?: React.ReactNode,
}

const FormInput = ({
                       label,
                       value,
                       onChange,
                       onClick,
                       onBlur,
                       autoFocus,
                       type,
                       error,
                       required,
                       inputClassName,
                       endAdornment,
                       classes
                   }: FormInputProps) => {
    return (
        <FormControl
            variant="outlined"
            required={required}
            error={error}
            className={classNames(
                classes,
                inputClassName,
            )}>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                autoFocus={autoFocus}
                onClick={onClick}
                onBlur={onBlur}
                type={type}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(event);
                }}
                endAdornment={endAdornment}
                label={label}
            />
        </FormControl>
    )
}

export default withStyles(styles)(FormInput);
