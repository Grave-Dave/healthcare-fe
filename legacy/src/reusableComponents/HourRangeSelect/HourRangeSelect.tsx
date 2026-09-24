import {WithStyles, withStyles} from "@mui/styles";
import {Slider} from "@mui/material";

import {styles} from "./HourRangeSelect.style.ts";

interface HourRangeSelectProps extends WithStyles<typeof styles> {
    onChange: (value: number[]) => void
    range: number[]
}

const HourRangeSelect = ({classes, onChange, range}: HourRangeSelectProps) => {

    // @ts-ignore
    const handleChange = (event: Event, newValue: number | number[]) => {
        onChange(newValue as number[])
    };

    const formatHour = (hour: number) => {

        return `${hour}:00`;
    };

    return (
        <div className={classes.sliderContainer}>
            <Slider
                value={range}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={24}
                marks={[
                    {value: 0, label: "0:00"},
                    {value: 6, label: "6:00"},
                    {value: 12, label: "12:00"},
                    {value: 18, label: "18:00"},
                    {value: 24, label: "24:00"},
                ]}
                step={1}
                valueLabelFormat={formatHour}
                sx={{mt: 4}}
            />
        </div>
    )
}

export default withStyles(styles)(HourRangeSelect)