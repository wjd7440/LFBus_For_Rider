import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-fontawesome-pro";

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtons: this.validate(this.props.radioButtons),
    };
  }

  validate(data) {
    let selected = false; // Variable to check if "selected: true" for more than one button.
    data.map((e) => {
      e.color = e.color ? e.color : "#444";
      e.disabled = e.disabled ? e.disabled : false;
      e.label = e.label ? e.label : "You forgot to give label";
      e.layout = e.layout ? e.layout : "row";
      e.selected = e.selected ? e.selected : false;
      if (e.selected) {
        if (selected) {
          e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
          console.log('Found "selected: true" for more than one button');
        } else {
          selected = true;
        }
      }
      e.size = e.size ? e.size : 24;
      e.value = e.value ? e.value : e.label;
    });
    if (!selected) {
      data[0].selected = true;
    }
    return data;
  }

  onPress = (label) => {
    const radioButtons = this.state.radioButtons;
    const selectedIndex = radioButtons.findIndex((e) => e.selected == true);
    const selectIndex = radioButtons.findIndex((e) => e.label == label);
    if (selectedIndex != selectIndex) {
      radioButtons[selectedIndex].selected = false;
      radioButtons[selectIndex].selected = true;
      this.setState({ radioButtons });
      this.props.onPress(this.state.radioButtons);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flexDirection: this.props.flexDirection, marginTop: 10 }}
        >
          {this.state.radioButtons.map((data) => (
            <RadioButton key={data.label} data={data} onPress={this.onPress} />
          ))}
        </View>
      </View>
    );
  }
}

class RadioButton extends Component {
  render() {
    const data = this.props.data;
    const opacity = data.disabled ? 0.2 : 1;
    let layout = {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 30,
    };
    let margin = { marginLeft: 10 };
    if (data.layout === "column") {
      layout = { alignItems: "center" };
      margin = { marginTop: 10 };
    }
    return (
      <TouchableOpacity
        style={[
          layout,
          margin,
          {
            backgroundColor: data.backgroundBtnColor,
            width: data.width,
            marginTop: data.marginTop ? 10 : 0,
          },
        ]}
        onPress={() => {
          data.disabled ? null : this.props.onPress(data.label);
        }}
      >
        <View
          style={[
            styles.border,
            {
              backgroundColor: data.backgroundIconColor,
              width: data.size,
              height: data.size,
              borderRadius: data.size / 2,
            },
          ]}
        >
          {data.selected && (
            <Icon name="check" type="regular" size={20} color={"#fff"} />
          )}
        </View>
        <Text style={[{ alignSelf: "center", fontSize: 16 }, margin]}>
          {data.label}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  Radiobtn: {
    width: "50%",
  },
  border: {
    justifyContent: "center",
    alignItems: "center",
  },
});
