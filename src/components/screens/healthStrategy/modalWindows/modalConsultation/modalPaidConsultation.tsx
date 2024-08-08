import React, { FC, useEffect, useState } from 'react';
import style from './ModalConsultation.module.sass';
import BitrixForm from '@/components/other/bitrixForm/bitrixForm';

interface ModalConsultationProps {
  active: boolean;
  setActive: (active: boolean) => void;
  setModalPayActive: (active: boolean) => void;
  buttonText: string;
}

const ModalConsultation: FC<ModalConsultationProps> = ({
  active,
  setActive,
  setModalPayActive,
  buttonText,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={active ? `${style.active} ${style.modal}` : style.modal}
      onClick={() => setActive(false)}>
      <div
        className={style.modal__content}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        {isVisible && (
          <div className={style.close} onClick={() => setActive(false)}>
            <img alt="close" src={'./certificate/close.png'} className={style.closeImg} />
          </div>
        )}
        <BitrixForm setIsVisible={setIsVisible} data_b24_form="click/14/9beldz" link='https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_14.js?' />
      </div>
    </div>
  );
};

export default ModalConsultation;
