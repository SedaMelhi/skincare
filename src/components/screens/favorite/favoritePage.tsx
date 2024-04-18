import { FC, useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import ProfileTitle from '../profile/profileTitle/Title';
import ProfileAside from '../profile/profileAside/profileAside';
import CardProduct from '@/components/other/cardProduct/cardProduct';
import Tab from '@/components/other/tab/tab';

import style from './favorite.module.sass';
import { favoriteService } from '@/services/profile.service';

const FavoritePage: FC = () => {
  useEffect(() => {
    const res = favoriteService.getFavorite();
    res.then((data) => console.log(data));
  }, []);
  return (
    <Layout title={'Фавориты'}>
      <section className={style.wrap}>
        <div className={'wrap ' + style.content}>
          <div className={style.aside}>
            <ProfileAside activeMenu={1} setActiveProfileData={null} />
          </div>
          <div className={style.width}>
            <ProfileTitle title="фавориты" link={true} />
            <div className={style.tabs}>
              <Tab text="в наличии" link="/profile/favorites" active={true} />
              <Tab text="лист ожидания" link="/profile/waitingList" active={false} />
            </div>
            <div className={style.cards}>
              <div className={style.card}>
                <CardProduct available={true} />
              </div>
              <div className={style.card}>
                <CardProduct available={true} />
              </div>
              <div className={style.card}>
                <CardProduct available={true} />
              </div>
              <div className={style.card}>
                <CardProduct available={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FavoritePage;
