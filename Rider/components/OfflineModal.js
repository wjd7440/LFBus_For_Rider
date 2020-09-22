import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { Block, Text, theme } from "galio-framework";
import AppStyle from "../constants/style";

import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-fontawesome-pro";

const { width, height } = Dimensions.get("screen");
export default () => {
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      //   console.log("Connection type", state.type);
      //   console.log("Is connected?", state.isConnected);
      setConnected(!state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <Modal
      isVisible={isConnected}
      deviceWidth={width}
      deviceHeight={height}
      style={styles.modal}
    >
      {Platform.OS === "android" ? (
        <StatusBar backgroundColor="rgba(0,0,0,0.8)" />
      ) : null}
      <Block flex style={{ ...styles.modalPanel }}>
        <Block flex={0.2} style={styles.modalContent}>
          <Block middle flex={0.6} style={{ padding: theme.SIZES.BASE * 2.5 }}>
            <Icon
              name="wifi-slash"
              type="regular"
              size={42}
              color={"#1A81FA"}
            />
            <Text style={{ marginTop: 5 }} center size={18} color={"#333"}>
              네트워크 상태를 확인해주세요.
            </Text>
          </Block>
          <Block flex={0.5}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                toggleModal();
              }}
            >
              <Text center size={18} color={"#fff"}>
                확인
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /* modal */
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalPanel: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  leftText: { height: 40, justifyContent: "center" },
  rightText: {
    height: 40,
    justifyContent: "center",
    fontFamily: "open-sans-bold",
  },
  closeBtn: {
    backgroundColor: "#1A81FA",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#1A81FA",
    paddingVertical: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
});
