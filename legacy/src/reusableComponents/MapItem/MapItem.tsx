import {JSX, useState} from "react";
import classNames from "classnames";

import {Typography} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import {withStyles, WithStyles} from "@mui/styles";

import {styles} from "./MapItem.style.ts";


interface MapItemProps extends WithStyles<typeof styles> {
    location: string
    map: JSX.Element
}

const MapItem = ({classes, location, map}: MapItemProps) => {

    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={classes.mapItem}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}>
            <Typography variant="body1" className={classNames(classes.mapDescription, {[classes.hovered]: isHovered})}>
                <FmdGoodOutlinedIcon sx={{width: 20, height: 20}}/>
                {`${location}:`}
            </Typography>
            {map}
        </div>
    )
}

export default withStyles(styles)(MapItem)
