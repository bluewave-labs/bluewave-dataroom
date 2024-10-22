import { Box, Container, Divider } from "@mui/material";
import BrandingSetting from "./components/BrandingSetting";
import SettingsTabs from "./components/SettingsTabs";

export default function SettingsPage() {
  return (
    <Container maxWidth="xl">
      <Box>
        <SettingsTabs />
        <Divider sx={{ mb: 8, width: 824 }} />
        <BrandingSetting />
      </Box>
    </Container>
  );
}
