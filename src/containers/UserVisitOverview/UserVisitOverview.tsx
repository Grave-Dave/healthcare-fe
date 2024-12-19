import {useState} from "react";
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
import DeleteVisitDialog from "./components/DeleteVisitDialog";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import {visitItemsData} from "./constants.ts";

const UserVisitOverview = ({classes}: WithStyles<typeof styles>) => {
    const {windowWidth} = useWindowSize();

    const isAdmin = undefined // todo reducer

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const [isDeleteVisitDialogOpen, setIsDeleteVisitDialogOpen] = useState(false)


    const onDialogClose = () => {
        setIsDeleteVisitDialogOpen(false)
    }

    const onDialogOpen = () => {
        setIsDeleteVisitDialogOpen(true)
    }

    const visitItems = visitItemsData.map((visitItem, i) => {
        return (
            <VisitItem key={`visit-item-${i}`} visitItem={visitItem} withConfirm withDelete onDeleteIconClick={onDialogOpen} extended/>
        )
    })

    return (
        <div className={classNames(classes.papersContainer, {[classes.mobilePapersContainer]: isSmall})}>
            <MyPaper withBackButton paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.headerWithButton} variant="subtitle1">{isAdmin ? `Oczekujące na potwierdzenie (${0})` : `Nadchodzące (${0})`}</Typography>
                <ShadowedScrollbar>
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
                </ShadowedScrollbar>
            </MyPaper>
            <MyPaper paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
                <Typography className={classes.header} variant="subtitle1">{isAdmin ? `Nadchodzące (${0})` : `Zakończone (${0})`}</Typography>
                <ShadowedScrollbar style={{height: isAdmin ? '100%' : 'calc(100% - 120px)'}}>
                    {visitItems.length
                        ? <div className={classes.paperContent}>
                            {visitItems}
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
            <DeleteVisitDialog onClose={onDialogClose} open={isDeleteVisitDialogOpen}/>
        </div>
    )
}

export default withStyles(styles)(UserVisitOverview);
