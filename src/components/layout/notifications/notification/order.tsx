import { FC } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import arrowSvg from "@/../public/arrowDown.svg";
import style from "./notification.module.sass";
import { OrderNotification } from "../types";
import image from "./../../../../../public/about/1.png";

interface OrderProps {
  notification: OrderNotification;
}

const Order: FC<OrderProps> = ({ notification }) => {
  return (
    <div className={style.product}>
      <div className={style.flex}>
        <div className={style.block}>
          <div
            className={style.title + " " + style.black}
          >{`ЗАКАЗ #${notification.id} УСПЕШНО ОФОРМЛЕН`}</div>
          <div className={style.flex_gap}>
            <div
              className={`${style.image} ${style.image_big}`}
              style={{ backgroundImage: `url(${image.src})` }}
            ></div>
            <div className={style.text}>
              <div className={`${style.desc} ${style.violet} ${style.upper}`}>
                {notification.dateDelivery}
              </div>
              <div className={style.processed}>
                <Accordion
                  sx={{
                    border: "none",
                    background: "transparent",
                    borderRadius: " 0",
                    boxShadow: "none",

                    "&:before": {
                      display: "none",
                    },
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
                      <div>адрес пункта выдачи </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: "0",
                    }}
                  >
                    <div className={style.timetable}>
                      {notification.address}
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
export default Order;
