import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

import leftArrowSvg from './../../../public/journal/left-arrow.svg';
import greyStarSvg from './../../../public/journal/grey-star.svg';

import style from './article.module.sass';
import HitsSwiper from '@/components/screens/home/hits/hitsSwiper/hitsSwiper';
import { JournalService } from '@/services/journal.service';
import { API_DOMAIN } from '@/services';

const Journal: NextPage<{ data: any }> = ({ data }) => {
  return (
    <Layout title="Статья">
      <section className={style.articles}>
        <div className={style.articles__leftCol}>
          <Link href="/journal" className={style.articles__back}>
            <img src={leftArrowSvg.src} alt="Left arrow icon" />
            <span>Журнал</span>
          </Link>
          <h2 className={style.articles__title}>{data.name}</h2>
          <div className={style.articles__categoryHolder}>
            <img src={greyStarSvg.src} alt="Grey star icon" />
            <span>образ жизни</span>
          </div>
        </div>
        <div className={style.articles__rightCol}>
          <div
            className={style.articles__img}
            style={
              data.picture ? { backgroundImage: `url(${API_DOMAIN + data.picture})` } : {}
            }></div>
          <p className={style.articles__author}>Автор: {data.author ? data.author : 'эндокринолог'}</p>
          <p className={style.date}>{data.date.split('.').join('/')}</p>
          <div
            className={style.articles__text}
            dangerouslySetInnerHTML={{ __html: data.description }}></div>
          <p className={style.articles__hits}>Хиты</p>
          <h2 className={style.articles__mentionedProducts}>упомянутые в статье</h2>
        </div>
      </section>
      <div className={style.swiper__wrap}>
        <div className={style.empty}></div>
        <div className={style.swiper}>
          <HitsSwiper slidesPerView={4} />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await JournalService.getDetail({
    id: context.params && context.params.id,
  });

  return {
    props: { data },
  };
};

export default Journal;
