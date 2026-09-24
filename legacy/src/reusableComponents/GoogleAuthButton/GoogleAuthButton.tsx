import {WithStyles, withStyles} from "@mui/styles";
import {Button, Typography} from "@mui/material";

import {styles} from "./GoogleAuthButton.style.ts";
import googleLogo from '../../public/images/Login/google-symbol.png'
import {GOOGLE_REDIRECT_URL} from "./constants.ts";

interface GoogleAuthButtonProps extends WithStyles<typeof styles> {

}

const GoogleAuthButton = ({classes}: GoogleAuthButtonProps) => {

    const googleIcon = <img src={googleLogo} alt={'google icon'} style={{
        width: "40px",
        height: "40px",
    }}/>

    const handleClick = () => {
        window.location.href = GOOGLE_REDIRECT_URL;
    }

    return (
        <div className={classes.container}>
            <Button
                onClick={handleClick}
                variant={'contained'}
                color={'secondary'}
                sx={{
                    backgroundColor: 'transparent',
                }}
                className={classes.button}
                fullWidth
            >
                {googleIcon}
                <Typography>Zaloguj się przez Google</Typography>
            </Button>
        </div>
    )
}

export default withStyles(styles)(GoogleAuthButton)
