import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    navContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: '2 0 auto',
        gap: 24
    },
    navMobileContainer: {
        position: 'absolute',
        top: 97,
        left: -300,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 96px)',
        justifyContent: "space-between",
        gap: 0,
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        transition: 'left 0.3s ease',
        zIndex: 100
    },
    navMobileOpen: {
        left: 0
    },
    userMenuContainer: {
        position: 'absolute',
        top: 97,
        right: -300,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        borderBottomLeftRadius: 16,
        overflow: 'hidden',
        boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        transition: 'right 0.3s ease',
        zIndex: 110
    },
    userMenuOpen: {
        right: 0,
    }
}))
