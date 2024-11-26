import React, { FC, useState } from "react";
import style from "./createDiscountBlock.module.sass";
import plusSvg from "./../../../../public/plusSimple.svg";
import { getCertificate, getPromoCode } from "@/services/order.service";

interface CreateDiscountBlockProps {
  isAuth: boolean;
}

const CreateDiscountBlock: FC<CreateDiscountBlockProps> = ({ isAuth }) => {
  const [certificate, setCertificate] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");


  const sendCertificate = async () => {
    await getCertificate.createDiscount(certificate);
  };

  const sendPromoCode = async () => {
    await getPromoCode.createDiscount(promoCode);
  };

  return (
    <div>
      <div className={style.promocode__wrap + " " + style.promocode__first}>
        <input value={promoCode} onChange={e => setPromoCode(e.target.value)} type="text" className={style.promocode} placeholder="Промокод" />
        <img onClick={sendPromoCode} src={plusSvg.src} alt="" />
      </div>
      {isAuth && (
        <div className={style.promocode__wrap}>
          <input
            type="text"
            className={style.promocode}
            placeholder="Подарочный сертификат"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
          />
          <img onClick={sendCertificate} src={plusSvg.src} alt="" />
        </div>
      )}
    </div>
  );
};

export default CreateDiscountBlock;
