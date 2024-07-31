import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import starSvg from "./../../../../../public/violetStar.svg";

import style from "./pointsCard.module.sass";
import BasicModal from "@/components/other/basicModal/basicModal";
import { userInfoService } from "@/services/profile.service";
import ModalContainer from "@/components/other/modal";
import PointModal from "../pointModal/pointModal";

const valueLabelFormat = (value: number) => {
  return `Ваша сумма покупок составляет  ${value} ₽`;
};

interface PointsData {
  discount: string;
  money: null | number;
  point: string;
  time: null | string;
}

const PointsCard: FC = () => {
  const [pointsData, setPointsData] = useState<PointsData>({
    discount: "",
    money: null,
    point: "0",
    time: null,
  });

  useEffect(() => {
    userInfoService.getPoints().then((res) => {
      if (res) {
        setPointsData(res);
      }
    });
  }, []);

  const marks = [
    {
      value: 0,
      label: "3%",
    },
    {
      value: 60000,
      label: "6%",
    },
    {
      value: 100000,
      label: "10%",
    },
  ];

  return (
    <div className={style.wrap}>
      <div className={style.card}>
        <div className={style.card__top}>
          <div className={style.title}>моя скидка {pointsData.discount}</div>
          <div className={style.text}>
            Баллы — <span>{pointsData.point}</span>
            <div className={style.border}>
              <img src={starSvg.src} alt="" />
            </div>
          </div>
          {Number(pointsData.point) > 0 && (
            <div className={style.text}>{pointsData.time}</div>
          )}
        </div>
        <div className={style.bottom}>
          <div className={style.slider}>
            <Box sx={{ width: "100%" }}>
              <Slider
                disableSwap
                aria-label="Restricted values"
                value={pointsData.money ? Number(pointsData.money) : 0}
                min={0}
                max={100000}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                color="secondary"
                classes={{
                  rail: style.rail, //цвет линии
                  track: style.track, //активная линия
                  thumb: style.thumb, //активная точка ползунка
                  mark: style.mark, //точки
                  markActive: style.mark_active,
                  markLabel: style.mark_label,
                  markLabelActive: style.mark_label_active,
                  valueLabel: style.label,
                }}
              />
            </Box>
          </div>
          <PointModal />
        </div>
      </div>
    </div>
  );
};

export default PointsCard;
