import { StyleSheet } from "react-native";
import { normalizeFont, scale } from "./responsive";

const followStyles = (screenWidth: number, screenHeight: number) =>
  StyleSheet.create({
    flatList: {
      flex: 1,
      width: "100%",
      gap: scale(25, screenWidth),
      backgroundColor: "#fff",
    },
    backIcon: {
      marginLeft: scale(10, screenWidth),
    },
    userInfor: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(20, screenWidth),
      width: "90%",
      padding: 5,
    },
    back: {
      width: scale(45, screenWidth),
      height: scale(45, screenWidth),
      borderWidth: 1,
      borderColor: "#00000031",
      marginLeft: scale(18, screenWidth),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(8, screenWidth),
    },
    followersusername: {
      fontWeight: "500",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
    },
    text: {
      fontWeight: "bold",
      fontFamily: "serif",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
    },
    container: {
      width: "100%",
      minHeight: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerClick: {
      width: "100%",
      minHeight: 60,
      gap: 10,
      paddingLeft: 10,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: "#8b8b8b56",
      borderBottomWidth: 1,
    },
    imageContainer: {
      width: scale(50, screenWidth),
      height: scale(50, screenWidth),
      borderRadius: Math.round(scale(100, screenWidth)),
      borderColor: "#cccccc",
      backgroundColor: "#d9d9d9",
      marginTop: 0,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      overflow: "hidden",
      shadowOpacity: 0.05,
      elevation: 1,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });

export default followStyles;
