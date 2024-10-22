import { Box, Divider } from "@mui/material";
import BrandingSetting from "./components/BrandingSetting";
import SettingsTabs from "./components/SettingsTabs";

export default function SettingsPage() {
  return (
    <Box>
      <SettingsTabs />
      <Divider sx={{ mb: 8, width: 824 }} />
      <BrandingSetting />
    </Box>
  );
}
