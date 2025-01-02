import classNames from "classnames";

import {Avatar, Badge} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
import {styled} from '@mui/material/styles';

import defaultAvatar from '../../public/images/default-avatar.svg'
import adminAvatar from '../../public/images/user-shield-alt-1-svgrepo-com.svg'
import {styles} from "./UserAvatar.style.ts";
import {User} from "../../layouts/Layout/types.ts";

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 2.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.5)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

interface UserAvatarProps extends WithStyles<typeof styles> {
    user: User
    isAdmin?: boolean
    onClick?: () => void
    isLoading?: boolean
}

const UserAvatar = ({user, isAdmin, onClick, isLoading, classes}: UserAvatarProps) => {
    return (
        <div className={classNames(classes.avatar, {[classes.disabled]: isLoading})} onClick={onClick}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant={user.id ? "dot" : undefined}
            >
                <Avatar alt="user avatar" src={isAdmin ? adminAvatar : defaultAvatar}/>
            </StyledBadge>
        </div>
    )
}

export default withStyles(styles)(UserAvatar);
