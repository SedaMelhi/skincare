import { FC } from 'react';
import Link from 'next/link';

import img1 from './../../../../public/bonus/1.png';
import img2 from './../../../../public/bonus/new.png';
import img3 from './../../../../public/bonus/hit.svg';

import style from './cardProduct.module.sass';
import { IScu } from '@/interfaces/products.interface';

interface CardProductProps {
  available?: boolean;
  id?: string;
  name?: string;
  pin?: string[];
  scu?: IScu;
  sectionCode?: string;
  sectionName?: string;
  smallPhoto?: string;
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
}) => {
  const sizes: string[] = [];
  const prices: number[] = [];
  // const scu = item.scu ? Object.values(item.scu) : null;
  // if (scu) {
  //   scu.forEach((item) => {
  //     !sizes.includes(item[0].value) && sizes.push(item[0].value);
  //     item[0].price && !prices.includes(+item[0].price) && prices.push(+item[0].price);
  //   });
  // }
  //console.log(prices);

  return (
    <Link href={`/product/${id}`} className={style.card}>
      <div style={available ? {} : { opacity: '.5' }} className={style.padding}>
        <div className={style.bonus}>
          <img src={img1.src} alt="" />
          <img src={img2.src} alt="" />
          <img src={img3.src} alt="" />
        </div>
        <div
          className={style.img + ' img ' + style.img_one}
          style={{
            background: `url(https://b.skincareagents.com${smallPhoto}) center/contain no-repeat`,
          }}></div>
        <h3 className={style.description}>{name}</h3>
        <div className={style.size}>{scu && Object.values(scu)[0].value}</div>
      </div>

      {available ? (
        <div className={style.price}>
          {scu ? Object.values(scu)[0].price : ''} ₽{' '}
          <span className={style.price__old}>2 234 ₽</span>
        </div>
      ) : (
        <div className={style.text}>Нет в наличии</div>
      )}
    </Link>
  );
};
export default CardProduct;
