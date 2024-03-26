import Link from 'next/link';
import { FC } from 'react';

import Product from './product/product';

import { IProductArr } from '@/interfaces/products.interface';

import infoSvg from './../../../../public/info.svg';

import style from './products.module.sass';

const Products: FC<{ products: IProductArr }> = ({ products }) => {
  return (
    <div className={style.products}>
      {products.length > 0
        ? products.map((item, i) =>
            item.id ? (
              i % 6 === 0 ? (
                <Product item={item} classValue="card_big" key={i} />
              ) : (
                <Product item={item} classValue="card" key={i} />
              )
            ) : (
              ''
            ),
          )
        : 'Данных нет'}
    </div>
  );
};

export default Products;
