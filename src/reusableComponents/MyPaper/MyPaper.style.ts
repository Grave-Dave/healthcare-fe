import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = ({spacing}: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: spacing(3, 2)
    },
    mobileContainer: {
        padding: spacing(0),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing(1),
        height: 'calc(100vh - 144px)'
    },
    mobilePaper: {
        flex: '1 0 auto',
        width: 'auto',
        height: 'calc(100vh - 96px)',
        alignItems: 'stretch',
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    backButtonText: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing(1)
    }
})
