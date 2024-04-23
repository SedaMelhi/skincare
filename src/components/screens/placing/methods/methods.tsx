import { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { setType } from '@/redux/addressSlice/addressSlice';

import arrow from './../../../../../public/arrowLeft.svg';

import style from './methods.module.sass';

interface IType {
  address: {
    type: string;
  };
}

const Methods: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const type = useSelector((state: IType) => state.address.type);
  const dispatch = useDispatch();
  const handleActiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setType(event.target.value));
  };

  return (
    <div className={style.method}>
      <div className={style.method__title}>способ доставки</div>
      <Accordion className={style.accordion} expanded={isOpen}>
        <AccordionSummary
          className={style.accordion__header}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <div className={style.item}>
            <label className={style.item__left} htmlFor="one">
              <div className={style.text}>
                <input
                  type="radio"
                  name="method"
                  id="one"
                  className={style.input}
                  checked={'courier' === type}
                  onChange={handleActiveChange}
                  value="courier"
                />
                <div className={style.circle}>
                  <div className={style.active}></div>
                </div>
                <div className={style.desc}>Курьер по г. Грозный</div>
              </div>
            </label>
            <div className={style.arrow__wrap}>
              <img
                src={arrow.src}
                alt=""
                className={isOpen ? style.hidden : style.arrow}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className={style.accordion__body}>
          <div className={style.wrap}>
            <div className={style.item}>
              <label className={style.item__left} htmlFor="two">
                <div className={style.text}>
                  <input
                    type="radio"
                    name="method"
                    id="two"
                    className={style.input}
                    checked={'point' === type}
                    onChange={handleActiveChange}
                    value="point"
                  />
                  <div className={style.circle}>
                    <div className={style.active}></div>
                  </div>
                  <div className={style.desc}>
                    Пункт выдачи
                    <div className={style.grey}>Почта России, СДЭК</div>
                  </div>
                </div>
                <div className={style.price}>350 ₽</div>
              </label>
              <div className={style.arrow__wrap}></div>
            </div>
            <div className={style.item}>
              <label className={style.item__left} htmlFor="three">
                <div className={style.text}>
                  <input
                    type="radio"
                    name="method"
                    id="three"
                    className={style.input}
                    checked={'pickup' === type}
                    onChange={handleActiveChange}
                    value="pickup"
                  />
                  <div className={style.circle}>
                    <div className={style.active}></div>
                  </div>
                  <div className={style.desc}>
                    Самовывоз в г. Грозный
                    <div className={style.grey}>Почта России, СДЭК</div>
                  </div>
                </div>
                <div className={style.price}>Бесплатно</div>
              </label>
              <div className={style.arrow__wrap}>
                <img
                  src={arrow.src}
                  alt=""
                  className={isOpen ? style.arrow__close : style.hidden}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Methods;
