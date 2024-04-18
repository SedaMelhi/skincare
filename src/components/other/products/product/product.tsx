import Link from 'next/link';
import { FC } from 'react';
import { Color, IProduct } from '@/interfaces/products.interface';

import discountImg from './../../../../../public/bonus/1.png';
import newImg from './../../../../../public/bonus/new.png';
import hitImg from './../../../../../public/bonus/hit.svg';

import style from './../products.module.sass';

const Product: FC<{ item: IProduct; classValue: string }> = ({ item, classValue }) => {
  const volumes: string[] = item.volumes;
  const colors: Color[] | null = item.colors
    ? item.colors.reduce((arr: Color[], current: Color) => {
        return arr.some((item) => item.name === current.name) ? arr : [...arr, current];
      }, [])
    : null;

  const price: number = item.minPrice;
  console.log(item);

  return (
    <div className={style[classValue]} key={item.id}>
      {item.pins && (
        <div className={style.pin}>
          {item.pins.includes('Скидка') && <img src={discountImg.src} alt="" />}
          {item.pins.includes('Новинка') && <img src={newImg.src} alt="" />}
          {item.pins.includes('Хит') && <img src={hitImg.src} alt="" />}
        </div>
      )}

      <Link href={'/product/' + item.id}>
        <div
          className={style.image}
          style={
            item.picture
              ? { backgroundImage: `url(https://b.skincareagents.com/${item.picture})` }
              : {}
          }>
          <div className={style.colors}>
            <div className={style.colors__image}>
              {colors
                ?.filter((item, i) => i < 4)
                .map(({ name, value }) => (
                  <img src={'https://b.skincareagents.com/' + value} alt={name} />
                ))}
            </div>
            {colors && colors.length - 4 > 0 && `+${colors.length - 4}`}
          </div>
        </div>
        <div className={style.name}>{item.name}</div>
      </Link>

      <div className={style.sizes}>
        {volumes &&
          volumes.map(
            (item, i) =>
              item && (
                <span className={style.size} key={i}>
                  {item}
                </span>
              ),
          )}
      </div>
      <div className={style.price}>
        <div className={style.new}>{price} ₽</div>
        {/* <div className={style.old}>
          {prices.length > 0
            ? prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new !==
              prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new
              ? prices.reduce((x, y) => (Math.min(x.new, y.new) === x.new ? x : y)).new + ' ₽'
              : ''
            : ''}
        </div> */}
        {/* <div className={style.info}>
                <img src={infoSvg.src} alt="" />
              </div> */}
      </div>
    </div>
  );
};
export default Product;
