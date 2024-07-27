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

const PointsCard: FC = () => {
  const [pointsData, setPointsData] = useState({ points: 0 });

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
      value: 50000,
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
          <div className={style.title}>моя скидка 3%</div>
          <div className={style.text}>
            Баллы — <span>{pointsData.points}</span>
            <div className={style.border}>
              <img src={starSvg.src} alt="" />
            </div>
          </div>
          {pointsData.points > 0 && (
            <div className={style.text}>Баллы сгорят через 7 дней</div>
          )}
          <div className={style.text}>Баллы сгорят через 7 дней</div>
        </div>
        <div className={style.bottom}>
          <div className={style.slider}>
            <Box sx={{ width: "100%" }}>
              <Slider
                disabled
                aria-label="Restricted values"
                defaultValue={3}
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
          {/* <ModalContainer
            button={<div className={style.question}>Как получить баллы?</div>}
          >
            <header>
              <h1>Как получить баллы?</h1>
              <div>x</div>
            </header>
            <div>
              Узнайте о программе лояльности Skincare Agents.
              <br />
              <br />
              При регистрации каждый новый покупатель получает 3% кэшбек
              на каждый свой заказ. Это предложение действительно до тех пор,
              пока покупатель не наберёт сумму заказов в размере 60 000 рублей.
              <br />
              <br />
              Когда покупатель достигает этой суммы, его кэшбек повышается до 6%
              от стоимости каждого заказа. Такая скидка будет применяться
              на все последующие заказы до тех пор, пока общая сумма его покупок
              не достигнет отметки 100 000 рублей.
              <br />
              <br />
              Как только общая сумма заказов составит 100 000 рублей, покупатель
              получает постоянную скидку в размере 10% на каждый заказ.
              Эта скидка сохраняется независимо от последующих покупок.
              <br />
              <br />
              Кэшбеки за каждый заказ превращаются в баллы и начисляются
              покупателю. Однако следует учесть, что срок действия баллов
              составляет 3 месяца. Если покупатель не использовал баллы
              в течение этого периода, они сгорают. При этом уровень скидки,
              на которую претендует покупатель, сохраняется и не изменяется.
              <br />
              <br />
              Это основная информация о программе лояльности Skincare Agents.
              Если у вас возникнут дополнительные вопросы, пожалуйста,
              не стесняйтесь задавать.
            </div>
          </ModalContainer> */}
        </div>
      </div>
    </div>
  );
};

export default PointsCard;
