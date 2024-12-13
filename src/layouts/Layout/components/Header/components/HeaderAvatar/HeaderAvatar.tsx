import classNames from "classnames";

import {Typography} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import UserAvatar from "../../../../../../reusableComponents/UserAvatar";
import {useStyles} from "./HeaderAvatar.style.ts";
import {useAppDispatch, useAppSelector} from "../../../../../../hooks/reduxHooks.ts";
import actions from "../../../../actions.tsx";
import {getTestValue} from "../../../../selectors.ts";

interface HeaderAvatarProps {
    onArrowClick: (userMenuState: boolean) => void,
    isUserMenuOpen: boolean
}

const HeaderAvatar = ({onArrowClick, isUserMenuOpen}: HeaderAvatarProps) => {
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const testValue = useAppSelector(getTestValue);


    const getHeaderAvatarText = () => <>
        <span>Witaj,</span><br/>
        <span>User</span>
    </>

    const onUserMenuClick = () => {
        onArrowClick(!isUserMenuOpen)
        dispatch(actions.setTestValue(!testValue));
    }

    return (
        <div className={classes.headerAvatarContainer}>
            <Typography variant="body1" className={classes.headerAvatarText}>{getHeaderAvatarText()}</Typography>
            <UserAvatar/>
            <ArrowForwardIosIcon sx={{height: 24, width: 24}}
                                   className={classNames(classes.arrow, {[classes.arrowRotated]: isUserMenuOpen})}
                                   onClick={onUserMenuClick}/>
        </div>
    )
}

export default HeaderAvatar
