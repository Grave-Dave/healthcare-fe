import classNames from "classnames";

import {Typography} from "@mui/material";

import {useStyles} from "./VisitManager.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper/MyPaper.tsx";
import {EmptyVisitsIcon} from "../UserVisitOverview/icons/icons.tsx";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import {VisitItemType} from "../UserVisitOverview/types.ts";
import VisitItem from "../../reusableComponents/VisitItem/VisitItem.tsx";
import Calendar from "./components/Calendar";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import AddIcon from "@mui/icons-material/Add";
import AtomButton from "../../atoms/AtomButton";

const VisitManager = () => {
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

    const onSelectVisit = () => {

    }


    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`} visitItem={visitItem} isClickable onClick={onSelectVisit} isSelected={ i === 3}/>
        )
    })

    return(
        <MyPaper withBackButton paperClassName={classNames({
            [classes.paperContainer]: !isSmall,
            [classes.mobilePaperContainer]: isSmall
        })}>
            <Typography className={classes.headerWithButton} variant="subtitle1">{"Umów wizytę"}</Typography>
            <div className={classes.contentContainer}>
                <Calendar/>
                <ShadowedScrollbar style={{height: 'calc(100% - 100px)', flex:'0 1 600px'}}>
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
                        text={isSmall ? <AddIcon/> : "Umów wizytę"}/>
        </MyPaper>
    )
}

export default VisitManager
