import {useEffect, useState} from "react";
import {Dayjs} from "dayjs";

import {Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent, Typography} from "@mui/material";

import {useStyles} from "./AddVisitDialog.style.ts";
import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import MySelect from "../../../../reusableComponents/MySelect";
import HourRangeSelect from "../../../../reusableComponents/HourRangeSelect";
import {formatDayjsToMyDateString} from "../../utils/utils.ts";
import {LocationItemType} from "../../../UserVisitOverview/types.ts";
import {LocationInterface} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import actions from "../../actions.tsx";
import selectors from "../../selectors.ts";
import CircularLoader from "../../../../reusableComponents/CircularLoader";

interface AddVisitDialogProps {
    isOpen: boolean,
    onClose: () => void,
    selectedDate: Dayjs,
    locationsData: LocationInterface[]
}

const AddVisitDialog = ({isOpen, onClose, selectedDate, locationsData}: AddVisitDialogProps) => {
    const classes = useStyles()
    const dispatch = useAppDispatch();

    const locations: LocationItemType[] = locationsData.map(location => ({
        value: location.id,
        name: location.name
    }))

    const isSelectorLoading = useAppSelector(selectors.getIsLocationsSelectorLoading)
    const isLoading = useAppSelector(selectors.getIsLoading)

    const [selectedLocation, setSelectedLocation] = useState<LocationItemType | null>(null)
    const [hourRange, setHourRange] = useState([8, 18]);
    const [isSubmittable, setIsSubmittable] = useState<boolean>(false);

    useEffect(() => {
        const checkIsSubmittable = () => {
            return !!hourRange && !!selectedLocation
        }
        setIsSubmittable(checkIsSubmittable())

    }, [selectedLocation, hourRange])


    const handleClose = () => {
        onClose()
    }

    const handleCreate = () => {
        if (selectedLocation) {
            dispatch(actions.addNewAvailableTerms(selectedDate, hourRange, selectedLocation))
        }
    }

    const handleHourRangeChange = (value: number[]) => {
        setHourRange(value)
    }

    const handleLocationChange = (e: SelectChangeEvent<number>) => {
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
                {formatDayjsToMyDateString(selectedDate)}
            </DialogTitle>
            {isLoading ?
                <div className={classes.loaderContainer}>
                    <CircularLoader isLoading={isLoading}/>
                </div>
                : <DialogContent>
                    <div className={classes.selectContainer}>
                        <Typography variant="body1">Wybierz gabinet:</Typography>
                        <MySelect
                            onChange={handleLocationChange}
                            value={selectedLocation?.value}
                            label="Gabinet"
                            menuItems={locations}
                            disabled={isSelectorLoading}
                        />
                    </div>
                    <div className={classes.sliderContainer}>
                        <Typography variant="body1">Wybierz nowe terminy (godziny):</Typography>
                        <HourRangeSelect range={hourRange} onChange={handleHourRangeChange}/>
                    </div>
                </DialogContent>}
            <DialogActions>
                <AtomButton onClick={handleClose}
                            buttonVariant={AtomButtonVariants.TEXT} text={'Anuluj'}/>
                <AtomButton onClick={handleCreate}
                            buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Dodaj terminy'}
                            disabled={!isSubmittable || isLoading}
                />
            </DialogActions>
        </Dialog>
    )
}

export default AddVisitDialog
