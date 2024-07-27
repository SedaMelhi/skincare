import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { userInfoService, userUpdateService } from "@/services/profile.service";
import Link from "next/link";
import InputMask from "react-input-mask";
import parsePhoneNumberFromString from "libphonenumber-js";

import Input from "@/components/other/input/input";
import Button from "@/components/other/button/button";
import ProfileTitle from "../profileTitle/Title";

import style from "./profileData.module.sass";

interface IUserData {
  birthday: string;
  email: string;
  lastName: string;
  loginPhone: string;
  name: string;
  secondName: string;
  userId: number;
}

interface ProfileAsideProps {
  setActiveProfileData: React.Dispatch<React.SetStateAction<boolean>>;
  userDataServer: IUserData;
  userData: IUserData;
  setUserData: Dispatch<SetStateAction<IUserData>>;
}

const ProfileData: FC<ProfileAsideProps> = ({
  setActiveProfileData,
  userDataServer,
  userData,
  setUserData,
}) => {
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (fieldName: keyof IUserData, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handlePhoneChange = (event: any) => {
    const input = event.target.value;
    handleInputChange("loginPhone", input);

    const phone = parsePhoneNumberFromString(input, "RU");
    if (!phone || !phone.isValid()) {
      setPhoneError("Введите действительный номер телефона.");
    } else {
      setPhoneError("");
    }
  };

  const handleChangeUserData = async (event: any) => {
    event.preventDefault();
    const response = await userUpdateService.userUpdate(userData);
    userInfoService.getUserInfo().then(setUserData);
  };

  const updatePasswordClick = () => {
    sessionStorage.setItem("id", String(userData.userId))!;
  };

  return (
    <div className={style.data}>
      <div
        className={style.back}
        onClick={() => setActiveProfileData((prev) => !prev)}
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.8"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9091 5.46875L7.37874 11.9991L13.9091 18.5294L14.9697 17.4688L9.50006 11.9991L14.9697 6.52941L13.9091 5.46875Z"
              fill="#19171A"
            />
          </svg>
        </span>
        мой профиль
      </div>
      <ProfileTitle
        title={`привет, ${userDataServer.name || "User"}`}
        link={false}
      />
      <form className={style.form}>
        <div className={style.input}>
          <Input
            placeholder="Фамилия"
            value={userData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>
        <div className={style.input}>
          <Input
            placeholder="Имя"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className={style.input}>
          <Input
            placeholder="Отчество"
            value={userData.secondName}
            onChange={(e) => handleInputChange("secondName", e.target.value)}
          />
        </div>
        <div className={style.input}>
          <Input
            placeholder="Дата рождения"
            value={userData.birthday}
            onChange={(e) => handleInputChange("birthday", e.target.value)}
          />
        </div>
        <div className={style.input}>
          <Input
            placeholder="E-mail"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className={style.input}>
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar={null}
            className={
              style.input_field + " " + (phoneError ? style.error_border : "")
            }
            type="tel"
            placeholder="Номер телефона *"
            required
            value={userData.loginPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <Link
          href="/authorization/newpassword"
          onClick={updatePasswordClick}
          className={style.link}
        >
          Изменить пароль
        </Link>

        <Button text="сохранить" onClick={handleChangeUserData} />
      </form>
    </div>
  );
};

export default ProfileData;
