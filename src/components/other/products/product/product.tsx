import Link from 'next/link';
import { FC } from 'react';
import { IProduct } from '@/interfaces/products.interface';

import discountImg from './../../../../../public/bonus/1.png';
import newImg from './../../../../../public/bonus/new.png';
import hitImg from './../../../../../public/bonus/hit.svg';

import style from './../products.module.sass';

const Product: FC<{ item: IProduct; classValue: string }> = ({ item, classValue }) => {
  const sizes: string[] = [];
  const prices: { new: number; old: number }[] = [];
  const scu = item.scu ? Object.values(item.scu) : null;
  if (scu) {
    scu.forEach((item) => {
      item && !sizes.includes(item.value) && sizes.push(item.value);
      item &&
        item.price &&
        prices.every((i) => item.price.basePrice !== i.new) &&
        prices.push({ new: item.price.basePrice, old: item.price.discountPrice });
    });
  }
  return (
    <div className={style[classValue]} key={item.id}>
      {item.pin && (
        <div className={style.pin}>
          {item.pin.includes('Скидка') && <img src={discountImg.src} alt="" />}
          {item.pin.includes('Новинка') && <img src={newImg.src} alt="" />}
          {item.pin.includes('Хит') && <img src={hitImg.src} alt="" />}
        </div>
      )}

      <Link href={'/product/' + item.id}>
        <div
          className={style.image}
          style={
            item.smallPhoto
              ? { backgroundImage: `url(https://b.skincareagents.com/${item.smallPhoto})` }
              : {}
          }></div>
        <div className={style.name}>{item.name}</div>
      </Link>

      <div className={style.sizes}>
        {sizes &&
          sizes.map(
            (item, i) =>
              item && (
                <span className={style.size} key={i}>
                  {item}
                </span>
              ),
          )}
      </div>
      <div className={style.price}>
        <div className={style.new}>
          {prices.length > 0
            ? prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new + ' ₽'
            : ''}
        </div>
        <div className={style.old}>
          {prices.length > 0
            ? prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new !==
              prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new
              ? prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new + ' ₽'
              : ''
            : ''}
        </div>
        {/* <div className={style.info}>
                <img src={infoSvg.src} alt="" />
              </div> */}
      </div>
    </div>
  );
};
export default Product;
