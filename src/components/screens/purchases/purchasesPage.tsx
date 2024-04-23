import { FC, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import ProfileTitle from '../profile/profileTitle/Title';
import ProfileAside from '../profile/profileAside/profileAside';
import Tab from '@/components/other/tab/tab';
import PurchasesWindow from './accordion/accordion';

import style from './purchases.module.sass';
import { userInfoService } from '@/services/profile.service';
import { IUserData } from '../profile/profilePage';

const PurchasesPage: FC = () => {
  const [userDataServer, setUserDataServer] = useState<IUserData>({
    birthday: '',
    email: '',
    lastName: '',
    loginPhone: '',
    name: '',
    secondName: '',
    userId: 0,
  });
  useEffect(() => {
    userInfoService.getUserInfo().then(setUserDataServer);
  }, []);

  return (
    <Layout title={'Мои покупки'}>
      <section className={style.wrap}>
        <div className={'wrap ' + style.purchases}>
          <div className={style.aside}>
            <ProfileAside
              activeMenu={0}
              userDataServer={userDataServer}
              setActiveProfileData={null}
            />
          </div>
          <div className={style.width}>
            <ProfileTitle title="покупки" link={true} />

            <div className={style.tabs}>
              <Tab text="В пути" link="purchases" active={true} />
              <Tab text="история покупок" link="historyPurchases" active={false} />
            </div>
            <div className={style.window}>
              <PurchasesWindow
                title="заказ #3123"
                price={5000}
                status="waiting"
                type="purchases"></PurchasesWindow>
            </div>
            <div className={style.window}>
              <PurchasesWindow title="заказ #3124" price={2500} status="paid" type="purchases" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PurchasesPage;
