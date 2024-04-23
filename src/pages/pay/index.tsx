import { NextPage } from 'next';
import RecipientPage from '@/components/screens/recipient/RecipientPage';
import { IOrder } from '@/interfaces/order.interface';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';
import Layout from '@/components/layout/Layout';

import arrowLeft from './../../../public/arrow.svg';
import close from './../../../public/close.svg';
import whiteArrow from './../../../public/whiteArrow.svg';
import plusSvg from './../../../public/plusSimple.svg';
import arrowViolet from './../../../public/arrowViolet.svg';

import style from './pay.module.sass';
import RangeSlider from '@/components/screens/placing/rangeSlider/rangeSlider';
import Input from '@/components/other/input/input';
import Link from 'next/link';
import BasketRight from '@/components/screens/placing/basketRight/basketRight';
import { setLink } from '@/redux/orderSlice/orderSlice';
import { getBasketService } from '@/services/order.service';

interface IUser {
  name: string;
  lastName: string;
  secondName: string;
  phone: string;
  email: string;
}
interface IType {
  address: {
    type: string;
  };
}
const Pay: NextPage = ({}) => {
  const [isAuth, setIsAuth] = useState<any>();
  const [basket, setBasket] = useState<IOrder | null>(null);
  const [pay, setPay] = useState(3);
  const dispatch = useDispatch();
  const router = useRouter();
  const type = useSelector((state: IType) => state.address.type);
  const order = useSelector((state: any) => state.order.order);

  useEffect(() => {
    getBasketService.getBasket().then((res) => setBasket(res));
    setIsAuth(localStorage.getItem('token'));
  }, []);

  const sendData = () => {
    fetch(API_URL + 'v1/sale.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'createOrder',
        saleUserId: localStorage.getItem('saleUserId'),
        ...order,
        deliveryID:
          type === 'courier' ? '65' : type === 'point' ? '76' : type === 'pickup' ? '1' : null,
        codeDelivery:
          type === 'courier' ? 3 : type === 'point' ? 2 : type === 'pickup' ? null : null,
        payID: pay,
        points: null,
        certificate: null,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.status === 'ok') {
          console.log(res);
          router.push(res.link);
        } else {
          console.log(res);
        }
      });
  };

  return (
    <Layout title="Оформление заказа" nav={false}>
      <div className="wrap">
        <div className={style.nav}>
          <div className={style.arrowLeft}>
            <img src={arrowLeft.src} alt="" onClick={() => router.back()} />
          </div>
          <div className={style.title}>Оплата</div>
          <div className={style.close}>
            <img src={close.src} alt="" onClick={() => router.back()} />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.slider}>
              <RangeSlider range={3} />
            </div>
            <div className={style.method + ' ' + style.flex_start}>
              <div className={style.method__title}>Способ оплаты: </div>
              <div className={style.box}>
                <label className={style.label}>
                  <input
                    type="radio"
                    name="pay"
                    value={3}
                    defaultChecked={pay === 3 ? true : false}
                    onChange={() => setPay(3)}
                    className={style.radio}
                  />
                  <span>Оплата при получении</span>
                </label>
                <label className={style.label}>
                  <input
                    type="radio"
                    name="pay"
                    value={4}
                    defaultChecked={pay === 4 ? true : false}
                    onChange={() => setPay(4)}
                    className={style.radio}
                  />
                  <span>Оплата на сайте</span>
                </label>
              </div>
            </div>

            <div className={style.button} onClick={sendData}>
              оплатить
              <div>
                <img src={whiteArrow.src} alt="" />
              </div>
            </div>
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

export default Pay;
