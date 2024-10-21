"use client";
import "./index.css";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Field from "../../Components/Inputs/Field";
// import Logo from "../../assets/icons/bwu-icon.svg";
// import background from "../../assets/Images/background_pattern_decorative.png";
// import Key from "../../assets/icons/key.svg?react";
import Link from "@mui/material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const checkEmail = () => {
  return (
    <Stack
      gap={{ xs: 8, sm: 12 }}
      className="login-page auth"
      overflow="hidden"
      sx={{
        "& h1": {
          color: "#1570EF",
          fontWeight: 600,
          fontSize: 30,
        },
        "& p": {
          fontSize: 14,
          color: "#838c99",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardContent>
          <Box>
            <Typography
              component="h2"
              style={{ textAlign: "center", fontWeight: 600 }}
            >
              Check your email
            </Typography>
            <br />
            <Box>
              <Typography style={{ textAlign: "center" }}>
                We sent a password link to <b>username@email.com</b>
              </Typography>
              <br />{" "}
              <Typography style={{ textAlign: "center" }}>
                Didn't receive the mail ?
                <Link href="#" underline="none">
                  {" Click to resend"}
                </Link>
              </Typography>
            </Box>
          </Box>
          <Stack
            component="form"
            sx={{
              marginTop: 2,
            }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <Stack direction="row" justifyContent="center">
              <Link href="#" underline="none">
                <Typography
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {" Back to sign in"}
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </CardContent>
      </Box>
    </Stack>
  );
};

export default checkEmail;
