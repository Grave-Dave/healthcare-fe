import {Paper, Typography} from "@mui/material";
import {useStyles} from "./InfoItem.style.ts";

interface InfoItemProps {
    itemName: string
}

const InfoItem = ({itemName}: InfoItemProps) => {
    const classes = useStyles()
    return (
        <Paper elevation={3} sx={{flex:'1 0 180px', background:'none'}}>
            <div className={classes.item}>
                <Typography variant="body2" sx={{whiteSpace:'nowrap'}}>{itemName}</Typography>
            </div>
        </Paper>
    )
}

export default InfoItem
