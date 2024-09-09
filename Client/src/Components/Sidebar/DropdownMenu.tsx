import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./dropdownMenu.css";

import Image from "next/image";
import Link from "next/link";

import DropdownArrow from "../../app/Assets/Icons/Sidebar/sidebar-arrow-acc-icon.svg";
import Avatar from "../../app/Assets/Icons/Sidebar/sidebar-avatar-icon.svg";
import Profile from "../../app/Assets/Icons/Sidebar/sidebar-profile-icon.svg";
import Password from "../../app/Assets/Icons/Sidebar/sidebar-password-icon.svg";
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

  return (
    <div>
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
        <Link href={"/profile/user"} className="no-styling">
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{ "&:hover": { backgroundColor: "#f5f9ff" } }}
          >
            <Image
              src={Profile}
              alt="Profile icon"
              width={16}
              height={16}
              className="icon-mr"
            />
            Profile
          </MenuItem>
        </Link>
        <Link href={"/profile/password"} className="no-styling">
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{ "&:hover": { backgroundColor: "#f5f9ff" } }}
          >
            <Image
              src={Password}
              alt="Password icon"
              width={16}
              height={16}
              className="icon-mr"
            />
            Password
          </MenuItem>
        </Link>
        <Link href={"/profile/team"} className="no-styling">
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{ "&:hover": { backgroundColor: "#f5f9ff" } }}
          >
            <Image
              src={Team}
              alt="Team icon"
              width={16}
              height={16}
              className="icon-mr"
            />
            Team
          </MenuItem>
        </Link>
        <Link href={"/logout"} className="no-styling">
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{ "&:hover": { backgroundColor: "#f5f9ff" } }}
          >
            <Image
              src={LogOut}
              alt="Log out icon"
              width={16}
              height={16}
              className="icon-mr"
            />
            Log out
          </MenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
