import {useEffect} from "react";
import classNames from "classnames";

import {Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {useStyles} from "./VisitManager.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper/MyPaper.tsx";
import {EmptyVisitsIcon} from "../UserVisitOverview/icons/icons.tsx";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import VisitItem from "../../reusableComponents/VisitItem/VisitItem.tsx";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import AtomButton from "../../atoms/AtomButton";
import VisitCalendar from "../../reusableComponents/VisitCalendar";
import MobileDatePicker from "../../reusableComponents/MobileDatePicker/MobileDatePicker.tsx";
import VisitSkeleton from "../../reusableComponents/VisitSkeleton";
import AddVisitDialog from "./components/AddVisitDialog";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import authSelectors from "../../auth/selectors.ts";
import selectors from "./selectors.ts";
import actions from "./actions.tsx";


const VisitManager = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const isAdmin = useAppSelector(authSelectors.getIsAdmin)
    const selectedTermId = useAppSelector(selectors.getSelectedTermId)
    const selectedDate = useAppSelector(selectors.getSelectedDate)
    const isCreateVisitDialogOpen = useAppSelector(selectors.getIsCreateVisitDialogOpen)
    const visitItemsData = useAppSelector(selectors.getVisitItemsData)
    const isLoading = useAppSelector(selectors.getIsLoading)


    useEffect(() => {
        if (selectedDate) {
            dispatch(actions.fetchAvailableTerms(selectedDate))
        }
    }, [selectedDate])

    const onSelectTerm = (availableTermId: number) => {
        dispatch(actions.setSelectedTermId(availableTermId))
    }

    const onCalendarChange = (value: any) => {
        dispatch(actions.setSelectedDate(value))
    }

    const onCreateVisitDialogClose = () => {
        dispatch(actions.setIsCreateVisitDialogOpen(false))
    }

    const onCreateVisitDialogOpen = () => {
        dispatch(actions.setIsCreateVisitDialogOpen(true))
    }


    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`}
                       visitItem={visitItem}
                       isClickable
                       onClick={onSelectTerm}
                       isSelected={visitItem.id === selectedTermId}
                       withDelete={isAdmin}
            />
        )
    })

    return (
        <>
            <MyPaper withBackButton paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.headerWithButton}
                            variant="subtitle1">{isAdmin ? "Dodaj terminy" : "Umów wizytę"}</Typography>
                <div className={classes.contentContainer}>
                    {isMobile
                        ? < MobileDatePicker
                            onCalendarChange={onCalendarChange}
                            selectedDate={selectedDate}
                            shouldDisablePast
                        />
                        : < VisitCalendar selectedDate={selectedDate} onChange={onCalendarChange} shouldDisablePast/>}
                    <ShadowedScrollbar
                        style={{
                            height: isMobile ? 'calc(100% - 150px)' : 'calc(100% - 100px)',
                            flex: isMobile ? '1 0 auto' : '1 0 610px'
                        }}>
                        {isLoading
                            ? <div className={classes.paperContent}>
                                {<VisitSkeleton/>}
                            </div>
                            : visitItems.length
                                ? <div className={classes.paperContent}>
                                    {visitItems}
                                </div>
                                : <div className={classes.emptyContent}>
                                    <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                    <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                    >Brak dostępnych wizyt</Typography>
                                </div>
                        }
                    </ShadowedScrollbar>
                </div>
                <AtomButton buttonVariant={AtomButtonVariants.FLOATING_BUTTON_VARIANT}
                            text={isSmall ? <AddIcon/> : isAdmin ? "Dodaj terminy" : "Umów wizytę"}
                            onClick={onCreateVisitDialogOpen}/>
            </MyPaper>
            {isAdmin && <AddVisitDialog title={selectedDate?.toDate()} onClose={onCreateVisitDialogClose}
                                        isOpen={isCreateVisitDialogOpen}/>}
        </>
    )
}

export default VisitManager
