import {Divider, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {withStyles, WithStyles} from "@mui/styles";

import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {styles} from "./VisitItem.style.ts";
import {VisitItemType} from "../../containers/UserVisitOverview/types.ts";


interface VisitItemProps extends WithStyles<typeof styles> {
    visitItem: VisitItemType
}

const VisitItem = ({classes, visitItem}: VisitItemProps) => {
    return (
        <>
            <div className={classes.visitItemContainer}>
                <Typography variant="body1">{visitItem.address}</Typography>
                <Typography variant="body1">{visitItem.date}</Typography>
                <Typography variant="body1">{visitItem.time}</Typography>
                <CheckIcon
                    sx={{color: `${visitItem.accepted ? theme.palette.success.main : theme.palette.text.secondary}`}}/>
                <DeleteOutlineIcon sx={{
                    cursor:'pointer',
                    color: theme.palette.error.main,
                    '&:hover': {
                        color: theme.palette.error.light,
                    },
                }}/>
            </div>
            <Divider className={classes.divider}/>
        </>
    )
}

export default withStyles(styles)(VisitItem);