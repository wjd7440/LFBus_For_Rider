import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Button, Block, NavBar, Text, theme } from "galio-framework";

import Icon from "react-native-fontawesome-pro";
import wezonTheme from "../constants/Theme";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BackButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.goBack(null)}
  >
    <Icon
      name="arrow-left"
      type="regular"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const CloseButton = ({ isWhite, style, navigation, closeNavigate }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {
      closeNavigate
        ? navigation.navigate(closeNavigate)
        : navigation.goBack(null);
    }}
  >
    <Icon
      name="times"
      type="regular"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const FilterButton = ({ isWhite, style, toggleModal }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {
      toggleModal();
    }}
  >
    <Icon
      name="sliders-h"
      type="light"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, toggleModal }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {
      toggleModal();
    }}
  >
    <Icon
      name="search"
      type="regular"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  renderLeft = () => {
    const { white, back, navigation } = this.props;
    const { routeName } = navigation.state;

    if (back) {
      return (
        <BackButton key="back-title" navigation={navigation} isWhite={white} />
      );
    } else {
      return <Block />;
    }
  };
  renderRight = () => {
    const {
      white,
      close,
      filter,
      search,
      navigation,
      closeNavigate,
      toggleModal,
    } = this.props;

    if (close) {
      return (
        <CloseButton
          key="close-title"
          navigation={navigation}
          isWhite={white}
          closeNavigate={closeNavigate}
        />
      );
    } else if (filter) {
      return (
        <FilterButton
          key="filter-title"
          isWhite={white}
          toggleModal={toggleModal}
        />
      );
    } else if (search) {
      return (
        <SearchButton
          key="filter-title"
          isWhite={white}
          toggleModal={toggleModal}
        />
      );
    } else {
      return <Block />;
    }
  };
  render() {
    const {
      back,
      close,
      filter,
      search,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      closeNavigate,
      toggleModal,
      ...props
    } = this.props;
    const headerStyles = [
      transparent
        ? {
            backgroundColor: "transparent",
          }
        : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <SafeAreaView style={headerStyles}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <NavBar
          title={title}
          titleStyle={[
            styles.title,
            {
              textAlign: "center",
              color: wezonTheme.COLORS[white ? "HEADER" : "HEADER"],
            },
            titleColor && { color: titleColor },
          ]}
          style={navbarStyles}
          back={back}
          left={this.renderLeft()}
          leftStyle={{
            paddingVertical: 12,
          }}
          right={this.renderRight()}
          rightStyle={{}}
          transparent={transparent}
          {...props}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  navbar: {
    height: Platform.OS === "android" ? 55 : 50,
    marginTop: Platform.OS === "android" ? 20 : 0,
    alignItems: "center",
    textAlign: "justify",
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    zIndex: 5,
  },
  header: {
    backgroundColor: "transparent",
  },
});

export default withNavigation(Header);
