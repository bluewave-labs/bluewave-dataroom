import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "../Components/Sidebar/Sidebar";
import { Container } from "@mui/material";

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
        <Container
          maxWidth={"lg"}
          sx={{
            display: "flex",
            backgroundColor: "white",
            height: "100vh",
            pt: 4,
            pb: 3,
            gap: 4,
          }}
        >
          <Sidebar />
          <>{children}</>
        </Container>
      </body>
    </html>
  );
}
