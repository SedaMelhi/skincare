import React, { FC, useState } from "react";
import ModalPaidConsultation from "@/components/screens/skinSolution/modalWindows/modalConsultation/modalPaidConsultation";
import ModalPay from "@/components/screens/skinSolution/modalWindows/modalConsultation/modalPay/modalPay";
import ModalSuccessfulRegistration from "@/components/screens/skinSolution/modalWindows/modalConsultation/ModalSuccessfulRegistration/ModalSuccessfulRegistration";

import style from "./ConsultationTerms.module.sass";

const ConsultationTerms: FC = () => {
  const [isModalConsultationOpen, setIsModalConsultationOpen] =
    React.useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = React.useState(false);
  const [
    isModalSuccessfulRegistrationOpen,
    setIsModalSuccessfulRegistrationOpen,
  ] = React.useState(false);

  const handlePaymentButtonClick = () => {
    setIsModalPayOpen(true);
  };
  return (
    <div>
      <div className={style.wrap}>
        <div className={style.flex}>
          <div className={style.block}>
            <div className={style.mainTitle}>
              <h2 className={style.title}>Условия консультации</h2>
            </div>
            <div className={style.bg}>
              <div className={style.lists}>
                <ol className={style.list}>
                  <li className={style.text}>
                    Проходит онлайн в удобном для вас мессенджере (TELEGRAM,
                    WHATSAPP или в direct),
                  </li>
                  <li className={style.text}>
                    Агент высылает анкету, ответы на нее вы отправляете в любое
                    удобное для вас время,
                  </li>
                  <li className={style.text}>
                    Подбор ухода со всеми ссылками на средства отправляем в
                    течение суток в порядке очереди из-за количества запросов,
                  </li>
                  <li className={style.text}>
                    Все интересующие вопросы можно задать в процессе
                    консультации,
                  </li>
                  <li className={style.text}>
                    Все средства подбираются из нашего ассортимента.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className={style.priceMain}>
            <div className={style.price}>цена:</div>
            <div className={style.sum}>Бесплатно</div>
          </div>
        </div>

        <div className={style.container}>
          <h3 className={style.titleBtn}>
            Начните ваш путь к здоровой коже сейчас!
          </h3>
          <button
            className={style.btn}
            onClick={(event) => {
              event.preventDefault();
              setIsModalConsultationOpen(true);
            }}
          >
            записаться
          </button>

          {/* Модальное окно */}

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
      </div>
      <div className={style.lineMain}>
        <div className={style.line}></div>
      </div>
    </div>
  );
};

export default ConsultationTerms;
