import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = ({palette, spacing}: Theme) => createStyles({
    visitItemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: spacing(3, 4)
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    actionsContainer: {
        display: 'flex',
        gap: 16,
    },
    details: {
        display: 'flex',
        flexDirection: "column",
        gap: 24,
        padding: spacing(1, 0),
    },
    userItem: {
        display: 'flex',
        alignItems: "center",
        gap: 8,
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: palette.divider
    },
    clickable: {
        cursor: "pointer",
        '&:hover': {
            backgroundColor: palette.action.hover
        }
    },
    selected: {
        backgroundColor: `${palette.action.selected} !important`
    },
    mobile: {
        gap: 16,
        padding: spacing(3, 2)
    }
})
