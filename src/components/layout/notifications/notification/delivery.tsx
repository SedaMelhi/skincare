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
import { DeliveryNotification } from "../types";
import image from "./../../../../../public/about/1.png";

interface NotificationProps {
  notification: DeliveryNotification;
}

const Delivery: FC<NotificationProps> = ({ notification }) => {
  return (
    <div className={style.product}>
      <div className={style.flex}>
        <div className={style.block}>
          <div
            className={style.title + " " + style.green}
          >{`ЗАКАЗ #${notification.id} ДОСТАВЛЕН`}</div>
          <div className={style.flex_gap}>
            <div
              className={`${style.image} ${style.image_big}`}
              style={{ backgroundImage: `url(${image.src})` }}
            ></div>
            <div className={style.text}>
              <div className={`${style.desc} ${style.upper}`}>
                <div className={style.upper}>{notification.delivery}</div>
              </div>
              <div className={style.accordion}>
                <Accordion
                  sx={{
                    "& .Mui-expanded": {
                      minHeight: "auto",
                      margin: "0",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <img src={arrowSvg.src} alt="" className={style.arrow} />
                    }
                    sx={{
                      padding: "0",
                      justifyContent: "start",
                      minHeight: "auto",
                      "& .Mui-expanded": {
                        margin: "0",
                      },
                      "& .MuiAccordionSummary-content": {
                        flexGrow: "0",
                        margin: "0",
                      },
                      "& .Mui-expanded img": {
                        transform: "translate(-4px, 5px)",
                      },
                    }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div className={style.work}>
                      <div>Режим работы</div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: "0",
                    }}
                  >
                    <div className={style.timetable}>
                      <table>
                        <tbody>
                          <tr>
                            <td className={style.box + " " + style.day}>пн</td>
                            <td className={style.box}>09:00-18:00</td>
                          </tr>
                          <tr>
                            <td className={style.box + " " + style.day}>вт</td>
                            <td className={style.box}>09:00-18:00</td>
                          </tr>
                          <tr>
                            <td className={style.box + " " + style.day}>ср</td>
                            <td className={style.box}>09:00-18:00</td>
                          </tr>
                          <tr>
                            <td className={style.box + " " + style.day}>чт</td>
                            <td className={style.box}>09:00-18:00</td>
                          </tr>
                          <tr>
                            <td className={style.box + " " + style.day}>пт</td>
                            <td className={style.box}>09:00-18:00</td>
                          </tr>
                          <tr>
                            <td className={style.box + " " + style.day}>сб</td>
                            <td className={style.box}>09:00-18:00</td>
                          </tr>
                          <tr>
                            <td className={style.box + " " + style.day}>вс</td>
                            <td className={style.box}>выходной</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        <div className={style.date}>{notification.dateTime}</div>
      </div>
    </div>
  );
};
export default Delivery;
