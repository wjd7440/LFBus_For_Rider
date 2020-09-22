import React, { useState, useEffect } from "react";
import { useIsLoggedIn, useAutoLogIn } from "../AuthContext";
import { StatusBar } from "react-native";

import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

import Loader from "../components/Loader";

export default () => {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <MainNavigation></MainNavigation>
    </>
  ) : (
    <>
      <AuthNavigation></AuthNavigation>
    </>
  );
};
