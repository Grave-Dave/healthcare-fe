import {useEffect, useState} from "react";

import {BREAKPOINTS, XL} from "../layouts/Layout/constants.ts";
import {breakpointUtils, calculateBreakpoints} from "../layouts/Layout/utils/breakpointUtils.ts";

export interface WindowSizeStateProps {
    windowWidth: number,
    windowHeight: number,
    breakpoint: keyof typeof BREAKPOINTS,
}

const useWindowSize = () => {
    const isSSR = typeof window === 'undefined';

    const [windowSize, setWindowSize] = useState<WindowSizeStateProps>({
        windowWidth: isSSR ? 1920 : window.innerWidth,
        windowHeight: isSSR ? 935 : window.innerHeight,
        breakpoint: isSSR ? XL : calculateBreakpoints(),
    });

    const changeWindowSize = () => {
        setWindowSize({windowWidth: window.innerWidth, windowHeight: window.innerHeight, breakpoint: calculateBreakpoints()});
    };

    useEffect(() => {
        window.addEventListener("resize", changeWindowSize);

        return () => {
            window.removeEventListener("resize", changeWindowSize);
        };
    }, []);

    return {
        ...windowSize,
        isXS: breakpointUtils.isXS(windowSize.windowWidth),
        isSM: breakpointUtils.isSM(windowSize.windowWidth),
        isMD: breakpointUtils.isMD(windowSize.windowWidth),
        isLG: breakpointUtils.isLG(windowSize.windowWidth),
        isXL: breakpointUtils.isXL(windowSize.windowWidth),
        isBelowMD: breakpointUtils.isBelowMD(windowSize.windowWidth),
        isBelowLG: breakpointUtils.isBelowLG(windowSize.windowWidth),
        isBelowXL: breakpointUtils.isBelowXL(windowSize.windowWidth),
        isAboveXS: breakpointUtils.isAboveXS(windowSize.windowWidth),
        isAboveSM: breakpointUtils.isAboveSM(windowSize.windowWidth),
        isAboveMD: breakpointUtils.isAboveMD(windowSize.windowWidth),
    };
};

export default useWindowSize;


