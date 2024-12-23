import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import classNames from "classnames";

import {Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./AdminPanel.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper/MyPaper.tsx";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar/ShadowedScrollbar.tsx";
import {EmptyVisitsIcon} from "../UserVisitOverview/icons/icons.tsx";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import VisitItem from "../../reusableComponents/VisitItem/VisitItem.tsx";
import MobileDatePicker from "../../reusableComponents/MobileDatePicker/MobileDatePicker.tsx";
import VisitCalendar from "../../reusableComponents/VisitCalendar/VisitCalendar.tsx";
import PersonSelector from "../../reusableComponents/PersonSelector";
import {VisitItemInterfaceWithUser} from "../UserVisitOverview/types.ts";
import {VisitItemVariantEnum} from "../UserVisitOverview/constants.ts";

const AdminPanel = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(new Date()));

    const visitItemsData: VisitItemInterfaceWithUser[] = []

    const onCalendarChange = (value: any) => {
        setSelectedDate(value)
    }

    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`}
                       variant={VisitItemVariantEnum.UserVisit}
                       visitItem={visitItem}
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
                <Typography className={classes.headerWithButton} variant="subtitle1">{"Historia"}</Typography>
                <div className={classes.contentContainer}>
                    {isMobile
                        ? < MobileDatePicker
                            onCalendarChange={onCalendarChange}
                            selectedDate={selectedDate}
                            shouldDisableFuture
                        />
                        : < VisitCalendar selectedDate={selectedDate} onChange={onCalendarChange} shouldDisableFuture/>}
                    <ShadowedScrollbar style={{
                        height: isMobile ? 'calc(100% - 150px)' :'100%',
                        flex: isMobile ? '1 0 auto' : '1 0 610px'
                    }}>
                        {visitItems.length
                            ? <div className={classes.paperContent}>
                                {visitItems}
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
                    {visitItems.length
                        ? <div className={classes.paperContent}>
                            {visitItems}
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
    )
}

export default AdminPanel
