import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import AddIcon from "@mui/icons-material/Add";
import {Divider, Typography} from "@mui/material";

import MyPaper from "../../reusableComponents/MyPaper";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./AboutMe.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import photo from '../../public/images/AboutMe/aboutme.jpeg'
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {ROUTES} from "../../constants.ts";
import AtomButton from "../../atoms/AtomButton";
import {
    DESCRIPTION,
    FIRST_PARAGRAPH,
    INFO_ITEMS,
    KEYWORDS,
    SECOND_PARAGRAPH,
    THIRD_PARAGRAPH,
    TITLE
} from "./constants.ts";
import ShadowedScrollbar from "../../reusableComponents/ShadowedScrollbar";
import InfoItem from "./components/InfoItem";
import Helmet from "../../reusableComponents/Helmet";

const AboutMe = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()
    const navigate = useNavigate();

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const getInfoItems = () => {
        return INFO_ITEMS.map((item, i) => {
            return <InfoItem key={`info-item-${i}`} itemName={item}/>
        })
    }

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <MyPaper
                withBackButton={!isSmall}
                paperClassName={classNames({
                    [classes.paperContainer]: !isSmall,
                    [classes.mobilePaperContainer]: isSmall
                })}>
                <div className={classes.content}>
                    {!isSmall && <div className={classes.desktopContainer}>
                        <img className={classes.picture} src={photo} alt={'Katarzyna Trzeciakiewicz'}/>
                        <AtomButton
                            buttonVariant={AtomButtonVariants.FLOATING_BUTTON_VARIANT}
                            text={isSmall ? <AddIcon/> : "Umów wizytę"}
                            onClick={() => navigate(ROUTES.MAKE_VISIT)}
                        />
                    </div>}
                    <div className={classes.descriptionWrapper}>
                        <ShadowedScrollbar>
                            <div className={classes.descriptionContainer}>
                                <Typography variant="h5" className={classes.descriptionHeader}>
                                    Kilka słów o mnie
                                </Typography>
                                <Typography variant="body1"
                                            className={classes.description}>{FIRST_PARAGRAPH}</Typography>
                                <Typography variant="body1"
                                            className={classes.description}>{SECOND_PARAGRAPH}</Typography>
                                <Typography variant="body1"
                                            className={classes.description}>{THIRD_PARAGRAPH}</Typography>
                            </div>
                            {isSmall && <div className={classes.mobileContainer}>
                                <img className={classes.picture} src={photo} alt={'Katarzyna Trzeciakiewicz'}/>
                                <AtomButton
                                    buttonVariant={AtomButtonVariants.FLOATING_BUTTON_VARIANT}
                                    text={isSmall ? <AddIcon/> : "Umów wizytę"}
                                    onClick={() => navigate(ROUTES.MAKE_VISIT)}
                                />
                            </div>}
                            <div className={classes.infoItemWrapper}>
                                <Typography variant="h5" className={classes.descriptionHeader}>Zakres
                                    pomocy</Typography>
                                <div className={classes.infoItemContainer}>
                                    {getInfoItems()}
                                </div>
                            </div>
                            {isSmall && <div className={classes.footer}>
                                <Divider sx={{marginBottom: 2}}/>
                                <Typography variant="caption"
                                            sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                    &copy; {`${new Date().getFullYear()} Psychoterapia Trzeciakiewicz. Wszelkie prawa zastrzeżone.`}
                                </Typography>
                            </div>}
                        </ShadowedScrollbar>
                    </div>
                </div>
                {!isSmall && <div className={classes.footer}>
                    <Divider sx={{marginBottom: 2}}/>
                    <Typography variant="caption"
                                sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        &copy; {`${new Date().getFullYear()} Psychoterapia Trzeciakiewicz. Wszelkie prawa zastrzeżone.`}
                    </Typography>
                </div>}
            </MyPaper>
        </>
    )
}

export default AboutMe
