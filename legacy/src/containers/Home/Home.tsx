import {useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {Typography} from "@mui/material";

import {useStyles} from "./Home.style";
import background from "../../public/images/Home/muhlviertel-7544316_1920.webp"
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {ROUTES} from "../../constants.ts";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const Home = () => {
    const classes = useStyles()
    const navigate = useNavigate();
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    const getHeaderText = () => <>
        <Typography variant="h1">
            Gabinet Psychoterapii
            <Typography variant="caption" className={classes.subtitle}>
                Katarzyna Trzeciakiewicz
            </Typography>
        </Typography>

    </>

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <div className={classes.container}>
                <img src={background} alt="background" className={classes.hero}/>
                <div className={classNames(classes.shadow, {[classes.buttonHovered]: isButtonHovered})}></div>
                <div className={classes.header}>{getHeaderText()}</div>
                <AtomButton
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    onTouchStart={() => setIsButtonHovered(true)}
                    onTouchEnd={() => setIsButtonHovered(false)}
                    buttonVariant={AtomButtonVariants.CTA_BUTTON_VARIANT}
                    buttonClassName={classes.heroButton}
                    text={'Uzyskaj pomoc'}
                    onClick={() => navigate(ROUTES.ABOUT_ME)}
                />
            </div>
        </>
    )
}

export default Home
