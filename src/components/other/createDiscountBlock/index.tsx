import React, { FC, useState } from "react";
import style from "./createDiscountBlock.module.sass";
import plusSvg from "./../../../../public/plusSimple.svg";
import { getCertificate } from "@/services/order.service";

interface CreateDiscountBlockProps {
  isAuth: boolean;
}

const CreateDiscountBlock: FC<CreateDiscountBlockProps> = ({ isAuth }) => {
  const [certificate, setCertificate] = useState<any>();

  const sendCertificate = async () => {
    await getCertificate.createDiscount(certificate);
  };
  return (
    <div>
      <div className={style.promocode__wrap + " " + style.promocode__first}>
        <input type="text" className={style.promocode} placeholder="Промокод" />
        <img src={plusSvg.src} alt="" />
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
