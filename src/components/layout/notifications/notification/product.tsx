import { FC } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/other/button/button";

import style from "./notification.module.sass";
import { ProductNotification } from "../types";
import { addSCUToCartService, getCartService } from "@/services/cart.service";
import {
  setIsAddNewItem,
  setIsNotifications,
  setReduxBasketArr,
} from "@/redux/basketSlice/basketSlice";
import { useRouter } from "next/router";

interface NotificationProps {
  notification: ProductNotification;
}

const Product: FC<NotificationProps> = ({ notification }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const addProductInCart = async () => {
    router.push(`/product/${notification.id}`);
    dispatch(setIsNotifications(false));
    // if (localStorage.getItem("saleUserId")) {
    //   const data = await addSCUToCartService.addSCUToCart(
    //     Number(notification.id),
    //     1
    //   );
    //   console.log(data);
    //   if (data.status === "ok") {
    //     const dataArr = getCartService.getCart();
    //     dataArr.then((res) => {
    //       console.log(res);
    //       dispatch(setReduxBasketArr(Object.values(res.cartItems)));
    //       dispatch(setIsAddNewItem(true));
    //     });
    //   }
    // }
  };
  return (
    <div className={style.product}>
      <div className={style.flex}>
        <div className={style.block}>
          <div className={`${style.title} ${style.violet}`}>
            ТОВАРЫ ИЗ ЛИСТА ОЖИДАНИЯ В НАЛИЧИИ
          </div>
          <div className={style.flex_gap}>
            <div
              className={`${style.image} ${style.image_big}`}
              style={{
                backgroundImage: `url(https://b.skincareagents.com${notification.picture})`,
              }}
            ></div>
            <div className={style.text}>
              <div className={style.desc}>{notification.name}</div>

              <div className={style.price}>{notification.price}</div>
              <div className={style.btn}>
                <Button
                  text="Перейти к товару"
                  height="44px"
                  fontSize="14px"
                  onClick={addProductInCart}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={style.date}>{notification.dateTime}</div>
      </div>
    </div>
  );
};
export default Product;
