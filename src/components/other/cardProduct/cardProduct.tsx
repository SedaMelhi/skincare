import { FC } from "react";
import Link from "next/link";

import img1 from "./../../../../public/bonus/1.png";
import img2 from "./../../../../public/bonus/new.png";
import img3 from "./../../../../public/bonus/hit.svg";

import { IScu } from "@/interfaces/products.interface";

import style from "./cardProduct.module.sass";

interface CardProductProps {
  available?: boolean;
  id?: string;
  name?: string;
  pin?: string[];
  scu?: IScu;
  sectionCode?: string;
  sectionName?: string;
  smallPhoto?: string;
  newInStock?: boolean;
}

const CardProduct: FC<CardProductProps> = ({
  available,
  id,
  name,
  pin,
  scu,
  sectionCode,
  sectionName,
  smallPhoto,
  newInStock,
}) => {
  const values: string[] = scu
    ? Array.from(new Set(Object.values(scu).map((item) => item.value)))
    : [];

  const sizes: string[] = [];
  const prices: number[] = [];
  return (
    <Link href={`/product/${id}`} className={style.card}>
      <div style={available ? {} : { opacity: ".5" }} className={style.padding}>
        <div className={style.bonus}>
          {pin && pin.includes("Скидка") && <img src={img1.src} alt="" />}
          {pin && pin.includes("Новинка") && <img src={img2.src} alt="" />}
          {pin && pin.includes("Хит") && <img src={img3.src} alt="" />}
        </div>
        <div
          className={style.img + " img " + style.img_one}
          style={
            smallPhoto
              ? {
                  backgroundImage: `url(https://b.skincareagents.com${smallPhoto})`,
                }
              : {}
          }
        ></div>
        <h3 className={style.description}>{name}</h3>
        <div className={style.values}>
          {values.map((item, i) => (
            <div className={style.size} key={item + i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {available ? (
        <div className={style.price}>
          {scu && Object.values(scu)[0]
            ? parseFloat(Object.values(scu)[0].price).toString()
            : ""}{" "}
          ₽ {/* <span className={style.price__old}>2 234 ₽</span> */}
        </div>
      ) : (
        <div className={style.text}>Нет в наличии</div>
      )}
      {newInStock ? <div className={style.inStock}>Снова в наличии</div> : ""}
    </Link>
  );
};
export default CardProduct;
