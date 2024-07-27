import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsAddressOpen } from "@/redux/addressSlice/addressSlice";

import Layout from "@/components/layout/Layout";
import ProfileTitle from "../profile/profileTitle/Title";
import ProfileAside from "../profile/profileAside/profileAside";
import Tab from "@/components/other/tab/tab";
import InfoBlock from "./infoBlock/infoBlock";
import Button from "@/components/other/button/button";

import style from "./maps.module.sass";
import { API_URL } from "@/services";
import { IUserData } from "../profile/profilePage";
import { userInfoService } from "@/services/profile.service";

const MapsPage: FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const [address, setAddress] = useState<{ id: number; addressDetail: any }[]>(
    []
  );
  const [userDataServer, setUserDataServer] = useState<IUserData>({
    birthday: "",
    email: "",
    lastName: "",
    loginPhone: "",
    name: "",
    secondName: "",
    userId: 0,
  });
  useEffect(() => {
    userInfoService.getUserInfo().then(setUserDataServer);
  }, []);
  const getNewAddress = () => {
    fetch(API_URL + "v1/user.php", {
      method: "POST",
      body: JSON.stringify({
        type: "getAddress",
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setAddress(res["3"]);
      });
  };
  useEffect(() => {
    getNewAddress();
  }, [activeTab]);

  return (
    <Layout title={"Адреса"}>
      <section className={style.wrap}>
        <div className={"wrap " + style.content}>
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
                <Tab
                  text="пункт выдачи"
                  link="maps"
                  active={activeTab === 0 ? true : false}
                />
              </div>
              <div onClick={() => setActiveTab(1)}>
                <Tab
                  text="курьером"
                  link="maps"
                  active={activeTab === 1 ? true : false}
                />
              </div>
            </div>
            {address &&
              address.map(({ id, addressDetail }) => (
                <div className={style.address} key={id}>
                  <InfoBlock
                    title={activeTab === 1 ? "" : "почта россии"}
                    id={id}
                    getNewAddress={getNewAddress}
                    text={
                      "г. " +
                      addressDetail.city +
                      ", " +
                      addressDetail.street +
                      (addressDetail.entrance
                        ? ", подъез: " + addressDetail.entrance
                        : "") +
                      (addressDetail.floor
                        ? ", этаж: " + addressDetail.floor
                        : "") +
                      (addressDetail.intercom
                        ? ", домофон: " + addressDetail.intercom
                        : "")
                    }
                  />
                </div>
              ))}

            <div
              className={style.btn}
              onClick={() => dispatch(setIsAddressOpen(true))}
            >
              <Button
                text="добавить новый адрес"
                height="44px"
                fontSize="14px"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MapsPage;
