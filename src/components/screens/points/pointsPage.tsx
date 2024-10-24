import { FC, useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import ProfileTitle from "../profile/profileTitle/Title";
import ProfileAside from "../profile/profileAside/profileAside";
import PointsCard from "./pointsCard/pointsCard";
import CertificateCard from "./certificateCard/certificateCard";
import AddCertificate from "./addCertificate/addCertificate";
import Footer from "@/components/layout/footer/footer";

import style from "./points.module.sass";
import { IUserData } from "../profile/profilePage";
import {
  addCertificateService,
  userInfoService,
} from "@/services/profile.service";

export type CertificateType = {
  id: string;
  date: string;
  name: string;
  picture: string;
  price: string;
};

const PointsPage: FC = () => {
  const [userDataServer, setUserDataServer] = useState<IUserData>({
    birthday: "",
    email: "",
    lastName: "",
    loginPhone: "",
    name: "",
    secondName: "",
    userId: 0,
  });
  const [certificates, setCertificates] = useState<CertificateType[]>([]);

  useEffect(() => {
    userInfoService.getUserInfo().then(setUserDataServer);
    addCertificateService.getCertificates().then((result) => {
      setCertificates(Object.values(result));
    });
  }, []);

  return (
    <Layout title={"Баллы и сертификаты"}>
      <section className={style.wrap}>
        <div className={"wrap " + style.content}>
          <div className={style.aside}>
            <ProfileAside
              activeMenu={2}
              setActiveProfileData={null}
              userDataServer={userDataServer}
            />
          </div>
          <div className={style.width}>
            <div className={style.title}>
              <ProfileTitle title="баллы и сертификаты" link={true} />
            </div>
            <ProfileTitle title="баллы" link={false} />
            <PointsCard />
            <ProfileTitle title="подарочные сертификаты" link={false} />
            {certificates.map((certificate) => (
              <CertificateCard certificate={certificate} />
            ))}
            <AddCertificate />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PointsPage;
