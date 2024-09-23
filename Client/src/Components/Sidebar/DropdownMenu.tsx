import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import "./dropdownMenu.css";

import Image from "next/image";
import Link from "next/link";

import DropdownArrow from "../../app/Assets/Icons/Sidebar/sidebar-arrow-acc-icon.svg";
import Avatar from "../../app/Assets/Icons/Sidebar/sidebar-avatar-icon.svg";
import Profile from "../../app/Assets/Icons/Sidebar/sidebar-profile-icon.svg";
import LogOut from "../../app/Assets/Icons/Sidebar/sidebar-log-out-icon.svg";
import Team from "../../app/Assets/Icons/Sidebar/sidebar-team-icon.svg";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(-1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));

export default function DropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function fixName(text: string): string {
    return text.replace(/\s+/g, "");
  }

  const menuItems: { [key: string]: string } = {
    Profile: Profile,
    Team: Team,
    Logout: LogOut,
  };

  return (
    <Box>
      <Button
        disableElevation
        onClick={handleClick}
        size="small"
        className="no-styling"
        sx={{
          fontSize: 16,
          textTransform: "none",
        }}
        startIcon={
          <Image src={Avatar} alt="Dropdown Arrow" width={24} height={24} />
        }
        endIcon={
          <Image
            src={DropdownArrow}
            alt="Dropdown Arrow"
            width={10}
            height={10}
          />
        }
      >
        Account Name
      </Button>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {["Profile","Team", "Log out"].map((text) => (
          <Link href={`${text.toLowerCase()}`} className="no-styling">
            <MenuItem
              onClick={handleClose}
              disableRipple
              sx={{ "&:hover": { backgroundColor: "#f5f9ff" } }}
            >
              <Image
                src={
                  text.includes(" ")
                    ? menuItems[fixName(text)]
                    : menuItems[text]
                }
                alt={text}
                height={16}
                width={16}
                className="icon-mr"
              />
              {text}
            </MenuItem>
          </Link>
        ))}
      </StyledMenu>
    </Box>
  );
}
