import { FC, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';

import arrowNext from './../../../../../public/arrowSliderNext.svg';
import arrowPrev from './../../../../../public/arrowSliderPrev.svg';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import style from './slider.module.sass';

const Slider: FC<{ detailPhoto?: string[] }> = ({ detailPhoto }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={style.slider + ' productSlider'}>
      <div className={style.mainImage}>
        {detailPhoto && detailPhoto.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            style={{}}
            pagination={true}
            navigation={{ nextEl: '.slider__nextEl', prevEl: '.slider__prevEl' }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs, Pagination, Navigation]}
            className={style.swiper}
            breakpoints={{
              768: {
                pagination: false,
              },
            }}>
            {detailPhoto.map((url, i) => (
              <SwiperSlide key={i}>
                <div
                  className={style.image}
                  style={
                    url
                      ? {
                          backgroundImage: `url(https://b.skincareagents.com${url})`,
                        }
                      : {}
                  }></div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.swiper + ' ' + style.swiper__not}></div>
        )}

        {detailPhoto && detailPhoto.length > 0 ? (
          <div className={style.arrows}>
            <div className="slider__prevEl">
              <img src={arrowPrev.src} alt="" />
            </div>
            <div className="slider__nextEl">
              <img src={arrowNext.src} alt="" />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={style.thumbs__wrap}>
        {detailPhoto && detailPhoto.length > 1 ? (
          <Swiper
            spaceBetween={22}
            direction={'vertical'}
            mousewheel={true}
            onSwiper={setThumbsSwiper}
            slidesPerView={3.6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
            className={style.thumbs}>
            {detailPhoto.map((url, i) => (
              <SwiperSlide key={i}>
                <div
                  className={style.image}
                  style={
                    url
                      ? {
                          backgroundImage: `url(https://b.skincareagents.com${url})`,
                        }
                      : {}
                  }></div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style.image__not + ' ' + style.image__not_mobile}></div>
        )}
        <div className={style.shadow}></div>
      </div>
    </div>
  );
};

export default Slider;
