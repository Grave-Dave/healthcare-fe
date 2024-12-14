import classNames from "classnames";

import {Typography} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import UserAvatar from "../../../../../../reusableComponents/UserAvatar";
import {useStyles} from "./HeaderAvatar.style.ts";

interface HeaderAvatarProps {
    onArrowClick: () => void,
    isUserMenuOpen: boolean
}

const HeaderAvatar = ({onArrowClick, isUserMenuOpen}: HeaderAvatarProps) => {
    const classes = useStyles()

    const getHeaderAvatarText = () => <>
        <span>Witaj,</span><br/>
        <span>User</span>
    </>


    return (
        <div className={classes.headerAvatarContainer}>
            <Typography variant="body1" className={classes.headerAvatarText}>{getHeaderAvatarText()}</Typography>
            <UserAvatar/>
            <ArrowForwardIosIcon sx={{height: 24, width: 24}}
                                 className={classNames(classes.arrow, {[classes.arrowRotated]: isUserMenuOpen})}
                                 onClick={onArrowClick}/>
        </div>
    )
}

export default HeaderAvatar
