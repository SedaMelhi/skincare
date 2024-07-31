import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import PinkMarquee from './../pinkMarquee/pinkMarquee';
import Arrows from '@/components/other/arrows/arrows';

import { RunningLineArray } from '@/interfaces/runningLine.interface';

import 'swiper/css';
import style from './sets.module.sass';
import SetsSwiper from './setsSwiper/setsSwiper';

interface SetsProps {
  isVisible: boolean;
  runningLine: RunningLineArray;
  sets: any;
}


const Sets: FC<SetsProps> = ({ isVisible, runningLine, sets }) => {
  return (
    <section className={style.sets__wrap + ' sets'}>
      <PinkMarquee isVisible={isVisible} runningLine={runningLine} />
      <div className={style.sets}>
        <h2 className={style.title}>сеты</h2>
        <div>
          <div className={style.arrows}>
            <Arrows next="next-sets" prev="prev-sets" />
          </div>
          <div className={style.products__wrap}>
            <SetsSwiper slidesPerView={4.3} sets={sets} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sets;
