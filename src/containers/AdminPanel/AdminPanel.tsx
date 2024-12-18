import classNames from "classnames";

import {Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./AdminPanel.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper/MyPaper.tsx";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar/ShadowedScrollbar.tsx";
import {EmptyVisitsIcon} from "../UserVisitOverview/icons/icons.tsx";
import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {VisitItemInterfaceWithUser} from "../UserVisitOverview/types.ts";
import VisitItem from "../../reusableComponents/VisitItem/VisitItem.tsx";

const AdminPanel = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const visitItemsData: VisitItemInterfaceWithUser[] = []

    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`} visitItem={visitItem} extended/>
        )
    })

    return (
        <div className={classNames(classes.papersContainer, {[classes.mobilePapersContainer]: isSmall})}>
            <MyPaper withBackButton paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.headerWithButton} variant="subtitle1">{"Historia"}</Typography>
                <ShadowedScrollbar>
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
            </MyPaper>
            <MyPaper paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.header} variant="subtitle1">{"Znajdź pacjenta"}</Typography>
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
