import {useEffect, useState} from "react";
import {Dayjs} from 'dayjs';

import {Dialog} from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

import FormInput from "../FormInput";
import VisitCalendar from "../VisitCalendar/VisitCalendar.tsx";
import {useStyles} from "./MobileDatePicker.style.ts";
import {formatDayjsToMyDateString} from "../../containers/VisitManager/utils/utils.ts";


interface MobileDatePickerProps {
    onCalendarChange: (value: any) => void
    selectedDate: Dayjs
    shouldDisablePast?: boolean
    shouldDisableFuture?: boolean
}

const MobileDatePicker = ({
                              onCalendarChange,
                              selectedDate,
                              shouldDisablePast = false,
                              shouldDisableFuture = false
                          }: MobileDatePickerProps) => {
    const classes = useStyles()
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [localDateFormat, setLocalDateFormat] = useState(formatDayjsToMyDateString(selectedDate))

    useEffect(() => {
        const formattedDate = formatDayjsToMyDateString(selectedDate)
        setLocalDateFormat(formattedDate)
    }, [selectedDate])

    const onChange = (value: any) => {
        onCalendarChange(value)
        onClose()
    }

    const onClose = () => {
        setIsCalendarOpen(false)
    }

    return (
        <>
            <FormInput
                inputClassName={classes.mobileDatePicker}
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
                    shouldDisableFuture={shouldDisableFuture}/>
            </Dialog>
        </>
    )
}

export default MobileDatePicker
