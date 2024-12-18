import {useEffect, useState} from "react";
import { Dayjs } from 'dayjs';

import {Dialog} from "@mui/material";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

import FormInput from "../FormInput";
import VisitCalendar from "../VisitCalendar/VisitCalendar.tsx";
import {useStyles} from "./MobileDatePicker.style.ts";
import moment from "moment";


interface MobileDatePickerProps {
    onCalendarChange: (value: any) => void
    selectedDate: Dayjs | null
}

const MobileDatePicker = ({onCalendarChange, selectedDate}: MobileDatePickerProps) => {
    const classes = useStyles()
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [localDateFormat, setLocalDateFormat] = useState(moment(selectedDate?.toDate()).locale('pl').format('dddd, D MMMM YYYY'))

    useEffect(()=>{
        setLocalDateFormat(moment(selectedDate?.toDate()).locale('pl').format('dddd, D MMMM YYYY'))
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
                <VisitCalendar isMobile onChange={onChange} selectedDate={selectedDate} shouldDisablePast/>
            </Dialog>
        </>
    )
}

export default MobileDatePicker
