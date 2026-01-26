import { StyleSheet } from "react-native";
import { normalizeFont, scale, vScale } from "./responsive";

/**
 * Create styles using current screen dimensions.
 * Usage in component:
 *   const { width, height } = useWindowDimensions();
 *   const styles = indexScreenStyles(width, height);
 */
const registerScreenStylesindexScreenStyles = (
  screenWidth: number,
  screenHeight: number,
) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#fff",
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      gap: 10,
      alignItems: "center",
    },
    card: {
      width: "auto",
      height: "auto",
      borderRadius: Math.min(scale(20, screenWidth), vScale(20, screenHeight)),
      alignItems: "center",
      top: 10,
    },
    cardItem: {
      borderRadius: scale(10, screenWidth),
      alignItems: "center",
      marginTop: scale(10, screenHeight),
    },
    cardItems: {
      width: scale(350, screenWidth),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    textInputView: {
      flexDirection: "row",
      alignItems: "center",
    },
    cardposition: {
      position: "absolute",
      color: "#000",
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    passwordContainer: {
      position: "absolute",
      right: 20,
    },
    cardform: {
      flex: 1,
      backgroundColor: "#000",
      width: "100%",
      height: "auto",
      borderRadius: 10,
      marginTop: 20,
      padding: 20,
      justifyContent: "center",
      overflow: "hidden",
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
      marginTop: 20,
    },
    profilePicture: {
      width: scale(100, screenWidth),
      height: vScale(100, screenHeight),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: Math.min(scale(50, screenWidth), vScale(50, screenHeight)),
      marginTop: 20,
    },
    profilePicturePlaceholder: {
      width: (screenWidth / 3) * 1.5,
      height: (screenHeight / 11) * 1.5,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    placeholderText: {
      color: "#4B0082",
      fontSize: normalizeFont(14, screenWidth, screenHeight),
      textAlign: "center",
    },
    text: {
      color: "#4B0082",
      fontSize: 25,
      fontWeight: "bold",
      fontFamily: "serif",
    },
    back: {
      width: scale(45, screenWidth),
      height: vScale(45, screenHeight),
      borderRadius: Math.min(scale(8, screenWidth), vScale(20, screenHeight)),
      borderWidth: 1,
      borderColor: "#00000031",
      padding: scale(5, screenWidth),
      justifyContent: "center",
      alignItems: "center",
    },
    arrow: {
      marginLeft: scale(3, screenHeight),
    },
    createText: {
      color: "#4B0082",
      fontSize: normalizeFont(22, screenWidth, screenHeight),
      fontWeight: "bold",
      fontFamily: "serif",
    },
    verifyAccount: {
      color: "#4B0082",
      fontSize: normalizeFont(22, screenWidth, screenHeight),
      fontWeight: "bold",
      fontFamily: "serif",
      marginTop: scale(10, screenHeight),
    },
    inputForm: {
      marginTop: scale(20, screenHeight),
      borderBottomWidth: 1,
      width: scale(350, screenWidth),
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    code: {
      marginTop: scale(20, screenHeight),
      borderBottomWidth: 1,
      width: scale(200, screenWidth),
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    pen: {
      bottom: vScale(30, screenHeight),
      right: scale(55, screenWidth),
      alignSelf: "flex-end",
    },
    fonttext: {
      color: "#fff",
      fontSize: normalizeFont(18, screenWidth, screenHeight),
      fontWeight: "bold",
      textAlign: "center",
    },
    login: {
      fontSize: normalizeFont(18, screenWidth, screenHeight),
      fontWeight: "bold",
      color: "#4B0082",
    },
    fontText: {
      fontSize: normalizeFont(16, screenWidth, screenHeight),
      color: "#000",
    },
    sepration: {
      fontSize: normalizeFont(16, screenWidth, screenHeight),
      color: "#000",
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
      borderColor: "#00000031",
      borderWidth: 1,
      backgroundColor: "transparent",
      borderRadius: 5,
      padding: scale(10, screenWidth),
    },
    button: {
      backgroundColor: "#4B0082",
      color: "#fff",
      width: scale(350, screenWidth),
      height: vScale(50, screenHeight),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      marginTop: scale(10, screenHeight),
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
      color: "#000",
      width: "70%",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      fontSize: normalizeFont(16, screenWidth, screenHeight),
    },
    passwordStrenght: {
      flexDirection: "row",
      marginTop: scale(8, screenHeight),
      gap: 4,
    },
    passwordBar: {
      flex: 1,
      height: vScale(4, screenHeight),
      backgroundColor: "#e0e0e0",
      borderRadius: Math.min(scale(2, screenWidth), vScale(2, screenHeight)),
    },
    passwordText: {
      marginTop: scale(4, screenWidth),
      fontSize: normalizeFont(14, screenWidth, screenHeight),
      fontWeight: "bold",
    },
    suggestPassword: {
      marginTop: scale(12, screenHeight),
      paddingVertical: scale(8, screenHeight),
      paddingHorizontal: 12,
      backgroundColor: "#f0f0f0",
      borderRadius: Math.min(scale(5, screenWidth), vScale(5, screenHeight)),
      borderWidth: 0.5,
      borderColor: "#00000031",
      alignItems: "center",
    },
    suggestText: {
      color: "#4B0082",
      fontWeight: "600",
      fontSize: normalizeFont(14, screenWidth, screenHeight),
    },
    sendCode: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: scale(20, screenHeight),
    },
    sellectProfile: {
      bottom: vScale(15, screenHeight),
    },
  });

export default registerScreenStylesindexScreenStyles;
