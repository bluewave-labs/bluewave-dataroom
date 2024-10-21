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

const forgotPassword = () => {
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
            <Typography component="h1" style={{ textAlign: "center" }}>
              Forgot password?
            </Typography>
            <Typography>
              No worries, we&apos;ll send you reset instructions.
            </Typography>
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
            <Field
              type="email"
              id="login-email-input"
              label="Email"
              isRequired={true}
              placeholder="Enter your email"
              autoComplete="email"
              value=""
            />
            <Button variant="contained" color="primary" sx={{ width: "100%" }}>
              Reset Password
            </Button>
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

export default forgotPassword;
