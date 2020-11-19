import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useFonts } from "@use-expo/font";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { useQuery } from "react-apollo-hooks";
import {
  RESERVATION_LIST_QUERY,
  BUS_INFO_SEAT1_EDIT_QUERY,
  BUS_INFO_SEAT2_EDIT_QUERY,
  BUS_INFO_DEVICETOKEN_EDIT_QUERY,
  RESERVATION_NOTICE_QUERY,
} from "../Queries";
import { useMutation } from "react-apollo-hooks";
import style from "../../../constants/style";
import { DataTable } from "react-native-paper";
import { Button } from "galio-framework";

export default ({ route }) => {
  // const noticeAlarm = !loading && !noticeLoading && notice && notice.RiderReservationNotice && notice.RiderReservationNotice.count;
      
  const fonts = useFonts({
    "Noto-100": require("../../../assets/fonts/NotoSansKR-Thin.otf"),
    "Noto-200": require("../../../assets/fonts/NotoSansKR-Light.otf"),
    "Noto-400": require("../../../assets/fonts/NotoSansKR-Regular.otf"),
    "Noto-500": require("../../../assets/fonts/NotoSansKR-Medium.otf"),
    "Noto-700": require("../../../assets/fonts/NotoSansKR-Bold.otf"),
    "Noto-900": require("../../../assets/fonts/NotoSansKR-Black.otf"),
  });

  const [busInfoDeviceTokenEditMutation] = useMutation(
    BUS_INFO_DEVICETOKEN_EDIT_QUERY
  );

  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }
    const {
      data: { RiderBusInfoDeviceTokenEdit },
    } = await busInfoDeviceTokenEditMutation({
      variables: {
        deviceToken: await Notifications.getExpoPushTokenAsync(),
        CAR_REG_NO: CAR_REG_NO,
      },
    });
  };
  
  const [busInfoSeat1EditMutation] = useMutation(BUS_INFO_SEAT1_EDIT_QUERY);
  const [busInfoSeat2EditMutation] = useMutation(BUS_INFO_SEAT2_EDIT_QUERY);
  const [seat1, setSeat1] = useState(false);
  const [seat2, setSeat2] = useState(false);
  const CAR_REG_NO = route.params ? route.params.busCarRegNo : null;
  const { data, loading, refetch } = useQuery(RESERVATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO,
    },
  });

  const { data:notice, noticeLoading , refetch:noticeRefetch } = useQuery(RESERVATION_NOTICE_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO,
    },
  });
   
  const seat1Change = async () => {
    setSeat1(!seat1);

    const {
      data: { RiderBusInfoSeat1Edit },
    } = await busInfoSeat1EditMutation({
      variables: {
        SEAT1: seat1,
        CAR_REG_NO: CAR_REG_NO,
      },
    });
  };
  const seat2Change = async () => {
    setSeat2(!seat2);

    const {
      data: { RiderBusInfoSeat2Edit },
    } = await busInfoSeat2EditMutation({
      variables: {
        SEAT2: seat2,
        CAR_REG_NO: CAR_REG_NO,
      },
    });
  };

  useEffect(() => {
    // getPushNotificationPermissions();      
    let timer = setInterval(() => {      
      refetch();      
      noticeRefetch();      
      // if(noticeAlarm > 0){
      //   test();
      // }
    }, 10000);

    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    });

    const test = async() => {

      const sound = new Audio.Sound();
  
      const status = {
        shouldPlay: true
      }
      sound.loadAsync(require('../../../assets/gogo.wav'), status, false);
  
      sound.playAsync()
    }


    if(!noticeLoading && notice && notice.RiderReservationNotice && notice.RiderReservationNotice.count > 0){
      test();
    }
  }, [notice]);

  if (loading || data.RiderReservationList.count < 1) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent={false}
          hidden={true}
        />
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 21, color: "#111", fontWeight: "bold" }}>
                좌석 현황
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxBox}>
                <CheckBox
                  index="1"
                  value={seat1}
                  tintColors={{ true: "#111", false: "#212121" }}
                  onValueChange={() => {
                    seat1Change();
                  }}
                  style={
                    seat1
                      ? {
                        ...styles.onCheckbox,
                      }
                      : {
                        ...styles.checkbox,
                      }
                  }
                />
                <Text
                  style={
                    seat1
                      ? {
                        ...styles.onLabel,
                      }
                      : {
                        ...styles.label,
                      }
                  }
                >
                  좌석1
                </Text>
              </View>

              <View style={styles.checkboxBox}>
                <CheckBox
                  index="2"
                  tintColors={{ true: "#111", false: "#212121" }}
                  value={seat2}
                  onValueChange={() => {
                    seat2Change();
                  }}
                  style={
                    seat2
                      ? {
                        ...styles.onCheckbox,
                      }
                      : {
                        ...styles.checkbox,
                      }
                  }
                />
                <Text
                  style={
                    seat2
                      ? {
                        ...styles.onLabel,
                      }
                      : {
                        ...styles.label,
                      }
                  }
                >
                  좌석2
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 21, color: "#111", fontWeight: "bold" }}>
                예약자 현황
              </Text>
            </View>

            <DataTable style={{ borderWidth: 1, borderColor: "#ddd", flex: 1 }}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title style={[styles.tableTh, styles.tableCell1]}>
                  <Text style={styles.tableThTxt}>결제 여부</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell2]}>
                  <Text style={styles.tableThTxt}>승차</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell3]}>
                  <Text style={styles.tableThTxt}>하차</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell4]}>
                  <Text style={styles.tableThTxt}>보조기구</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell5]}>
                  <Text style={styles.tableThTxt}>필요한 도움</Text>
                </DataTable.Title>
              </DataTable.Header>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ fontSize: 21 }}>
                  탑승 예약한 내역이 없습니다.
                </Text>
              </View>
            </DataTable>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent={false}
          hidden={true}
        />
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 21, color: "#111", fontWeight: "bold" }}>
                좌석 현황
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxBox}>
                <CheckBox
                  index="1"
                  value={seat1}
                  tintColors={{ true: "#111", false: "#212121" }}
                  onValueChange={() => {
                    seat1Change();
                  }}
                  style={
                    seat1
                      ? {
                        ...styles.onCheckbox,
                      }
                      : {
                        ...styles.checkbox,
                      }
                  }
                />
                <Text
                  style={
                    seat1
                      ? {
                        ...styles.onLabel,
                      }
                      : {
                        ...styles.label,
                      }
                  }
                >
                  좌석1
                </Text>
              </View>

              <View style={styles.checkboxBox}>
                <CheckBox
                  index="2"
                  tintColors={{ true: "#111", false: "#212121" }}
                  value={seat2}
                  onValueChange={() => {
                    seat2Change();
                  }}
                  style={
                    seat2
                      ? {
                        ...styles.onCheckbox,
                      }
                      : {
                        ...styles.checkbox,
                      }
                  }
                />
                <Text
                  style={
                    seat2
                      ? {
                        ...styles.onLabel,
                      }
                      : {
                        ...styles.label,
                      }
                  }
                >
                  좌석2
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 21, color: "#111", fontWeight: "bold" }}>
                예약자 현황
              </Text>
            </View>

            <DataTable style={{ borderWidth: 1, borderColor: "#ddd", flex: 1 }}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title style={[styles.tableTh, styles.tableCell1]}>
                  <Text style={styles.tableThTxt}>결제 여부</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell2]}>
                  <Text style={styles.tableThTxt}>승차</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell3]}>
                  <Text style={styles.tableThTxt}>하차</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell4]}>
                  <Text style={styles.tableThTxt}>보조기구</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.tableTh, styles.tableCell5]}>
                  <Text style={styles.tableThTxt}>필요한 도움</Text>
                </DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {data.RiderReservationList.reservations.map(
                  (rowData, index) => {
                    return (
                      <DataTable.Row style={styles.tableRow} key={index}>
                        <DataTable.Cell
                          style={[styles.tableTd, styles.tableCell1]}
                        >
                          <Text
                            // style={{
                            //   paddingVertical: 8,
                            //   paddingHorizontal: 12,
                            //   fontSize: 16,
                            //   backgroundColor: "red",
                            //   color: "#fff",
                            // }}
                          >
                            {rowData.pay ? <Text>결제 완료</Text> : <Text>-</Text> }
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[styles.tableTd, styles.tableCell2]}
                        >
                          <Text style={styles.tableTdTxt}>
                            {rowData.departureStation}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[styles.tableTd, styles.tableCell3]}
                        >
                          <Text style={styles.tableTdTxt}>
                            {rowData.arrivalStation}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[styles.tableTd, styles.tableCell4]}
                        >
                          <Text style={styles.tableTdTxt}>
                            {rowData.equipmentName}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={[styles.tableTd, styles.tableCell5]}
                        >
                          <Text style={styles.tableTdTxt}>{rowData.memo}</Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }
                )}
              </ScrollView>
            </DataTable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  ...style,
  top: {
    height: 150,
    marginBottom: 20,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: -5,
  },
  checkboxBox: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  checkbox: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderWidth: 10,
    borderColor: "red",
    width: "100%",
  },
  onCheckbox: {
    flex: 1,
    backgroundColor: "#FFDF00",
    width: "100%",
    borderRadius: 4,
  },
  label: {
    margin: 8,
    position: "absolute",
    top: "50%",
    right: 10,
    marginTop: -18,
    fontSize: 28,
    color: "#333",
  },
  onLabel: {
    margin: 8,
    position: "absolute",
    top: "50%",
    right: 10,
    marginTop: -18,
    fontSize: 28,
    color: "#111",
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
  },
  tableRow: {
    padding: 0,
    margin: 0,
    // backgroundColor: "red",
  },
  tableTh: {
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  tableThTxt: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#333",
  },
  tableTd: {
    justifyContent: "center",
    // borderWidth: 1,
    paddingHorizontal: 5,
  },
  tableTdTxt: {
    fontSize: 22,
  },
  titBox: {
    justifyContent: "center",
    backgroundColor: "#4B56F1",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
    borderRadius: 4,
  },
  tit: {
    fontSize: 21,
    fontWeight: "normal",
    color: "#fff",
  },
  subTit: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#676767",
  },
  tableCell1: {
    flex: 2,
  },
  tableCell2: {
    flex: 3,
  },
  tableCell3: { flex: 3 },
  tableCell4: { flex: 2 },
  tableCell5: { flex: 6 },
});
