import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Button, Text, Block, theme } from "galio-framework";
import Icon from "react-native-fontawesome-pro";
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

export default (props) => {
  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;
  const { routes, index: activeRouteIndex } = navigation.state;
  const iconMap = {
    0: "home",
    1: "coins",
    2: "money-check-edit",
    3: "bars",
    4: "qrcode",
  };

  //   console.log(routes);

  return (
    <Block style={styles.footerNav}>
      {routes.map((route, index) => {
        const isRouteActive = index === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        if (route.routeName === "QRCode") {
          return (
            <TouchableOpacity
              key="qrcode"
              style={{ marginTop: 8 }}
              onPress={() => {
                toggleModal();
              }}
            >
              <Block center>
                <Icon name="qrcode" type="light" color={tintColor} size={24} />
                <Text
                  style={{ marginTop: 5 }}
                  center
                  color={tintColor}
                  size={13}
                >
                  QR코드
                </Text>
              </Block>
            </TouchableOpacity>
            // <Button
            //   key={index}
            //   style={{
            //     width: 72,
            //     height: 72,
            //     backgroundColor: "#088CF4",
            //     borderRadius: 64,
            //     shadowColor: "#ccc",
            //     marginTop: -20
            //   }}
            //   onPress={() => {
            //     toggleModal();
            //   }}
            // >
            //   <Icon name="qrcode" type="regular" size={28} color={'#fff'} />
            // </Button>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}
            </TouchableOpacity>
          );
        }
      })}
    </Block>
  );
};

const styles = StyleSheet.create({
  footerNav: {
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? 10 : 5,
    paddingBottom: Platform.OS === "android" ? 10 : 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
