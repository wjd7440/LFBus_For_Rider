import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { RESERVATION_LIST_QUERY } from "../Queries";

export default ({ route }) => {
  const CAR_REG_NO = route.params ? route.params.busCarRegNo : null;
  const { data, loading } = useQuery(RESERVATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO,
    },
  });
  console.log(data);
  return (
    <View>
      <Text>hiqweqweqweqwewq</Text>
      <Text>hiqweqweqweqwewq</Text>
      <Text>hiqweqweqweqwewq</Text>
      <Text>hiqweqweqweqwewq</Text>
      <Text>hiqweqweqweqwewq</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    alignSelf: "center",
    padding: 5,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  viewStyle: {
    width: 200,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    position: "relative",
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainerViewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalViewStyle: {
    width: 300,
    height: 380,
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  container2: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});
