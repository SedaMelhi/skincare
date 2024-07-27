import { FC } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setIsNotifications } from "@/redux/basketSlice/basketSlice";
import arrowSvg from "@/../public/arrowDown.svg";
import style from "./notification.module.sass";
import { AddPointsNotification } from "../types";
import image1 from "./../../../../../public/notification/1.png";

interface NotificationProps {
  notification: AddPointsNotification;
}

const AddPoints: FC<NotificationProps> = ({ notification }) => {
  const dispatch = useDispatch();

  return (
    <div className={style.product}>
      <div className={style.flex}>
        <div className={style.block}>
          <div
            className={`${style.title} ${style.violet}`}
          >{`Вам начислено ${notification.addPoints} бонусов`}</div>
          <div className={style.flex_gap}>
            <div
              className={style.image}
              style={{ backgroundImage: `url(${image1.src})` }}
            ></div>
            <div className={style.text}>
              <div className={style.desc}>
                Используйте бонусы от покупки в течение 3-х месяцев.
              </div>
              <div
                onClick={() => dispatch(setIsNotifications(false))}
                className={style.link}
              >
                <Link href={"/profile/points"}>мои баллы</Link>
                <img src={arrowSvg.src} alt="" className={style.arrow} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.date}>{notification.dateTime}</div>
      </div>
    </div>
  );
};
export default AddPoints;
