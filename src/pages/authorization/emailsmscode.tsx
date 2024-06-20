import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

import style from './authorization.module.sass';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { recoveryUserPassService, userCheckCodeService } from '@/services/auth.service';
import CountdownTimer from '@/components/other/countdownTimer/countdownTimer';

const EmailSmsCode: NextPage = () => {
  const [emailCode, setEmailCode] = useState('');
  const [error, setError] = useState('');
  const [endTimer, setEndTimer] = useState(false);
  const [isRestart, setIsRestart] = useState(0);
  const router = useRouter();

  const changeTimerEnd = () => {
    setEndTimer(true);
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('id')!;
    const data = await userCheckCodeService.userCheckCode(userId, emailCode);
    if (data.status === 'ok') {
      router.push('newpassword');
    } else {
      setError('Код неверный.');
    }
  };

  const sendCodeAgain = async () => {
    console.log('again');
    setEndTimer(false);
    const email = router.query.email as string;
    await recoveryUserPassService.recoveryUserPassEmail(email);
    setIsRestart((prev) => prev + 1);
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
          Проверьте ваши письма и введите код. Проверьте папку "Спам", если письмо не найдено:
        </p>
        <form action="" onSubmit={sendData}>
          <input
            className={style.input_field}
            type="password"
            placeholder="Код *"
            required
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
          />
          {error && <div className={style.error_message}>{error}</div>}
          <button className={style.btn + ' ' + style.btn_margin}>подтвердить</button>
        </form>
        <p className={style.cta + ' ' + style.cta_margin}>
          Не получили SMS?{' '}
          <Link href="email" className={style.link_btn}>
            Поменять адрес электронной почты
          </Link>{' '}
          или{' '}
          <button className={style.link_btn} disabled={!endTimer} onClick={sendCodeAgain}>
            Отправить повторно
          </button>{' '}
          {!endTimer && (
            <>
              (через :{' '}
              <CountdownTimer
                changeEndState={changeTimerEnd}
                initialMinutes={0}
                initialSeconds={10}
                isRestart={isRestart}
              />{' '}
              секунд)
            </>
          )}
        </p>
      </section>
    </Layout>
  );
};

export default EmailSmsCode;
