import React from "react";
import { Switch, Platform } from "react-native";

import wezonTheme from "../constants/Theme";

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor =
      Platform.OS === "ios"
        ? null
        : Platform.OS === "android" && value
        ? wezonTheme.COLORS.SWITCH_ON
        : wezonTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={wezonTheme.COLORS.SWITCH_OFF}
        trackColor={{
          false: wezonTheme.COLORS.SWITCH_ON,
          true: wezonTheme.COLORS.SWITCH_ON
        }}
        {...props}
      />
    );
  }
}

export default MkSwitch;
