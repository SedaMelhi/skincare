import { GetServerSideProps, NextPage } from 'next';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useState, useEffect } from 'react';
import { getTokenService } from '@/services/auth.service';
import { useRouter } from 'next/router';

import Link from 'next/link';
import InputMask from 'react-input-mask';

import eyeSvg1 from './../../../public/eye.svg';
import eyeSvg2 from './../../../public/eyeClose.svg';

import Layout from '@/components/layout/Layout';
import style from './authorization.module.sass';
import { saleUserIdService } from '@/services/noauth.service';

const SignIn: NextPage<any> = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    setPhoneNumber(input);

    const phone = parsePhoneNumberFromString(input, 'RU'); // Укажите здесь нужный регион
    if (!phone || !phone.isValid()) {
      setPhoneError('Введите действительный номер телефона.');
    } else {
      setPhoneError('');
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getTokenService.getToken(phoneNumber, password);
    localStorage.setItem('token', token);
    const data = await saleUserIdService.getSaleUserId(true);
    localStorage.setItem('saleUserId', data.result);

    if (token.status) {
      setError(token.status.replace(/<br>/g, ' '));
    } else if (token) {
      setError('');
      localStorage.setItem('token', token);
      router.push('/profile');
    }
  };
  return (
    <Layout title="Войти в аккаунт">
      <section className={style.login_page}>
        <h1 className={style.title}>войти</h1>
        <form action="" onSubmit={sendData} className={style.form}>
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar={null}
            className={style.input_field + ' ' + (phoneError ? style.error_border : '')}
            type="tel"
            placeholder="Номер телефона *"
            required
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          {phoneError && <div className={style.error_message}>{phoneError}</div>}
          <div className={style.password}>
            <input
              className={style.input_field}
              type={passwordShown ? 'text' : 'password'}
              placeholder="Придумайте пароль *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordShown ? (
              <img src={eyeSvg1.src} alt="" onClick={togglePasswordVisibility} />
            ) : (
              <img src={eyeSvg2.src} alt="" onClick={togglePasswordVisibility} />
            )}
          </div>
          {error && <div className={style.error_message}>{error}</div>}
          <button className={style.btn + ' ' + style.btn_bg_white + ' ' + style.btn_margin}>
            войти
          </button>
        </form>
        <div>
          <p className={style.login_page__links}>
            <Link href="/authorization/passwordrecovery" className={style.link_btn}>
              Забыли пароль?
            </Link>
            <span>
              У вас нет аккаунта?
              <Link href="/authorization/registration" className={style.link_btn}>
                Создать
              </Link>
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;
