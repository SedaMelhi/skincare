import React, { FC, useState } from "react";
import style from "./createDiscountBlock.module.sass";
import plusSvg from "./../../../../public/plusSimple.svg";
import plusFillSvg from "./../../../../public/plusCircle.svg";
import { getCertificate, getPromoCode } from "@/services/order.service";
import { useDispatch } from "react-redux";
import { setCoupon, setPricing } from "@/redux/orderSlice/orderSlice";

interface CreateDiscountBlockProps {
  isAuth: boolean;
}

const CreateDiscountBlock: FC<CreateDiscountBlockProps> = ({ isAuth }) => {
  const [certificate, setCertificate] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error message

  const dispatch = useDispatch()

  const sendCertificate = async () => {
    await getCertificate.createDiscount(certificate);
  };

  const sendPromoCode = async () => {
    const response = await getPromoCode.createDiscount(promoCode);
    if (response.status === null) {
      setErrorMessage(response.msg);
    } else {
      dispatch(setPricing({ price: response.price, discount: response.discount }));
      dispatch(setCoupon(promoCode))
      setErrorMessage(null);
      setPromoCode('')
    }
  };

  return (
    <div>
      <div className={style.promocode__wrap + " " + style.promocode__first}>
        <input value={promoCode} onChange={e => setPromoCode(e.target.value)} type="text" className={style.promocode} placeholder="Промокод" />
        <img onClick={sendPromoCode} src={promoCode ? plusFillSvg.src : plusSvg.src} alt="" />
      </div>
      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}

      {isAuth && (
        <div className={style.promocode__wrap}>
          <input
            type="text"
            className={style.promocode}
            placeholder="Подарочный сертификат"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
          />
          <img onClick={sendCertificate} src={certificate ? plusFillSvg.src : plusSvg.src} alt="" />
        </div>
      )}
    </div>
  );
};

export default CreateDiscountBlock;
