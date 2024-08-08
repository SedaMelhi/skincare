import React, { FC, useState } from "react";

import BitrixForm from "@/components/other/bitrixForm/bitrixForm";

import style from "./ModalConsultation.module.sass";
interface ModalConsultationProps {
  active: boolean;
  setActive: (active: boolean) => void;
  setModalPayActive: (active: boolean) => void;
  buttonText: string;
  data_b24_form: string;
  link: string;
}

const ModalConsultation: FC<ModalConsultationProps> = ({
  active,
  setActive,
  data_b24_form,
  link,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={active ? `${style.active} ${style.modal}` : style.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={style.modal__content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isVisible && (
          <div className={style.close} onClick={() => setActive(false)}>
            <img
              alt="close"
              src={"./certificate/close.png"}
              className={style.closeImg}
            />
          </div>
        )}
        <BitrixForm
          setIsVisible={setIsVisible}
          data_b24_form={data_b24_form}
          link={link}
        />
      </div>
    </div>
  );
};

export default ModalConsultation;
