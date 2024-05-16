import { FC, useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';

import Button from '@/components/other/button/button';
import NewProduct from './../../screens/home/news/newProduct/newProduct';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NewProductsService } from '@/services';
import { NewProducts } from '@/interfaces/newProducts.interface';
import style from './notfound.module.sass';
import News from '../home/news/news';
const NotFoundPage: FC = () => {
  const [newProducts, setNewProducts] = useState<NewProducts>({});
  const getData = async () => {
    const newProducts: NewProducts = await NewProductsService.getProductsService();
    setNewProducts(newProducts);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title="404" description="">
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
                colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="132" result="effect1_foregroundBlur_1_14235" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.number}>404</div>
            <div className={style.text}>
              <div className={style.title}>Страница не найдена</div>
              <div className={style.description}>
                Не волнуйтесь — вы в надёжных руках. Посмотрите наши новинки или вернитесь
                на главную.
              </div>
              <div className={style.btn}>
                <Button text="На главную" link="/" />
              </div>
            </div>
          </div>
          <div className={style.products}>
            <div className={style.news}>
              <div className={style.subtitle}>НОВИНКИ</div>
              <News newProducts={newProducts} title={false} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NotFoundPage;
