import {useEffect, useState} from "react";
import classNames from "classnames";

import {Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {useStyles} from "./AdminPanel.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import VisitItem from "../../reusableComponents/VisitItem";
import VisitCalendar from "../../reusableComponents/VisitCalendar";
import {EmptyVisitsIcon} from "../UserVisitOverview/icons/icons.tsx";
import MobileDatePicker from "../../reusableComponents/MobileDatePicker";
import PersonSelector from "../../reusableComponents/PersonSelector";
import VisitSkeleton from "../../reusableComponents/VisitSkeleton";
import {VisitItemVariantEnum} from "../UserVisitOverview/constants.ts";
import {CurrentMonthYearType} from "../../reusableComponents/VisitCalendar/types.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "./selectors.ts";
import actions from "./actions.tsx";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const AdminPanel = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const selectedDate = useAppSelector(selectors.getAdminSelectedDate)
    const pastVisitsData = useAppSelector(selectors.getPastVisitsData)
    const userVisitsData = useAppSelector(selectors.getUserVisitsData)
    const highlightedCalendarDays = useAppSelector(selectors.getPastTerms)
    const isLoading = useAppSelector(selectors.getIsLoading)
    const isCalendarLoading = useAppSelector(selectors.getIsAdminCalendarLoading)

    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    useEffect(() => {
        if (selectedDate) {
            dispatch(actions.fetchPastVisits(selectedDate))
        }
    }, [selectedDate])

    const onMonthChange = (currentMonthYear: CurrentMonthYearType) => {
        dispatch((actions.fetchMonthPastTerms(currentMonthYear)))
    }

    const onDateChange = (value: any) => {
        dispatch(actions.setSelectedDate(value))
    }

    const handleSwitchChange = () => {
        setIsExpanded(prevState => !prevState)
    }

    const pastVisitItems = pastVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`past-visit-item-${i}`}
                       variant={VisitItemVariantEnum.UserVisit}
                       visitItem={visitItem}
                       isExpanded={isExpanded}
                       extended
            />
        )
    })

    const userVisitItems = userVisitsData.map((visitItem, i) => {
        return (
            <VisitItem key={`user-visit-item-${i}`}
                       variant={VisitItemVariantEnum.UserVisit}
                       visitItem={visitItem}
                       extended
            />
        )
    })

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <div className={classNames(classes.papersContainer, {[classes.mobilePapersContainer]: isSmall})}>
                <MyPaper
                    withBackButton
                    withActionSwitch
                    isSwitchChecked={isExpanded}
                    handleSwitchChange={handleSwitchChange}
                    switchTitle={isExpanded ? "Zwiń" : 'Rozwiń'}
                    paperClassName={classNames({
                        [classes.paperContainer]: !isSmall,
                        [classes.mobilePaperContainer]: isSmall
                    })}>
                    <Typography className={classes.headerWithButton} variant="subtitle1">{"Historia"}</Typography>
                    <div className={classes.contentContainer}>
                        {isMobile
                            ? <div style={{height: 30}}>
                                < MobileDatePicker
                                    onDateChange={onDateChange}
                                    selectedDate={selectedDate}
                                    shouldDisableFuture
                                    onMonthChange={onMonthChange}
                                    highlightedDays={highlightedCalendarDays}
                                    isLoading={isCalendarLoading}
                                />
                            </div>
                            : < VisitCalendar
                                selectedDate={selectedDate}
                                onChange={onDateChange}
                                onMonthChange={onMonthChange}
                                highlightedDays={highlightedCalendarDays}
                                isLoading={isCalendarLoading}
                                shouldDisableFuture/>}
                        <ShadowedScrollbar style={{
                            height: isSmall ? 'calc(100% - 100px)' : isMobile ? 'calc(100% - 150px)' : 'calc(100% - 70px)',
                            flex: isMobile ? '1 0 auto' : '1 0 610px'
                        }}>
                            {isLoading
                                ? <div className={classes.paperContent}>
                                    {<VisitSkeleton/>}
                                </div>
                                : pastVisitItems.length
                                    ? <div className={classes.paperContent}>
                                        {pastVisitItems}
                                    </div>
                                    : <div className={classes.emptyContent}>
                                        <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                        <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                        >Brak odbytych wizyt dla tego dnia</Typography>
                                    </div>
                            }
                        </ShadowedScrollbar>
                    </div>
                </MyPaper>
                <MyPaper paperClassName={classNames({
                    [classes.paperContainer]: !isSmall,
                    [classes.mobilePaperContainer]: isSmall
                })}>
                    <Typography className={classes.header} variant="subtitle1">{"Znajdź pacjenta"}</Typography>
                    <PersonSelector/>
                    <ShadowedScrollbar style={{height: '100%'}}>
                        {isLoading
                            ? <div className={classes.paperContent}>
                                {<VisitSkeleton/>}
                            </div>
                            : userVisitItems.length
                                ? <div className={classes.paperContent}>
                                    {userVisitItems}
                                </div>
                                : <div className={classes.emptyContent}>
                                    <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                                    <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                                    >Brak odbytych wizyt dla tego pacjenta</Typography>
                                </div>
                        }
                    </ShadowedScrollbar>
                </MyPaper>
            </div>
        </>
    )
}

export default AdminPanel
