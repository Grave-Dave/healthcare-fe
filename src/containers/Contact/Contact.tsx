import classNames from "classnames";

import {Divider, Typography} from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./Contact.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const Contact = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <MyPaper
                withBackButton={!isSmall}
                paperClassName={classNames({
                    [classes.paperContainer]: !isSmall,
                    [classes.mobilePaperContainer]: isSmall
                })}>
                <div className={classes.contactWrapper}>
                    <div className={classes.descriptionContainer}>
                        <Typography variant="h5" className={classes.descriptionHeader}>
                            kontakt
                        </Typography>
                        <Typography variant="body1" className={classes.description}>
                            {'Jeżeli jesteś zainteresowany konsultacją, zapraszam do kontaktu pod numerem:'}
                        </Typography>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60%'}}>
                            <Typography variant="h2" className={classes.description}>
                                <a href={`tel:+48535355406`}
                                   className={classes.phone}
                                   style={{textDecoration: 'none', color: 'inherit'}}>
                                    <CallOutlinedIcon
                                        sx={{width: isSmall ? 30 : 50, height: isSmall ? 30 : 50, marginRight: 2}}/>
                                    +48 535 355 406
                                </a>
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Divider sx={{marginBottom: 2}}/>
                        <Typography variant="caption"
                                    sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                            &copy; {`${new Date().getFullYear()} Psychoterapia Trzeciakiewicz. Wszelkie prawa zastrzeżone.`}
                        </Typography>
                    </div>
                </div>
            </MyPaper>
        </>
    )
}

export default Contact
