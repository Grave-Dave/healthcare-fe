import "dayjs/locale/pl";
import dayjs, {Dayjs} from 'dayjs';

import {WithStyles, withStyles} from "@mui/styles";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DayCalendarSkeleton} from "@mui/x-date-pickers";
import {styled} from "@mui/material/styles";

import {styles} from "./VisitCalendar.style.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";

interface CalendarProps extends WithStyles<typeof styles> {
    isMobile?: boolean
    onChange: (value: any) => void
    selectedDate: Dayjs | null
    shouldDisablePast?: boolean
}

interface StyledCalendarProps extends WithStyles<typeof styles> {
    isMobile: boolean
}

const StyledDateCalendar = styled(DateCalendar, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})((prop: StyledCalendarProps) => ({
    '&.MuiDateCalendar-root': {
        height: prop.isMobile ? '420px' : '350px',
        width: prop.isMobile ? '420px' : '350px',
        margin: '0 16px',
        maxHeight: 'none',
        '@media (min-width:1280px)': {
            height: '400px',
            width: '400px',
        },
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
            fontSize: '.87rem',
            '@media (min-width:1280px)': {
                fontSize: '1rem',
            },
            "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.main,
            }
        },
        '& .MuiYearCalendar-root': {
            width: 420,
            height: 400,
            maxHeight: 400,
            '.MuiPickersYear-yearButton': {
                "&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.main,
                }
            }

        }
    },
}));

const StyledDayCalendarSkeleton = styled(DayCalendarSkeleton)({
    '&.MuiDayCalendarSkeleton-root': {
        '@media (min-width:1280px)': {
            margin: 8,
        },
        ".MuiDayCalendarSkeleton-week": {
            '@media (min-width:1280px)': {
                margin: 10,
            }
        },
        ".MuiDayCalendarSkeleton-daySkeleton": {
            margin: 10,
            '@media (min-width:1280px)': {
                margin: '5px 10px',
            }
        }
    },
});

const VisitCalendar = ({
                           classes,
                           isMobile = false,
                           onChange,
                           selectedDate,
                           shouldDisablePast = false
                       }: CalendarProps) => {

    const disablePastDates = (date: Dayjs) => {
        return date.isBefore(dayjs(), 'day');
    };

    return (
        <div className={classes.calendarContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pl'}>
                <StyledDateCalendar
                    shouldDisableDate={shouldDisablePast ? disablePastDates : undefined}
                    classes={classes}
                    isMobile={isMobile}
                    value={selectedDate}
                    onChange={(value) => onChange(value)}
                    // loading
                    renderLoading={() =>
                        <StyledDayCalendarSkeleton/>
                    }/>
            </LocalizationProvider>
        </div>
    )
}

export default withStyles(styles)(VisitCalendar)
