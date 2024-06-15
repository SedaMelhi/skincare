import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Header from './header/header';
import Categories from './categories/categories';

import News from './news/news';
import Sets from './sets/sets';
import Hits from './hits/Hits';
import Experts from './experts/experts';
import Journal from './jourmal/journal';
import Present from './present/present';
import About from './about/about';

import { MainSliderArray } from '@/interfaces/mainSlider.inerface';
import { RunningLineArray } from '@/interfaces/runningLine.interface';
import { PromoBlockArray } from '@/interfaces/promoBlocks.interface';
import { NewProducts } from '@/interfaces/newProducts.interface';
import { IGift } from '@/interfaces/gift.interface';

import style from './Home.module.sass';

const HomePage: FC<{
  slider: MainSliderArray;
  runningLine: RunningLineArray;
  newProducts: NewProducts;
  runningVerticalLine: RunningLineArray;
  journals: any;
  hits: any;
  sets: any;
}> = ({ slider, runningLine, newProducts, journals, hits, runningVerticalLine, sets }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSticker, setIsVisibleSticker] = useState(false);
  const section = useRef<HTMLDivElement | null>(null);
  const sticker = useRef<HTMLDivElement | null>(null);
  const img = useRef<HTMLImageElement | null>(null);
  const rotate = useRef(0);
  useEffect(() => {
    const checkVisibility = () => {
      if (section.current) {
        const rect = section.current.getBoundingClientRect();
        const halfHeight = (section.current.offsetHeight - 200) / 2;

        if (
          rect.top <= window.innerHeight - halfHeight &&
          rect.bottom >= halfHeight &&
          rect.bottom > 0
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      if (sticker.current) {
        const rect = sticker.current.getBoundingClientRect();

        if (rect.top < 600 && window.document.body.scrollHeight + rect.top > 3000) {
          setIsVisibleSticker(true);
          if (img.current) {
            img.current.style.transform = `rotate(${rotate.current}deg)`;
            rotate.current = -rect.top / 15;
          }
        } else {
          setIsVisibleSticker(false);
        }
      }
    };
    window.addEventListener('scroll', checkVisibility);
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);
  return (
    <>
      <Layout title="Главная" description="Онлайн магазин косметики">
        <Header slider={slider} runningLine={runningLine} />
        <main ref={sticker}>
          <Categories />
          <div className="wrap">
            {isVisibleSticker && (
              <Link href="/free" className={style.sticker__wrap}>
                <img src="./sticker.png" alt="" className={style.sticker} ref={img} />
              </Link>
            )}
          </div>
          <News newProducts={newProducts} />
          <div ref={section} className={style.pinkMarqueeWrap}>
            <Sets isVisible={isVisible} runningLine={runningVerticalLine} sets={sets} />
            <Hits hits={hits} />
          </div>
          <Experts />
          <Journal journals={journals} />
          <Present />
          <About />
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
