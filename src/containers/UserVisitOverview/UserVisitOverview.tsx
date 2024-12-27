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
import {useAppSelector} from "../../hooks/reduxHooks.ts";
import authSelectors from "../../auth/selectors.ts";
import selectors from "./selectors.ts";

const UserVisitOverview = ({classes}: WithStyles<typeof styles>) => {
    const {windowWidth} = useWindowSize();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const isAdmin = useAppSelector(authSelectors.getIsAdmin)
    const userIncomingVisitsData = useAppSelector(selectors.getUserIncomingVisitsData)
    const userPastVisitsData = useAppSelector(selectors.getUserPastVisitsData)
    const isLoading = useAppSelector(selectors.getIsLoading)


    const onVisitDelete = () => {

    }


    const userIncomingVisits = userIncomingVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`incoming-visit-item-${i}`}
                       visitItem={visitItem}
                       variant={VisitItemVariantEnum.UserVisit}
                       withConfirm
                       withDelete
                       onDeleteIconClick={onVisitDelete}
                       extended
            />
        )
    })

    const userPastVisits = userPastVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`past-visit-item-${i}`}
                       visitItem={visitItem}
                       variant={VisitItemVariantEnum.UserVisit}
                       withConfirm
                       withDelete
                       onDeleteIconClick={onVisitDelete}
                       extended
            />
        )
    })

    return (
        <div className={classNames(classes.papersContainer, {[classes.mobilePapersContainer]: isSmall})}>
            <MyPaper withBackButton paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.headerWithButton}
                            variant="subtitle1">
                    {isAdmin ? `Oczekujące na potwierdzenie (${0})` : `Nadchodzące (${userIncomingVisits.length})`}
                </Typography>
                <ShadowedScrollbar>
                    {userIncomingVisits.length
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
            <MyPaper paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.header}
                            variant="subtitle1">{isAdmin ? `Nadchodzące (${0})` : `Zakończone (${userPastVisits.length})`}</Typography>
                <ShadowedScrollbar style={{height: isAdmin ? '100%' : 'calc(100% - 120px)'}}>
                    {userPastVisits.length
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
                {!isAdmin && <AtomButton buttonVariant={AtomButtonVariants.FLOATING_BUTTON_VARIANT}
                                         text={isSmall ? <AddIcon/> : "Umów nową wizytę"}/>}
            </MyPaper>
        </div>
    )
}

export default withStyles(styles)(UserVisitOverview);
