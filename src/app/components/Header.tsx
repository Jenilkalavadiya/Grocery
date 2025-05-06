"use client";
import { ModalConfiguration } from "@/utils/ModalConfiguration";
import ModalResetPassword from "@/utils/ModalResetPassword";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import React, { useState } from "react";
import config from "../../../public/images/config.svg";
import changePassword from "../../../public/images/change-passwod.svg";
import logout from "../../../public/images/logout.svg";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Separate state for managing modals
  const [boxOpenConfig, setBoxOpenConfig] = useState(false);
  const [boxOpenResetPassword, setBoxOpenResetPassword] = useState(false);

  // State to track the active menu item
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  // Handle Menu button click to open the dropdown
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu (but not the modal)
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle opening the ModalConfiguration modal
  const handleOpenConfigModal = () => {
    setBoxOpenConfig(true);
    setActiveMenuItem("configuration");
  };

  // Handle closing the ModalConfiguration modal
  const handleCloseConfigModal = () => {
    setBoxOpenConfig(false);
    setActiveMenuItem(null);
  };

  // Handle opening the ModalResetPassword modal
  const handleOpenResetPasswordModal = () => {
    setBoxOpenResetPassword(true);
    setActiveMenuItem("changePassword");
  };

  // Handle closing the ModalResetPassword modal
  const handleCloseResetPasswordModal = () => {
    setBoxOpenResetPassword(false);
    setActiveMenuItem(null);
  };

  // Handle clicking on "Configuration" to open the modal and set active item
  const handleConfigurationClick = () => {
    handleClose();
    handleOpenConfigModal();
  };

  // Handle clicking on "Change Password" to open the reset password modal and set active item
  const handleChangePasswordClick = () => {
    handleClose();
    handleOpenResetPasswordModal();
  };

  // Handle clicking on "Logout" and set active item
  const handleLogoutClick = () => {
    handleClose();
    setActiveMenuItem("logout");
    localStorage.clear();
    Cookies.remove("auth_token");
    Cookies.remove("refresh_token");
    window.location.href = "/";
    // router.push("/");
    toast.success("Logout SuccessFully");
  };

  return (
    <div className="flex justify-center">
      <div className="navbar fixed bg-white shadow-lg w-full h-[80px] z-10">
        <div className="flex items-center justify-end !mr-5 w-full h-full relative">
          {/* Ensure the button is on top */}

          {/* <Avatar alt="Remy Sharp" src={config} /> */}
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="!text-black !mr-5 !text-xl !font-bold relative z-20"
          >
            Admin
          </Button>

          {/* Menu Dropdown */}
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            className="z-10 !p-0"
          >
            {/* When "Configuration" is clicked, open the modal */}
            <MenuItem
              onClick={handleConfigurationClick}
              className={`${
                activeMenuItem === "configuration" ? " !text-black" : ""
              } flex items-center gap-2 !text-xl hover:!bg-yellow-500 !px-5 !py-3`}
            >
              <Image src={config} alt="config" width={20} height={20} />
              Configuration
            </MenuItem>

            {/* When "Change Password" is clicked, open the reset password modal */}
            <MenuItem
              onClick={handleChangePasswordClick}
              className={`${
                activeMenuItem === "changePassword"
                  ? "!bg-yellow-500 !text-black"
                  : " "
              } flex items-center gap-2 !text-xl hover:!bg-yellow-500 !px-5 !py-3`}
            >
              <Image src={changePassword} alt="config" width={20} height={20} />
              Change Password
            </MenuItem>

            {/* When "Logout" is clicked */}
            <MenuItem
              onClick={handleLogoutClick}
              className={`${
                activeMenuItem === "logout" ? "!bg-yellow-500 !text-black" : " "
              } flex items-center gap-2 !text-xl hover:!bg-yellow-500 !px-5 !py-3`}
            >
              <Image
                src={logout}
                alt="config"
                className="ml-1"
                width={20}
                height={20}
              />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Modal Configuration Component */}
      {boxOpenConfig && (
        <ModalConfiguration
          boxOpen={boxOpenConfig}
          handleClose={handleCloseConfigModal}
        />
      )}

      {/* Modal Reset Password Component */}
      {boxOpenResetPassword && (
        <ModalResetPassword
          boxOpen={boxOpenResetPassword}
          handleClose={handleCloseResetPasswordModal}
        />
      )}
    </div>
  );
}

export default Header;
