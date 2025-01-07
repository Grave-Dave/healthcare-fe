import Scrollbars from "react-custom-scrollbars-2";
import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {TERMS} from "./constants.tsx";

interface TermsAndConditionsProps {
    isOpen: boolean
    onClose: () => void
}

const TermsAndConditions = ({isOpen, onClose}: TermsAndConditionsProps) => {

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                sx: {width: 500},
            }}>
            <DialogTitle>
                <p>Warunki korzystania z serwisu</p>
            </DialogTitle>
            <DialogContent sx={{height: '500px'}}>
                <Scrollbars>
                    <Typography sx={{textAlign: 'justify', marginRight: 1.5}} variant="body2">
                        {TERMS}
                    </Typography>
                </Scrollbars>
            </DialogContent>
            <DialogActions>
                <AtomButton
                    onClick={handleClose}
                    buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                    text={'Zamknij'}
                />
            </DialogActions>
        </Dialog>
    )
}

export default TermsAndConditions
