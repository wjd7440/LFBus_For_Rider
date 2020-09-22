import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { Text, Block } from "galio-framework";
import Icon from "react-native-fontawesome-pro";

// Common
import TabBar from "../components/TabBar";

import HomeStack from "./HomeStack";

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#2396F0",
        inactiveTintColor: "rgba(0,0,0,0.4)",
        labelStyle: {
          fontFamily: "open-sans-regular",
        },
        style: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="매인"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Block center>
              <Icon name="home" type="light" color={color} size={24} />
              <Text style={{ marginTop: 5 }} center color={color} size={13}>
                내 주변 정류장
              </Text>
            </Block>
          ),
        }}
      />
      <Tab.Screen
        name="메뉴"
        component={MoreMenuStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Block center>
              <Icon name="heart" type="light" color={color} size={24} />
              <Text style={{ marginTop: 5 }} color={color} size={13}>
                메뉴
              </Text>
            </Block>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabStack"
        cardStyle={{ backgroundColor: "transparent" }}
      >
        <Stack.Screen name="내 주변 정류장" component={TabStack} />
        <Stack.Screen name="메뉴" component={MoreMenuStack} />
        <Stack.Screen name="탑승 예약" component={ReservationStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
