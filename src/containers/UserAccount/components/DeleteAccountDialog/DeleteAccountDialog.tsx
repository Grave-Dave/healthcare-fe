import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";

interface DeleteAccountDialogProps {
    open: boolean
    onClose: () => void
    onDelete: () => void
}

const DeleteAccountDialog = ({open, onClose, onDelete}: DeleteAccountDialogProps) => {

    const handleDelete = () => {
        onDelete()
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
                <p>Usunąć konto?</p>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Czy na pewno checesz usunąć konto? Usuniętego konta nie można odzyskać.
                </Typography>
            </DialogContent>
            <DialogActions>
                <AtomButton onClick={handleClose} buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Anuluj'}/>
                <AtomButton onClick={handleDelete} buttonVariant={AtomButtonVariants.CANCEL}
                            text={'TAK, USUŃ KONTO'}/>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccountDialog
