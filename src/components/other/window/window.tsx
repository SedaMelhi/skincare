import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

import Button from "../button/button";

import circleSvg from "./../../../../public/circleDots.svg";
import circleCheckSvg from "./../../../../public/circleCheck.svg";

import style from "./Window.module.sass";
import { addSCUToCartService, getCartService } from "@/services/cart.service";
import { useDispatch } from "react-redux";
import {
  setIsAddNewItem,
  setReduxBasketArr,
} from "@/redux/basketSlice/basketSlice";
import { IProductOrder } from "@/interfaces/profile.interface";
import { useRouter } from "next/router";

interface WindowProps {
  title: string;
  price: number;
  status?: "waiting" | "paid" | "delivered";
  date?: string;
  products: IProductOrder[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Window: FC<PropsWithChildren<WindowProps>> = ({
  children,
  title,
  price,
  status,
  date,
  products,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const addProductInCart = async (id: number) => {
    if (localStorage.getItem("saleUserId")) {
      await addSCUToCartService.addSCUToCart(id, 1);
    }
  };

  const updateBasket = () => {
    const dataArr = getCartService.getCart();

    dataArr.then((res) => {
      dispatch(setReduxBasketArr(Object.values(res.cartItems)));
      dispatch(setIsAddNewItem(true));
    });
  };

  const repeatOrder = async () => {
    // Создаём массив промисов для каждого продукта
    const addProductPromises = products.map((product) =>
      addProductInCart(product.id)
    );

    // Ждём, пока все промисы будут выполнены
    await Promise.all(addProductPromises);

    // Вызываем обновление корзины
    updateBasket();
    router.push("/placing");
  };

  return (
    <section className={style.window}>
      <div className={style.top} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={style.start}>
          <div className={style.title}>{title}</div>
          {date && <div className={style.date}>Доставлено {date}</div>}
        </div>
        <div className={style.end + " " + (date && style.center)}>
          <div className={style.price}>{price} ₽</div>
          {status ? (
            <div className={style.status}>
              {status === "waiting" ? (
                <div className={style.status}>
                  <div className={style.status__text}>Ждет оплаты</div>{" "}
                  <img src={circleSvg.src} alt="..." />
                </div>
              ) : status === "delivered" ? (
                <div className={style.status}>
                  <div className={style.status__text}>Доставлен</div>
                  <img src={circleCheckSvg.src} alt="ok" />
                </div>
              ) : (
                <div className={style.status}>
                  <div className={style.status__text}>Оплачен</div>
                  <img src={circleCheckSvg.src} alt="ok" />
                </div>
              )}
            </div>
          ) : (
            <div className={style.btn}>
              <Button onClick={repeatOrder} text="повторить заказ" />
            </div>
          )}
        </div>
      </div>
      <div className={style.content}>{children}</div>
      {!status ? (
        <div className={style.btn__wrap}>
          <div className={style.btn_mobile}>
            <Button onClick={repeatOrder} text="повторить заказ" />
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Window;
