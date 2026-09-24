import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Divider, Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./Commute.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.tsx";
import Helmet from "../../reusableComponents/Helmet";
import MapItem from "../../reusableComponents/MapItem";
import {locations} from "./constants.tsx";

const Commute = () => {
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
                                {locations.map((location, i) => (
                                    <MapItem key={`location-${i}`} location={location.name} map={location.map}/>
                                ))}
                            </div>
                        </Scrollbars>
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

export default Commute
