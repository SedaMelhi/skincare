import { FC, useCallback, useEffect } from 'react';
import Link from 'next/link';

import { Pagination, Navigation, EffectFade, Autoplay, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RunningLineArray } from '@/interfaces/runningLine.interface';
import { MainSliderArray } from '@/interfaces/mainSlider.inerface';

import Marquee from 'react-fast-marquee';
import Arrows from '@/components/other/arrows/arrows';

import 'swiper/css';
import 'swiper/css/effect-fade';

import style from './header.module.sass';

const Header: FC<{ slider: MainSliderArray; runningLine: RunningLineArray }> = ({
  slider,
  runningLine,
}) => {
  const documentHeight = useCallback((document: Document) => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${window.innerHeight - 68}px`);
  }, []);

  useEffect(() => {
    documentHeight(document);
    window.addEventListener('resize', () => documentHeight(document));
  }, []);

  return (
    <div className={style.header__wrap}>
      <header>
        <div className={style.swiper__wrap}>
          <Swiper
            className={style.swiper}
            modules={[Pagination, Navigation, EffectFade, Autoplay, Parallax]}
            speed={900}
            parallax={true}
            // autoplay={{
            //   delay: 8000,
            // }}
            effect="fade"
            loop={true}
            pagination={{
              type: 'fraction',
              el: '.swiper-pagination',
              formatFractionCurrent: function (number) {
                return '0' + number;
              },
              formatFractionTotal: function (number) {
                return '0' + number;
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              enabled: true,
            }}>
            {slider &&
              slider.map(
                ({ mainImage, mainText, secondImage, secondText, url, urlText }, i) =>
                  mainText && (
                    <SwiperSlide key={i}>
                      <div className={style.header}>
                        <div className={style.text__wrap}>
                          <div className={style.text}>
                            <h1 className={style.title} data-swiper-parallax="-100%">
                              {mainText}
                            </h1>
                            <p className={style.description} data-swiper-parallax="-100%">
                              {secondText}
                            </p>
                            <div className={style.link__wrap}>
                              <Link href="/" className={style.link}>
                                смотреть
                              </Link>
                              <div className={style.circle}>
                                <img src="./arrowCircle.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style.mainImg__wrap}>
                          <div
                            className={style.mainImg}
                            data-swiper-parallax="-100%"
                            style={
                              mainImage
                                ? {
                                    backgroundImage: `url(https://b.skincareagents.com${mainImage})`,
                                  }
                                : {}
                            }></div>
                          <div className={style.text + ' ' + style.text_mobile}>
                            <h1 className={style.title} data-swiper-parallax="-100%">
                              летняя коллекция
                            </h1>
                            <p className={style.description} data-swiper-parallax="-100%">
                              Мы привезли много крутых новинок, давай скорее смотреть?
                            </p>
                            <div className={style.link__wrap}>
                              <Link href="/" className={style.link}>
                                смотреть
                              </Link>
                              <div className={style.circle}>
                                <img src="./arrowCircle.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={style.smallImg}
                          data-swiper-parallax="-110%"
                          style={
                            secondImage
                              ? {
                                  backgroundImage: `url(https://b.skincareagents.com${secondImage})`,
                                }
                              : {}
                          }></div>
                      </div>
                    </SwiperSlide>
                  ),
              )}

            <div className={style.swiperParams}>
              <div className={style.swiperPagination__wrap}>
                <div>
                  <div className={'swiper-pagination ' + style.swiperPagination}></div>
                </div>
                <Arrows next="swiper-button-next" prev="swiper-button-prev" />
              </div>
            </div>
          </Swiper>
        </div>
      </header>

      <Marquee className={style.marquee__wrap} speed={100}>
        <div className={style.marquee}>
          {runningLine.map(({ mainText, url }, i) => (
            <span key={i}>
              <img src="./star.svg" alt="" />
              <span>{mainText}</span>
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
};
export default Header;
