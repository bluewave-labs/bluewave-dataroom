import { Box, Container, Divider } from "@mui/material";
import BrandingSetting from "./components/BrandingSetting";
import SettingsTabs from "./components/SettingsTabs";

export default function SettingsPage() {
  return (
    <Container maxWidth="xl">
      <Box pt={26}>
        <SettingsTabs />
        <Divider sx={{ mb: 8, width: 894 }} />
        <BrandingSetting />
      </Box>
    </Container>
  );
}
