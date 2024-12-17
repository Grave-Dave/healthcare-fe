import {useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent, Typography} from "@mui/material";
import moment from "moment/moment";

import {useStyles} from "./AddVisitDialog.style.ts";
import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import MySelect from "../../../../reusableComponents/MySelect";
import {LocationType} from "../../types.ts";
import HourRangeSelect from "../../../../reusableComponents/HourRangeSelect";

interface AddVisitDialogProps {
    isOpen: boolean,
    onClose: () => void,
    title?: Date,
}

const AddVisitDialog = ({isOpen, onClose, title}: AddVisitDialogProps) => {
    const classes = useStyles()

    const locations = [
        {
            value: 1,
            name: 'Obornicka 77k/1b, 51-114 Wrocław',
        },
        {
            value: 2,
            name: 'Legnicka 55a/3, 54-234 Wrocław',
        },
        {
            value: 3,
            name: 'Otmuchowska 7/4, 50-505 Wrocław',
        },
    ]

    const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null)

    const handleClose = () => {
        onClose()
    }

    const handleCreate = () => {
        onClose()
    }

    const handleChange = (e: SelectChangeEvent<number>) => {
        setSelectedLocation(locations.find(location => location.value === e.target.value) || null)
    }


    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: {width: 800,},
            }}>
            <DialogTitle>
                {moment(title).locale('pl').format('dddd, D MMMM YYYY')}
            </DialogTitle>
            <DialogContent>
                <div className={classes.selectContainer}>
                    <Typography variant="body1">Wybierz gabinet:</Typography>
                    <MySelect onChange={handleChange} value={selectedLocation?.value} label="Gabinet"
                              menuItems={locations}/>
                </div>
                <div className={classes.sliderContainer}>
                    <Typography variant="body1">Wybierz nowe terminy (godziny):</Typography>
                    <HourRangeSelect/>
                </div>
            </DialogContent>
            <DialogActions>
                <AtomButton onClick={handleClose} buttonVariant={AtomButtonVariants.TEXT} text={'Anuluj'}/>
                <AtomButton onClick={handleCreate} buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Dodaj terminy'}/>
            </DialogActions>
        </Dialog>
    )
}

export default AddVisitDialog
