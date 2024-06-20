import { Input } from "@mui/material";
import ModalContainer from "../modal";
import style from "./addCertificateModal.module.scss";
import { FC } from "react";
import Button from "../button/button";

const AddCertificateModal: FC = () => {
  return (
    <ModalContainer
      button={<Button text="Добавить" height="43px" fontSize="14px" />}
    >
      <Input placeholder="Код сертификата *" />
      <Input placeholder="ПИН-код *" />
    </ModalContainer>
  );
};

export default AddCertificateModal;
