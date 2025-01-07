import {useState} from "react";

import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {useStyles} from "./CookieConsent.style.ts";
import cookie from "../../public/images/cookie-svgrepo-com.svg";

interface CookieConsentProps {
    isAccepted: boolean
}

const CookieConsent = ({isAccepted}: CookieConsentProps) => {

    const classes = useStyles()

    const [isOpen, setIsOpen] = useState(!isAccepted)

    const handleClose = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsOpen(false)
    }

    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                sx: {width: 500},
            }}>
            <DialogTitle>
                <div className={classes.titleContainer}>
                    <p>Używamy plików cookie</p>
                    <img className={classes.cookie} src={cookie} alt={'cookie'}/>
                </div>
            </DialogTitle>
            <DialogContent>
                <Typography className={classes.cookieText} variant="body1">
                    Używamy plików cookie, aby umożliwić Ci pozostanie zalogowanym. Żadne dane osobowe nie są
                    udostępniane ani wykorzystywane do śledzenia.
                </Typography>
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

export default CookieConsent
