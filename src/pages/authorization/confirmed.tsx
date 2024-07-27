import { NextPage } from "next";
import Link from "next/link";

import Layout from "@/components/layout/Layout";

import image from "./../../../public/images/swatch-2.png";

import style from "./authorization.module.sass";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  recoveryUserPassService,
  userCheckCodeService,
} from "@/services/auth.service";
import CountdownTimer from "@/components/other/countdownTimer/countdownTimer";

const Confirmed: NextPage = () => {
  const [phoneCode, setPhoneCode] = useState("");
  const [error, setError] = useState("");
  const [endTimer, setEndTimer] = useState(false);
  const [isRestart, setIsRestart] = useState(0);
  const router = useRouter();

  const changeTimerEnd = () => {
    setEndTimer(true);
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("id")!;
    const data = await userCheckCodeService.userCheckCode(userId, phoneCode);
    if (data.status === "ok") {
      router.push("numberconfirmed");
    } else {
      setError("Код неверный.");
    }
  };

  const sendCodeAgain = async () => {
    console.log("again");
    setEndTimer(false);
    const phone = router.query.phone as string;
    console.log(phone);
    await recoveryUserPassService.recoveryUserPassPhone(phone);
    setIsRestart((prev) => prev + 1);
  };

  return (
    <Layout title="Забыли пароль">
      <section className={style.confirmation_page}>
        <div className={style.confirmation_page__swatch}>
          <img src={image.src} alt="Swatch" />
        </div>
        <div className={style.wrapper}>
          <h1 className={style.title}>новый Aккаунт</h1>
          <p className={style.subtitle}>
            Мы отправили вам код для подтверждения номера телефона через SMS.
          </p>
          <form action="" onSubmit={sendData}>
            <input
              className={style.input_field}
              type="password"
              placeholder="Код *"
              maxLength={6}
              required
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
            />
            {error && <div className={style.error_message}>{error}</div>}
            <button className={style.btn}>Подтвердить</button>
          </form>
          <p className={style.cta}>
            Не получили SMS?{" "}
            <Link href="registration">Поменять номер телефона</Link> или{" "}
            <button
              className={style.link_btn}
              disabled={!endTimer}
              onClick={sendCodeAgain}
            >
              Отправить повторно
            </button>{" "}
            {!endTimer && (
              <>
                (через :{" "}
                <CountdownTimer
                  changeEndState={changeTimerEnd}
                  initialMinutes={0}
                  initialSeconds={10}
                  isRestart={isRestart}
                />{" "}
                секунд)
              </>
            )}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Confirmed;
