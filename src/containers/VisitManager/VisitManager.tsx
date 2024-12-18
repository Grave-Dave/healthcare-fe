import {useState} from "react";
import dayjs, {Dayjs} from 'dayjs';
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
import {VisitItemInterface} from "../UserVisitOverview/types.ts";
import VisitItem from "../../reusableComponents/VisitItem/VisitItem.tsx";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import AtomButton from "../../atoms/AtomButton";
import VisitCalendar from "../../reusableComponents/VisitCalendar";
import MobileDatePicker from "../../reusableComponents/MobileDatePicker/MobileDatePicker.tsx";
import AddVisitDialog from "./components/AddVisitDialog";


const VisitManager = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const isAdmin = true // todo reducer
    const today = new Date();

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(today));
    const [isCreateVisitDialogOpen, setIsCreateVisitDialogOpen] = useState<boolean>(false);

    const visitItemsData: VisitItemInterface[] = [
        {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '15:20',
            status: true
        },
        {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            status: false
        },
    ]

    const onSelectVisit = () => {

    }

    const onCalendarChange = (value: any) => {
        setSelectedDate(value)
    }

    const onCreateVisitDialogClose = () => {
        setIsCreateVisitDialogOpen(false)
    }

    const onCreateVisitDialogOpen = () => {
        setIsCreateVisitDialogOpen(true)
    }


    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`}
                       visitItem={visitItem}
                       isClickable
                       onClick={onSelectVisit}
                       isSelected={i === 3}
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
                        />
                        : < VisitCalendar selectedDate={selectedDate} onChange={onCalendarChange} shouldDisablePast/>}
                    <ShadowedScrollbar
                        style={{
                            height: isMobile ? 'calc(100% - 150px)' : 'calc(100% - 100px)',
                            flex: isMobile ? '1 0 auto' : '1 0 610px'
                        }}>
                        {visitItems.length
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
