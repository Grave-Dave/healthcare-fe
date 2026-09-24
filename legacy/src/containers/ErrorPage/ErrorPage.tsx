import classNames from "classnames";

import {Typography} from "@mui/material";

import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./ErrorPage.style.ts";
import MyPaper from "../../reusableComponents/MyPaper";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import {ROUTES} from "../../constants.ts";
import image from "../../public/images/empty-page-svgrepo-com.svg";
import {DESCRIPTION, KEYWORDS, TITLE} from "./constants.ts";
import Helmet from "../../reusableComponents/Helmet";

const ErrorPage = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    return (
        <>
            <Helmet title={TITLE} description={DESCRIPTION} keywords={KEYWORDS}/>
            <MyPaper
                paperClassName={classNames({
                    [classes.paperContainer]: !isSmall,
                    [classes.mobilePaperContainer]: isSmall
                })}>
                <div className={classes.errorContainer}>
                    <Typography variant="h2" className={classes.errorHeader}>
                        404
                    </Typography>
                    <img className={classes.image} src={image} alt={'page-not-found-image'}/>
                    <Typography variant="h1" className={classes.errorText}>
                        Nie ma takiej strony
                    </Typography>
                    <AtomButton
                        buttonVariant={AtomButtonVariants.LINK}
                        text={'Wróć na stronę główną'}
                        link={ROUTES.HOME}
                    />
                </div>
            </MyPaper>
        </>
    )
}

export default ErrorPage
