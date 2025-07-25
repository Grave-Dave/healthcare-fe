import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
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
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";
import layoutActions from "../../layouts/Layout/actions.tsx";
import authActions from "../../auth/actions.tsx";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";
import {ROUTES} from "../../constants.ts";


const VisitManager = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const isAdmin = useAppSelector(authSelectors.getIsAdmin)
    const hasPhoneNumber = !!useAppSelector(authSelectors.getUser).phone
    const isLoggedIn = useAppSelector(authSelectors.getIsAuthenticated)
    const hasToken = !!useAppSelector(authSelectors.getAccessToken)
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

    useEffect(() => {
        if (!isLoggedIn && hasToken) {
            notifyToVerify()
        }
    }, [isLoggedIn])

    const onSelectTerm = (availableTermId: number) => {
        dispatch(actions.setSelectedTermId(availableTermId))
    }

    const onUnselectTerm = (e: MouseEvent | TouchEvent, availableTermId: number) => {
        const target = e.target as HTMLElement;

        if (target?.tagName.toLowerCase() !== 'button'
            && target?.tagName.toLowerCase() !== 'path'
            && target?.tagName.toLowerCase() !== 'svg'
            && !isCreateVisitDialogOpen) {
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

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!isLoggedIn) {
            notifyToLogin();
        } else if (!hasPhoneNumber) {
            notifyToUpdatePhone();
        } else {
            onCreateVisitDialogOpen(e);
        }
    }

    const redirectToLogin = () => {
        navigate(ROUTES.LOGIN)
    }

    const redirectToUserAccount = () => {
        navigate(ROUTES.USER)
    }

    const resendMail = () => {
        dispatch(authActions.resendMail())
    }

    const notifyToLogin = () => {
        dispatch(layoutActions.showSnackBar({
            message: 'Należy najpierw się zalogować.',
            type: SmoothSnackbarEnum.WARNING,
            autoHideDuration: 10000,
            withButton: true,
            buttonText: 'Zaloguj się',
            onButtonClick: redirectToLogin
        }))
    }

    const notifyToVerify = () => {
        dispatch(layoutActions.showSnackBar({
            message: 'Należy najpierw zweryfikować adres email. Link nie dotarł?',
            type: SmoothSnackbarEnum.WARNING,
            autoHideDuration: 10000,
            withButton: true,
            buttonText: 'Wyślij ponownie',
            onButtonClick: resendMail
        }))
    }

    const notifyToUpdatePhone = () => {
        dispatch(layoutActions.showSnackBar({
            message: 'Aby umówić wizytę, należy podać numer telefonu, aby ułatwić kontakt',
            type: SmoothSnackbarEnum.WARNING,
            autoHideDuration: 10000,
            withButton: true,
            buttonText: 'Podaj numer telefonu',
            onButtonClick: redirectToUserAccount
        }))
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
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
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
                            onClick={onButtonClick}
                            disabled={!isAdmin && !selectedTermId}
                            withTooltip={!isLoggedIn}
                            tooltipText={"Aby zarezerwować termin, należy najpierw się zalogować"}
                />
            </MyPaper>
            {getActionDialog()}
        </>
    )
}

export default VisitManager
