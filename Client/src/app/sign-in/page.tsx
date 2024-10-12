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

import Link from "@mui/material/Link";

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
        {/* <img
          // className="background-pattern-svg"
          src="../../assets/Images/background_pattern_decorative.png"
        /> */}

        {/* <h5 style={{ marginTop: "20px" }}>BlueWave DataRoom</h5> */}
        {/* <Card sx={{ width: 400, padding: 2 }}> */}
        <CardContent>
          <Typography
            style={{ color: "#000000", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
            align="center"
          >
            Sign in
          </Typography>
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
            <Field
              type="password"
              id="login-password-input"
              label="Password"
              isRequired={true}
              placeholder="••••••••••"
              autoComplete="current-password"
              value=""
            />
            <Stack direction="row" justifyContent="space-between">
              Remember for 30 days
              <Link href="#" underline="none" className="forgotPassword">
                {"Forgot Password ?"}
              </Link>
            </Stack>
            <Button variant="contained" color="primary" sx={{ width: "100%" }}>
              Sign in
            </Button>
            <Link href="#" underline="none">
              <Typography
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                {"Don't have an account ? Sign Up"}
              </Typography>
            </Link>
          </Stack>
        </CardContent>
      </Box>
    </Stack>
  );
};

export default checkEmail;
