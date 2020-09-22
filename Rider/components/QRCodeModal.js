import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useIsModalVisible, useToggleModal } from "../AuthContext";
import { useMutation, useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { ACCOUNT_INFO_QUERY } from "../screens/Queries";

import { Block, Text, theme } from "galio-framework";
import { wezonTheme } from "../constants";
import Loader from "../components/Loader";
import QRCode from "react-native-qrcode-svg";
import Modal from "react-native-modal";
const ACCOUNT_BY_USERID = gql`
  query {
    WalletAccountUser {
      userId
    }
  }
`;
const { width, height } = Dimensions.get("screen");

export default () => {
  const isVisible = useIsModalVisible();
  const toggleModal = useToggleModal();
  const [userId, setUserId] = useState("");

  const { data, loading } = useQuery(ACCOUNT_BY_USERID);

  if (loading) {
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          toggleModal();
        }}
        swipeDirection={["up", "left", "right", "down"]}
        style={styles.modal}
      >
        <Loader />
      </Modal>
    );
  } else {
    const {
      WalletAccountUser: { userId },
    } = data;
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
        <Block flex={0.5} style={styles.modalContent}>
          <Block row style={styles.modalHeader}>
            <Block flex />
            <Block flex={2} center>
              <Text bold size={18} color={"#333"}>
                나의 QR코드
              </Text>
            </Block>
            <Block flex right>
              <TouchableOpacity
                style={styles.closeBtn}
                shadowless
                onPress={() => {
                  toggleModal();
                }}
              >
                <Text size={16} color={"#666"}>
                  닫기
                </Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex middle style={styles.modalBody}>
            <Block style={styles.QRCodeBox}>
              <QRCode
                value={userId}
                size={200}
                bgColor="#eee"
                fgColor="transparent"
                onError={(e) => {
                  console.log(e);
                }}
              />
            </Block>
            <Text style={{ marginTop: 15 }} size={20}>
              송금받기 위해 QR코드를 보여주세요.
            </Text>
          </Block>
        </Block>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  /* modal */
  titleBar: {
    backgroundColor: "#FABB72",
    opacity: 0.8,
    height: 6,
    marginTop: -6,
    borderRadius: 5,
    zIndex: -1,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    width: width,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  modalHeader: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#eee",
    borderBottomWidth: 1,
  },
  modalBody: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
  },
  closeBtn: {
    height: 50,
    width: 50,
    justifyContent: "center",
  },
  QRCodeBox: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
  QRCode: {},
});
