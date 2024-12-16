import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";

interface DeleteVisitDialogProps {
    open: boolean
    onClose: () => void
}

const DeleteVisitDialog = ({open, onClose}: DeleteVisitDialogProps) => {

    const handleDelete = () => {
        // todo delete visitItem action
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
                {"Usunąć wizytę?"}
            </DialogTitle>
            <DialogContent>
                {"Czy napewno chcesz usunąć wybraną wizytę?"}
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
