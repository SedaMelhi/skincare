import React, { FC, useState, useEffect } from 'react';
import style from './OtherServices.module.sass';
import ModalPaidConsultation from '@/components/screens/skinSolution/modalWindows/modalConsultation/modalPaidConsultation';
import ModalPay from '@/components/screens/skinSolution/modalWindows/modalConsultation/modalPay/modalPay';
import ModalSuccessfulRegistration from '@/components/screens/skinSolution/modalWindows/modalConsultation/ModalSuccessfulRegistration/ModalSuccessfulRegistration';
import Link from 'next/link';

const OtherServices: FC = () => {
  const [windowWidth, setWindowWidth] = useState(0); // начальное значение может быть любым

  const [isModalConsultationOpen, setIsModalConsultationOpen] = React.useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = React.useState(false);
  const [isModalSuccessfulRegistrationOpen, setIsModalSuccessfulRegistrationOpen] =
    React.useState(false);

  const [isModalFreeConsultationOpen, setIsModalFreeConsultationOpen] = React.useState(false);
  const [isModalFreeConsultationSuccessfulOpen, setIsModalFreeConsultationSuccessfulOpen] =
    React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      // проверка, доступен ли window (используется только в браузере, не в Node.js)
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      // Убедитесь, что вы удаляете слушателя события после размонтирования компонента
      return () => {
        window.removeEventListener('resize', handleResize);
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
            <h3 className={style.subtitle1}>Бесплатная консультация</h3>
          </div>
          <div className={style.rhomb1}></div>

          <div className={style.borderMain}>
            <div className={style.border1}>
              <div className={style.text}>
                {windowWidth <= 1200
                  ? 'Подберите себе уход с нашими агентами бесплатно.'
                  : 'Подберите себе уход с нашими агентами бесплатно. Независимо от ваших потребностей — увлажнение, борьба с признаками старения или акне — наши специалисты помогут вам выбрать наилучшие продукты и режим ухода, под вашу кожу.'}
              </div>
              <div className={style.text__link}>
                <Link href="/free" className={style.link1}>
                  Подробнее о бесплатной консультации
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
                setIsModalFreeConsultationOpen(true);
              }}>
              Записаться
            </button>
          </div>
          {isModalFreeConsultationOpen && (
            <ModalPaidConsultation
              active={isModalFreeConsultationOpen}
              setActive={setIsModalFreeConsultationOpen}
              setModalPayActive={setIsModalFreeConsultationSuccessfulOpen}
              buttonText="Записаться"
            />
          )}
          {isModalFreeConsultationSuccessfulOpen && (
            <ModalSuccessfulRegistration
              active={isModalFreeConsultationSuccessfulOpen}
              setActive={setIsModalFreeConsultationSuccessfulOpen}
            />
          )}
        </div>
        <div className={style.row2}>
          <div className={style.subtitle__main}>
            <h3 className={style.subtitle2}>Beauty pro</h3>
          </div>
          <div className={style.rhomb2}></div>

          <div className={style.borderMain}>
            <div className={style.border2}>
              <div className={style.text}>
                {windowWidth <= 1200
                  ? 'При платной консультации косметолог проведёт анализ вашей кожи,'
                  : 'При платной консультации косметолог проведёт анализ вашей кожи, выслушает ваши пожелания и определит оптимальный набор процедур и продуктов для достижения желаемых целей.'}
              </div>
              <div className={style.text__link}>
                <Link href="/healthStrategy" className={style.link2}>
                  Подробнее о Beauty Pro
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
                setIsModalConsultationOpen(true);
              }}>
              Записаться
            </button>
          </div>

          {isModalConsultationOpen && (
            <ModalPaidConsultation
              active={isModalConsultationOpen}
              setActive={setIsModalConsultationOpen}
              setModalPayActive={setIsModalPayOpen}
              buttonText="Оплатить"
            />
          )}
          {isModalPayOpen && (
            <ModalPay
              active={isModalPayOpen}
              setActive={setIsModalPayOpen}
              setModalSuccessfulRegistrationActive={setIsModalSuccessfulRegistrationOpen}
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
  );
};
export default OtherServices;
