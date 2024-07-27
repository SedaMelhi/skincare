import { FC } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setIsNotifications } from "@/redux/basketSlice/basketSlice";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@/components/other/button/button";

import starSvg from "@/../public/violetStar.svg";
import arrowSvg from "@/../public/arrowDown.svg";

import style from "./notification.module.sass";
import { ExpirationPointsNotification } from "../types";
import image1 from "./../../../../../public/notification/1.png";

interface NotificationProps {
  notification: ExpirationPointsNotification;
}

const ExpirationPoints: FC<NotificationProps> = ({ notification }) => {
  return (
    <div className={style.product}>
      <div className={style.flex}>
        <div className={style.block}>
          <div className={`${style.title} ${style.red}`}>
            Скоро баллы сгорят
          </div>
          <div className={style.flex_gap}>
            <div
              className={style.image}
              style={{ backgroundImage: `url(${image1.src})` }}
            ></div>
            <div className={style.text}>
              <div className={style.desc}>
                Успейте использовать баллы до истечения срока.
              </div>

              <div className={style.points}>
                <div className={style.points_flex}>
                  Баллы — <span>{notification.expirationPoints}</span>
                  <div className={style.border}>
                    <img src={starSvg.src} alt="" />
                  </div>
                </div>
                <div>Спишутся {notification.dateTime}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.date}>{notification.dateTime}</div>
      </div>
    </div>
  );
};
export default ExpirationPoints;
