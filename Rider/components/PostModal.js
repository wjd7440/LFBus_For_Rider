import React, { useState } from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";

import Modal from "react-native-modal";

import { Block, Text, theme, Button, Input } from "galio-framework";
import Icon from "react-native-fontawesome-pro";
import { wezonTheme } from "../constants";

import Postcode from "react-native-daum-postcode";
const { width, height } = Dimensions.get("screen");

export default ({
  isVisible,
  toggleModal,
  handleZipcode,
  handleRoadAddress,
  handleJibunAddress,
  handleLongitude,
  handleLatitude,
}) => {
  const handleSelect = (item) => {
    handleZipcode(item.zonecode);
    handleRoadAddress(item.roadAddress);
    handleJibunAddress(item.address);
    if (handleLongitude && handleLatitude) {
      const API_KEY = "7da7d093496c67033d3e14aa3102e838";
      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${item.roadAddress}&size=15`;
      fetch(url, {
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          handleLongitude(json.documents[0].x);
          handleLatitude(json.documents[0].y);
        });
    }
    toggleModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        toggleModal();
      }}
      deviceWidth={width}
      deviceHeight={height}
      style={styles.modal}
    >
      {Platform.OS === "android" ? (
        <StatusBar backgroundColor="rgba(0,0,0,0.8)" />
      ) : null}
      <Block flex={0.6} style={styles.modalContent}>
        <Postcode
          style={{ flex: 1 }}
          jsOptions={{ animation: true }}
          onSelected={(data) => {
            handleSelect(data);
          }}
        />
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /* modal */
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  QRCodeBox: {},
  CloseMenu: {},
  CloseButton: {
    height: 55,
    fontFamily: "open-sans-bold",
  },
  /* modal */
  PostList: {
    backgroundColor: "#fff",
    height: 200,
  },
});
