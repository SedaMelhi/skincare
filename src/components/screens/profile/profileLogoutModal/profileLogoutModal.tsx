import React, { FC, useState } from "react";
import style from "./profileLogoutModal.module.sass";
import { Box, Modal } from "@mui/material";
import Button from "@/components/other/button/button";

interface ProfileLogoutModalProps {
  open: boolean;
  setOpen: () => void;
  logoutButtonClick: () => void;
}

const ProfileLogoutModal: FC<ProfileLogoutModalProps> = ({ open, setOpen, logoutButtonClick }) => {
  return (
    <div className={style.profileLogoutModal}>
      <Modal open={open} onClose={setOpen}>
        <Box className={style.box}>
          <header className={style.header}>
            <h1>Вы уверены, что хотите выйти из личного кабинета?</h1>
            <span className={style.closeButton} onClick={setOpen}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.05536 10.0001L0.00390625 0.948669L0.946715 0.00585938L9.99817 9.05731L19.0496 0.00588055L19.9924 0.94869L10.941 10.0001L19.8029 18.862L18.8601 19.8049L9.99817 10.9429L1.13623 19.8049L0.193419 18.8621L9.05536 10.0001Z"
                  fill="#19171A"
                />
              </svg>
            </span>
          </header>
          <div className={style.content}>
            <Button onClick={logoutButtonClick} text={"Выйти"} />
            <Button onClick={setOpen} text={"вернуться в лк"} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileLogoutModal;
