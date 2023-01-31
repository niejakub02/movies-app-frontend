import { createTheme } from "@mui/material";

const Theme = createTheme({
    palette: {
        mode: 'dark'
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Arial'
        ].join(',')
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              outline: '0 !important'
            },
          },
        },
        MuiBackdrop: {
          styleOverrides: {
            root: {
              zIndex: 1500
            }
          }
        }
    }
});

export default Theme;