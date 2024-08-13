import React, { FC } from "react";
import ModalPaidConsultation from "@/components/screens/skinSolution/modalWindows/modalConsultation/modalPaidConsultation";
import ModalPay from "@/components/screens/skinSolution/modalWindows/modalConsultation/modalPay/modalPay";
import ModalSuccessfulRegistration from "@/components/screens/skinSolution/modalWindows/modalConsultation/ModalSuccessfulRegistration/ModalSuccessfulRegistration";

import style from "./Record.module.sass";

const Record: FC = () => {
  const [isModalConsultationOpen, setIsModalConsultationOpen] =
    React.useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = React.useState(false);
  const [
    isModalSuccessfulRegistrationOpen,
    setIsModalSuccessfulRegistrationOpen,
  ] = React.useState(false);

  return (
    <div className="wrap">
      <div className={style.main}>
        <div className={style.img__big}>
          <div className={style.img__small}></div>
        </div>

        <div className={style.lines}>
          <div className={style.line}></div>
        </div>

        <h3 className={style.label}>
          Начните ваш путь к здоровой коже сейчас!
        </h3>
        <div className={style.btn__main}>
          <button
            className={style.btn}
            onClick={(event) => {
              event.preventDefault();
              setIsModalConsultationOpen(true);
            }}
          >
            записаться
          </button>
          {isModalConsultationOpen && (
            <ModalPaidConsultation
              active={isModalConsultationOpen}
              setActive={setIsModalConsultationOpen}
              setModalPayActive={setIsModalPayOpen}
              buttonText="Оплатить"
              data_b24_form="inline/10/ydop5w"
              link="https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_10.js?"
            />
          )}
          {isModalPayOpen && (
            <ModalPay
              active={isModalPayOpen}
              setActive={setIsModalPayOpen}
              setModalSuccessfulRegistrationActive={
                setIsModalSuccessfulRegistrationOpen
              }
            />
          )}
          {isModalSuccessfulRegistrationOpen && (
            <ModalSuccessfulRegistration
              active={isModalSuccessfulRegistrationOpen}
              setActive={setIsModalSuccessfulRegistrationOpen}
            />
          )}
        </div>
        <h2 className={style.title}></h2>
      </div>
    </div>
  );
};
export default Record;
