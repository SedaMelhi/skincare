import { IOrder } from "@/interfaces/order.interface";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { API_URL } from "@/services";

import whiteArrow from "./../../../../../public/whiteArrow.svg";

import { getBasketService } from "@/services/order.service";
import style from "./pay.module.sass";

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
    selectedService: number;
  };
}
const StepThree: FC = ({}) => {
  const [isAuth, setIsAuth] = useState<any>();
  const [basket, setBasket] = useState<IOrder | null>(null);
  const [pay, setPay] = useState(3);
  const dispatch = useDispatch();
  const router = useRouter();
  const {type, selectedService} = useSelector((state: IType) => state.address);
  const order = useSelector((state: any) => state.order.order);
  const address = useSelector((state: any) => state.address.address);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    getBasketService
      .getBasket(localStorage.getItem("saleUserId"))
      .then((res) => setBasket(res));
    setIsAuth(localStorage.getItem("token"));
  }, []);

  const point = selectedService === 0 ? "75" : "76";

  const createOrder = (codeDelivery: number) => {
    let full_address = {};
    if (!localStorage.getItem("token")) {
      full_address = { address: address.full_address };
    } else {
      full_address = { codeDelivery: codeDelivery };
    }

    fetch(API_URL + "v1/sale.php", {
      method: "POST",
      body: JSON.stringify({
        type: "createOrder",
        saleUserId: localStorage.getItem("saleUserId"),
        ...order,
        deliveryID:
          type === "courier"
            ? "65"
            : type === "point"
            ? point
            : type === "pickup"
            ? "1"
            : null,
        payID: 4,
        points: null,
        certificate: null,
        deliveryPay: pay,
        token: localStorage.getItem("token"),
        ...full_address,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.status === "ok") {
          // router.push(res.link);
          console.log("РЕДИРЕКТ ЗАПРОС", res)
        }
      });
  };
  const sendData = () => {
    setButtonDisabled(true);
    fetch(API_URL + "v1/sale.php", {
      method: "POST",
      body: JSON.stringify({
        type: "getOrderParams",
        saleUserId: localStorage.getItem("saleUserId"),
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => 
        createOrder(
          localStorage.getItem("token") && res && res.user && res.user.address["3"]
            ? res.user.address["3"][res.user.address["3"].length - 1].id
            : ""
        )
      );
  };


  return (
    <div>
      <div className={style.method + " " + style.flex_start}>
        <div className={style.method__title}>Способ оплаты доставки: </div>
        <div className={style.box}>
          <label className={style.label}>
            <input
              type="radio"
              name="pay"
              value={3}
              defaultChecked={pay === 3 ? true : false}
              onChange={() => setPay(1)}
              className={style.radio}
            />
            <span>Оплата доставки при получении</span>
          </label>
          <label className={style.label}>
            <input
              type="radio"
              name="pay"
              value={4}
              defaultChecked={pay === 4 ? true : false}
              onChange={() => setPay(0)}
              className={style.radio}
            />
            <span>Оплата доставки на сайте</span>
          </label>
        </div>
      </div>

      <div className={style.checkout_bottom}>
        <p>
          Внимание! Ссылка на оплату единоразовая. При обратном переходе на
          текущую страницу корзина и ссылка на оплату обнуляются.
        </p>
        <button
          disabled={buttonDisabled}
          className={style.button}
          onClick={sendData}
        >
          оплатить
          <div>
            <img src={whiteArrow.src} alt="" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default StepThree;
