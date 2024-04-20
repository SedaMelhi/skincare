import Layout from '@/components/layout/Layout';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getOrderInfoService } from '@/services/order.service';
import { setIsAddressOpen } from '@/redux/addressSlice/addressSlice';
import { useDispatch, useSelector } from 'react-redux';

import BasketRight from './basketRight/basketRight';
import RangeSlider from './rangeSlider/rangeSlider';
import Methods from './methods/methods';

import arrowLeft from './../../../../public/arrow.svg';
import close from './../../../../public/close.svg';
import whiteArrow from './../../../../public/whiteArrow.svg';
import plusSvg from './../../../../public/plusSimple.svg';
import arrowViolet from './../../../../public/arrowViolet.svg';

import style from './placing.module.sass';
import { IbasketData } from '@/interfaces/basket.interface';
import { IOrder } from '@/interfaces/order.interface';
const PlacingPage: FC<{ basket: IOrder }> = ({ basket }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.address.isAddressOpen);

  return (
    <Layout title="Оформление заказа" nav={false}>
      <div className="wrap">
        <div className={style.nav}>
          <div className={style.arrowLeft}>
            <img src={arrowLeft.src} alt="" onClick={() => router.back()} />
          </div>
          <div className={style.title}>Оформление заказа</div>
          <div className={style.close}>
            <img src={close.src} alt="" onClick={() => router.back()} />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.slider}>
              <RangeSlider />
            </div>
            <div className={style.subtitle}>Доставка</div>
            <Methods />
            <div className={style.method + ' ' + style.flex_start}>
              <div className={style.method__title}>адрес доставки</div>
              <div className={style.box}>
                <div className={style.address}>г. Грозный, пр Мухаммеда Али, д 2</div>
                <button className={style.btn} onClick={() => dispatch(setIsAddressOpen(true))}>
                  изменить адрес
                </button>
              </div>
            </div>
            <div className={style.button}>
              продолжить
              <div>
                <img src={whiteArrow.src} alt="" />
              </div>
            </div>
          </div>
          <div className={style.right}>
            <Link href={'/authorization'}>
              <div className={style.message + ' ' + style.pc}>
                <div className={style.message__text}>
                  Зарегистрируйтесь/войдите, чтобы получать кэшбек со своих покупок
                </div>
                <div>
                  <img src={arrowViolet.src} alt="" />
                </div>
              </div>
            </Link>

            <BasketRight basket={basket} />
            <div className={style.message__text + ' ' + style.mobile}>
              Зарегистрируйтесь/войдите, чтобы получать кэшбек со своих покупок и применять
              сертификат.
            </div>
            <div className={style.promocode__wrap + ' ' + style.promocode__first}>
              <input type="text" className={style.promocode} placeholder="Промокод" />
              <img src={plusSvg.src} alt="" />
            </div>
            <div className={style.promocode__wrap}>
              <input type="text" className={style.promocode} placeholder="Подарочный сертификат" />
              <img src={plusSvg.src} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlacingPage;
