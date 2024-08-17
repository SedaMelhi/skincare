import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { userData, isLoading, redirect } = useUserContext();
    const Router = useRouter();

    useEffect(() => {
      if (redirect) {
        Router.replace("/authorization"); // Перенаправление на страницу входа
      }
    }, [Router]);

    if (isLoading) {
      return null; // Или компонент загрузки
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
