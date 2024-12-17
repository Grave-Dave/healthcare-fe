import React from "react";
import {Link} from "react-router-dom";

import {useStyles} from "./HeaderTitle.style.ts";
import actions from "../../../../actions.tsx";
import {useAppDispatch} from "../../../../../../hooks/reduxHooks.ts";

const HeaderTitle = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const getHeaderText = () => <>
        <span>Gabinet Psychoterapii</span><br/>
        <span>Katarzyna Trzeciakiewicz</span>
    </>

    const onClick = () =>{
        dispatch(actions.setMobileMenuOpen(false))
        dispatch(actions.setUserMenuOpen(false))
    }


    return (
        <div className={classes.headerTitleContainer} onClick={onClick}>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <p className={classes.headerText}>{getHeaderText()}</p>
            </Link>
        </div>
    )
}

export default React.memo(HeaderTitle);
