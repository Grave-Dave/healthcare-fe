import React, {useEffect, useState} from "react";
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
import AddNewTermDialog from "./components/AddNewTermDialog";
import VisitSkeleton from "../../reusableComponents/VisitSkeleton";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import authSelectors from "../../auth/selectors.ts";
import selectors from "./selectors.ts";
import actions from "./actions.tsx";
import {VisitItemVariantEnum} from "../UserVisitOverview/constants.ts";
import AddNewVisitDialog from "./components/AddNewVisitDialog";
import {CurrentMonthYearType} from "../../reusableComponents/VisitCalendar/types.ts";


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
    const locationsData = useAppSelector(selectors.getLocations)
    const highlightedCalendarDays = useAppSelector(selectors.getFutureTerms)
    const isLoading = useAppSelector(selectors.getIsLoading)
    const isCalendarLoading = useAppSelector(selectors.getIsCalendarLoading)

    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    useEffect(() => {
        if (isAdmin) {
            dispatch(actions.fetchLocations())
        }
    }, [])

    useEffect(() => {
        if (selectedDate) {
            dispatch(actions.fetchAvailableTerms(selectedDate))
        }
    }, [selectedDate])

    const onSelectTerm = (availableTermId: number) => {
        dispatch(actions.setSelectedTermId(availableTermId))
    }

    const onUnselectTerm = (e: MouseEvent | TouchEvent, availableTermId: number) => {
        const target = e.target as HTMLElement;

        if (target?.tagName.toLowerCase() !== 'button' && target?.tagName.toLowerCase() !== 'path' && !isCreateVisitDialogOpen) {
            if (availableTermId === selectedTermId) {
                dispatch(actions.setSelectedTermId(null))
            }
        }
    }

    const onDateChange = (value: any) => {
        dispatch(actions.setSelectedDate(value))
        dispatch(actions.setSelectedTermId(null))
    }

    const onMonthChange = (currentMonthYear: CurrentMonthYearType) => {
        dispatch((actions.fetchMonthAvailableTerms(currentMonthYear)))
    }

    const onCreateVisitDialogClose = () => {
        dispatch(actions.setIsCreateVisitDialogOpen(false))
    }

    const onCreateVisitDialogOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(actions.setIsCreateVisitDialogOpen(true))
    }

    const onTermDelete = (termId: number) => {
        dispatch(actions.deleteAvailableTerm(termId))
    }

    const handleSwitchChange = () => {
        setIsExpanded(prevState => !prevState)
    }

    const getActionDialog = () => {
        switch (true) {
            case isAdmin: {
                return <AddNewTermDialog
                    selectedDate={selectedDate}
                    onClose={onCreateVisitDialogClose}
                    isOpen={isCreateVisitDialogOpen}
                    locationsData={locationsData}
                />
            }
            case !isAdmin: {
                return <AddNewVisitDialog
                    onClose={onCreateVisitDialogClose}
                    isOpen={isCreateVisitDialogOpen}
                    selectedTerm={visitItemsData.find(item => item.id === selectedTermId)}/>
            }
            default:
                break;
        }
    }


    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`}
                       visitItem={visitItem}
                       isClickable
                       isExpanded={isExpanded}
                       onClick={onSelectTerm}
                       onClickAway={onUnselectTerm}
                       isSelected={visitItem.id === selectedTermId}
                       withDelete={isAdmin}
                       onDeleteIconClick={onTermDelete}
                       variant={VisitItemVariantEnum.AvailableTerm}
            />
        )
    })

    return (
        <>
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
                <Typography className={classes.headerWithButton}
                            variant="subtitle1">{isAdmin ? "Dodaj terminy" : "Umów wizytę"}</Typography>
                <div className={classes.contentContainer}>
                    {isMobile
                        ? <div style={{height: 30}}>
                            < MobileDatePicker
                                onDateChange={onDateChange}
                                selectedDate={selectedDate}
                                shouldDisablePast
                                shouldDisableAllExceptAvailable={!isAdmin}
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
                            shouldDisablePast
                            shouldDisableAllExceptAvailable={!isAdmin}
                        />}
                    <ShadowedScrollbar
                        style={{
                            height: isSmall ? 'calc(100% - 100px)' : isMobile ? 'calc(100% - 150px)' : 'calc(100% - 70px)',
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
                            onClick={onCreateVisitDialogOpen}
                            disabled={!isAdmin && !selectedTermId}
                />
            </MyPaper>
            {getActionDialog()}
        </>
    )
}

export default VisitManager
