import { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./modal.module.sass";

const ModalContainer: FC<{ children: ReactNode; button: ReactNode }> = ({
  button,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div onClick={handleOpen}>{button}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box className={style.box}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalContainer;
