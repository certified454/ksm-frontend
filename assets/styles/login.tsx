import { StyleSheet } from "react-native";
import { normalizeFont, scale, vScale } from "./responsive";

/**
 * Create styles using current screen dimensions.
 * Usage in component:
 *   const { width, height } = useWindowDimensions();
 *   const styles = indexScreenStyles(width, height);
 */
const loginStylesScreen = (screenWidth: number, screenHeight: number) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    container: {
      flex: 1,
      backgroundColor: "#4B0082",
    },
    card: {
      width: scale(330, screenWidth),
      height: vScale(300, screenHeight),
      borderRadius: Math.min(scale(20, screenWidth), vScale(20, screenHeight)),
      alignItems: "center",
    },
    cardView: {
      width: scale(330, screenWidth),
      alignItems: "center",
      flexDirection: "row",
      marginTop: scale(10, screenHeight),
      justifyContent: "space-evenly",
    },
    cardposition: {
      position: "absolute",
      color: "#000",
      fontSize: normalizeFont(14, screenWidth, screenHeight),
    },
    cardform: {
      flex: 1,
      backgroundColor: "#fff",
      width: "100%",
      height: screenHeight / 2.5,
      borderRadius: 10,
      marginTop: 10,
      padding: 20,
      overflow: "hidden",
    },
    cardformContainer: {
      flex: 1,
      backgroundColor: "#fff",
      width: "100%",
      height: screenHeight / 2.5,
      borderRadius: 20,
      marginTop: 10,
      padding: 20,
      overflow: "hidden",
      top: screenHeight * 0.18,
    },
    textinput: {
      color: "#000",
      alignSelf: "flex-start",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
    },
    textinputItem: {
      color: "#000",
      alignSelf: "flex-start",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
      marginTop: scale(15, screenHeight),
    },
    eyeicon: {
      bottom: screenHeight * 0.044,
      right: screenWidth * 0.05,
      alignSelf: "flex-end",
    },
    text: {
      color: "#4B0082",
      fontSize: 25,
      fontWeight: "bold",
      fontFamily: "serif",
    },
    textWelcome: {
      fontWeight: "bold",
      fontFamily: "serif",
      top: screenHeight * 0.1,
      color: "#fff",
      left: screenWidth * 0.2,
      fontSize: normalizeFont(26, screenWidth, screenHeight),
    },
    fonttext: {
      color: "#fff",
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    register: {
      fontSize: normalizeFont(19, screenWidth, screenHeight),
      color: "#4B0082",
      fontWeight: "bold",
    },
    accountText: {
      fontSize: normalizeFont(17, screenWidth, screenHeight),
      color: "#000",
    },
    login: {
      color: "#fff",
      fontSize: normalizeFont(19, screenWidth, screenHeight),
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
    },
    fontText: {
      color: "#4B0082",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
      marginTop: 20,
      alignSelf: "flex-end",
    },
    image: {
      width: 400,
      height: 250,
      borderRadius: 30,
    },
    inputform: {
      height: 45,
      width: scale(340, screenWidth),
      color: "#000",
      backgroundColor: "white",
      borderColor: "#00000031",
      borderWidth: 1,
      borderRadius: scale(5, screenWidth),
      padding: scale(10, screenWidth),
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    button: {
      backgroundColor: "#4B0082",
      color: "#fff",
      width: "95%",
      height: "auto",
      textAlign: "center",
      padding: 10,
      borderRadius: 5,
      marginTop: 70,
    },
    buttonInside: {
      backgroundColor: "#4B0082",
      width: "95%",
      height: "18%",
      borderRadius: Math.min(scale(8, screenWidth), vScale(5, screenHeight)),
      marginTop: "30%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttontext: {
      color: "#fff",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
    },
    onpress: {
      backgroundColor: "#fff",
      borderColor: "#ACACAC",
      borderWidth: 1,
      textAlign: "center",
      width: "70%",
      padding: scale(10, screenWidth),
      borderRadius: Math.min(scale(5, screenWidth), vScale(5, screenHeight)),
      marginTop: scale(20, screenHeight),
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
  });

export default loginStylesScreen;
