import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import { getBasketService } from "@/services/order.service";
import { IOrder } from "@/interfaces/order.interface";
import Input from "@/components/other/input/input";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@/services";
import { setOrder } from "@/redux/orderSlice/orderSlice";
import whiteArrow from "./../../../../../public/whiteArrow.svg";

import style from "./recipient.module.sass";
import Button from "@/components/other/button/button";

interface IUser {
  name: string;
  surname: string;
  secondName: string;
  phone: string;
  email: string;
}

interface IType {
  address: {
    type: string;
  };
}

const StepTwo: FC = ({}) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<any>();
  const [error, setError] = useState(false);
  const [basket, setBasket] = useState<IOrder | null>(null);
  const order = useSelector((state: any) => state.order.order);
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>({
    name: "",
    surname: "",
    secondName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const userLocal = localStorage.getItem("order");
    if (userLocal) {
      setUser(JSON.parse(userLocal));
    }
    getBasketService
      .getBasket(localStorage.getItem("saleUserId"))
      .then((res) => setBasket(res));
    setIsAuth(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    fetch(API_URL + "v1/sale.php", {
      method: "POST",
      body: JSON.stringify({
        type: "getOrderParams",
        saleUserId: localStorage.getItem("saleUserId"),
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => "");
  }, [user]);

  const sendData = () => {
    if (
      user.name &&
      user.surname &&
      user.phone &&
      user.secondName &&
      user.email
    ) {
      setError(false);
      dispatch(
        setOrder({
          phone: user.phone,
          name: user.name,
          surname: user.surname,
          secondName: user.secondName,
          email: user.email,
        })
      );
      router.push(
        {
          pathname: router.pathname,
          query: { step: "three" },
        },
        undefined,
        { shallow: true }
      );
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className={style.method + " " + style.flex_start}>
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
              value={user.surname}
              type="text"
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
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
            <div
              className={style.text}
              style={error ? { color: "var(--error-500)" } : {}}
            >
              Обязательно для отправки почтой
            </div>
          </div>
        </div>
      </div>
      <div className={style.method + " " + style.flex_start}>
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
            <div
              className={style.text}
              style={error ? { color: "var(--error-500)" } : {}}
            >
              Необходимо для отправки чека
            </div>
          </div>
        </div>
      </div>
      <div className={style.button}>
        <Button
          text="продолжить"
          arrow={true}
          onClick={sendData}
          disabled={!Object.values(user).every((item) => item)}
          title={
            Object.values(user).every((item) => item)
              ? ""
              : "заполните все поля"
          }
        ></Button>
      </div>
    </div>
  );
};

export default StepTwo;
