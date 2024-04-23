import { FC } from 'react';

import circle from './../../../../../public/circleCheckBlack.svg';

import style from './rangeSlider.module.sass';

const RangeSlider: FC<{ range: number }> = ({ range }) => {
  const marks = [
    {
      value: 1,
      label: 'Доставка',
    },
    {
      value: 2,
      label: 'Получатель',
    },
    {
      value: 3,
      label: 'Оплата',
    },
  ];
  return (
    <div className={style.line}>
      <div className={style.texts}>
        {marks.map(({ value, label }) => (
          <div className={style.text + ' ' + (value < range ? style.text_active : '')} key={value}>
            {label}
          </div>
        ))}
      </div>
      <div className={style.border}>
        <div
          className={
            style.border_line + ' ' + (range === 2 || range === 3 ? style.border_line_active : '')
          }></div>
        <div
          className={style.border_line + ' ' + (range === 3 ? style.border_line_active : '')}></div>
        <div className={style.thumbs}>
          {marks.map(({ value }) => (
            <div
              key={value}
              className={
                style.thumb +
                ' ' +
                (value < range ? style.thumb_active : '') +
                ' ' +
                (value === range ? style.thumb_grey : '')
              }>
              <img src={circle.src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
