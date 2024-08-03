import { FC } from "react";

import Button from "@/components/other/button/button";

import style from "./certificateCard.module.sass";
import { CertificateType } from "../pointsPage";

interface CertificateCardProps {
  certificate: CertificateType;
}

const CertificateCard: FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div>
      <div
        style={{
          background:
            `url(https://b.skincareagents.com${certificate.picture}) lightgray center/cover no-repeat`,
        }}
        className={style.card}
      ></div>
      <div className={style.flex}>
        <div className={style.price}>{certificate.price}</div>
        <div className={style.btn}>
          <Button text="Добавить к покупкам" fontSize="14px" height="44px" />
        </div>
      </div>
      <div className={style.date}>Действует до {certificate.date}</div>
    </div>
  );
};

export default CertificateCard;
