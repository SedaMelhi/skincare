import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import circle from "./../../../../../public/circleCheckBlack.svg";

import style from "./rangeSlider.module.sass";
import { useSelector } from "react-redux";

const RangeSlider: FC<{ range: number }> = ({ range }) => {
  const router = useRouter();
  const address = useSelector((state: any) => state.address.address);
  const order = useSelector((state: any) => state.order.order);
  const [marks, setMarks] = useState([
    {
      value: 1,
      label: "Доставка",
      step: "one",
      checked: false,
    },
    {
      value: 2,
      label: "Получатель",
      step: "two",
      checked: false,
    },
    {
      value: 3,
      label: "Оплата",
      step: "three",
      checked: false,
    },
  ]);
  useEffect(() => {
    console.log(address, order);

    setMarks((prev) =>
      prev.map((item) =>
        item.value === 1
          ? {
              ...item,
              checked: address.full_address,
            }
          : item.value === 2
          ? {
              ...item,
              checked: Object.values(order).every((item: any) => item),
            }
          : item
      )
    );
  }, [address, order]);
  console.log(marks);

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
          {marks.map(({ value, step, checked }) => (
            <div
              key={value}
              className={
                style.thumb +
                " " +
                (value < range ? style.thumb_active : "") +
                " " +
                (value === range ? style.thumb_grey : "")
              }
              onClick={() =>
                checked
                  ? router.push(
                      {
                        pathname: router.pathname,
                        query: { step: step },
                      },
                      undefined,
                      { shallow: true }
                    )
                  : ""
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
