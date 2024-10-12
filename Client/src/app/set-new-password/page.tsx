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
import Link from "@mui/material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const setNewPassword = () => {
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
              Set new password?
            </Typography>
            <Typography>
              Your new password must be different to previously used passwords
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
              autoComplete="current-password"
              value=""
            />
            <Stack direction="row" color={"#838c99"} fontWeight={500}>
              <p>
                <CheckCircleIcon /> Must contain one special character
                <br />
                <CheckCircleIcon /> Must be atleast 8 characters
              </p>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              // onClick={onSubmit}
              // disabled={(errors.firstName || errors.lastName) && true}
              sx={{ width: "100%" }}
            >
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

export default setNewPassword;
