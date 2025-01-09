import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Divider, Typography} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./Commute.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";

const Commute = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;
    return (
        <MyPaper
            withBackButton
            paperClassName={classNames({
                [classes.paperContainer]: !isSmall,
                [classes.mobilePaperContainer]: isSmall
            })}>
            <div className={classes.commuteWrapper}>
                <div className={classes.descriptionContainer}>
                    <Typography variant="h5" className={classes.descriptionHeader}>
                        dojazd
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                        {'Zapraszam do gabinetów zlokalizowanych we Wrocławiu:'}
                    </Typography>
                </div>
                <div className={classes.mapWrapper}>
                    <Scrollbars>
                        <div className={classes.mapContainer}>
                            <div className={classes.mapItem}>
                                <Typography variant="body2" className={classes.mapDescription}>
                                    <FmdGoodOutlinedIcon sx={{width: 20, height: 20}}/>
                                    {'Obornicka 77k/1b, 51-114 Wrocław:'}
                                </Typography>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1251.917283943925!2d17.02801076108229!3d51.140220181231705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe9064955ddaf%3A0x5bfbdcb455a3d460!2sKatarzyna%20Trzeciakiewicz%2C%20Psychoterapeuta!5e0!3m2!1spl!2spl!4v1736244742157!5m2!1spl!2spl"
                                    width="320"
                                    height="320"
                                    style={{border: 0}}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            <div className={classes.mapItem}>
                                <Typography variant="body2" className={classes.mapDescription}>
                                    <FmdGoodOutlinedIcon sx={{width: 20, height: 20}}/>
                                    {'Legnicka 55a/3, 54-234 Wrocław:'}
                                </Typography>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.1635051118415!2d16.986861276881694!3d51.1238920386469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470febd7a3ad493d%3A0xd34147b59d5ca06b!2sKatarzyna%20Trzeciakiewicz%2C%20Psychoterapeuta!5e0!3m2!1spl!2spl!4v1736246431550!5m2!1spl!2spl"
                                    width="320"
                                    height="320"
                                    style={{border: 0}}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                            <div className={classes.mapItem}>
                                <Typography variant="body2" className={classes.mapDescription}>
                                    <FmdGoodOutlinedIcon sx={{width: 20, height: 20}}/>
                                    {'Otmuchowska 7/4, 50-505 Wrocław:'}
                                </Typography>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.207995366587!2d17.048044976880067!3d51.08616884138796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc2f497a29d0b%3A0x19c288618a5110d4!2sOtmuchowska%207%2F4%2C%2050-505%20Wroc%C5%82aw!5e0!3m2!1spl!2spl!4v1736246489116!5m2!1spl!2spl"
                                    width="320"
                                    height="320"
                                    style={{border: 0}}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
                <div className={classes.footer}>
                    <Divider sx={{marginBottom: 2}}/>
                    <Typography variant="caption" sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                        &copy; {`${new Date().getFullYear()} Psychoterapia Trzeciakiewicz. Wszelkie prawa zastrzeżone.`}
                    </Typography>
                </div>
            </div>
        </MyPaper>
    )
}

export default Commute
