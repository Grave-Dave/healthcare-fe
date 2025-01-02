import {useEffect, useState} from "react";
import classNames from "classnames";

import {Typography} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {styles} from "./AdminVisitOverview.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {EmptyVisitsIcon} from "./icons/icons.tsx";
import VisitItem from "../../reusableComponents/VisitItem";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import authSelectors from "../../auth/selectors.ts";
import selectors from "./selectors.ts";
import actions from "./actions.tsx";
import VisitSkeleton from "../../reusableComponents/VisitSkeleton";
import {VisitItemVariantEnum} from "../UserVisitOverview/constants.ts";

const AdminVisitOverview = ({classes}: WithStyles<typeof styles>) => {
    const {windowWidth} = useWindowSize();
    const dispatch = useAppDispatch();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const isAdmin = useAppSelector(authSelectors.getIsAdmin)

    const isLoading = useAppSelector(selectors.getIsLoading)
    const incomingConfirmedVisitsData = useAppSelector(selectors.getIncomingConfirmedVisitsData)
    const incomingPendingVisitsData = useAppSelector(selectors.getIncomingPendingVisitsData)

    const [deleteWithAvailableTerm, setDeleteWithAvailableTerm] = useState<boolean>(false)

    useEffect(() => {
        if (isAdmin) {
            dispatch(actions.fetchAdminVisits())
        }
    }, [])

    const onVisitDelete = (visitId: number) => {
        if (visitId) {
            dispatch(actions.deleteVisit(visitId, deleteWithAvailableTerm))
        }
    }

    const onVisitConfirm = (visitId: number) => {
        if (visitId) {
            dispatch(actions.updateVisit(visitId))
        }
    }

    const onSwitchChange = () => {
        setDeleteWithAvailableTerm(prevState => !prevState)
    }

    const incomingPendingVisits = incomingPendingVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`incoming-pending-visit-item-${i}`}
                       visitItem={visitItem}
                       variant={VisitItemVariantEnum.UserVisit}
                       withBadge
                       withDelete
                       withConfirm
                       onCheckIconClick={onVisitConfirm}
                       onDialogSwitchChange={onSwitchChange}
                       dialogChecked={deleteWithAvailableTerm}
                       onDeleteIconClick={onVisitDelete}
                       extended
            />
        )
    })

    const incomingConfirmedVisits = incomingConfirmedVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`incoming-confirmed-visit-item-${i}`}
                       visitItem={visitItem}
                       variant={VisitItemVariantEnum.UserVisit}
                       onDeleteIconClick={onVisitDelete}
                       onDialogSwitchChange={onSwitchChange}
                       dialogChecked={deleteWithAvailableTerm}
                       withDelete
                       withBadge
                       extended
            />
        )
    })

    return (
        <div className={classNames(classes.papersContainer,
            {[classes.mobilePapersContainer]: isSmall})}>
            <MyPaper
                withBackButton
                paperClassName={classNames({
                    [classes.paperContainer]: !isSmall,
                    [classes.mobilePaperContainer]: isSmall
                })}>
                <Typography
                    className={classes.headerWithButton}
                    variant="subtitle1">
                    {`Oczekujące na potwierdzenie (${incomingPendingVisits.length})`}
                </Typography>
                <ShadowedScrollbar>
                    {isLoading
                        ? <div className={classes.paperContent}>
                            {<VisitSkeleton/>}
                        </div>
                        : incomingPendingVisits.length
                            ? <div className={classes.paperContent}>
                                {incomingPendingVisits}
                            </div>
                            : <div className={classes.emptyContent}>
                                <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                >Brak wizyt oczekujących na zatwierdzenie</Typography>
                            </div>
                    }
                </ShadowedScrollbar>
            </MyPaper>
            <MyPaper
                paperClassName={classNames({
                    [classes.paperContainer]: !isSmall,
                    [classes.mobilePaperContainer]: isSmall
                })}>
                <Typography
                    className={classes.header}
                    variant="subtitle1">
                    {`Nadchodzące (${incomingConfirmedVisits.length})`}
                </Typography>
                <ShadowedScrollbar style={{height: '100%'}}>
                    {isLoading
                        ? <div className={classes.paperContent}>
                            {<VisitSkeleton/>}
                        </div>
                        : incomingConfirmedVisits.length
                            ? <div className={classes.paperContent}>
                                {incomingConfirmedVisits}
                            </div>
                            : <div className={classes.emptyContent}>
                                <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                >Brak nadchodzących wizyt</Typography>
                            </div>
                    }
                </ShadowedScrollbar>
            </MyPaper>
        </div>
    )
}

export default withStyles(styles)(AdminVisitOverview);
