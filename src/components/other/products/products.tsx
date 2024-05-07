import { FC, useEffect } from 'react';

import Product from './product/product';
import Circle from './circle/Circle';
import { IProductArr } from '@/interfaces/products.interface';

import style from './products.module.sass';

const Products: FC<{ products: IProductArr }> = ({ products }) => {
  let del = 6;
  let smallProductCount = -1;
  let bigProductCount = 0;
  let counter = 0;

  let mDel = 6;
  let mSmallProductCount = -1;
  let mBigProductCount = 0;
  let mCounter = 0;

  return (
    <div className={style.wrap}>
      <div className={style.pc}>
        <div className={style.products}>
          {products.length > 0
            ? products.map((item, i) => {
                smallProductCount++;
                counter++;
                if (smallProductCount % del === 0) {
                  bigProductCount++;
                  del = 6;
                  if (bigProductCount === 2) {
                    del = 7;
                    smallProductCount = 0;
                  }
                  if (bigProductCount === 3) {
                    del = 6;
                    bigProductCount = 1;
                    smallProductCount = 0;
                  }

                  return <Product item={item} classValue="card_big" key={i} />;
                } else if (smallProductCount >= 0) {
                  if (counter === 9) {
                    smallProductCount++;
                    return (
                      <div key={i}>
                        <Circle />
                        <Product item={item} classValue="card" />
                      </div>
                    );
                  }
                  return <Product item={item} classValue="card" key={i} />;
                }
              })
            : 'Данных нет'}
        </div>
      </div>

      <div className={style.mobile}>
        <div className={style.products}>
          {products.length > 0
            ? products.map((item, i) => {
                mSmallProductCount++;
                mCounter++;
                if (mSmallProductCount % mDel === 0) {
                  mBigProductCount++;
                  mDel = 5;
                  if (mCounter === 11) {
                    mSmallProductCount = 1;
                    return (
                      <div key={i}>
                        <Circle />
                        <Product item={item} classValue="card" />
                      </div>
                    );
                  }
                  return <Product item={item} classValue="card_big" key={i} />;
                } else if (mSmallProductCount >= 0) {
                  return <Product item={item} classValue="card" key={i} />;
                }
              })
            : 'Данных нет'}
        </div>
      </div>
    </div>
  );
};

export default Products;
