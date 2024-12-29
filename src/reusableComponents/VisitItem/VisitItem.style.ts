import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import theme from "../../layouts/Layout/themeMaterialUi.ts";

export const styles = ({palette, spacing}: Theme) => createStyles({
    visitItemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: spacing(1, 2, 1, 4),
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        transition: 'gap 300ms ease'
    },
    actionsContainer: {
        display: 'flex',
        gap: 16,
        padding: spacing(1.5, 0)
    },
    details: {
        display: 'flex',
        flexDirection: "column",
        gap: 8,
        transition: 'gap 300ms ease'
    },
    detailsExpanded: {
        gap: 16,
    },
    userItem: {
        display: 'flex',
        alignItems: "center",
        gap: 8,
    },
    phoneItem: {
        '&:hover': {
            color: `${theme.palette.secondary.light} !important`
        }
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
    expanded: {
        padding: spacing(3, 2, 3, 4),
    },
    mobile: {
        gap: 16,
        padding: spacing(3, 2)
    }
})
