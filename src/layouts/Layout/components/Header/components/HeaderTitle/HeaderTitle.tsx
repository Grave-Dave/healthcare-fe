import React from "react";
import {Link} from "react-router-dom";

import {useStyles} from "./HeaderTitle.style.ts";

const HeaderTitle = () => {
    const classes = useStyles();

    const getHeaderText = () => <>
        <span>Gabinet Psychoterapii</span><br/>
        <span>Katarzyna Trzeciakiewicz</span>
    </>

    return (
        <div className={classes.headerTitleContainer}>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <p className={classes.headerText}>{getHeaderText()}</p>
            </Link>
        </div>
    )
}

export default React.memo(HeaderTitle);
