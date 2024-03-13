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
                Skin Solution, <br />
                глубокий
                <br /> подход.
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.text}>
              <div>Skin Solution объединяет экспертизу врача эндокринолога и косметолога.</div>
              <div>
                Здесь вы получите профессиональную помощь в решении проблем с кожей и нутриционные
                рекомендации для достижения здоровья изнутри.
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
