import classNames from "classnames";

import {CircularProgress, circularProgressClasses} from "@mui/material";
import {styled} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

interface CircularLoaderProps {
    isLoading: boolean
    size?: number
}

const StyledLoader = styled(CircularProgress)(() => ({
    [`& .${circularProgressClasses.circle}`]: {
        strokeLinecap: 'round',
    },
}))

export const useStyles = makeStyles(() => createStyles({
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        transform: 'none',
        opacity: 1,
        transition: '.3s all ease-out'
    },
    hide: {
        transform: 'scale(0)',
        opacity: 0
    },
}))


const CircularLoader = ({isLoading, size = 60}: CircularLoaderProps) => {

    const classes = useStyles()
    return (
        <div className={classNames(classes.loaderContainer, {[classes.hide]: !isLoading})}>
            {isLoading && <StyledLoader size={size}/>}
        </div>
    )
}

export default CircularLoader
