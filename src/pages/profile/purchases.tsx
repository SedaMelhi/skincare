import Layout from "@/components/layout/Layout";
import ProfileAside from "@/components/screens/profile/profileAside/profileAside";
import { IUserData } from "@/components/screens/profile/profilePage";
import PurchasesPage from "@/components/screens/purchases/purchasesPage";
import withAuth from "@/components/withAuth";
import { userInfoService } from "@/services/profile.service";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import style from "./favorite.module.sass";
import ProfileTitle from "@/components/screens/profile/profileTitle/Title";
import Tab from "@/components/other/tab/tab";
import { useRouter } from "next/router";
import HistoryPurchasesPage from "@/components/screens/historyPurchases/historyPurchasesPage";

const Purchases: NextPage = () => {
  const [userDataServer, setUserDataServer] = useState<IUserData>({
    birthday: "",
    email: "",
    lastName: "",
    loginPhone: "",
    name: "",
    secondName: "",
    userId: 0,
  });
  const router = useRouter();
  const { history } = router.query;
  const [isHistory, setIsHistory] = useState(false);

  useEffect(() => {
    userInfoService.getUserInfo().then(setUserDataServer);
  }, []);

  useEffect(() => {
    setIsHistory(Boolean(history));
  }, [history]);

  return (
    <Layout title={"Мои покупки"}>
      <section className={style.wrap}>
        <div className={"wrap " + style.purchases}>
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
              <Tab
                text="В пути"
                link="purchases"
                active={isHistory === false}
              />
              <Tab
                text="история покупок"
                link="purchases?history=1"
                active={isHistory === true}
              />
            </div>
            {isHistory ? <HistoryPurchasesPage /> : <PurchasesPage />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withAuth(Purchases);
