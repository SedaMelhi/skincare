import React, { FC, useState } from 'react';

import BitrixForm from '@/components/other/bitrixForm/bitrixForm';

import style from './ModalConsultation.module.sass';
interface ModalConsultationProps {
  active: boolean;
  setActive: (active: boolean) => void;
  setModalPayActive: (active: boolean) => void;
  buttonText: string;
}

const ModalConsultation: FC<ModalConsultationProps> = ({ active, setActive }) => {
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
        <BitrixForm setIsVisible={setIsVisible} />
      </div>
    </div>
  );
};

export default ModalConsultation;
