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
  };
}
const StepThree: FC = ({}) => {
  const [isAuth, setIsAuth] = useState<any>();
  const [basket, setBasket] = useState<IOrder | null>(null);
  const [pay, setPay] = useState(3);
  const dispatch = useDispatch();
  const router = useRouter();
  const type = useSelector((state: IType) => state.address.type);
  const order = useSelector((state: any) => state.order.order);
  const address = useSelector((state: any) => state.address.address);
  useEffect(() => {
    getBasketService
      .getBasket(localStorage.getItem("saleUserId"))
      .then((res) => setBasket(res));
    setIsAuth(localStorage.getItem("token"));
  }, []);

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
            ? "76"
            : type === "pickup"
            ? "1"
            : null,
        payID: 4,
        points: null,
        certificate: null,
        deliveryPay: 1,
        token: localStorage.getItem("token"),
        ...full_address,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.status === "ok") {
          router.push(res.link);
        }
      });
  };
  const sendData = () => {
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
          localStorage.getItem("token") && res && res.user
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
              onChange={() => setPay(3)}
              className={style.radio}
            />
            <span>Оплата при получении</span>
          </label>
          <label className={style.label}>
            <input
              type="radio"
              name="pay"
              value={4}
              defaultChecked={pay === 4 ? true : false}
              onChange={() => setPay(4)}
              className={style.radio}
            />
            <span>Оплата на сайте</span>
          </label>
        </div>
      </div>

      <div className={style.button} onClick={sendData}>
        оплатить
        <div>
          <img src={whiteArrow.src} alt="" />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
