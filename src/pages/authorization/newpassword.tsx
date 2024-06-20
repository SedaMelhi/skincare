import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

import image from './../../../public/images/asterisk.svg';

import style from './authorization.module.sass';
import { useState } from 'react';
import { updateUserPassService } from '@/services/auth.service';
import { useRouter } from 'next/router';

import eyeSvg1 from './../../../public/eye.svg';
import eyeSvg2 from './../../../public/eyeClose.svg';

const NewPassword: NextPage = () => {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [passError, setPassError] = useState('');
  const [rePassError, setRePassError] = useState('');

  const [serverErr, setServerErr] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword2Visibility = () => {
    setPassword2Shown(!password2Shown);
  };

  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const containsLetters = /[a-zA-Z]/.test(password);
    const containsDigits = /\d/.test(password);

    if (password.length < 8 || !(containsLetters && containsDigits)) {
      setPassError('Пароль должен быть больше 8 символов и содержать цифру.');
    } else {
      if (password === rePassword) {
        const userId = sessionStorage.getItem('id')!;
        const data = await updateUserPassService.updateUserPass(userId, password);

        if (data.status === 'ok') {
          router.push('passwordupdate');
        } else {
          setServerErr(data.MESSAGE.replace(/<br>/g, ' '));
        }

        setPassError('');
        setRePassError('');
      } else {
        setRePassError('Пароль не соответствует.');
      }
    }
  };

  return (
    <Layout title="Новый пароль">
      <section className={style.restore_password_page}>
        <h1 className={style.title}>Выберите новый пароль</h1>
        {serverErr && <div className={style.error_message}>{serverErr}</div>}
        <form action="" onSubmit={sendData}>
          <div className={style.input_field_inner}>
            <label htmlFor="" className={style.input_field__label_text}>
              Новый пароль <img src={image.src} alt="Asterisk" />
            </label>
            <input
              className={style.input_field + ' ' + style.input_field_visibility_on}
              type={passwordShown ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordShown ? (
              <img src={eyeSvg1.src} alt="" onClick={togglePasswordVisibility} />
            ) : (
              <img src={eyeSvg2.src} alt="" onClick={togglePasswordVisibility} />
            )}
            {passError && <div className={style.error_message}>{passError}</div>}
          </div>
          <div className={style.input_field_inner}>
            <label htmlFor="" className={style.input_field__label_text}>
              Подтвердите пароль <img src={image.src} alt="Asterisk" />
            </label>
            <input
              className={style.input_field + ' ' + style.input_field_visibility_off}
              type={password2Shown ? 'text' : 'password'}
              required
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            {password2Shown ? (
              <img src={eyeSvg1.src} alt="" onClick={togglePassword2Visibility} />
            ) : (
              <img src={eyeSvg2.src} alt="" onClick={togglePassword2Visibility} />
            )}
            {rePassError && <div className={style.error_message}>{passError}</div>}
          </div>
          <button className={style.btn + ' ' + style.btn_margin}>Поменять</button>
        </form>
      </section>
    </Layout>
  );
};

export default NewPassword;
