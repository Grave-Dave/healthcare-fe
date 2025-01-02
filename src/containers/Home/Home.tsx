import {useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import {Typography} from "@mui/material";

import {useStyles} from "./Home.style";
import background from "../../public/images/Home/muhlviertel-7544316_1920.webp"
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {ROUTES} from "../../constants.ts";

const Home = () => {
    const classes = useStyles()
    const navigate = useNavigate();
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    const getHeaderText = () => <>
        <Typography variant="h1">Gabinet Psychoterapii</Typography><br/>
        <Typography variant="h6" sx={{marginTop: 2, fontWeight: 300}}>Katarzyna Trzeciakiewicz</Typography>
    </>

    return (
        <div className={classes.container}>
            <img src={background} alt="background" className={classes.hero}/>
            <div className={classNames(classes.shadow, {[classes.buttonHovered]: isButtonHovered})}></div>
            <Typography className={classes.header}>{getHeaderText()}</Typography>
            <AtomButton
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onTouchStart={() => setIsButtonHovered(true)}
                onTouchEnd={() => setIsButtonHovered(false)}
                buttonVariant={AtomButtonVariants.CTA_BUTTON_VARIANT}
                buttonClassName={classes.heroButton}
                text={'Uzyskaj pomoc'}
                onClick={() => navigate(ROUTES.MAKE_VISIT)}
            />
        </div>
    )
}

export default Home
