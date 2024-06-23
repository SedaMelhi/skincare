import { FC } from 'react';
import Link from 'next/link';

import style from './cardSetProduct.module.sass';
import { IScu } from '@/interfaces/products.interface';

interface CardProductProps {
  id?: string;
  name?: string;
  picture?: string;
  price?: string;
  value?: string;
}

const CardSetProduct: FC<CardProductProps> = ({
  id,
  name,
  picture,
  price,
  value,
}) => {
  return (
    <Link href={`/product/${id}`} className={style.card}>
      <div className={style.padding}>
        <div className={style.img + ' img ' + style.img_one}
          style={{
            background: `url(https://b.skincareagents.com${picture}) center/contain no-repeat`,
          }}></div>
        <div className={style.size}>{value}</div>
        <h3 className={style.description}>{name}</h3>
      </div>

      <div className={style.price}>
        {price ? parseFloat(price).toString() : ''} ₽{' '}
      </div>
    </Link>
  );
};
export default CardSetProduct;
