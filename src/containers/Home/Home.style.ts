import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({palette, spacing, breakpoints}: Theme) => createStyles({
    container: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100dvh',
        width: '100%',
        zIndex: 0
    },
    hero: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1
    },
    shadow: {
        position: "absolute",
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.55)',
        transition: 'background-color 0.3s ease'
    },
    header: {
        position: "absolute",
        top: '33%',
        left: '50%',
        transform: 'translate(-50%)',
        textAlign: 'center',
        color: palette.primary.contrastText,
        width: '100%',
        padding: spacing(2),
        animation: 'fadeInSlideUp 2s ease-out forwards',
    },
    subtitle: {
        '&.MuiTypography-root': {
            display: 'flex',
            justifyContent: 'center',
            marginTop: spacing(4),
            fontSize: 28,
            fontWeight: 300,
            [breakpoints.down('xs')]: {
                fontSize: 22,
            },
        }
    },
    heroButton: {
        top: '80%',
        left: '50%',
        transform: 'translate(-50%)',
        width: 250
    },
    buttonHovered: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    '@global': {
        '@keyframes fadeInSlideUp': {
            '0%': {
                opacity: 0.1,
            },
            '100%': {
                opacity: 1,
            },
        }
    }
}))
