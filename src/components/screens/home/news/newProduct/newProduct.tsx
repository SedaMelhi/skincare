import { IProduct } from '@/interfaces/products.interface';
import Link from 'next/link';
import { FC } from 'react';

import style from './NewProduct.module.sass';

const NewProduct: FC<any> = ({ item }) => {
  const scu: { price: string }[] = Object.values(item.scu);
  return (
    <Link href={`/product/${item.id}`} className={style.card}>
      <div
        className={style.img + ' img ' + style.img_one}
        style={{
          backgroundImage: `url(https://b.skincareagents.com${item.smallPhoto})`,
        }}></div>
      <h3 className={style.subtitle}>SKIN&LAB</h3>
      <p className={style.description}>{item.name}</p>
      <div className={style.price}>{item.scu && Object.values(item.scu)[0] && scu[0].price} ₽</div>
    </Link>
  );
};

export default NewProduct;
