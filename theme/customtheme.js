import { deepmerge } from "@mui/utils";
import { alpha } from "@mui/material";

const sharedTheme = {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },

    MuiStep: {
      styleOverrides: {
        root: {
          padding: "1rem 0.05rem 1rem 0.05rem",
          width: "100%",
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "rgba(150, 150, 150, 0.5)",
          fontSize: "1.5rem",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "1px solid",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
    MuiListItemIcon: {
      disableRipple: true,
      styleOverrides: {
        root: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },
};

const theme = {
  colorSchemes: {
    light: {
      // palette for light mode
      palette: {
        primary: {
          main: "#4fc3f7",
        },
        secondary: {
          main: "#ef9a9a",
        },
        background: {
          default: "#fff",
          appbar: alpha("#fff", 0.8),
          paper: "#F5F5F5",
        },
        error: {
          main: "#F8BBD0",
          //light: "#F9C8D9",
          //dark: "#FFCDD2"
        },
        success: {
          main: "#B2DFDB",
          //light: "#C1E5E2",
          //dark: "#7C9C99"
        },
        action: {
          hover: "rgba(0, 0, 0, 0.04)",
          selected: "rgba(0, 0, 0, 0.08)",
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
        },
      },
    },
    dark: {
      // palette for dark mode
      palette: {
        text: {
          primary: "#e3e3e3",
          secondary: "#c4c7c5",
        },
        primary: {
          main: "#01579b",
        },
        secondary: {
          main: "#f44336",
        },
        background: {
          default: "#1f1f1f",
          appbar: alpha("#1f1f1f", 0.8),
          paper: "#28292a",
        },
        error: {
          main: "#880E4F",
          //light: "#9F3E72",
          //dark: "#5F0937"
        },
        success: {
          main: "#00695C",
          //light: "#337066",
          //dark: "#00352C"
        },
        action: {
          hover: "rgba(255, 255, 255, 0.08)",
          selected: "rgba(255, 255, 255, 0.16)",
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
        },
      },
    },
  },
};

export const myTheme = deepmerge(sharedTheme, theme);
