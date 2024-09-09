"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Stack, Box, Container } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

import DocumentsIcon from "../../app/Assets/Icons/Sidebar/sidebar-documents-icon.svg";
import ContactsIcon from "../../app/Assets/Icons/Sidebar/sidebar-contacts-icon.svg";
import SettingsIcon from "../../app/Assets/Icons/Sidebar/sidebar-settings-icon.svg";
import Title from "../../app/Assets/Icons/Sidebar/sidebar-title.svg";
import DropdownMenu from "./DropdownMenu";

const drawerWidth = 240;

export default function Sidebar() {
  const menuItems = {
    Documents: DocumentsIcon,
    Contacts: ContactsIcon,
    Settings: SettingsIcon,
  };

  return (
    <Container sx={{ backgroundColor: "yellow" }} maxWidth="sm">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Stack
          justifyContent="space-between"
          direction="column"
          sx={{ height: "100%", mt: 6, pl: 2, pb: 2 }}
        >
          <Box>
            <Image
              src={Title}
              alt="Title"
              width={190}
              height={24}
              margin
              style={{ margin: "0 8px 16px 8px" }}
            />
            <List>
              {["Documents", "Contacts", "Settings"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    disableRipple
                    component={Link}
                    href={`/${text.toLowerCase()}`}
                    sx={{ px: 1, "&:hover": { backgroundColor: "#f5f9ff" } }}
                  >
                    <ListItemIcon>
                      <Image
                        src={menuItems[text]}
                        alt={text}
                        width={24}
                        height={24}
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <DropdownMenu />
        </Stack>
      </Drawer>
    </Container>
  );
}
