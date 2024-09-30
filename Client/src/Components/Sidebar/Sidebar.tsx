"use client";

import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Stack, Box } from "@mui/material";

import Image from "next/image";
import Link from "next/link";

import DocumentsIcon from "../../assets/icons/Sidebar/sidebar-documents-icon.svg";
import ContactsIcon from "../../assets/icons/Sidebar/sidebar-contacts-icon.svg";
import SettingsIcon from "../../assets/icons/Sidebar/sidebar-settings-icon.svg";
import Title from "../../assets/icons/Sidebar/sidebar-title.svg";
import DropdownMenu from "./DropdownMenu";

export default function Sidebar() {
  const menuItems: { [key: string]: string } = {
    Documents: DocumentsIcon,
    Contacts: ContactsIcon,
    Settings: SettingsIcon,
  };

  const menu: string[] = ["Documents", "Contacts", "Settings"];

  return (
    <Stack
      justifyContent="space-between"
      direction="column"
      sx={{ maxHeight: "100vh" }}
    >
      <Box>
        <Image src={Title} alt="Title" style={{ margin: "0 8px 16px 8px" }} />
        <List>
          {menu.map((text) => (
            <ListItem key={text} disablePadding>
              <Link
                href={`/${text.toLowerCase()}`}
                className="no-styling width-area"
              >
                <ListItemButton
                  disableRipple
                  sx={{
                    px: 1,
                    "&:hover": { backgroundColor: "#f5f9ff" },
                  }}
                >
                  <ListItemIcon>
                    <Image src={menuItems[text]} alt={text} height={24} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <DropdownMenu />
    </Stack>
  );
}
