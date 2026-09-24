import {useEffect, useState} from "react";
import {Dayjs} from 'dayjs';

import {Dialog} from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

import FormInput from "../FormInput";
import VisitCalendar from "../VisitCalendar/VisitCalendar.tsx";
import {useStyles} from "./MobileDatePicker.style.ts";
import {formatDayjsToMyDateString} from "../../containers/VisitManager/utils/utils.ts";


interface MobileDatePickerProps {
    onDateChange: (value: any) => void
    selectedDate: Dayjs
    shouldDisablePast?: boolean
    shouldDisableFuture?: boolean
    shouldDisableAllExceptAvailable?: boolean
    onMonthChange: (value: any) => void
    highlightedDays: number[]
    isLoading: boolean
}

const MobileDatePicker = ({
                              onDateChange,
                              selectedDate,
                              shouldDisablePast = false,
                              shouldDisableFuture = false,
                              shouldDisableAllExceptAvailable = false,
                              onMonthChange,
                              highlightedDays,
                              isLoading
                          }: MobileDatePickerProps) => {
    const classes = useStyles()
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [localDateFormat, setLocalDateFormat] = useState(formatDayjsToMyDateString(selectedDate))

    useEffect(() => {
        const formattedDate = formatDayjsToMyDateString(selectedDate)
        setLocalDateFormat(formattedDate)
    }, [selectedDate])

    const onChange = (value: any) => {
        onDateChange(value)
        onClose()
    }

    const onClose = () => {
        setIsCalendarOpen(false)
    }

    return (
        <>
            <FormInput
                inputClassName={classes.mobileDatePicker}
                readonly
                onChange={() => {
                }}
                onClick={() => setIsCalendarOpen(true)}
                label=""
                value={localDateFormat}
                endAdornment={<EventRepeatIcon style={{cursor: 'pointer'}}/>}
            />
            <Dialog open={isCalendarOpen} onClose={onClose}>
                <VisitCalendar
                    isMobile
                    onChange={onChange}
                    selectedDate={selectedDate}
                    shouldDisablePast={shouldDisablePast}
                    shouldDisableFuture={shouldDisableFuture}
                    shouldDisableAllExceptAvailable={shouldDisableAllExceptAvailable}
                    onMonthChange={onMonthChange}
                    highlightedDays={highlightedDays}
                    isLoading={isLoading}
                />
            </Dialog>
        </>
    )
}

export default MobileDatePicker
