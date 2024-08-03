import { Input } from "@mui/material";
import ModalContainer from "../modal";
import style from "./addCertificateModal.module.sass";
import { FC, useState } from "react";
import Button from "../button/button";
import ProfileTitle from "@/components/screens/profile/profileTitle/Title";
import { addCertificateService } from "@/services/profile.service";

const AddCertificateModal: FC = () => {
  const [pin, setPin] = useState<number>();
  const [certificateNumber, setCertificateNumber] = useState<string>();

  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pin && certificateNumber) {
      await addCertificateService.addCertificate(pin, certificateNumber);
    }
  };

  return (
    <ModalContainer
      button={<Button text="Добавить" height="43px" fontSize="14px" />}
      title={" "}
    >
      <div className={style.addCertificate}>
        <header className={style.header}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.77332 37.2759V42.7102C2.77332 43.3313 2.99442 43.9006 3.43664 44.4181C3.87885 44.9357 4.36529 45.1945 4.89595 45.1945H43.1033C43.6339 45.1945 44.1204 44.9357 44.5626 44.4181C45.0048 43.9006 45.2259 43.3313 45.2259 42.7102V37.2759H2.77332ZM4.89595 9.01724H14.6468C14.4257 8.55144 14.2267 8.05976 14.0498 7.5422C13.8729 7.02464 13.7845 6.48121 13.7845 5.9119C13.7845 4.41098 14.2156 3.1559 15.0779 2.14667C15.9402 1.13743 17.0126 0.632812 18.295 0.632812C19.0645 0.632812 19.7762 0.8705 20.4303 1.34588C21.0843 1.82125 21.655 2.41166 22.1423 3.11709L23.8669 5.9119L25.5916 3.11709C26.078 2.39251 26.6522 1.79732 27.3142 1.33151C27.9762 0.865713 28.6891 0.632812 29.4529 0.632812C30.726 0.632812 31.7936 1.13743 32.656 2.14667C33.5183 3.1559 33.9494 4.41098 33.9494 5.9119C33.9494 6.48121 33.872 7.02464 33.7173 7.5422C33.5625 8.05976 33.3524 8.55144 33.0871 9.01724H43.1033C44.253 9.01724 45.2038 9.45716 45.9556 10.337C46.7073 11.2169 47.0832 12.3296 47.0832 13.6753V42.7102C47.0832 44.0559 46.7073 45.1686 45.9556 46.0484C45.2038 46.9283 44.253 47.3682 43.1033 47.3682H4.89595C3.74619 47.3682 2.79543 46.9283 2.04366 46.0484C1.2919 45.1686 0.916016 44.0559 0.916016 42.7102V13.6753C0.916016 12.3296 1.2919 11.2169 2.04366 10.337C2.79543 9.45716 3.74619 9.01724 4.89595 9.01724ZM2.77332 31.3757H45.2259V13.6753C45.2259 13.0542 45.0048 12.4849 44.5626 11.9673C44.1204 11.4498 43.6339 11.191 43.1033 11.191H27.0509L32.2248 19.5754L30.7655 20.8175L23.8669 9.79357L16.9684 20.8175L15.5091 19.5754L20.683 11.191H4.89595C4.36529 11.191 3.87885 11.4498 3.43664 11.9673C2.99442 12.4849 2.77332 13.0542 2.77332 13.6753V31.3757ZM18.295 9.01724C19.0468 9.01724 19.677 8.71964 20.1855 8.12445C20.6941 7.52926 20.9483 6.79174 20.9483 5.9119C20.9483 5.03205 20.6941 4.29453 20.1855 3.69934C19.677 3.10415 19.0468 2.80655 18.295 2.80655C17.5433 2.80655 16.9131 3.10415 16.4046 3.69934C15.896 4.29453 15.6418 5.03205 15.6418 5.9119C15.6418 6.79174 15.896 7.52926 16.4046 8.12445C16.9131 8.71964 17.5433 9.01724 18.295 9.01724ZM29.4388 9.01724C30.1906 9.01724 30.8208 8.71964 31.3293 8.12445C31.8379 7.52926 32.0921 6.79174 32.0921 5.9119C32.0921 5.03205 31.8379 4.29453 31.3293 3.69934C30.8208 3.10415 30.1906 2.80655 29.4388 2.80655C28.6871 2.80655 28.0569 3.10415 27.5484 3.69934C27.0398 4.29453 26.7856 5.03205 26.7856 5.9119C26.7856 6.79174 27.0398 7.52926 27.5484 8.12445C28.0569 8.71964 28.6871 9.01724 29.4388 9.01724Z"
              fill="#1C1B1F"
            />
          </svg>
          <ProfileTitle title="подарочные сертификаты" link={false} />
        </header>
        <div className={style.addCertificateDescription}>
          Введите номер сертификата и ПИН-код.
        </div>
        <form
          className={style.addCertificateFrom}
          action=""
          onSubmit={sendData}
        >
          <Input
            value={certificateNumber}
            onChange={(event) =>
              setCertificateNumber(event.target.value)
            }
            placeholder="Код сертификата *"
          />
          <Input
            value={pin}
            onChange={(event) => setPin(Number(event.target.value))}
            placeholder="ПИН-код *"
          />
          <Button text={"Добавить"} />
        </form>
      </div>
    </ModalContainer>
  );
};

export default AddCertificateModal;
