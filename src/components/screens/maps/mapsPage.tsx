import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAddressOpen } from '@/redux/addressSlice/addressSlice';

import Layout from '@/components/layout/Layout';
import ProfileTitle from '../profile/profileTitle/Title';
import ProfileAside from '../profile/profileAside/profileAside';
import Footer from '@/components/layout/footer/footer';
import Tab from '@/components/other/tab/tab';
import InfoBlock from './infoBlock/infoBlock';
import Button from '@/components/other/button/button';
import PayCard from './payCard/payCard';
import BasicPayCard from './basicPayCard/basicPayCard';

import sbpPng from './../../../../public/certificate/сбп.png';
import plusSvg from './../../../../public/certificate/plus.svg';

import style from './maps.module.sass';
import { API_URL } from '@/services';
import { IUserData } from '../profile/profilePage';
import { userInfoService } from '@/services/profile.service';

const MapsPage: FC = () => {
  const [activeEl, setActiveEl] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const [address, setAddress] = useState<{ id: number; addressDetail: any }[]>([]);
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
  const getNewAddress = () => {
    fetch(API_URL + 'v1/user.php', {
      method: 'POST',
      body: JSON.stringify({ type: 'getAddress', token: localStorage.getItem('token') }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAddress(res['3']);
      });
  };
  useEffect(() => {
    getNewAddress();
  }, [activeTab]);

  return (
    <Layout title={'Адреса'}>
      <section className={style.wrap}>
        <div className={'wrap ' + style.content}>
          <div className={style.aside}>
            <ProfileAside
              activeMenu={3}
              setActiveProfileData={null}
              userDataServer={userDataServer}
            />
          </div>
          <div className={style.width}>
            <div className={style.title}>
              <ProfileTitle title="адреса и карты " link={true} />
            </div>
            <ProfileTitle title="адреса" link={false} />
            <div className={style.tabs}>
              <div onClick={() => setActiveTab(0)}>
                <Tab text="пункт выдачи" link="maps" active={activeTab === 0 ? true : false} />
              </div>
              <div onClick={() => setActiveTab(1)}>
                <Tab text="курьером" link="maps" active={activeTab === 1 ? true : false} />
              </div>
            </div>
            {address &&
              address.map(({ id, addressDetail }) => (
                <div className={style.address} key={id}>
                  <InfoBlock
                    title={activeTab === 1 ? '' : 'почта россии'}
                    id={id}
                    getNewAddress={getNewAddress}
                    text={
                      'г. ' +
                      addressDetail.city +
                      ', ' +
                      addressDetail.street +
                      (addressDetail.entrance ? ', подъез: ' + addressDetail.entrance : '') +
                      (addressDetail.floor ? ', этаж: ' + addressDetail.floor : '') +
                      (addressDetail.intercom ? ', домофон: ' + addressDetail.intercom : '')
                    }
                  />
                </div>
              ))}

            <div className={style.btn} onClick={() => dispatch(setIsAddressOpen(true))}>
              <Button text="добавить новый адрес" height="44px" fontSize="14px" />
            </div>
            <div className={style.pay}>
              <ProfileTitle title="способ оплаты" link={false} />
              <div className={style.items}>
                <PayCard activeEl={activeEl} setActiveEl={setActiveEl} />
                <BasicPayCard
                  activeEl={activeEl}
                  setActiveEl={setActiveEl}
                  number={1}
                  image={plusSvg.src}
                />
                <BasicPayCard
                  activeEl={activeEl}
                  setActiveEl={setActiveEl}
                  number={2}
                  image={sbpPng.src}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MapsPage;
