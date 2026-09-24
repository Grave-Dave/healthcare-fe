import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

import {useStyles} from "./AddNewVisitDialog.style.ts";
import {VisitItemInterface} from "../../types.ts";
import CircularLoader from "../../../../reusableComponents/CircularLoader";
import AtomButton from "../../../../atoms/AtomButton";
import {AtomButtonVariants} from "../../../../atoms/AtomButton/constants.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import actions from "../../actions.tsx";
import selectors from "../../selectors.ts";
import {useNavigate} from "react-router-dom";

interface AddNewVisitDialogProps {
    isOpen: boolean,
    onClose: () => void,
    selectedTerm?: VisitItemInterface
}

const AddNewVisitDialog = ({isOpen, onClose, selectedTerm}: AddNewVisitDialogProps) => {
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoading = useAppSelector(selectors.getIsLoading)

    const handleClose = () => {
        onClose()
    }

    const handleCreate = () => {
        if (selectedTerm) {
            dispatch(actions.createNewUserVisit(selectedTerm.id, navigate))
            dispatch(actions.setSelectedTermId(null))
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: {width: 600},
            }}>
            <DialogTitle>
                <p>Dodać nową wizytę?</p>
            </DialogTitle>
            {isLoading ?
                <div className={classes.loaderContainer}>
                    <CircularLoader isLoading={isLoading}/>
                </div>
                : <DialogContent>
                    <Typography className={classes.contentText} variant="body1">
                        Czy chcesz dodać nową wizytę dnia: <strong>{selectedTerm?.date}</strong>, o
                        godzinie: <strong>{selectedTerm?.time}</strong>,
                        w: <strong>{selectedTerm?.location.name}</strong>?
                    </Typography>
                </DialogContent>}
            <DialogActions>
                <AtomButton onClick={handleClose}
                            buttonVariant={AtomButtonVariants.TEXT} text={'Anuluj'}/>
                <AtomButton onClick={handleCreate}
                            buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Utwórz wizytę'}
                            disabled={!selectedTerm?.id || isLoading}
                />
            </DialogActions>
        </Dialog>
    )
}

export default AddNewVisitDialog
