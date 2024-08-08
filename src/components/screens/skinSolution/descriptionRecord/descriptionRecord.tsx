import React, { FC } from "react";

import ModalPaidConsultation from "@/components/screens/skinSolution/modalWindows/modalConsultation/modalPaidConsultation";
import ModalPay from "@/components/screens/healthStrategy/modalWindows/modalConsultation/modalPay/modalPay";
import ModalSuccessfulRegistration from "@/components/screens/healthStrategy/modalWindows/modalConsultation/ModalSuccessfulRegistration/ModalSuccessfulRegistration";

import style from "./DescriptionRecord.module.sass";

const DescriptionRecord: FC<{
  title: string;
  subtitle?: string;
  text: string[];
  data_b24_form: string;
  link: string;
}> = ({ title, subtitle, text, data_b24_form, link }) => {
  const [isModalConsultationOpen, setIsModalConsultationOpen] =
    React.useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = React.useState(false);
  const [
    isModalSuccessfulRegistrationOpen,
    setIsModalSuccessfulRegistrationOpen,
  ] = React.useState(false);

  return (
    <div>
      <div className={style.wrap}>
        <div className={style.main}>
          <div className={style.circle}>
            <div className={style.circle__big}></div>
            <div className={style.circle__small}></div>
          </div>
          <div className={style.left}>
            <div className={style.block}></div>
            <div>
              <div className={style.title}>{title}</div>
              <div className={style.subtitle}>{subtitle}</div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.text}>
              <div>{text[0]}</div>
              <div>{text[1]}</div>
            </div>
            <div className={style.btn}>
              <button
                className={style.button}
                onClick={(event) => {
                  event.preventDefault();
                  setIsModalConsultationOpen(true);
                }}
              >
                Записаться
              </button>

              {isModalConsultationOpen && (
                <ModalPaidConsultation
                  active={isModalConsultationOpen}
                  setActive={setIsModalConsultationOpen}
                  setModalPayActive={setIsModalPayOpen}
                  buttonText="Оплатить"
                  data_b24_form={data_b24_form}
                  link={link}
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
          </div>
        </div>
      </div>
      <div className={style.lineMain}>
        <div className={style.line}></div>
      </div>
    </div>
  );
};

export default DescriptionRecord;
