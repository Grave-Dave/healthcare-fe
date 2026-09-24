import {Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, Typography} from "@mui/material";

import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import {VisitItemVariantEnum} from "../../constants.ts";
import theme from "../../../../layouts/Layout/themeMaterialUi.ts";

interface DeleteVisitDialogProps {
    open: boolean
    variant: VisitItemVariantEnum
    onClose: () => void
    onDelete: () => void
    onChange?: () => void
    checked?: boolean
    withSwitch?: boolean
}

const DeleteVisitDialog = ({
                               open,
                               onClose,
                               onDelete,
                               variant,
                               onChange,
                               checked,
                               withSwitch = false
                           }: DeleteVisitDialogProps) => {

    const handleDelete = () => {
        onDelete()
    }

    const handleClose = () => {
        onClose()
    }

    const handleCheck = () => {
        onChange && onChange()
    }

    const getDialogTitle = () => {
        switch (variant) {
            case VisitItemVariantEnum.UserVisit: {
                return "Usunąć wizytę?"
            }
            case VisitItemVariantEnum.AvailableTerm: {
                return "Usunąć dostępny termin?"
            }
            default:
                return
        }
    }

    const getDialogHeader = () => {
        switch (variant) {
            case VisitItemVariantEnum.UserVisit: {
                return "Czy na pewno chcesz usunąć wybraną wizytę?"
            }
            case VisitItemVariantEnum.AvailableTerm: {
                return "Czy na pewno chcesz usunąć dostępny termin?"
            }
            default:
                return
        }
    }

    const getSwitch = () => {
        return (
            <div style={{paddingTop: theme.spacing(3)}}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleCheck} sx={{marginLeft: 1}}/>}
                    label={<Typography variant="body2">Usunąc także termin?</Typography>}
                    labelPlacement="start"
                    sx={{margin: 0}}
                />
            </div>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {getDialogTitle()}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{getDialogHeader()}</Typography>
                {withSwitch && variant === VisitItemVariantEnum.UserVisit && getSwitch()}
            </DialogContent>
            <DialogActions>
                <AtomButton onClick={handleClose} buttonVariant={AtomButtonVariants.TEXT} text={'Anuluj'}/>
                <AtomButton onClick={handleDelete} buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Usuń'}/>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteVisitDialog
