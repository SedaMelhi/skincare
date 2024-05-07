import { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import starSvg from './../../../../../public/violetStar.svg';

import style from './pointsCard.module.sass';
import BasicModal from '@/components/other/basicModal/basicModal';
import { userInfoService } from '@/services/profile.service';

const valueLabelFormat = (value: number) => {
  return `Ваша сумма покупок составляет  ${value} ₽`;
};

const PointsCard: FC = () => {
  const [points, setPoints] = useState();
  useEffect(() => {
    const res = userInfoService.getPoints();
    res.then((res) => console.log(res));
  }, [points]);
  const marks = [
    {
      value: 1,
      label: '1%',
    },
    {
      value: 25000,
      label: '5%',
    },
    {
      value: 50000,
      label: '10%',
    },
  ];
  return (
    <div className={style.wrap}>
      <div className={style.card}>
        <div className={style.card__top}>
          <div className={style.title}>моя скидка 3%</div>
          <div className={style.text}>
            Баллы — <span>133</span>
            <div className={style.border}>
              <img src={starSvg.src} alt="" />
            </div>
          </div>
          <div className={style.text}>Баллы сгорят через 7 дней</div>
        </div>
        <div className={style.bottom}>
          <div className={style.slider}>
            <Box sx={{ width: '100%' }}>
              <Slider
                //disabled
                aria-label="Restricted values"
                defaultValue={10000}
                min={0}
                max={50000}
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
          <BasicModal>
            <div className={style.question}>Как получить баллы?</div>
          </BasicModal>
        </div>
      </div>
    </div>
  );
};

export default PointsCard;
