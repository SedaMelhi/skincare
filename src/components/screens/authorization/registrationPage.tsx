import { FC, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import Link from "next/link";
import InputMask from "react-input-mask";

import Layout from "@/components/layout/Layout";
import { getTokenService, userRegisterService } from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import eyeSvg1 from "./../../../../public/eye.svg";
import eyeSvg2 from "./../../../../public/eyeClose.svg";

import style from "./authorization.module.sass";

const RegistrationPage: FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword2Visibility = () => {
    setPassword2Shown(!password2Shown);
  };
  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    setPhone(input);

    const phone = parsePhoneNumberFromString(input, "RU"); // Укажите здесь нужный регион
    if (!phone || !phone.isValid()) {
      setPhoneError("Введите действительный номер телефона.");
    } else {
      setPhoneError("");
    }
  };
  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const containsLetters = /[a-zA-Z]/.test(password);
    const containsDigits = /\d/.test(password);

    if (password.length < 8 || !(containsLetters && containsDigits)) {
      setError("Пароль должен быть больше 8 символов и содержать цифру.");
    } else if (!phoneError) {
      if (password === password2) {
        const data = await userRegisterService.userRegister(
          name,
          phone,
          password
        );
        if (data.status === "ok") {
          sessionStorage.setItem("id", data.id);
          router.push("/authorization/confirmed");
        } else {
          setServerErr(data.MESSAGE.replace(/<br>/g, " "));
        }

        setError("");
      } else {
        setError("Пароль не соответствует.");
      }
    }
  };
  //href="/authorization/confirmed"
  return (
    <Layout title="Регистрация">
      <section className={style.sign_up_page}>
        <h1 className={style.title}>новый AкКаунт</h1>
        {serverErr && <div className={style.error_message}>{serverErr}</div>}
        <form action="" onSubmit={sendData}>
          <input
            className={style.input_field}
            type="name"
            placeholder="Имя *"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar={null}
            className={
              style.input_field + " " + (phoneError ? style.error_border : "")
            }
            type="tel"
            placeholder="Номер телефона *"
            required
            value={phone}
            onChange={handlePhoneChange}
          />
          {phoneError && (
            <div className={style.error_message}>{phoneError}</div>
          )}
          <div className={style.password}>
            <input
              className={style.input_field}
              type={passwordShown ? "text" : "password"}
              placeholder="Придумайте пароль *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordShown ? (
              <img
                src={eyeSvg1.src}
                alt=""
                onClick={togglePasswordVisibility}
              />
            ) : (
              <img
                src={eyeSvg2.src}
                alt=""
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {error && <div className={style.error_message}>{error}</div>}
          <div className={style.password}>
            <input
              className={style.input_field}
              type={password2Shown ? "text" : "password"}
              placeholder="Подтвердите пароль *"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            {password2Shown ? (
              <img
                src={eyeSvg1.src}
                alt=""
                onClick={togglePassword2Visibility}
              />
            ) : (
              <img
                src={eyeSvg2.src}
                alt=""
                onClick={togglePassword2Visibility}
              />
            )}
          </div>
          {error && <div className={style.error_message}>{error}</div>}
          <button
            className={
              style.btn + " " + style.btn_bg_white + " " + style.btn_margin
            }
          >
            Создать аккаунт
          </button>
        </form>

        <p className={style.sign_up_page__cta}>
          У вас уже есть аккаунт?{" "}
          <Link href="/authorization/signin" className={style.link_btn}>
            Войти
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default RegistrationPage;
