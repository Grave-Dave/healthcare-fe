import theme from "../../layouts/Layout/themeMaterialUi.ts";

export const customStyles = {
    menu: (provided: Object) => ({
        ...provided,
        padding: theme.spacing(1, 0),
        boxShadow: '0px 2px 4px 0px rgba(68, 80, 82, 0.15), 0px 1px 10px 0px rgba(68, 80, 82, 0.08), 0px 4px 5px 0px rgba(68, 80, 82, 0.10);',
    }),
    menuList: (provided: Object) => ({
        ...provided,
        padding: 0,
        borderRadius: 2,
        overflow: 'hidden',
    }),
    control: (provided: any, state: any): Object => ({
        ...provided,
        boxShadow: state.isFocused ? '0px 0px 0px 1px #eb6927 !important' : "none",
        borderColor: state.isFocused ? theme.palette.secondary.main : provided.borderColor,
        cursor: 'pointer',
        '&:hover': {
            borderColor: state.isFocused ? theme.palette.secondary.main : '#445052',
        },
    }),
    container: (provided: Object) => ({
        ...provided,
        width: '50%',
        minWidth: 300,
        alignSelf:'center',
    }),
    input: (provided: Object) => ({
        ...provided,
        color: theme.palette.text.primary,
        height: 40,
        cursor: 'pointer',
        fontWeight: 400,
        "& input": {
            font: "inherit",
        },
    }),
    option: (provided: Object) => ({
        ...provided,
        padding: '0',
    }),
    placeholder: (provided: Object) => ({
        ...provided,
        fontSize: 16,
        fontWeight: 400
    }),
    singleValue: (provided: Object) => ({
        ...provided,
        color: '#333',
        fontSize: 14,
        fontWeight: 400,
        [theme.breakpoints.up('md')]: {
            fontSize: 16,
        },
    }),
};
