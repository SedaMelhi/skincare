import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

import style from './authorization.module.sass';
import { useState } from 'react';
import { recoveryUserPassService } from '@/services/auth.service';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';

const Phone: NextPage = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    setPhone(input);
  };

  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await recoveryUserPassService.recoveryUserPassPhone(phone);

    console.log(data);
    if (data.status === 'ok') {
      router.push(`smscode?phone=${phone}`);
    } else {
      setError('Телефон не привязан к аккауннту.');
    }
  };

  return (
    <Layout title="Забыли пароль">
      <section className={style.restore_password_page}>
        <h1 className={style.title2}>Восстановить пароль</h1>
        <div className={style.btns2}>
          <Link href="email " className={style.btn2}>
            Через электронную почту
          </Link>
          <Link href="phone" className={style.btn2 + ' ' + style.btn2_active}>
            Через номер телефона
          </Link>
        </div>
        <p className={style.subtitle + ' ' + style.subtitle_margin}>
          Мы отправим вам код для восстановления пароля через SMS.
        </p>
        <form action="" onSubmit={sendData}>
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar={null}
            className={style.input_field + ' ' + (error ? style.error_border : '')}
            type="tel"
            placeholder="Номер телефона *"
            required
            value={phone}
            onChange={handlePhoneChange}
          />
          {error && <div className={style.error_message}>{error}</div>}
          <button className={style.btn + ' ' + style.btn_margin}>Отправить</button>
        </form>
      </section>
    </Layout>
  );
};

export default Phone;
