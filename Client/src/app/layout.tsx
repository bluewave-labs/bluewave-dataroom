import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./globals.css";

import globalTheme from "@/utils/theme/globalTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blw-Dataroom",
  description: "Share documents safely with your team and customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <>{children}</>
        </ThemeProvider>
      </body>
    </html>
  );
}
