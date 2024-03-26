import { FC, useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';

import Button from '@/components/other/button/button';
import image from './../../../../public/error.svg';
import { NewProductsService } from '@/services';
import { NewProducts } from '@/interfaces/newProducts.interface';
import style from './error.module.sass';

const ErrorPage: FC = () => {
  const [newProducts, setNewProducts] = useState<NewProducts>({});
  const getData = async () => {
    const newProducts: NewProducts = await NewProductsService.getProductsService();
    setNewProducts(newProducts);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title="500" description="">
      <div className={style.circle__violet}>
        <img src="/violet.svg" alt="" />
      </div>
      <div className={style.wrap}>
        <div className={style.circle__orange}>
          <svg
            width="1067"
            height="791"
            viewBox="0 0 1067 791"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_1_14235)">
              <ellipse cx="241" cy="582.5" rx="562" ry="318.5" fill="#FFBDA8" />
            </g>
            <defs>
              <filter
                id="filter0_f_1_14235"
                x="-585"
                y="0"
                width="1652"
                height="1165"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="132" result="effect1_foregroundBlur_1_14235" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.number}>500</div>
            <div className={style.text}>
              <div className={style.title}>что‑то пошло не так</div>
              <div className={style.description}>
                Попробуйте перезагрузить страницу или зайти через пару минут.
              </div>
              <div className={style.btn}>
                <Button text="На главную" link="/" />
              </div>
            </div>
          </div>
        </div>
        <div className={'wrap ' + style.image}>
          <img src={image.src} alt="" />
        </div>
      </div>
    </Layout>
  );
};
export default ErrorPage;
