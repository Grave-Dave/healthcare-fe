import classNames from "classnames";

import {Badge, BadgeProps, ClickAwayListener, Paper, Tooltip, Typography} from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CheckIcon from "@mui/icons-material/Check";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {styled} from "@mui/material/styles";
import {withStyles, WithStyles} from "@mui/styles";

import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {styles} from "./VisitItem.style.ts";
import {VisitItemInterfaceWithUser} from "../../containers/UserVisitOverview/types.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import DeleteVisitDialog from "../../containers/UserVisitOverview/components/DeleteVisitDialog";
import {useState} from "react";
import {UserVisitStatusEnum, VisitItemVariantEnum} from "../../containers/UserVisitOverview/constants.ts";
import {VisitItemInterface} from "../../containers/VisitManager/types.ts";
import {useAppSelector} from "../../hooks/reduxHooks.ts";
import authSelectors from "../../auth/selectors.ts";
import ConfirmVisitDialog from "../../containers/AdminVisitOverview/components/ConfirmVisitDialog";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
        right: 30,
        bottom: 30
    },
}));

interface VisitItemProps extends WithStyles<typeof styles> {
    visitItem: VisitItemInterface | VisitItemInterfaceWithUser
    variant: VisitItemVariantEnum
    onDeleteIconClick?: (value: number) => void
    onCheckIconClick?: (value: number) => void
    onDialogSwitchChange?: () => void
    onClick?: (value: number) => void
    onClickAway?: (e: MouseEvent | TouchEvent, value: number) => void
    withDelete?: boolean
    withConfirm?: boolean
    dialogChecked?: boolean
    withBadge?: boolean
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
                       withBadge = false,
                       isClickable = false,
                       isSelected = false,
                       extended = false,
                       isExpanded = true,
                       dialogChecked,
                       onClick,
                       onClickAway,
                       onCheckIconClick,
                       onDialogSwitchChange,
                       onDeleteIconClick,
                       variant
                   }: VisitItemProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;
    const isAdmin = useAppSelector(authSelectors.getIsAdmin)

    const user = (visitItem as VisitItemInterfaceWithUser).user;

    const [isDeleteVisitDialogOpen, setIsDeleteVisitDialogOpen] = useState(false)
    const [isConfirmVisitDialogOpen, setIsConfirmVisitDialogOpen] = useState(false)

    const handleOnClick = () => {
        onClick && onClick(visitItem.id)
    }

    const onConfirm = () => {
        onCheckIconClick && onCheckIconClick(visitItem.id)
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

    const onConfirmDialogClose = () => {
        setIsConfirmVisitDialogOpen(false)
    }

    const onConfirmDialogOpen = () => {
        setIsConfirmVisitDialogOpen(true)
    }

    const getBadgeContent = () => {
        if (withBadge && variant === VisitItemVariantEnum.UserVisit) {
            switch (visitItem.status) {
                case UserVisitStatusEnum.Pending: {
                    return (
                        <Tooltip title="Oczekuje na zatwierdzenie">
                            <PendingActionsIcon sx={{width: 32, height: 32}}/>
                        </Tooltip>
                    )
                }
                case UserVisitStatusEnum.Confirmed: {
                    return (
                        <Tooltip title="Wizyta została potwierdzona">
                            <CheckBoxIcon sx={{width: 32, height: 32, color: theme.palette.success.main}}/>
                        </Tooltip>
                    )
                }
                default:
                    return
            }
        }
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <StyledBadge color="default"
                             sx={{display: 'block'}}
                             anchorOrigin={{
                                 vertical: 'bottom',
                                 horizontal: 'right',
                             }}
                             badgeContent={
                                 getBadgeContent()
                             }>
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
                                    onClick={onConfirmDialogOpen}
                                    sx={{
                                        cursor: 'pointer',
                                        color: theme.palette.grey["500"],
                                        '&:hover': {
                                            color: theme.palette.success.main,
                                        },
                                    }}
                                />}
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
                </StyledBadge>
            </ClickAwayListener>
            <DeleteVisitDialog onClose={onDeleteDialogClose}
                               open={isDeleteVisitDialogOpen}
                               onDelete={onDelete}
                               variant={variant}
                               onChange={onDialogSwitchChange}
                               checked={dialogChecked}
                               withSwitch={isAdmin}
            />
            {isAdmin &&
                <ConfirmVisitDialog
                    open={isConfirmVisitDialogOpen}
                    onClose={onConfirmDialogClose}
                    onConfirm={onConfirm}
                />
            }
        </>
    )
}

export default withStyles(styles)(VisitItem);