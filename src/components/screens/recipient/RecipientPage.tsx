import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RangeSlider from '../placing/rangeSlider/rangeSlider';
import Link from 'next/link';
import InputMask from 'react-input-mask';
import BasketRight from '../placing/basketRight/basketRight';
import { getBasketService } from '@/services/order.service';
import { IOrder } from '@/interfaces/order.interface';
import Input from '@/components/other/input/input';
import Layout from '@/components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@/services';
import { setLink, setOrder } from '@/redux/orderSlice/orderSlice';
import arrowLeft from './../../../../public/arrow.svg';
import close from './../../../../public/close.svg';
import whiteArrow from './../../../../public/whiteArrow.svg';
import plusSvg from './../../../../public/plusSimple.svg';
import arrowViolet from './../../../../public/arrowViolet.svg';

import style from './recipient.module.sass';

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

const RecipientPage: FC = ({}) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<any>();
  const type = useSelector((state: IType) => state.address.type);
  const [pay, setPay] = useState(3);
  const [error, setError] = useState(false);
  const [basket, setBasket] = useState<IOrder | null>(null);
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUser>({
    name: '',
    lastName: '',
    secondName: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    getBasketService.getBasket().then((res) => setBasket(res));
    setIsAuth(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    fetch(API_URL + 'v1/sale.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'getOrderParams',
        saleUserId: localStorage.getItem('saleUserId'),
        token: localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [user]);
  const sendData = () => {
    if (user.name && user.lastName && user.phone && user.secondName && user.email) {
      setError(false);
      dispatch(
        setOrder({
          phone: user.phone,
          name: user.name,
          surname: user.lastName,
          secondName: user.secondName,
          email: user.email,
        }),
      );
      router.push('/pay');
    } else {
      setError(true);
    }
  };

  return (
    <Layout title="Оформление заказа" nav={false}>
      <div className="wrap">
        <div className={style.nav}>
          <div className={style.arrowLeft}>
            <img src={arrowLeft.src} alt="" onClick={() => router.back()} />
          </div>
          <div className={style.title}>Получатель</div>
          <div className={style.close}>
            <img src={close.src} alt="" onClick={() => router.back()} />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.slider}>
              <RangeSlider range={2} />
            </div>

            <div className={style.method + ' ' + style.flex_start}>
              <div className={style.method__title}>ваши данные</div>
              <div className={style.box}>
                <div className={style.input}>
                  <Input
                    placeholder="Имя"
                    value={user.name}
                    type="text"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    isNecessary={true}
                  />
                </div>
                <div className={style.input}>
                  <Input
                    placeholder="Фамилия"
                    value={user.lastName}
                    type="text"
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    isNecessary={true}
                  />
                </div>
                <div className={style.input}>
                  <Input
                    placeholder="Отчество"
                    value={user.secondName}
                    type="text"
                    onChange={(e) => setUser({ ...user, secondName: e.target.value })}
                    isNecessary={true}
                  />
                  <div className={style.text} style={error ? { color: 'var(--error-500)' } : {}}>
                    Обязательно для отправки почтой
                  </div>
                </div>
              </div>
            </div>
            <div className={style.method + ' ' + style.flex_start}>
              <div className={style.method__title}>контакты</div>
              <div className={style.box}>
                <div className={style.input}>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    maskChar={null}
                    className={style.input_field}
                    type="tel"
                    placeholder="+7 (___) ___-__-__ *"
                    required
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  />
                </div>
                <div className={style.input}>
                  <Input
                    placeholder="Email"
                    value={user.email}
                    type="text"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    isNecessary={true}
                  />
                  <div className={style.text} style={error ? { color: 'var(--error-500)' } : {}}>
                    Необходимо для отправки чека
                  </div>
                </div>
              </div>
            </div>

            <div className={style.button} onClick={sendData}>
              продолжить
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

export default RecipientPage;
