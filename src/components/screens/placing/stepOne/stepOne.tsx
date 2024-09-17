"use client";

import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IAddressState,
  setAddress,
  setIsAddressOpen,
} from "@/redux/addressSlice/addressSlice";
import Methods from "../methods/methods";
import Link from "next/link";
import { getBasketService } from "@/services/order.service";
import { API_URL } from "@/services";
import { getUserAddressService } from "@/services/profile.service";
import { useRouter } from "next/router";

import whiteArrow from "./../../../../../public/whiteArrow.svg";

import style from "./../placing.module.sass";

const StepOne: FC = () => {
  const dispatch = useDispatch();
  const [savedAddress, setSaveAddress] = useState<any>();
  const [token, setToken] = useState<null | string>();
  const router = useRouter();
  const isAddressOpen = useSelector(
    (state: any) => state.address.isAddressOpen
  );

  const address = useSelector(
    (state: { address: IAddressState }) => state.address.address
  );

  const deliveryType = useSelector(
    (state: { address: IAddressState }) => state.address.type
  );

  const getAddress = async () => {
    const res = await getUserAddressService.getAddress();
    if (res["3"]) {
      setSaveAddress(res["3"][res["3"].length - 1]);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const addressFromLocalStorage = localStorage.getItem("address");
    if (!localStorage.getItem("token") && addressFromLocalStorage) {
      dispatch(setAddress(JSON.parse(addressFromLocalStorage)));
    }
  }, []);

  useEffect(() => {
    getAddress();
  }, [isAddressOpen]);

  useEffect(() => {
    console.log(1);
  }, [router]);

  const changeAddress = () => {
    if (address.full_address) {
      router.push(
        {
          pathname: router.pathname,
          query: { step: "two" },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    if (savedAddress && savedAddress.addressDetail) {
      dispatch(
        setAddress(savedAddress.addressDetail)
      );
    }
  }, [savedAddress]);

  return (
    <>
      <div className={style.subtitle}>Доставка</div>
      <Methods />
      <div className={style.method + " " + style.flex_start}>
        <div className={style.method__title}>адрес доставки</div>
        <div className={style.box}>
          <div className={style.address}>
            {token
              ? savedAddress && savedAddress.addressDetail.full_address
                ? address.full_address
                : "не указан"
              : address.full_address || "не указан"}
          </div>
          <button
            className={style.btn}
            onClick={() => {
              dispatch(setIsAddressOpen(true));
            }}
          >
            {deliveryType === "pickup"
              ? "посмотреть на карте"
              : "изменить адрес"}
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          if (address.full_address) changeAddress();
        }}
        title={address.full_address ? "" : "заполните адрес"}
        className={
          style.button +
          " " +
          (address.full_address ? "" : style.button_disabled)
        }
      >
        продолжить
        <div>
          <img src={whiteArrow.src} alt="" />
        </div>
      </button>
    </>
  );
};

export default StepOne;
