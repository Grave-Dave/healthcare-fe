import classNames from "classnames";

import {ClickAwayListener, Paper, Typography} from "@mui/material";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CheckIcon from "@mui/icons-material/Check";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {withStyles, WithStyles} from "@mui/styles";

import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {styles} from "./VisitItem.style.ts";
import {VisitItemInterfaceWithUser} from "../../containers/UserVisitOverview/types.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import DeleteVisitDialog from "../../containers/UserVisitOverview/components/DeleteVisitDialog";
import {useState} from "react";
import {VisitItemVariantEnum} from "../../containers/UserVisitOverview/constants.ts";
import {VisitItemInterface} from "../../containers/VisitManager/types.ts";


interface VisitItemProps extends WithStyles<typeof styles> {
    visitItem: VisitItemInterface | VisitItemInterfaceWithUser
    variant: VisitItemVariantEnum
    onDeleteIconClick?: (value: number) => void
    onClick?: (value: number) => void
    onClickAway?: (e: MouseEvent | TouchEvent, value: number) => void
    withDelete?: boolean
    withConfirm?: boolean
    isClickable?: boolean
    isSelected?: boolean
    extended?: boolean
    isExpanded?: boolean
}

const VisitItem = ({
                       classes,
                       visitItem,
                       withDelete = false,
                       withConfirm = false,
                       isClickable = false,
                       isSelected = false,
                       extended = false,
                       isExpanded = true,
                       onClick,
                       onClickAway,
                       onDeleteIconClick,
                       variant
                   }: VisitItemProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const user = (visitItem as VisitItemInterfaceWithUser).user;

    const [isDeleteVisitDialogOpen, setIsDeleteVisitDialogOpen] = useState(false)

    const handleOnClick = () => {
        onClick && onClick(visitItem.id)
    }

    const onDelete = () => {
        onDeleteIconClick && onDeleteIconClick(visitItem.id)
    }

    const handleClickAway = (e: MouseEvent | TouchEvent) => {
        onClickAway && onClickAway(e, visitItem.id)
    }

    const onDeleteDialogClose = () => {
        setIsDeleteVisitDialogOpen(false)
    }

    const onDeleteDialogOpen = () => {
        setIsDeleteVisitDialogOpen(true)
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Paper elevation={isSelected ? 10 : 3} onClick={handleOnClick}
                       sx={{background: 'none'}}
                       className={classNames(classes.visitItemContainer,
                           {
                               [classes.clickable]: isClickable,
                               [classes.expanded]: isExpanded,
                               [classes.selected]: isSelected,
                               [classes.mobile]: isMobile
                           })}>
                    <div className={classes.detailsContainer}>
                        <div className={classNames(classes.details, {[classes.detailsExpanded]: isExpanded})}>
                            <Typography variant="h3">{visitItem.time}</Typography>
                            <Typography variant="h4">{visitItem.date}</Typography>
                            <Typography variant="body1" className={classes.userItem}>
                                <FmdGoodOutlinedIcon sx={{width: 20, height: 20}}/>
                                {visitItem.location.name}
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
                                onClick={onDeleteDialogOpen}
                                sx={{
                                    cursor: 'pointer',
                                    color: theme.palette.error.main,
                                    '&:hover': {
                                        color: theme.palette.error.light,
                                    },
                                }}
                            />
                        }
                    </div>
                </Paper>
            </ClickAwayListener>
            <DeleteVisitDialog onClose={onDeleteDialogClose}
                               open={isDeleteVisitDialogOpen}
                               onDelete={onDelete}
                               variant={variant}/>
        </>
    )
}

export default withStyles(styles)(VisitItem);