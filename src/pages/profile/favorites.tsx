import { NextPage } from "next";
import withAuth from "@/components/withAuth";
import Layout from "@/components/layout/Layout";
import style from "./favorite.module.sass";
import ProfileAside from "@/components/screens/profile/profileAside/profileAside";
import { favoriteService, userInfoService } from "@/services/profile.service";
import { useEffect, useState } from "react";
import { IUserData } from "@/components/screens/profile/profilePage";
import ProfileTitle from "@/components/screens/profile/profileTitle/Title";
import Tab from "@/components/other/tab/tab";
import CardProduct from "@/components/other/cardProduct/cardProduct";
import { useRouter } from "next/router";

const Favorite: NextPage = () => {
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
  const { inStock } = router.query;
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    userInfoService.getUserInfo().then(setUserDataServer);
    favoriteService.getFavorite().then(setFavorites);
  }, []);

  useEffect(() => {
    handleStockChange(Number(inStock));
  }, [inStock]);

  const handleStockChange = (inStock: number) => {
    console.log(`inStock parameter changed to: ${inStock}`);
    console.log(favorites);
    // Ваша логика здесь
  };

  return (
    <Layout title={"Фавориты"}>
      <section className={style.wrap}>
        <div className={"wrap " + style.content}>
          <div className={style.aside}>
            <ProfileAside
              activeMenu={1}
              setActiveProfileData={null}
              userDataServer={userDataServer}
            />
          </div>
          <div className={style.width}>
            <ProfileTitle title="фавориты" link={true} />
            <div className={style.tabs}>
              <Tab
                text="в наличии"
                link="?inStock=1"
                active={inStock === "1"}
              />
              <Tab
                text="лист ожидания"
                link="?inStock=0"
                active={inStock === "0"}
              />
            </div>
            <div className={style.cards}>
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

export default withAuth(Favorite);
