import {useState} from "react";
import Select, {components} from "react-select";

import {MenuItem} from "@mui/material";

import {customStyles} from "./PersonSelector.style.ts";
import {User} from "../../layouts/Layout/types.ts";
import {OptionType} from "./types.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";

const peopleOptionsData: User[] = [
    {
        id: 1,
        name: 'Jan',
        surname: 'Kowalski',
        phone: '666 666 666',
        email: 'jan@kowalski.pl'
    }, {
        id: 2,
        name: 'Barbara',
        surname: 'Nowak',
        phone: '666 666 666',
        email: 'jan@kowalski.pl'
    },
]

interface PersonSelectorProps {

}

const PersonSelector = ({}: PersonSelectorProps) => {

    const peopleOptions: OptionType[] = peopleOptionsData.map(personOptionData => ({
        value: personOptionData.id.toString(),
        label: `${personOptionData.name} ${personOptionData.surname}`,
    }))

    const [selectedOption, setSelectedOption] = useState<OptionType>(peopleOptions[0]);

    const handleChange = (option: unknown) => {
        setSelectedOption(option as OptionType);
    };

    const Option = ({ ...props}) => {
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
        <Select
            defaultValue={'test'}
            value={selectedOption}
            onChange={option => handleChange(option)}
            // onInputChange={handleOnSearchPhraseChange}
            options={peopleOptions}
            isLoading={false}
            // @ts-ignore
            styles={customStyles}
            components={{
                ...components,
                Option: Option,
            }}/>
    )
}

export default PersonSelector;
