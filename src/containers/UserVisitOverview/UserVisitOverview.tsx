import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import { Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./UserVisitOverview.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {EmptyVisitsIcon} from "./icons/icons.tsx";
import {VisitItemType} from "./types.ts";
import VisitItem from "../../reusableComponents/VisitItem";

const UserVisitOverview = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const visitItemsData: VisitItemType[] = [
        {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '15:20',
            accepted: true
        },
        {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        }, {
            address: 'Legnicka 55a/3, 54-234 Wrocław',
            date: 'wtorek, 28 marca 2024',
            time: '16:20',
            accepted: false
        },
    ]

    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`} visitItem={visitItem}/>
        )
    })

    return (
        <div className={classNames(classes.papersContainer, {[classes.mobilePapersContainer]: isSmall})}>
            <MyPaper withBackButton paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.headerWithButton} variant="subtitle1">{`Nadchodzące (${0})`}</Typography>
                <Scrollbars
                    renderView={({style: originalStyle}) =>
                        <div style={{...originalStyle}} className={classes.shadowedScrollBar}/>}
                >
                    {visitItems.length
                        ? <div className={classes.paperContent}>
                            {visitItems}
                        </div>
                        : <div className={classes.emptyContent}>
                            <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                            <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                            >Brak nadchodzących wizyt</Typography>
                        </div>
                    }
                </Scrollbars>
            </MyPaper>
            <MyPaper paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
                <Typography className={classes.header} variant="subtitle1">{`Zakończone (${0})`}</Typography>
                <Scrollbars
                    renderView={({style: originalStyle}) =>
                        <div style={{...originalStyle}} className={classes.shadowedScrollBar}/>}
                >
                    <div className={classes.emptyContent}>
                        <EmptyVisitsIcon sx={{width: 150, height: 150}}/>
                        <Typography variant="body1" sx={{color: theme.palette.text.secondary}}
                        >Brak zakończonych wizyt</Typography>
                    </div>
                </Scrollbars>
            </MyPaper>
        </div>
    )
}

export default UserVisitOverview
