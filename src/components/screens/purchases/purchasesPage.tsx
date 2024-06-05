import { FC, useEffect, useState } from 'react';
import { orderListService, userInfoService } from '@/services/profile.service';
import { IUserData } from '../profile/profilePage';
import { IOrderItem } from '@/interfaces/profile.interface';

import Layout from '@/components/layout/Layout';
import ProfileTitle from '../profile/profileTitle/Title';
import ProfileAside from '../profile/profileAside/profileAside';
import Tab from '@/components/other/tab/tab';
import PurchasesWindow from './accordion/accordion';

import style from './purchases.module.sass';

const PurchasesPage: FC = () => {
  const [data, setData] = useState<IOrderItem[] | null>(null);
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
    orderListService.getOrderList(false).then((res) => setData(Object.values(res)));
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
            {data &&
              data.map(({ id, status, name, allPrice, items, price, deliveryPrice }) => (
                <div className={style.window} key={id}>
                  <PurchasesWindow
                    title={name}
                    price={price}
                    allPrice={allPrice}
                    products={Object.values(items)}
                    deliveryPrice={deliveryPrice}
                    status={status === 'Оплачен' ? 'paid' : 'waiting'}
                    type="purchases"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PurchasesPage;
