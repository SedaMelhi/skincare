import { FC } from "react";

import Link from 'next/link';
import { IProductOrder } from '@/interfaces/profile.interface';
import { API_DOMAIN } from '@/services';


import style from "./productLine.module.sass";




const ProductLine: FC<{ products: IProductOrder[] }> = ({ products }) => {
  return (
    <div className={style.products}>
      {products.map(({ name, quantity, value, price, picture, id }) => (
        <div className={style.line} key={id}>
          <Link href={`/product/${id}`}>
            <div className={style.left}>
              <div
                className={style.image}
                style={picture ? { backgroundImage: `url(${API_DOMAIN + picture})` } : {}}></div>
              <div className={style.text}>
                <div className={style.title}>{name}</div>
                <div className={style.details}>
                  <div className={style.count}>{quantity} шт</div>
                  <div className={style.size}>{value}</div>
                </div>
              </div>
            </div>
            <div className={style.price}> {price} ₽</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductLine;
