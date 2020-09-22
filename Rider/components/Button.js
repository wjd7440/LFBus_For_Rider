import React from "react";
import {StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {Button} from "galio-framework";

import wezonTheme from "../constants/Theme";

class ArButton extends React.Component {
  render() {
    const {
      small,
      medium,
      large,
      shadowless,
      children,
      color,
      style,
      fontSize,
      width,
      round,
      ...props
    } = this.props;

    const colorStyle = color && wezonTheme.COLORS[color.toUpperCase()];

    const buttonStyles = [
      color && {backgroundColor: colorStyle},
      !shadowless && styles.shadow,
      width && {width: "auto"},
      round && {borderRadius: 100},
      {...style},
    ];

    return (
      <Button
        style={buttonStyles}
        textStyle={{fontSize: fontSize || 12, fontWeight: "700"}}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

ArButton.propTypes = {
  small: PropTypes.bool,
  shadowless: PropTypes.bool,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      "default",
      "primary",
      "secondary",
      "info",
      "error",
      "success",
      "warning",
      "orange",
    ]),
  ]),
};

const styles = StyleSheet.create({
  smallButton: {
    width: 75,
    height: 40,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  orange: {
    backgroundColor: "#FDB62B",
  },
});

export default ArButton;
