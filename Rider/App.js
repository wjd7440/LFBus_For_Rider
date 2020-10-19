import React, { useState, useEffect, useRef } from "react";
import { AsyncStorage } from "react-native";
import Storage from "react-native-expire-storage";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { GalioProvider } from "galio-framework";
import apolloClientOptions from "./apollo";
import { AuthProvider } from "./AuthContext";
import NavController from "./navigation/NavController";

import { ApolloProvider } from "react-apollo-hooks";

import { configureFontAwesomePro } from "react-native-fontawesome-pro";
configureFontAwesomePro("regular");

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen/index";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  const authLink = setContext(async (_, { headers }) => {
    const token = await Storage.getItem("jwt");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const getPermissionsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  };

  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: Storage,
      });
      const client = new ApolloClient({
        cache,
        link: authLink.concat(apolloClientOptions),
      });
      setLoaded(true);
      setClient(client);

      getPermissionsAsync();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification");
        console.log(notification);
        console.log("notification");
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("response");
        console.log(response);
        console.log("response");
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    loaded &&
    client && (
      <ApolloProvider client={client}>
        <GalioProvider>
          <AuthProvider>
            {/* <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Navigator>
            </NavigationContainer> */}

            <NavController />
          </AuthProvider>
        </GalioProvider>
      </ApolloProvider>
    )
  );
}
