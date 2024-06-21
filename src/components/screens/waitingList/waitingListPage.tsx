import { FC } from 'react';

import Layout from '@/components/layout/Layout';
import ProfileTitle from '../profile/profileTitle/Title';
import ProfileAside from '../profile/profileAside/profileAside';
import CardProduct from '@/components/other/cardProduct/cardProduct';
import Tab from '@/components/other/tab/tab';

import style from './waitingList.module.sass';

const WaitingListPage: FC = () => {
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
              <Tab text="в наличии" link="/profile/favorites" active={false} />
              <Tab text="лист ожидания" link="/profile/waitingList" active={true} />
            </div>
            <div className={style.cards}>
              <div className={style.card}>
                <CardProduct available={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WaitingListPage;
