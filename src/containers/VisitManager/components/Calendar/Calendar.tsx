import {WithStyles, withStyles} from "@mui/styles";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

import {styles} from "./Calendar.style.ts";
import {DayCalendarSkeleton} from "@mui/x-date-pickers";
import {styled} from "@mui/material/styles";
import theme from "../../../../layouts/Layout/themeMaterialUi.ts";

interface CalendarProps extends WithStyles<typeof styles> {

}

const StyledDateCalendar = styled(DateCalendar)({
    '&.MuiDateCalendar-root': {
        margin: '24px',
        height: '400px',
        width: '400px',
        maxHeight: 'none',
        '& .MuiDayCalendar-weekDayLabel': {
            fontSize: '1rem',
        },
        '& div[role="row"]': {
            justifyContent: 'space-around',
        },
        '& .MuiDayCalendar-slideTransition': {
            minHeight: '500px',
        },
        '& .MuiPickersDay-root': {
            height: '50px',
            width: '50px',
            fontSize: '1rem',
            "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.main,
            }
        },
    },
});

const onChange = (e) => {
    console.log(e.$d.toDateString())

}


const Calendar = ({classes}: CalendarProps) => {
    return (
        <div className={classes.calendarContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDateCalendar
                    onChange = {onChange}
                    renderLoading={() =>
                        <DayCalendarSkeleton/>
                    }/>
            </LocalizationProvider>
        </div>
    )
}

export default withStyles(styles)(Calendar);
