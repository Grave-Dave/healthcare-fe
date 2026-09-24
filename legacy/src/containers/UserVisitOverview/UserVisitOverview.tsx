import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {Typography} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';

import useWindowSize from "../../hooks/useWindowSize.ts";
import {styles} from "./UserVisitOverview.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {EmptyVisitsIcon} from "./icons/icons.tsx";
import VisitItem from "../../reusableComponents/VisitItem";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import {VisitItemVariantEnum} from "./constants.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "./selectors.ts";
import actions from "./actions.tsx";
import VisitSkeleton from "../../reusableComponents/VisitSkeleton";
import {ROUTES} from "../../constants.ts";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const UserVisitOverview = ({classes}: WithStyles<typeof styles>) => {
    const {windowWidth} = useWindowSize();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const userIncomingVisitsData = useAppSelector(selectors.getUserIncomingVisitsData)
    const userPastVisitsData = useAppSelector(selectors.getUserPastVisitsData)
    const isLoading = useAppSelector(selectors.getIsLoading)

    useEffect(() => {
        dispatch(actions.fetchUserVisits())
    }, [])

    const onVisitDelete = (visitId: number) => {
        if (visitId) {
            dispatch(actions.deleteUserVisit(visitId))
        }
    }

    const userIncomingVisits = userIncomingVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`incoming-visit-item-${i}`}
                       visitItem={visitItem}
                       variant={VisitItemVariantEnum.UserVisit}
                       withBadge
                       withDelete
                       onDeleteIconClick={onVisitDelete}
            />
        )
    })

    const userPastVisits = userPastVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`past-visit-item-${i}`}
                       visitItem={visitItem}
                       variant={VisitItemVariantEnum.UserVisit}
                       onDeleteIconClick={onVisitDelete}
            />
        )
    })

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS} noFollow/>
            <div
                className={classNames(classes.papersContainer,
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
                        {`Nadchodzące (${userIncomingVisits.length})`}
                    </Typography>
                    <ShadowedScrollbar>
                        {isLoading
                            ? <div className={classes.paperContent}>
                                {<VisitSkeleton/>}
                            </div>
                            : userIncomingVisits.length
                                ? <div className={classes.paperContent}>
                                    {userIncomingVisits}
                                </div>
                                : <div className={classes.emptyContent}>
                                    <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                    <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                    >Brak nadchodzących wizyt</Typography>
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
                        {`Zakończone (${userPastVisits.length})`}
                    </Typography>
                    <ShadowedScrollbar style={{height: 'calc(100% - 120px)'}}>
                        {isLoading
                            ? <div className={classes.paperContent}>
                                {<VisitSkeleton/>}
                            </div>
                            : userPastVisits.length
                                ? <div className={classes.paperContent}>
                                    {userPastVisits}
                                </div>
                                : <div className={classes.emptyContent}>
                                    <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                    <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                    >Brak zakończonych wizyt</Typography>
                                </div>
                        }
                    </ShadowedScrollbar>
                    <AtomButton
                        buttonVariant={AtomButtonVariants.FLOATING_BUTTON_VARIANT}
                        text={isSmall ? <AddIcon/> : "Umów nową wizytę"}
                        onClick={() => navigate(ROUTES.MAKE_VISIT)}
                    />
                </MyPaper>
            </div>
        </>
    )
}

export default withStyles(styles)(UserVisitOverview);
