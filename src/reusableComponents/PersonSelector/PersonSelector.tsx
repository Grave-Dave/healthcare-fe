import {useCallback, useEffect, useState} from "react";
import Select, {components} from "react-select";
import {debounce} from "lodash";

import {MenuItem} from "@mui/material";

import {customStyles} from "./PersonSelector.style.ts";
import AtomButton from "../../atoms/AtomButton";
import {OptionType} from "./types.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import actions from "../../containers/AdminPanel/actions.tsx";
import selectors from "../../containers/AdminPanel/selectors.ts";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";

interface PersonSelectorProps {

}

const PersonSelector = ({}: PersonSelectorProps) => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(selectors.getIsUserSelectorLoading)
    const usersOptionsData = useAppSelector(selectors.getUsersData)

    const userOptions: OptionType[] = usersOptionsData.map(userOption => ({
        value: userOption.id.toString(),
        label: `${userOption.firstName} ${userOption.lastName}`,
    }))

    const [selectedOption, setSelectedOption] = useState<OptionType>(userOptions[0]);

    useEffect(() => {
        dispatch(actions.fetchUsers(''))
    }, [])

    useEffect(() => {
        if (selectedOption) {
            dispatch(actions.fetchUserVisits(Number(selectedOption.value)))
        }
    }, [selectedOption])

    const handleSearchPhraseChange = useCallback(
        debounce((newSearchPhrase: string) => {
            newSearchPhrase && dispatch(actions.fetchUsers(newSearchPhrase));
        }, 800),
        []
    );

    const handleChange = (option: unknown) => {
        setSelectedOption(option as OptionType);
    };

    const handleImpersonate = () => {
        if (selectedOption?.value) {
            dispatch(actions.impersonateUser(+selectedOption.value))
        }
    }

    const Option = ({...props}) => {
        return (
            <MenuItem
                buttonRef={props.innerRef}
                selected={props.isFocused}
                component="div"
                style={{
                    fontWeight: props.isSelected ? 500 : 400,
                    backgroundColor: props.isFocused ? theme.palette.action.hover : '#fff',
                }}
                {...props.innerProps}
            >
                {props.children}
            </MenuItem>
        );
    };

    return (
        <div style={{display: 'flex', gap: 24}}>
            <Select
                placeholder={'Wybierz pacjenta'}
                value={selectedOption}
                onChange={option => handleChange(option)}
                onInputChange={handleSearchPhraseChange}
                options={userOptions}
                isLoading={isLoading}
                // @ts-ignore
                styles={customStyles}
                components={{
                    ...components,
                    Option: Option,
                }}/>
            <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                        text={'Impersonuj 😎'}
                        style={{height: 48}}
                        disabled={!selectedOption?.value}
                        onClick={handleImpersonate}/>
        </div>
    )
}

export default PersonSelector;
