import Layout from '@/components/layout/Layout';
import { IbasketData } from '@/interfaces/basket.interface';
import { IOrder } from '@/interfaces/order.interface';
import { API_URL } from '@/services';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getBasketService, getCertificate, getOrderInfoService } from '@/services/order.service';
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

const PlacingPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.address.isAddressOpen);
  const [basket, setBasket] = useState<IOrder>();
  const savedAddress = useSelector((state: any) => state.address.address);
  const [isAuth, setIsAuth] = useState<any>();
  const [certificate, setCertificate] = useState<any>();
  const sendCertificate = async (e: any) => {
    setCertificate(e.target.value);
    const res = await getCertificate.getBasket();
  };
  useEffect(() => {
    const basket = getBasketService.getBasket(localStorage.getItem('saleUserId'));
    basket.then((res: IOrder) => setBasket(res));
    fetch(API_URL + 'v1/user.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'getAddress',
        token: localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res['3']) {
          // setSaveAddress(res['3'][res['3'].length - 1]);
        }
      });
  }, [address]);
  useEffect(() => {
    setIsAuth(localStorage.getItem('token'));
  }, []);
  const changeAddress = () => {};

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
              <RangeSlider range={1} />
            </div>
            <div className={style.subtitle}>Доставка</div>
            <Methods />
            <div className={style.method + ' ' + style.flex_start}>
              <div className={style.method__title}>адрес доставки</div>
              <div className={style.box}>
                <div className={style.address}>
                  {savedAddress.city.name && (
                    <div>Город: {savedAddress.city.name}</div>
                  )}
                  {savedAddress.street.name && (
                    <div>Улица: {savedAddress.street.name}</div>
                  )}
                  {savedAddress.apartment && (
                    <div>Квартира: {savedAddress.apartment}</div>
                  )}
                  {savedAddress.intercom && (
                    <div>Домофон: {savedAddress.intercom}</div>
                  )}
                  {savedAddress.entrance && (
                    <div>Подъезд: {savedAddress.entrance}</div>
                  )}
                  {savedAddress.floor && <div>Этаж: {savedAddress.floor}</div>}
                  {savedAddress.full_address && (
                    <div>Полный адрес: {savedAddress.full_address}</div>
                  )}
                  {!savedAddress.city.name &&
                    !savedAddress.street.name &&
                    !savedAddress.apartment &&
                    !savedAddress.intercom &&
                    !savedAddress.entrance &&
                    !savedAddress.floor &&
                    !savedAddress.full_address &&
                    "не указан"}
                </div>
                <button
                  className={style.btn}
                  onClick={() => {
                    dispatch(setIsAddressOpen(true));
                    changeAddress();
                  }}>
                  изменить адрес
                </button>
              </div>
            </div>
            <Link href={'/recipient'} className={style.button}>
              продолжить
              <div>
                <img src={whiteArrow.src} alt="" />
              </div>
            </Link>
          </div>
          <div className={style.right}>
            {!isAuth && (
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
            )}

            {basket && <BasketRight basket={basket} />}
            <div className={style.message__text + ' ' + style.mobile}>
              Зарегистрируйтесь/войдите, чтобы получать кэшбек со своих покупок и применять
              сертификат.
            </div>
            <div className={style.promocode__wrap + ' ' + style.promocode__first}>
              <input type="text" className={style.promocode} placeholder="Промокод" />
              <img src={plusSvg.src} alt="" />
            </div>
            <div className={style.promocode__wrap}>
              <input
                type="text"
                className={style.promocode}
                placeholder="Подарочный сертификат"
                value={certificate}
                onChange={sendCertificate}
              />
              <img src={plusSvg.src} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlacingPage;
