import React, { FC, useState, useEffect } from "react";
import ModalPaidConsultation from "@/components/screens/skinSolution/modalWindows/modalConsultation/modalPaidConsultation";
import ModalPay from "@/components/screens/healthStrategy/modalWindows/modalConsultation/modalPay/modalPay";
import ModalSuccessfulRegistration from "@/components/screens/healthStrategy/modalWindows/modalConsultation/ModalSuccessfulRegistration/ModalSuccessfulRegistration";
import Link from "next/link";

import style from "./OtherServices.module.sass";

const OtherServices: FC = () => {
  const [windowWidth, setWindowWidth] = useState(0); // начальное значение может быть любым

  const [isModalConsultationOpen2, setIsModalConsultationOpen2] =
    React.useState(false);
  const [isModalPayOpen2, setIsModalPayOpen2] = React.useState(false);
  const [
    isModalSuccessfulRegistrationOpen2,
    setIsModalSuccessfulRegistrationOpen2,
  ] = React.useState(false);

  const [isModalConsultationOpen, setIsModalConsultationOpen] =
    React.useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = React.useState(false);

  const [
    isModalSuccessfulRegistrationOpen,
    setIsModalSuccessfulRegistrationOpen,
  ] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      // проверка, доступен ли window (используется только в браузере, не в Node.js)
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Убедитесь, что вы удаляете слушателя события после размонтирования компонента
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="wrap">
      <div>
        <h2 className={style.title}>Познакомьтесь с нашими Другими услугами</h2>
      </div>
      <div className={style.container}>
        <div className={style.row1}>
          <div className={style.subtitle__main}>
            <h3 className={style.subtitle1}>Health Strategy</h3>
          </div>
          <div className={style.rhomb1}></div>

          <div className={style.borderMain}>
            <div className={style.border1}>
              <div className={style.text}>
                {windowWidth <= 1200
                  ? "Подберите себе уход с нашими агентами бесплатно."
                  : "Подберите себе уход с нашими агентами бесплатно. Независимо от ваших потребностей — увлажнение, борьба с признаками старения или акне — наши специалисты помогут вам выбрать наилучшие продукты и режим ухода, под вашу кожу."}
              </div>
              <div className={style.text__link}>
                <Link href="/healthStrategy" className={style.link1}>
                  Подробнее о Health Strategy
                </Link>
                <div className={style.svg1}></div>
              </div>
            </div>
          </div>
          <div className={style.btn__main}>
            <button
              className={style.btn1}
              onClick={(event) => {
                event.preventDefault();
                setIsModalConsultationOpen(true);
              }}
            >
              Записаться
            </button>
          </div>
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
        <div className={style.row2}>
          <div className={style.subtitle__main}>
            <h3 className={style.subtitle2}>Skin Solution</h3>
          </div>
          <div className={style.rhomb2}></div>

          <div className={style.borderMain}>
            <div className={style.border2}>
              <div className={style.text}>
                {windowWidth <= 1200
                  ? "Skin Solution объединяет экспертизу врача эндокринолога и косметолога. Здесь вы получите профессиональную помощь в решении проблем с кожей и нутриционные рекомендации для достижения здоровья изнутри."
                  : "Skin Solution объединяет экспертизу врача эндокринолога и косметолога. Здесь вы получите профессиональную помощь в решении проблем с кожей и нутриционные рекомендации для достижения здоровья изнутри."}
              </div>
              <div className={style.text__link}>
                <Link href="/skinSolution" className={style.link2}>
                  Подробнее о Skin Solution
                </Link>
                <div className={style.svg2}></div>
              </div>
            </div>
          </div>
          <div className={style.btn__main}>
            <button
              className={style.btn2}
              onClick={(event) => {
                event.preventDefault();
                setIsModalConsultationOpen2(true);
              }}
            >
              Записаться
            </button>
          </div>

          {isModalConsultationOpen2 && (
            <ModalPaidConsultation
              active={isModalConsultationOpen2}
              setActive={setIsModalConsultationOpen2}
              setModalPayActive={setIsModalPayOpen2}
              buttonText="Оплатить"
              data_b24_form="inline/14/9beldz"
              link="https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_14.js?"
            />
          )}
          {isModalPayOpen2 && (
            <ModalPay
              active={isModalPayOpen2}
              setActive={setIsModalPayOpen2}
              setModalSuccessfulRegistrationActive={
                setIsModalSuccessfulRegistrationOpen2
              }
            />
          )}
          {isModalSuccessfulRegistrationOpen2 && (
            <ModalSuccessfulRegistration
              active={isModalSuccessfulRegistrationOpen2}
              setActive={setIsModalSuccessfulRegistrationOpen2}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default OtherServices;
