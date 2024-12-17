import classNames from "classnames";

import {Divider, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {withStyles, WithStyles} from "@mui/styles";

import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {styles} from "./VisitItem.style.ts";
import {VisitItemType} from "../../containers/UserVisitOverview/types.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";


interface VisitItemProps extends WithStyles<typeof styles> {
    visitItem: VisitItemType
    onDeleteIconClick?: () => void
    onClick?: () => void
    withDelete?: boolean
    withConfirm?: boolean
    isClickable?: boolean
    isSelected?: boolean
}

const VisitItem = ({
                       classes,
                       visitItem,
                       withDelete = false,
                       withConfirm = false,
                       isClickable = false,
                       isSelected = false,
                       onClick,
                       onDeleteIconClick
                   }: VisitItemProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    return (
        <>
            <div onClick={onClick} className={classNames(classes.visitItemContainer,
                {[classes.clickable]: isClickable, [classes.selected]: isSelected, [classes.mobile]:isMobile})}>
                <Typography variant="body1">{visitItem.date}</Typography>
                <Typography variant="body1">{visitItem.time}</Typography>
                <Typography variant="body1">{visitItem.address}</Typography>
                {withConfirm && <CheckIcon
                    sx={{color: `${visitItem.accepted ? theme.palette.success.main : theme.palette.text.secondary}`}}/>}
                {withDelete && <DeleteOutlineIcon
                    onClick={onDeleteIconClick}
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.error.main,
                        '&:hover': {
                            color: theme.palette.error.light,
                        },
                    }}/>}
            </div>
            <Divider className={classes.divider}/>
        </>
    )
}

export default withStyles(styles)(VisitItem);