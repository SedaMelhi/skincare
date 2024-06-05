import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import style from './smallProducts.module.sass';
import Link from 'next/link';
import { API_DOMAIN } from '@/services';

interface SmallProductPropsArr {
  products: { id: number; image: string }[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  size: string;
}

const SmallProducts: FC<SmallProductPropsArr> = ({ products, setIsOpen, size }) => {
  const [countProducts, setCountProducts] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (size === 'big') {
        if (window.innerWidth < 390) {
          setCountProducts(2);
        } else if (window.innerWidth < 500) {
          setCountProducts(3);
        } else if (window.innerWidth < 600) {
          setCountProducts(4);
        } else if (window.innerWidth < 900) {
          setCountProducts(3);
        } else {
          setCountProducts(4);
        }
      } else {
        if (window.innerWidth < 400) {
          setCountProducts(3);
        } else if (window.innerWidth < 600) {
          setCountProducts(4);
        } else if (window.innerWidth < 768) {
          setCountProducts(5);
        } else {
          setCountProducts(5);
        }
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={style.cards__wrap}>
      <div className={style.cards} onClick={() => setIsOpen(true)}>
        {products &&
          products.map(({ image, id }, i) =>
            i !== countProducts ? (
              i < countProducts && (
                <Link href={`/product/${id}`} key={id}>
                  <div
                    key={id}
                    className={size === 'big' ? style.card : style.card__small}
                    style={{ backgroundImage: `url(${API_DOMAIN + image})` }}></div>
                </Link>
              )
            ) : (
              <div className={style.circle} key={id}>
                + {products.length - countProducts}
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default SmallProducts;
