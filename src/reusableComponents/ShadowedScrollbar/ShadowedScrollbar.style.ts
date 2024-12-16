import createStyles from '@mui/styles/createStyles';

export const styles = () => createStyles({
    shadowedScrollBar: {
        background:
            `linear-gradient(#ffffff 33%, rgba(255,255,255, 0)),
    linear-gradient(rgba(255,255,255, 0), #ffffff 66%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0, 0.5), rgba(0,0,0,0)),
    radial-gradient(at bottom, rgba(0,0,0,.25), transparent 80%) 0 calc(100% - 17px)/ 100% 15px`,
        backgroundColor: '#ffffff',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local, local, scroll, scroll',
        backgroundSize: '100% 45px, 100% 45px, 100% 15px, 100% 15px',
    }
})
