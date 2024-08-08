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
        <div className={style.mainTitle}>
          <h2 className={style.title}>Условия консультации</h2>
          <div className={style.priceMain}>
            <div className={style.price}>цена:</div>
            <div className={style.sum}>5 900 ₽</div>
          </div>
        </div>
        <div className={style.bg}>
          <div className={style.lists}>
            <ol className={style.list}>
              <li className={style.text}>
                Kонсультация проходит в онлайн формате,
              </li>
              <li className={style.text}>
                После оплаты консультации необходимо выслать анкету в течение 3
                дней,
              </li>
              <li className={style.text}>
                В рамках консультации необходимо сдать общий клинический анализ
                в течение 10 дней,
              </li>
              <li className={style.text}>
                Сроки составление назначена 7 дней после получения результатов
                анализов,
              </li>
              <li className={style.text}>
                Bы получите ответы на (любые возникшие) вопросы в TELEGRAM в
                режиме «вопросы- ответы».
              </li>
              <li className={style.text}>
                1-2 раза в неделю, Вы присылаете отчет: подробный рацион, даете
                оценку своего самочувствия, держите со мной обратную связь
              </li>
              <li className={style.text}>
                Протокол получаете в формате PDF + Microsoft Word (ссылки на
                добавки)
              </li>
              <li className={style.text}>
                Ведение начинается с момента получения Вами готового протокола,
                обратная связь - 1 месяц
              </li>
              <li className={style.text}>
                По истечении срока обратной связи, можно продлить срок ведения
              </li>
            </ol>
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
              data_b24_form="inline/14/9beldz"
              link="https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_14.js?"
            />
          )}
          {/* {isModalPayOpen && (
            <ModalPay
              active={isModalPayOpen}
              setActive={setIsModalPayOpen}
              setModalSuccessfulRegistrationActive={setIsModalSuccessfulRegistrationOpen}
            />
          )} */}
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
