import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import style from './BeforeAndAfter.module.sass';

const BeforeAndAfter: FC = () => {
  return (
    <div className="beforeAndAfter">
      <h2 className={style.title + ' ' + style.wrap}>ваша кожа</h2>
      <div className={style.swiper_wrap}>
        <Swiper
          className={style.swiper}
          centeredSlides={false}
          slidesPerGroup={1}
          slidesPerView={1.3}
          slidesOffsetBefore={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            0: {
              spaceBetween: 10,
              slidesPerView: 1.1,
            },
            768: {
              spaceBetween: 40,
              slidesPerView: 1.25,
            },
            1000: {
              slidesPerView: 1.7,
            },
            1200: {
              spaceBetween: 104,
              slidesPerView: 1.1,
            },
            1400: {
              spaceBetween: 104,
              slidesPerView: 1.2,
            },
            1500: {
              spaceBetween: 104,
              slidesPerView: 1.3,
            },
            1700: {
              spaceBetween: 104,
              slidesPerView: 1.4,
            },
            2000: {
              spaceBetween: 104,
              slidesPerView: 1.6,
            },
          }}>
          <SwiperSlide className={style.slide}>
            <div className={style.container}>
              <div className={style.before}>
                <div className={style.before__img1}></div>
                <div className={style.before__text}>до советов агентов:(</div>
              </div>
              <div className={style.after}>
                <div className={style.after__img1}></div>
                <div className={style.after__textMain}>
                  <img src="./paidRecording/star.png" className={style.after__star} />
                  <div className={style.after__text}>и после</div>
                  <img src="./paidRecording/star.png" className={style.after__star} />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={style.slide}>
            <div className={style.container}>
              <div className={style.before}>
                <div className={style.before__img2}></div>
                <div className={style.before__text}>до советов агентов:(</div>
              </div>
              <div className={style.after}>
                <div className={style.after__img2}></div>
                <div className={style.after__textMain}>
                  <img src="./paidRecording/star.png" className={style.after__star} />
                  <div className={style.after__text}>и после</div>
                  <img src="./paidRecording/star.png" className={style.after__star} />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={style.slide}>
            <div className={style.container}>
              <div className={style.before}>
                <div className={style.before__img3}></div>
                <div className={style.before__text}>до советов агентов:(</div>
              </div>
              <div className={style.after}>
                <div className={style.after__img3}></div>
                <div className={style.after__textMain}>
                  <img src="./paidRecording/star.png" className={style.after__star} />
                  <div className={style.after__text}>и после</div>
                  <img src="./paidRecording/star.png" className={style.after__star} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default BeforeAndAfter;
