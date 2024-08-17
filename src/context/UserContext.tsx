import { IUserData } from "@/components/screens/profile/profilePage";
import { userInfoService } from "@/services/profile.service";
import { createContext, useContext, useEffect, useState } from "react";

const initialState: {
  userData: IUserData | null;
  isLoading: boolean;
  redirect: boolean;
} = {
  userData: null,
  isLoading: true,
  redirect: false,
};

const UserContext = createContext(initialState);

const UserContextProvider = (props: any) => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const getUserData = async () => {
    try {
      const data = await userInfoService.getUserInfo();
      return data;
    } catch (error) {
      localStorage.setItem("token", "");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      getUserData()
        .then((result) => {
          setUserData(result);
        })
        .catch(() => {
          setRedirect(true);
        });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, isLoading, redirect }}
      {...props}
    />
  );
};

const useUserContext = () => useContext(UserContext);
export { UserContextProvider, useUserContext };
