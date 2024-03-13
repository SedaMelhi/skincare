import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IbasketData } from '@/interfaces/basket.interface';
import { setIsAddNewItem, setIsBasketOpen } from '@/redux/basketSlice/basketSlice';
import Button from '@/components/other/button/button';

import basket from './../../../../../public/basket.svg';
import notphotoPng from './../../../../../public/notphoto.png';

import style from './basket.module.sass';

interface IBasketState {
  basket: {
    basketArr: IbasketData[];
    isAddNewItem: boolean;
  };
}
const BasketBtn: FC = () => {
  const basketArr = useSelector((state: IBasketState) => state.basket.basketArr);
  const isAddNewItem = useSelector((state: IBasketState) => state.basket.isAddNewItem);
  const [lastItem, setLastItem] = useState(
    basketArr && basketArr.length > 0 ? basketArr[basketArr.length - 1] : null,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAddNewItem) {
      dispatch(setIsAddNewItem(true));
      setTimeout(() => {
        dispatch(setIsAddNewItem(false));
      }, 3000);
    } else {
      dispatch(setIsAddNewItem(false));
    }
  }, [isAddNewItem]);
  useEffect(() => {
    setLastItem(basketArr && basketArr.length > 0 ? basketArr[basketArr.length - 1] : null);
  }, [basketArr]);

  return (
    <div className={style.relative}>
      <div className={style.basket__wrap}>
        <div className={style.basket}>
          <img src={basket.src} alt="" />
        </div>
        <div className={style.basket__text}>
          cумочка (<span className={style.count}>{basketArr.length}</span>)
        </div>
      </div>
      <div className={style.window} style={{ display: isAddNewItem ? 'block' : 'none' }}>
        <div className={style.title}>
          <img src={basket.src} alt="" />
          добавлен в сумочку
        </div>
        <div className={style.product}>
          <div
            className={style.image}
            style={{
              backgroundImage:
                lastItem !== null
                  ? `url(https://b.skincareagents.com/${lastItem.parentItem.PREVIEW_PICTURE})`
                  : notphotoPng.src,
            }}></div>
          <div className={style.text}>
            <div className={style.name}>
              {lastItem &&
                (lastItem.name.length > 55
                  ? lastItem.name.substring(0, 55) + '...'
                  : lastItem.name)}
            </div>
            <div className={style.price}>{lastItem && lastItem.finalPrice}</div>
          </div>
        </div>
        <Button text="перейти" onClick={() => dispatch(setIsBasketOpen(true))} />
      </div>
    </div>
  );
};
export default BasketBtn;
