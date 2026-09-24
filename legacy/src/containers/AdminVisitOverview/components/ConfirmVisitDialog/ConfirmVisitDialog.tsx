import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";

interface ConfirmVisitDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmVisitDialog = ({open, onClose, onConfirm}: ConfirmVisitDialogProps) => {

    const handleConfirm = () => {
        onConfirm()
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {"Potwierdzić wizytę?"}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{"Czy na pewno chcesz potwierdzić wybraną wizytę?"}</Typography>
            </DialogContent>
            <DialogActions>
                <AtomButton onClick={handleClose} buttonVariant={AtomButtonVariants.TEXT} text={'Anuluj'}/>
                <AtomButton onClick={handleConfirm} buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Potwierdź'}/>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmVisitDialog
