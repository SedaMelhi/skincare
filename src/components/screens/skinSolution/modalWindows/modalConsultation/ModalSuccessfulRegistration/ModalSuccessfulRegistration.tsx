import React, {FC, useState} from 'react';
import style from './ModalSuccessfulRegistration.module.sass';

interface ModalSuccessfulRegistrationProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const ModalSuccessfulRegistration: FC<ModalSuccessfulRegistrationProps> = ({active, setActive}) => {


    return (
        <div className={active ? `${style.active} ${style.modal}` : style.modal} onClick={() => setActive(false)}>
            <div
                className={style.modal__content}
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <div className={style.container}>
                    <div className={style.close} onClick={() => setActive(false)}>
                        <img alt="close" src={'./certificate/close.png'} className={style.closeImg}/>
                    </div>


                    <div className={style.title}>Cпасибо! Bы успешно зарегистрировались на консультацию!</div>


                    <div className={style.subtitle}>Мы с вами скоро свяжемся чтобы назначить день и время консультации.
                    </div>
                </div>


                <div className={style.line}>
                    <div className={style.logo}>
                    </div>
                </div>


            </div>


        </div>

    );
};

export default ModalSuccessfulRegistration;
