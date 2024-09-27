"use client";

import { createTheme } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";

const text = {
  primary: "#344054",
  secondary: "#5D6B98",
  tertiary: "#475467",
  notes: "#A1AFC6",
  brand: "#1570EF",
};
const background = {
  content: "#FFFFFF",
  alt: "#F9F9FA",
  brand: "#1570EF",
  fill: "#FCFCFD",
  error: "#D92D20",
};
const border = { light: "#EBEBEB", dark: "edit here if we need" };

const fontFamilyDefault =
  '"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow =
  "0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

const globalTheme = createTheme({
  spacing: 2,
  typography: {
    fontFamily: fontFamilyDefault,
    fontSize: 13,
    h1: { fontSize: 16, color: text.primary, fontWeight: 600 },
    h2: { fontSize: 12, color: text.primary, fontWeight: 600 },
    body1: { fontSize: 16, color: text.tertiary, fontWeight: 400 },
    body2: { fontSize: 11, color: text.notes, fontWeight: 400 },
  },
  palette: {
    // primary: { main: "#1570EF" },
    // secondary: { main: "#F4F4F4", dark: "#e3e3e3", contrastText: "#475467" },
    text: text,
    background: background as PaletteOptions["background"],
    border: border,
    // info: {
    //   light: "TBD",
    //   main: "TBD",
    //   dark: "TBD",
    //   contrastText: "TBD",
    //   text: "TBD"
    // },
    // success: {
    //   light: "TBD",
    //   main: "TBD",
    //   dark: "TBD",
    //   contrastText: "TBD",
    //   text: "TBD"
    // },
    // error: {
    //   light: "TBD",
    //   main: "TBD",
    //   dark: "TBD",
    //   contrastText: "TBD",
    //   text: "TBD"
    // },
    // warning: {
    //   light: "TBD",
    //   main: "TBD",
    //   dark: "TBD",
    //   contrastText: "TBD",
    //   text: "TBD"
    // },
    // unresolved: { main: "#4e5ba6", light: "#e2eaf7", bg: "#f2f4f7" },
    // divider: border.light,
    // other: {
    //   icon: "TBD",
    //   line: "TBD",
    //   fill: "TBD",
    //   grid: "TBD",
    //   autofill: "TBD",
    // },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f7f7f7",
          lineHeight: "inherit",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          // variants: [
          //   {
          //     props: (props) => props.variant === "group",
          //     style: {
          //       color: theme.palette.secondary.contrastText,
          //       backgroundColor: theme.palette.background,
          //       border: 1,
          //       borderStyle: "solid",
          //       borderColor: theme.palette.border.light,
          //     },
          //   },
          //   {
          //     props: (props) =>
          //       props.variant === "group" && props.filled === "true",
          //     style: {
          //       backgroundColor: theme.palette.secondary.main,
          //     },
          //   },
          //   {
          //     props: (props) =>
          //       props.variant === "contained" && props.color === "secondary",
          //     style: {
          //       border: 1,
          //       borderStyle: "solid",
          //       borderColor: theme.palette.border.light,
          //     },
          //   },
          // ],
          fontWeight: 400,
          borderRadius: 4,
          boxShadow: "none",
          textTransform: "none",
          "&:focus": {
            outline: "none",
          },
          "&:hover": {
            boxShadow: "none",
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 4,
          transition: "none",
          "&:hover": {
            backgroundColor: background.fill,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          marginTop: 4,
          padding: 0,
          border: 1,
          borderStyle: "solid",
          borderColor: border.light,
          borderRadius: 4,
          boxShadow: shadow,
          backgroundColor: background.content,
          backgroundImage: "none",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: "inherit",
          padding: "4px 6px",
          color: text.secondary,
          fontSize: 13,
          margin: 2,
          minWidth: 100,
          "&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible":
            {
              backgroundColor: background.fill,
            },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: border.light,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: background.brand,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          backgroundColor: background.content,
          border: 1,
          borderStyle: "solid",
          borderColor: border.light,
          "& button": {
            color: text.tertiary,
            borderRadius: 4,
          },
          "& li:first-of-type button, & li:last-of-type button": {
            border: 1,
            borderStyle: "solid",
            borderColor: border.light,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&:not(.MuiPaginationItem-ellipsis):hover, &.Mui-selected": {
            backgroundColor: background.fill,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 2,
    borderThick: 2,
    boxShadow: shadow,
  },
});

export default globalTheme;
