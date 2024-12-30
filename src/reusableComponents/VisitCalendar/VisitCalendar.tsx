import {useEffect, useState} from "react";
import dayjs, {Dayjs} from 'dayjs';
import "dayjs/locale/pl";

import {WithStyles, withStyles} from "@mui/styles";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DayCalendarSkeleton, PickersDay, PickersDayProps} from "@mui/x-date-pickers";
import {styled} from "@mui/material/styles";
import {Badge} from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {styles} from "./VisitCalendar.style.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {CurrentMonthYearType} from "./types.ts";

interface CalendarProps extends WithStyles<typeof styles> {
    isMobile?: boolean
    onChange: (value: any) => void
    onMonthChange: (value: any) => void
    highlightedDays: number[]
    isLoading: boolean
    selectedDate: Dayjs
    shouldDisablePast?: boolean
    shouldDisableFuture?: boolean
    shouldDisableAllExceptAvailable?: boolean
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
            height: '410px',
            width: '410px',
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
                           shouldDisablePast = false,
                           shouldDisableFuture = false,
                           shouldDisableAllExceptAvailable = false,
                           onMonthChange,
                           highlightedDays,
                           isLoading
                       }: CalendarProps) => {

    const [currentMonthYear, setCurrentMonthYear] = useState<CurrentMonthYearType>({
        month: selectedDate?.format('MM'),
        year: selectedDate?.format('YYYY')
    })

    useEffect(() => {
        onMonthChange(currentMonthYear)
    }, [currentMonthYear])


    const disablePastDates = (date: Dayjs) => {
        return date.isBefore(dayjs(), 'day');
    };

    const disableFutureDates = (date: Dayjs) => {
        return date.isAfter(dayjs(), 'day');
    };

    const handleMonthYearChange = (value: any) => {
        setCurrentMonthYear({
            month: value?.format('MM'),
            year: value?.format('YYYY')
        })
    }

    const disableUnavailable = (date: Dayjs) => {
        return !highlightedDays.some((allowedDays) => date.date() === allowedDays);
    };

    function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
        const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <EventAvailableIcon
                    sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 1
                    }}/> : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}/>
            </Badge>
        );
    }

    return (
        <div className={classes.calendarContainer}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pl'}>
                <StyledDateCalendar
                    shouldDisableDate={shouldDisableAllExceptAvailable
                        ? disableUnavailable
                        : shouldDisablePast
                            ? disablePastDates
                            : shouldDisableFuture
                                ? disableFutureDates
                                : undefined}
                    classes={classes}
                    disableFuture={isLoading}
                    disablePast={isLoading}
                    isMobile={isMobile}
                    value={selectedDate}
                    onChange={(value) => onChange(value)}
                    onMonthChange={handleMonthYearChange}
                    onYearChange={handleMonthYearChange}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        } as any,
                    }}
                    loading={isLoading}
                    renderLoading={() =>
                        <StyledDayCalendarSkeleton/>
                    }/>
            </LocalizationProvider>
        </div>
    )
}

export default withStyles(styles)(VisitCalendar)
