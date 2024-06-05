import { FC, LegacyRef } from 'react';

import ProductLine from '@/components/other/productLine/productLine';

import style from './accordionBody.module.sass';
import { IProductOrder } from '@/interfaces/profile.interface';

interface AccordionBodyProps {
  bodyElement: LegacyRef<HTMLDivElement> | null;
  overflow: 'hidden' | 'visible';
  height: string;
  products: IProductOrder[];
  deliveryPrice: number;
  allPrice: number;
  price: number;
}

const AccordionBody: FC<AccordionBodyProps> = ({
  bodyElement,
  overflow,
  height,
  products,
  deliveryPrice,
  allPrice,
  price,
}) => {
  return (
    <div
      className={style.text}
      ref={bodyElement && bodyElement}
      style={{
        height: overflow === 'hidden' ? height : 'auto',
        overflow: overflow,
      }}>
      <ProductLine products={products} />
      <div className={style.flex}>
        <div className={style.value}>Сумма заказа</div>
        <div className={style.line}></div>
        <div className={style.money}>{price} ₽</div>
      </div>
      <div className={style.flex}>
        <div className={style.value}>Доставка</div>
        <div className={style.line}></div>
        <div className={style.money}>{deliveryPrice} ₽</div>
      </div>
      <div className={style.result}>
        Итого <span>{allPrice} ₽</span>
      </div>
    </div>
  );
};

export default AccordionBody;
