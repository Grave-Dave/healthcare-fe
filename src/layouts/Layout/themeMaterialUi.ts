import {createTheme} from '@mui/material/styles';

//primary
const STEEL_BLUE = "#56809E";
const PALE_SKY_BLUE = "#85A7BF";
const DEEP_SLATE_BLUE = "#34596E";
const PURE_WHITE = "#FFFFFF";

//secondary
const GOLDEN_BROWN = "#C58254";
const LIGHT_HONEY = "#F0B185";
const BURNT_SIENNA = "#8F5830";
const BLACK = "#000000";


const theme = createTheme({
    palette: {
        primary: {
            main: STEEL_BLUE,
            light: PALE_SKY_BLUE,
            dark: DEEP_SLATE_BLUE,
            contrastText: PURE_WHITE,
        },
        secondary: {
            main: GOLDEN_BROWN,
            light: LIGHT_HONEY,
            dark: BURNT_SIENNA,
            contrastText: BLACK,
        },
        error: {
            main: '#d32f2f',
        },
        warning: {
            main: '#ffa726',
        },
        info: {
            main: '#0288d1',
        },
        success: {
            main: '#2e7d32',
        },
        background: {
            default: '#f5f5f5', // Page background
            paper: PURE_WHITE,   // Card and modal backgrounds
        },
        text: {
            primary: '#212121', // Default text color
            secondary: '#757575', // Secondary text color
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none', // Disable uppercase for buttons
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded buttons
                    padding: '8px 16px',
                },
                containedPrimary: {
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#1565c0', // Darker shade on hover
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: PURE_WHITE,
                    fontFamily: "Poppins, sans-serif",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1976d2',
                },
            },
        },
    },
});

export default theme;