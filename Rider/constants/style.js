import { StyleSheet, Dimensions } from "react-native";
import { theme } from "galio-framework";

const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    paddingVertical: theme.SIZES.BASE,
  },
  containerH: {
    paddingHorizontal: theme.SIZES.BASE * 1.2,
  },
  leftAb: {
    left: theme.SIZES.BASE * 1.2,
  },
  rightAb: {
    right: theme.SIZES.BASE * 1.2,
  },
  shadow: {
    backgroundColor: "#fff",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
  emptyLine: {
    height: 5,
    backgroundColor: "#f5f5f5",
    marginHorizontal: -theme.SIZES.BASE * 1.2,
    marginVertical: 30,
  },
  itemBox: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  colum3: {
    width:
      Dimensions.get("window").width * 0.348888888888888888 -
      theme.SIZES.BASE * 1.2,
    borderWidth: 1,
  },
  marginPull: {
    marginHorizontal: -theme.SIZES.BASE * 1.2,
  },
  sectionTit: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#767676",
  },
  onButton: {
    backgroundColor: "#4B56F1",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 4,
  },
  onButtonTxt: {
    fontSize: 16,
    color: "#fff",
  },
  offButton: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDDDF",
    borderRadius: 4,
  },
  offButtonTxt: {
    fontSize: 16,
    color: "#A3A4A9",
  },
  formControl: {
    paddingVertical: 15,
  },
  formControlTit: {
    fontSize: 16,
    marginBottom: 7,
    fontWeight: "bold",
  },
  defalutForm: {
    backgroundColor: "#efefef",
    paddingLeft: 15,
    height: 54,
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  defalutFormTxt: {
    fontSize: 16,
    color: "#565656",
  },
});
