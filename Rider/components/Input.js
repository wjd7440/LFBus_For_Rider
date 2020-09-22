import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { Input } from "galio-framework";

import { wezonTheme } from "../constants";

class ArInput extends React.Component {
  render() {
    const { shadowless, success, error } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      { ...this.props.style },
    ];

    return (
      <Input
        placeholderTextColor={wezonTheme.COLORS.MUTED}
        shadowless
        style={inputStyles}
        color={"#333"}
        {...this.props}
      />
    );
  }
}

ArInput.defaultProps = {
  shadowless: true,
  success: false,
  error: false,
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: wezonTheme.COLORS.BORDER,
    height: 50,
    backgroundColor: "#fff",
    margin: 0,
    paddingHorizontal: 0,
  },
  success: {
    borderColor: wezonTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: wezonTheme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: wezonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    shadowOpacity: 0.3,
    elevation: 2,
  },
});

export default ArInput;
