
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";

import {styles} from "./MySelect.style.ts";

interface MySelectProps extends WithStyles<typeof styles> {
    value?: number
    onChange: (event: SelectChangeEvent<number>) => void
    label: string
    menuItems: { value: number, name: string }[]
}

const MySelect = ({classes, value, onChange, label, menuItems}: MySelectProps) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onChange(event)
    }

    const getItems = () => {
        return (
            menuItems.map((menuItem, i) => (
                <MenuItem key={`menuItem ${i}`} value={menuItem.value} className={classes.menuItem}>{menuItem.name} </MenuItem>
            ))
        )
    }

    return (
        <FormControl fullWidth >
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleChange}
            >
                {getItems()}
            </Select>
        </FormControl>
    )
}

export default withStyles(styles)(MySelect);
