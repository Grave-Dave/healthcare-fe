import {BREAKPOINT_NUMBERS as breakpointNumbers, BREAKPOINTS, LG, MD, SM, XL, XS} from "../constants";

export const breakpointUtils = {
    isXS: (windowWidth: number) => windowWidth <= breakpointNumbers.XS,
    isSM: (windowWidth: number) => windowWidth > breakpointNumbers.XS && windowWidth <= breakpointNumbers.SM,
    isMD: (windowWidth: number) => windowWidth > breakpointNumbers.SM && windowWidth <= breakpointNumbers.MD,
    isLG: (windowWidth: number) => windowWidth > breakpointNumbers.MD && windowWidth <= breakpointNumbers.LG,
    isXL: (windowWidth: number) => windowWidth > breakpointNumbers.LG,

    isBelowMD: (windowWidth: number) => windowWidth <= breakpointNumbers.SM,
    isBelowLG: (windowWidth: number) => windowWidth <= breakpointNumbers.MD,
    isBelowXL: (windowWidth: number) => windowWidth <= breakpointNumbers.LG,

    isAboveXS: (windowWidth: number) => windowWidth > breakpointNumbers.XS,
    isAboveSM: (windowWidth: number) => windowWidth > breakpointNumbers.SM,
    isAboveMD: (windowWidth: number) => windowWidth > breakpointNumbers.MD,
};

export const isXS = (windowWidth: number) => windowWidth <= breakpointNumbers.XS;
export const isSM = (windowWidth: number) => windowWidth > breakpointNumbers.XS && windowWidth <= breakpointNumbers.SM;
export const isMD = (windowWidth: number) => windowWidth > breakpointNumbers.SM && windowWidth <= breakpointNumbers.MD;
export const isLG = (windowWidth: number) => windowWidth > breakpointNumbers.MD && windowWidth <= breakpointNumbers.LG;
export const isXL = (windowWidth: number) => windowWidth > breakpointNumbers.LG;

export const isBelowMD = (windowWidth: number) => windowWidth <= breakpointNumbers.SM;
export const isBelowLG = (windowWidth: number) => windowWidth <= breakpointNumbers.MD;
export const isBelowXL = (windowWidth: number) => windowWidth <= breakpointNumbers.LG;

export const isAboveXS = (windowWidth: number) => windowWidth > breakpointNumbers.XS;
export const isAboveSM = (windowWidth: number) => windowWidth > breakpointNumbers.SM;
export const isAboveMD = (windowWidth: number) => windowWidth > breakpointNumbers.MD;

export const calculateBreakpoints = (): keyof typeof BREAKPOINTS => {
    switch (true) {
        case isXS(window.innerWidth):
            return XS;
        case isSM(window.innerWidth):
            return SM;
        case isMD(window.innerWidth):
            return MD;
        case isLG(window.innerWidth):
            return LG;
        case isXL(window.innerWidth):
            return XL;
        default:
            return XL;
    }
};

