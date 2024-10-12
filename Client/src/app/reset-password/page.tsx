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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const resetPassword = () => {
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
            <Typography component="h2" style={{ textAlign: "center" }}>
              Password Reset?
            </Typography>
            <Box>
              <Typography style={{ textAlign: "center" }}>
                Your password has successfully been reset.
                <br />
                Click below to log in magically.
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
            <Button variant="contained" color="primary" sx={{ width: "100%" }}>
              Continue
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

export default resetPassword;
