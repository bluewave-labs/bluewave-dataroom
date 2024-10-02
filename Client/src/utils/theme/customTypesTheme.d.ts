import "@mui/material/styles";

declare module "@mui/material" {
  interface Palette {
    border: {
      light: string;
      dark: string;
    };
  }

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
    customShadows?: {
      menu?: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface TypeBackground {
    content: string;
    alt: string;
    brand: string;
    fill: string;
    error: string;
  }

  interface Theme {
    customShadows: {
      menu: string;
    };
  }
}
