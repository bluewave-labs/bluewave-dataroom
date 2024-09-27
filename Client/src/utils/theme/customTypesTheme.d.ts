import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {}

  interface SimplePaletteColorOptions {
    text?: string;
  }

  interface PaletteOptions {
    border?: {
      light: string;
      dark: string;
    };
  }

  interface ThemeOptions {
    shape?: {
      borderRadius: number;
      borderThick?: number;
      boxShadow?: string;
    };
  }
}
