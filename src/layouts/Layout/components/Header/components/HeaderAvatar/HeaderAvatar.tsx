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

    const isAdmin = useAppSelector(selectors.getIsAdmin)
    const user = useAppSelector(selectors.getUser)

    const getHeaderAvatarText = () => <>
        <span style={{fontWeight: 300}}>Witaj,</span><br/>
        <span style={{
            display: 'flow',
            fontWeight: 300,
            maxWidth: 115,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }}>{user.firstName || null}</span>
    </>


    return (
        <div className={classes.headerAvatarContainer}>
            <Typography variant="body1" className={classes.headerAvatarText}>{getHeaderAvatarText()}</Typography>
            <UserAvatar user={user} onClick={onUserMenuClick} isLoading={isLoading} isAdmin={isAdmin}/>
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
