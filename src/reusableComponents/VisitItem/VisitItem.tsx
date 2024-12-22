import classNames from "classnames";

import {Paper, Typography} from "@mui/material";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CheckIcon from "@mui/icons-material/Check";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {withStyles, WithStyles} from "@mui/styles";

import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {styles} from "./VisitItem.style.ts";
import {
    VisitItemInterface,
    VisitItemInterfaceWithUser,
} from "../../containers/UserVisitOverview/types.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";


interface VisitItemProps extends WithStyles<typeof styles> {
    visitItem: VisitItemInterface | VisitItemInterfaceWithUser
    onDeleteIconClick?: () => void
    onClick?: (value: number) => void
    withDelete?: boolean
    withConfirm?: boolean
    isClickable?: boolean
    isSelected?: boolean
    extended?: boolean
}

const VisitItem = ({
                       classes,
                       visitItem,
                       withDelete = false,
                       withConfirm = false,
                       isClickable = false,
                       isSelected = false,
                       extended = false,
                       onClick,
                       onDeleteIconClick
                   }: VisitItemProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const user = (visitItem as VisitItemInterfaceWithUser).user;

    const handleOnClick = () => {
        onClick && onClick(visitItem.id)
    }

    return (
        <>
            <Paper elevation={isSelected ? 10 : 3} onClick={handleOnClick}
                   sx={{background:'none'}}
                 className={classNames(classes.visitItemContainer,
                     {
                         [classes.clickable]: isClickable,
                         [classes.selected]: isSelected,
                         [classes.mobile]: isMobile
                     })}>
                <div className={classes.detailsContainer}>
                    <div className={classes.details}>
                        <Typography variant="h3">{visitItem.time}</Typography>
                        <Typography variant="h4">{visitItem.date}</Typography>
                        <Typography variant="body1" className={classes.userItem}>
                            <FmdGoodOutlinedIcon sx={{width: 20, height: 20}}/>
                            {visitItem.address}
                        </Typography>
                    </div>
                    {extended && user && <div className={classes.details}>
                        <Typography
                            variant="body1"
                            className={classes.userItem}>
                            <PersonOutlineIcon sx={{width: 20, height: 20}}/>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                        <Typography variant="body1">
                            <a href={`tel:${user.phone}`}
                               className={classes.userItem}
                               style={{textDecoration: 'none', color: 'inherit'}}>
                                <CallOutlinedIcon sx={{width: 20, height: 20}}/>
                                {user.phone}
                            </a>
                        </Typography>
                    </div>}
                </div>
                <div className={classes.actionsContainer}>
                    {withConfirm &&
                        <CheckIcon
                            sx={{color: `${visitItem.status ? theme.palette.success.main : theme.palette.text.secondary}`}}/>}
                    {withDelete &&
                        <DeleteOutlineIcon
                            onClick={onDeleteIconClick}
                            sx={{
                                cursor: 'pointer',
                                color: theme.palette.error.main,
                                '&:hover': {
                                    color: theme.palette.error.light,
                                },
                            }}/>
                    }
                </div>
            </Paper>
            {/*<Divider className={classes.divider}/>*/}
        </>
    )
}

export default withStyles(styles)(VisitItem);