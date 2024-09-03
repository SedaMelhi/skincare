import { FC, useState } from "react";
import { useRouter } from "next/router";

import circle from "./../../../../../public/circleCheckBlack.svg";

import style from "./rangeSlider.module.sass";
import { useSelector } from "react-redux";

const RangeSlider: FC<{ range: number }> = ({ range }) => {
  const router = useRouter();
  const [marks, setMarks] = useState([
    {
      value: 1,
      label: "Доставка",
      step: "one",
    },
    {
      value: 2,
      label: "Получатель",
      step: "two",
    },
    {
      value: 3,
      label: "Оплата",
      step: "three",
    },
  ]);

  return (
    <div className={style.line}>
      <div className={style.texts}>
        {marks.map(({ value, label }) => (
          <div
            className={
              style.text + " " + (value < range ? style.text_active : "")
            }
            key={value}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={style.border}>
        <div
          className={
            style.border_line +
            " " +
            (range === 2 || range === 3 ? style.border_line_active : "")
          }
        ></div>
        <div
          className={
            style.border_line +
            " " +
            (range === 3 ? style.border_line_active : "")
          }
        ></div>
        <div className={style.thumbs}>
          {marks.map(({ value, step }) => (
            <div
              key={value}
              className={
                style.thumb +
                " " +
                (value < range ? style.thumb_active : "") +
                " " +
                (value === range ? style.thumb_grey : "")
              }
            >
              <img src={circle.src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
