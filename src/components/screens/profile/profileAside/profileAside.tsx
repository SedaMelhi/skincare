import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import MenuItem from "./menuItem/menuItem";
import { setIsNotifications } from "@/redux/basketSlice/basketSlice";

import notificationsSvg from "./../../../../../public/notifications.svg";
import arrowSvg from "./../../../../../public/arrowCircle.svg";

import style from "./profileAside.module.sass";
import { getTokenService } from "@/services/auth.service";
import ProfileLogoutModal from "../profileLogoutModal/profileLogoutModal";
import { useRouter } from "next/router";

interface IuserDataServer {
  birthday: string;
  email: string;
  lastName: string;
  loginPhone: string;
  name: string;
  secondName: string;
  userId: number;
}

interface ProfileAsideProps {
  setActiveProfileData: React.Dispatch<React.SetStateAction<boolean>> | null;
  activeMenu?: number;
  userDataServer?: IuserDataServer;
}

interface RootState {
  basket: {
    isNotifications: boolean;
  };
}

const ProfileAside: FC<ProfileAsideProps> = ({
  setActiveProfileData,
  activeMenu,
  userDataServer,
}) => {
  const isBasketOpen = useSelector(
    (state: RootState) => state.basket.isNotifications
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([
    {
      text: "покупки",
      link: "/profile/purchases",
      active: activeMenu === 0 ? true : false,
      id: 0,
    },
    {
      text: "фавориты",
      link: "/profile/favorites",
      active: activeMenu === 1 ? true : false,
      id: 1,
    },
    {
      text: "баллы и сертификаты",
      link: "/profile/points",
      active: activeMenu === 2 ? true : false,
      id: 2,
    },
    {
      text: "адреса",
      link: "/profile/maps",
      active: activeMenu === 3 ? true : false,
      id: 3,
    },
  ]);

  const [open, setOpen] = useState(false);

  const handleChangeMenu = (id: number) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, active: !item.active }
          : { ...item, active: false }
      )
    );
  };

  const handleLogOut = () => {
    getTokenService.userLogout().then((res) => console.log("log", res));
    localStorage.removeItem("saleUserId");
    localStorage.removeItem("token");
    router.push("/authorization");
  };

  return (
    <aside className={style.aside}>
      <div className={style.row}>
        <div className={style.img}></div>
        <div
          className={style.notifications}
          onClick={() => dispatch(setIsNotifications(true))}
        >
          <img src={notificationsSvg.src} alt="" />
        </div>
      </div>
      {setActiveProfileData !== null ? (
        <div
          className={style.name}
          onClick={() => setActiveProfileData((prev) => !prev)}
        >
          <img src={arrowSvg.src} alt="" />
          <div className={style.name__text}>
            {userDataServer?.name
              ? userDataServer.name + " " + (userDataServer.lastName || "")
              : "User"}
          </div>
        </div>
      ) : (
        <Link href="/profile" className={style.name}>
          <div className={style.name__text}>
            {userDataServer?.name
              ? userDataServer.name + " " + (userDataServer.lastName || "")
              : "User"}
          </div>
        </Link>
      )}

      <div className={style.line}></div>
      <div className={style.menu}>
        {menu.map(({ text, link, active, id }) => (
          <div key={id} onClick={() => handleChangeMenu(id)}>
            <MenuItem text={text} active={active} link={link} />
          </div>
        ))}
      </div>
      <div className={style.line}></div>
      <div className={style.logOut}>
        <span onClick={() => setOpen(true)}>выйти</span>
      </div>
      <ProfileLogoutModal
        open={open}
        setOpen={() => setOpen(!open)}
        logoutButtonClick={handleLogOut}
      />
    </aside>
  );
};

export default ProfileAside;
