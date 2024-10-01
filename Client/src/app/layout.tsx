import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@mui/material";
import Sidebar from "@/Components/Sidebar/Sidebar";
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
          <CssBaseline />
          <Container
            sx={{
              display: "flex",
              backgroundColor: "white",
              height: "100vh",
              maxWidth: "1600px",
              minWidth: "1600px",
              pt: 16,
              pb: 12,
              gap: 16,
            }}
          >
            <Sidebar />
            <>{children}</>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
