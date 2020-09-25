import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import {
  RESERVATION_LIST_QUERY,
  BUS_INFO_SEAT1_EDIT_QUERY,
  BUS_INFO_SEAT2_EDIT_QUERY,
} from "../Queries";
import { useMutation } from "react-apollo-hooks";

export default ({ route }) => {
  const [busInfoSeat1EditMutation] = useMutation(BUS_INFO_SEAT1_EDIT_QUERY);
  const [busInfoSeat2EditMutation] = useMutation(BUS_INFO_SEAT2_EDIT_QUERY);
  const [seat1, setSeat1] = useState(false);
  const [seat2, setSeat2] = useState(false);
  const CAR_REG_NO = route.params ? route.params.busCarRegNo : null;
  const { data, loading } = useQuery(RESERVATION_LIST_QUERY, {
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

  if (loading) {
    return <Text>승차알림 데이터를 로딩중입니다.</Text>;
  } else {
    return (
      <View>
        {data.RiderReservationList.reservations.map((rowData, index) => {
          return (
            <View key={index}>
              <Text>승차 정류장 : {rowData.departureStation}</Text>
              <Text>하차 정류장 : {rowData.arrivalStation}</Text>
              <Text>보조장비 : {rowData.equipment}</Text>
            </View>
          );
        })}
        <View>
          <CheckBox
            index="1"
            value={seat1}
            onValueChange={() => {
              seat1Change();
            }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>좌석1</Text>
        </View>

        <View>
          <CheckBox
            index="2"
            value={seat2}
            onValueChange={() => {
              seat2Change();
            }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>좌석2</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
