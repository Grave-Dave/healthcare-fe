import createStyles from '@mui/styles/createStyles';

export const styles = () => createStyles({
    calendarContainer: {
        flex: '1 0 350px',
        '@media (min-width:1280px)': {
            flex: '1 0 450px',
        },
    }
})
