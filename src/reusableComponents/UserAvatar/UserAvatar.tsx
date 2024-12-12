import {Avatar, Badge} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
import {styled} from '@mui/material/styles';

import defaultAvatar from '../../public/images/default-avatar.svg'
import {styles} from "./UserAvatar.style.ts";

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
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

interface UserAvatarProps extends WithStyles<typeof styles> {
    userAvatar?: string
}

const UserAvatar = ({userAvatar, classes}: UserAvatarProps) => {
    return (
        <div className={classes.avatar}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="dot"
            >
                <Avatar alt="user avatar" src={userAvatar ?? defaultAvatar}/>
            </StyledBadge>
        </div>
    )
}

export default withStyles(styles)(UserAvatar);
