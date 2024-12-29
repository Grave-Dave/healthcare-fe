import classNames from "classnames";

import {Typography} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import UserAvatar from "../../../../../../reusableComponents/UserAvatar";
import {useStyles} from "./HeaderAvatar.style.ts";
import {useAppSelector} from "../../../../../../hooks/reduxHooks.ts";
import selectors from "../../../../../../auth/selectors.ts";

interface HeaderAvatarProps {
    onUserMenuClick: () => void,
    isUserMenuOpen: boolean
    isLoading: boolean
}

const HeaderAvatar = ({onUserMenuClick, isUserMenuOpen, isLoading}: HeaderAvatarProps) => {
    const classes = useStyles()

    const user = useAppSelector(selectors.getUser)

    const getHeaderAvatarText = () => <>
        <span>Witaj,</span><br/>
        <span>{user.firstName || null}</span>
    </>


    return (
        <div className={classes.headerAvatarContainer}>
            <Typography variant="body1" className={classes.headerAvatarText}>{getHeaderAvatarText()}</Typography>
            <UserAvatar user={user} onClick={onUserMenuClick} isLoading={isLoading}/>
            <ArrowForwardIosIcon
                sx={{height: 24, width: 24}}
                className={classNames(classes.arrow, {
                    [classes.arrowRotated]: isUserMenuOpen && !isLoading,
                    [classes.disabledArrow]: isLoading
                })}
                onClick={onUserMenuClick}
            />
        </div>
    )
}

export default HeaderAvatar
