import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import darkScrollbar from '@mui/material/darkScrollbar';
import { teal, lightBlue } from '@mui/material/colors';

import { mergeDeep } from './mergeDeep';

declare module '@mui/material/styles' {
    // fix the type error when referencing the Theme object in your styled component
    interface Theme {
        contentHeight?: number;
    }
    // fix the type error when calling `createTheme()` with a custom theme option
    interface ThemeOptions {
        contentHeight?: number;
    }
}

export interface PaletteModes {
    dark: Theme;
    light: Theme;
}

const sharedThemeOptions: ThemeOptions = {
    typography: {
        fontSize: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: 'url("/bg.jpg")',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'exclusion',
                    padding: 0,
                    margin: 0,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'none',
                    boxSizing: 'border-box',
                    width: 360,
                    padding: 2,
                },
            },
        },
    },
    contentHeight: 400,
};

export const darkTheme = createTheme(
    mergeDeep({}, sharedThemeOptions, {
        palette: {
            mode: 'dark',
            primary: {
                light: teal[500],
                main: teal[600],
                dark: teal[700],
            },
            secondary: {
                light: lightBlue[500],
                main: lightBlue[600],
                dark: lightBlue[700],
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        ...darkScrollbar(),
                        backgroundColor: '#121212',
                    },
                },
            },
        },
    }),
);

export const lightTheme = createTheme(
    mergeDeep({}, sharedThemeOptions, {
        palette: {
            mode: 'light',
            primary: {
                light: lightBlue[500],
                main: lightBlue[600],
                dark: lightBlue[700],
            },
            secondary: {
                light: teal[500],
                main: teal[600],
                dark: teal[700],
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: '#ffffff',
                    },
                },
            },
        },
    }),
);

const themes: PaletteModes = {
    dark: darkTheme,
    light: lightTheme,
};

export default themes;
