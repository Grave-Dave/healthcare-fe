import {useState} from "react";
import classNames from "classnames";

import {Typography} from "@mui/material";

import {useStyles} from "./Home.style";
import background from "../../public/images/Home/muhlviertel-7544316_1920.webp"
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";

const Home = () => {
    const classes = useStyles()
    const [isButtonHovered, setIsButtonHovered] = useState(false)

    const getHeaderText = () => <>
        <span>Gabinet Psychoterapii</span><br/>
        <span>Katarzyna Trzeciakiewicz</span>
    </>

    return (
        <div className={classes.container}>
            <img src={background} alt="background" className={classes.hero}/>
            <div className={classNames(classes.shadow, {[classes.buttonHovered]: isButtonHovered})}></div>
            <Typography className={classes.header} variant="h2">{getHeaderText()}</Typography>
            <AtomButton
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                buttonVariant={AtomButtonVariants.CTA_BUTTON_VARIANT}
                buttonClassName={classes.heroButton}
                text={'Uzyskaj pomoc'}
            />
        </div>
    )
}

export default Home
