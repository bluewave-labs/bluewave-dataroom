import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@mui/material";
import Sidebar from "@/components/sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import globalTheme from "@/utils/theme/globalTheme";
import { ThemeProvider } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blw-Dataroom",
  description: "Share documents safely with your team and customers",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider theme={globalTheme}>
        <Container
          sx={{
            display: "flex",
            backgroundColor: "white",
            height: "100vh",
            paddingTop: 4,
            paddingBottom: 3,
            gap: 4,
          }}
        >
          <Sidebar />
          <CssBaseline />
          {children}
        </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
