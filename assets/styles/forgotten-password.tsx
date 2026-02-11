import { StyleSheet } from "react-native";
import { normalizeFont, scale, vScale } from "./responsive";

const forgotPasswordStyles = (screenWidth: number, screenHeight: number) =>
  StyleSheet.create({
    container: {
      padding: vScale(20, screenHeight),
      alignContent: "center",
      gap: vScale(20, screenHeight),
      alignItems: "center",
    },
    icons: {
      width: scale(40, screenWidth),
      height: scale(40, screenWidth),
      borderWidth: 1,
      borderColor: "#00000031",
      marginTop: vScale(10, screenHeight),
      marginLeft: scale(7, screenWidth),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: scale(5, screenWidth),
    },
    arrow: {
      marginLeft: scale(7, screenWidth),
    },
    header: {
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: scale(10, screenWidth),
      gap: scale(35, screenWidth),
      marginBottom: vScale(30, screenHeight),
    },
    title: {
      fontSize: normalizeFont(22, screenWidth, screenHeight),
      fontWeight: "bold",
      fontFamily: "serif",
      color: "#4B0082",
    },
    iconContainer: {
      marginTop: vScale(20, screenHeight),
    },
    subtitle: {
      fontSize: normalizeFont(16, screenWidth, screenHeight),
      textAlign: "center",
      marginVertical: vScale(10, screenHeight),
      color: "#4B0082",
    },
    inputContainer: {
      width: "100%",
      marginBottom: vScale(10, screenHeight),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    input: {
      width: "100%",
      height: vScale(45, screenHeight),
      padding: scale(10, screenWidth),
      borderWidth: 1,
      borderColor: "#4B0082",
      borderRadius: Math.min(scale(5, screenWidth), vScale(5, screenHeight)),
      marginBottom: vScale(10, screenHeight),
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    icon: {
      position: "absolute",
      right: scale(15, screenWidth),
      top: vScale(12, screenHeight),
    },
    button: {
      backgroundColor: "#4B0082",
      padding: scale(10, screenWidth),
      borderRadius: Math.min(scale(5, screenWidth), vScale(5, screenHeight)),
      width: "100%",
    },
    buttonText: {
      fontSize: normalizeFont(16, screenWidth, screenHeight),
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
    },
  });

export default forgotPasswordStyles;
