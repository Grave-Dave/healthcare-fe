import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import {VisitItemVariantEnum} from "../../constants.ts";

interface DeleteVisitDialogProps {
    open: boolean
    variant: VisitItemVariantEnum
    onClose: () => void
    onDelete: () => void
}

const DeleteVisitDialog = ({open, onClose, onDelete, variant}: DeleteVisitDialogProps) => {

    const handleDelete = () => {
        onDelete()
    }

    const handleClose = () => {
        onClose()
    }

    const getDialogTilte = () => {
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
                return "Czy napewno chcesz usunąć wybraną wizytę?"
            }
            case VisitItemVariantEnum.AvailableTerm: {
                return "Czy napewno chcesz usunąć dostępny termin?"
            }
            default:
                return
        }
    }


    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {getDialogTilte()}
            </DialogTitle>
            <DialogContent>
                {getDialogHeader()}
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
