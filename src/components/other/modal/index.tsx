import { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./modal.module.sass";

const ModalContainer: FC<{
  children: ReactNode;
  button: ReactNode;
  title?: string;
}> = ({ button, children, title }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className={style.openButton} onClick={handleOpen}>{button}</div>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className={style.box}>
          {title && (
            <header className={style.header}>
              <h1>{title}</h1>
              <span className={style.closeButton} onClick={handleClose}>
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
          )}
          <div className={style.content}>{children}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalContainer;
