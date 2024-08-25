// components/ThemeProvider.tsx

"use client";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <MuiThemeProvider theme={darkTheme}>
            {children}
        </MuiThemeProvider>
    );
}
