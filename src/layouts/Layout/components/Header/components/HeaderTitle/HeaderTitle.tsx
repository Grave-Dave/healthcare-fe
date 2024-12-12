import React from "react";

import {useStyles} from "./HeaderTitle.style.ts";

const HeaderTitle = () => {
    const classes = useStyles();

    const getHeaderText = () => <>
        <span>Gabinet Psychoterapii</span><br/>
        <span>Katarzyna Trzeciakiewicz</span>
    </>


    return (
        <div className={classes.headerTitleContainer}>
            <p className={classes.headerText}>{getHeaderText()} </p>
        </div>
    )
}

export default React.memo(HeaderTitle);
