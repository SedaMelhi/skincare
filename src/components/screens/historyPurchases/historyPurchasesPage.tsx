import { FC, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import ProfileTitle from '../profile/profileTitle/Title';
import ProfileAside from '../profile/profileAside/profileAside';
import Tab from '@/components/other/tab/tab';
import PurchasesWindow from './../purchases/accordion/accordion';

import style from './historyPurchases.module.sass';
import { orderListService } from '@/services/profile.service';
import { IOrderItem } from '@/interfaces/profile.interface';

const HistoryPurchasesPage: FC = () => {
  const [data, setData] = useState<IOrderItem[] | null>(null);
  useEffect(() => {
    orderListService.getOrderList(true).then((res) => setData(res ? Object.values(res) : null));
  }, []);

  return (
    <Layout title={'Мои покупки'}>
      <section className={style.wrap}>
        <div className={'wrap ' + style.purchases}>
          <div className={style.aside}>
            <ProfileAside activeMenu={0} setActiveProfileData={null} />
          </div>
          <div className={style.width}>
            <ProfileTitle title="покупки" link={true} />

            <div className={style.tabs}>
              <Tab text="В пути" link="purchases" active={false} />
              <Tab text="история покупок" link="historyPurchases" active={true} />
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
                    date="12 июля 2023"
                    type="history"></PurchasesWindow>
                </div>
              ))}

            {/* <div className={style.window}>
              <PurchasesWindow
                title="заказ #3124"
                price={2500}
                date="12 июля 2023"
                type="history"
              />
            </div> */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HistoryPurchasesPage;
