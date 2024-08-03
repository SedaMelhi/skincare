import { NextPage } from "next";
import withAuth from "@/components/withAuth";
import Layout from "@/components/layout/Layout";
import style from "./favorite.module.sass";
import ProfileAside from "@/components/screens/profile/profileAside/profileAside";
import { favoriteService, userInfoService } from "@/services/profile.service";
import { useEffect, useState } from "react";
import { IUserData } from "@/components/screens/profile/profilePage";
import ProfileTitle from "@/components/screens/profile/profileTitle/Title";
import CardProduct from "@/components/other/cardProduct/cardProduct";
import { useRouter } from "next/router";
import { IScu } from "@/interfaces/products.interface";

interface OriginalObject {
  [key: number]: FavoriteItemType;
  newInStock: number;
}

interface TransformedObject {
  favorites: FavoriteItemType[];
  newInStock: number;
}

function transformObject(obj: OriginalObject): TransformedObject {
  const newObject: TransformedObject = {
    favorites: [],
    newInStock: obj.newInStock,
  };

  for (const key in obj) {
    if (!isNaN(Number(key))) {
      newObject.favorites.push(obj[key]);
    }
  }

  newObject.favorites = newObject.favorites.sort((a, b) => (a.inStock === b.inStock) ? 0 : a.inStock ? -1 : 1);

  return newObject;
}

export type FavoriteItemType = {
  can_buy: boolean;
  causeMarkdown: null;
  id: string;
  inStock: boolean;
  name: string;
  offer: string[];
  parent_id: number;
  picture: string;
  price: string;
  scu: IScu;
};

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
  const [favorites, setFavorites] = useState<TransformedObject>({
    favorites: [],
    newInStock: 0,
  });

  useEffect(() => {
    userInfoService.getUserInfo().then(setUserDataServer);
    favoriteService
      .getFavorite()
      .then((data: OriginalObject) => setFavorites(transformObject(data)));
  }, []);

  useEffect(() => {
    handleStockChange(Number(inStock));
  }, [inStock]);

  const handleStockChange = (inStock: number) => {
    console.log(`inStock parameter changed to: ${inStock}`);
    console.log(favorites);
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
            {favorites.newInStock ? (
              <div className={style.text}>
                СНОВА В НАЛИЧИИ <span>{favorites.newInStock}</span>
              </div>
            ) : (
              ""
            )}

            <div className={style.cards}>
              {favorites.favorites.map((item) => (
                <div className={style.card}>
                  <CardProduct
                    key={item.id}
                    available={item.can_buy}
                    id={String(item.parent_id)}
                    name={item.name}
                    scu={item.scu}
                    smallPhoto={item.picture}
                    newInStock={item.inStock}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withAuth(Favorite);
