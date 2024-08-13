import { FC } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Arrows from '@/components/other/arrows/arrows';
import NewProduct from './newProduct/newProduct';
import { NewProducts } from '@/interfaces/newProducts.interface';

import 'swiper/css';
import style from './News.module.sass';

const News: FC<NewProducts | any> = ({ newProducts, title = true }) => {
  const products = Object.values(newProducts).splice(0, Object.values(newProducts).length - 1);
  return (
    <section>
      <div className={style.news} style={title ? {} : { margin: 0 }}>
        {title && <h2 className={style.title}>новинки</h2>}
        <div className={style.products}>
          <Swiper
            slidesPerView={3}
            slidesPerGroup={3}
            slideNextClass={style.nextSlide}
            slidePrevClass={style.prevSlide}
            slideActiveClass={style.activeSlide}
            spaceBetween={57.5}
            modules={[Navigation]}
            navigation={{
              nextEl: '.next-news',
              prevEl: '.prev-news',
              enabled: true,
            }}
            breakpoints={{
              1200: {
                spaceBetween: 57.5,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 46,
              },
              550: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              0: {
                slidesPerView: 1.9,
                slidesPerGroup: 1,
                spaceBetween: 16,
              },
            }}>
            {products.map((item: any) => (
              <SwiperSlide key={item.id}>
                <NewProduct item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {title ? (
        <div className={style.arrows}>
          <Arrows next="next-news" prev="prev-news" />
        </div>
      ) : (
        ''
      )}
    </section>
  );
};
export default News;
