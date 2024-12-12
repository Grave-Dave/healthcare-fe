import {Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UserAvatar from "../../../../../../reusableComponents/UserAvatar";
import {useStyles} from "./HeaderAvatar.style.ts";
const HeaderAvatar = () => {
    const classes = useStyles()

    const getHeaderAvatarText = () => <>
        <span>Witaj,</span><br/>
        <span>User</span>
    </>

    return (
        <div className={classes.headerAvatarContainer}>
            <Typography variant="body1" className={classes.headerAvatarText}>{getHeaderAvatarText()}</Typography>
            <UserAvatar/>
            <KeyboardArrowDownIcon/>
        </div>
    )
}

export default HeaderAvatar
