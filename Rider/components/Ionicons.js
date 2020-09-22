import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

const Icon = ({ focused = true, name, color = styles.blackColor, size = 30 }) =>
  <Ionicons
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};

export default Icon;
