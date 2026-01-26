import { StyleSheet } from "react-native";
import { normalizeFont, scale, vScale } from "./responsive";

/**
 * Create styles using current screen dimensions.
 * Usage in component:
 *   const { width, height } = useWindowDimensions();
 *   const styles = createAddNewsStyles(width, height);
 */
const createAddNewsStyles = (screenWidth: number, screenHeight: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: vScale(16, screenHeight), // example: prefer vScale or scale
      backgroundColor: "#fff",
      gap: vScale(16, screenHeight),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    backIcon: {
      marginTop: vScale(8, screenHeight),
      width: scale(43, screenWidth),
      height: vScale(42, screenHeight),
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: scale(10, screenWidth),
      borderRadius: Math.round(scale(8, screenWidth)),
      borderWidth: 1,
      borderColor: "#cccccc",
    },
    title: {
      fontSize: normalizeFont(16, screenWidth, screenHeight),
      fontWeight: "bold",
      marginTop: vScale(8, screenHeight),
    },
    descriptionContainer: {
      marginTop: vScale(16, screenHeight),
      padding: vScale(2, screenHeight),
      backgroundColor: "#ffffff",
      borderRadius: Math.round(scale(8, screenWidth)),
      width: "97%",
      height: vScale(160, screenHeight),
      textAlignVertical: "top",
      borderWidth: 1,
      borderColor: "#cccccc",
    },
    descriptionTextInput: {
      width: "100%",
      height: "85%",
      textAlignVertical: "top",
      fontSize: normalizeFont(12, screenWidth, screenHeight),
    },
    picture1Container: {
      width: "47%",
      height: vScale(160, screenHeight),
      marginTop: vScale(16, screenHeight),
    },
    picture1: {
      width: "100%",
      height: vScale(160, screenHeight),
      borderWidth: 1,
      borderColor: "#cccccc",
      borderRadius: Math.round(scale(8, screenWidth)),
    },
    // ...other styles converted similarly...
    submitButton: {
      width: "100%",
      height: vScale(48, screenHeight),
      backgroundColor: "#4B0082",
      marginTop: vScale(72, screenHeight),
      borderRadius: Math.round(scale(6, screenWidth)),
      justifyContent: "center",
    },
    submitButtonText: {
      color: "#ffffff",
      fontSize: normalizeFont(16, screenWidth, screenHeight),
      fontWeight: "bold",
      textAlign: "center",
    },
    imagesContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: scale(8, screenWidth),
    },
    text: {
      fontSize: normalizeFont(12, screenWidth, screenHeight),
    },
    picture2: {
      width: "100%",
      height: vScale(160, screenHeight),
      borderWidth: 1,
      borderColor: "#cccccc",
      borderRadius: Math.round(scale(8, screenWidth)),
    },
    selectImageText: {
      textAlign: "center",
      marginTop: vScale(60, screenHeight),
      fontSize: normalizeFont(12, screenWidth, screenHeight),
      color: "#888888",
    },
  });

export default createAddNewsStyles;
