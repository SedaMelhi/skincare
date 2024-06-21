import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

import { useState } from 'react';
import { recoveryUserPassService } from '@/services/auth.service';
import { useRouter } from 'next/router';

import style from './authorization.module.sass';

const Email: NextPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = (event: any) => {
    const input = event.target.value;
    setEmail(input);
  };

  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await recoveryUserPassService.recoveryUserPassEmail(email);

    if (data.status === 'ok') {
      sessionStorage.setItem('id', data.id);
      router.push(`emailsmscode?email=${email}`);
    } else {
      setError('Email не привязан к аккаунту.');
    }
  };

  return (
    <Layout title="Забыли пароль">
      <section className={style.restore_password_page}>
        <h1 className={style.title2}>Восстановить пароль</h1>
        <div className={style.btns2}>
          <Link href="email" className={style.btn2 + ' ' + style.btn2_active}>
            Через электронную почту
          </Link>
          <Link href="phone" className={style.btn2}>
            Через номер телефона
          </Link>
        </div>
        <p className={style.subtitle + ' ' + style.subtitle_margin}>
          Мы отправим вам код для восстановления пароля на ваш адрес электронной почты. Проверьте
          папку "Спам", если письмо не найдено.
        </p>
        <form action="" onSubmit={sendData}>
          <input
            className={`${style.input_field} ${error ? style.error_border : ''}`}
            type="email"
            placeholder="example@email.com"
            required
            value={email}
            onChange={handleEmailChange}
          />
          {error && <div className={style.error_message}>{error}</div>}
          <button className={style.btn + ' ' + style.btn_margin}>Отправить</button>
        </form>
      </section>
    </Layout>
  );
};

export default Email;
