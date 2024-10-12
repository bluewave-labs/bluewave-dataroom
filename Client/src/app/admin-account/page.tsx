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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Link from "@mui/material/Link";

const adminAccount = () => {
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
          <Typography
            variant="h5"
            style={{ color: "#000000", fontWeight: 600, fontSize: "16px" }}
            gutterBottom
            align="center"
          >
            Create Bluewave DataRoom admin account
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
              type="text"
              id="login-user-input"
              label="First name"
              isRequired={true}
              placeholder="Enter your first name"
              autoComplete="name"
              value=""
            />
            <Field
              type="text"
              id="login-surname-input"
              label="Last name"
              isRequired={true}
              placeholder="Enter your last name"
              autoComplete="surname"
              value=""
            />
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
            <Field
              type="password"
              id="login-password-input"
              label="Confirm Password"
              isRequired={true}
              placeholder="••••••••••"
              autoComplete="confirm-password"
              value=""
            />
            <Stack direction="row" color={"#838c99"} fontWeight={500}>
              <p>
                <CheckCircleIcon /> Must contain one special character
                <br />
                <CheckCircleIcon /> Must be atleast 8 characters
              </p>
            </Stack>
            <Button variant="contained" color="primary" sx={{ width: "100%" }}>
              Get Started
            </Button>
          </Stack>
        </CardContent>
      </Box>
    </Stack>
  );
};

export default adminAccount;
