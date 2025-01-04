import {CSSProperties} from "react";

export const getOutletWrapperStyle = (): CSSProperties => {
    return {
        position: 'relative',
        top: 'auto',
        display: 'flex',
        height: 'calc(100vh - 96px)',
        overflow: 'clip',
    }
}

export const getHomePageWrapperStyle = (): CSSProperties => {
    return {
        position: 'absolute',
        top: 0,
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'clip',
    }
}
