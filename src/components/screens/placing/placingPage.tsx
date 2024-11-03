import { IOrder } from "@/interfaces/order.interface";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBasketService, getCertificate } from "@/services/order.service";
import { useSelector } from "react-redux";
import Link from "next/link";

import Layout from "@/components/layout/Layout";
import BasketRight from "./basketRight/basketRight";
import RangeSlider from "./rangeSlider/rangeSlider";
import StepOne from "./stepOne/stepOne";
import StepTwo from "./stepTwo/stepTwo";
import StepThree from "./stepThree";

import arrowLeft from "./../../../../public/arrow.svg";
import close from "./../../../../public/close.svg";

import arrowViolet from "./../../../../public/arrowViolet.svg";

import style from "./placing.module.sass";
import { API_URL } from "@/services";
import CreateDiscountBlock from "@/components/other/createDiscountBlock";

const PlacingPage: FC = () => {
  const router = useRouter();
  const address = useSelector((state: any) => state.address.isAddressOpen);
  const [basket, setBasket] = useState<IOrder>();
  const [isAuth, setIsAuth] = useState<any>();

  useEffect(() => {
    const basket = getBasketService.getBasket(
      localStorage.getItem("saleUserId")
    );
    basket.then((res: IOrder) => setBasket(res));
  }, [address]);

  useEffect(() => {
    setIsAuth(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (isAuth)
      fetch(API_URL + "v1/sale.php", {
        method: "POST",
        body: JSON.stringify({
          type: "getOrderParams",
          saleUserId: localStorage.getItem("saleUserId"),
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.user && res.user.address) {
            console.log(res.user.address["3"]);
          } else {
            console.log("User or address data is missing");
          }
        });
  }, [isAuth]);

  return (
    <Layout title="Оформление заказа" nav={false}>
      <div className="wrap">
        <div className={style.nav}>
          <div className={style.arrowLeft}>
            <img src={arrowLeft.src} alt="" onClick={() => router.back()} />
          </div>
          <div className={style.title}>Оформление заказа</div>
          <div className={style.close}>
            <img src={close.src} alt="" onClick={() => router.back()} />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.slider}>
              <RangeSlider
                range={
                  router.query.step === "one" || router.query.step === undefined
                    ? 1
                    : router.query.step === "two"
                    ? 2
                    : 3
                }
              />
            </div>
            {router.query.step === "one" || router.query.step === undefined ? (
              <StepOne />
            ) : router.query.step === "two" ? (
              <StepTwo />
            ) : router.query.step === "three" ? (
              <StepThree />
            ) : (
              ""
            )}
          </div>
          <div className={style.right}>
            {!isAuth && (
              <Link href={"/authorization"}>
                <div className={style.message + " " + style.pc}>
                  <div className={style.message__text}>
                    Зарегистрируйтесь/войдите, чтобы получать кэшбек со своих
                    покупок
                  </div>
                  <div>
                    <img src={arrowViolet.src} alt="" />
                  </div>
                </div>
              </Link>
            )}

            {basket && <BasketRight basket={basket} />}
            {!isAuth && (
              <div className={style.message__text + " " + style.mobile}>
                Зарегистрируйтесь/войдите, чтобы получать кэшбек со своих
                покупок и применять сертификат.
              </div>
            )}

            <CreateDiscountBlock isAuth={isAuth} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlacingPage;
