import React, { FC } from 'react';

import ModalPaidConsultation from '@/components/screens/skinSolution/modalWindows/modalConsultation/modalPaidConsultation';
import ModalPay from '@/components/screens/skinSolution/modalWindows/modalConsultation/modalPay/modalPay';
import ModalSuccessfulRegistration from '@/components/screens/skinSolution/modalWindows/modalConsultation/ModalSuccessfulRegistration/ModalSuccessfulRegistration';

import style from './DescriptionRecord.module.sass';

const DescriptionRecord: FC = () => {
  const [isModalConsultationOpen, setIsModalConsultationOpen] = React.useState(false);
  const [isModalPayOpen, setIsModalPayOpen] = React.useState(false);
  const [isModalSuccessfulRegistrationOpen, setIsModalSuccessfulRegistrationOpen] =
    React.useState(false);

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
              <div className={style.title}>
                Программa
                <br /> health <br /> strategy
              </div>
              <div className={style.subtitle}>
                {'>'} C превентивным
                <br /> врачом-эндокринологом
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.text}>
              <div>
                Это целостная работа с организмом,которая затрагивает все органы и системы, начиная
                с пищеварительной и заканчивая эндокринной системой.
              </div>
              <div>
                При соблюдении рекомендаций специалиста вы сможете избавиться не только от того, что
                вас беспокоило изначально, но и улучшить качество вашей жизни в долгосрочной
                перспективе.
              </div>
            </div>
            <div className={style.btn}>
              <button
                className={style.button}
                onClick={(event) => {
                  event.preventDefault();
                  setIsModalConsultationOpen(true);
                }}>
                Записаться
              </button>

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
      </div>
      <div className={style.lineMain}>
        <div className={style.line}></div>
      </div>
    </div>
  );
};

export default DescriptionRecord;
