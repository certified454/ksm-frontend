import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:  screenHeight * 0.02,
        backgroundColor: '#fff',
        gap: screenHeight * 0.02,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    backIcon: {
        marginTop: screenHeight * 0.01,
        width: screenWidth * 0.11,
        height: screenHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: screenWidth * 0.025,
        borderRadius: screenWidth * 0.02,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    title: {
        fontSize: screenHeight * 0.022,
        fontWeight: 'bold',
        marginTop: screenHeight * 0.01,
    },
    deiscriptionContainer:{
        marginTop: screenHeight * 0.02,
        padding: screenHeight * 0.0015,
        backgroundColor: '#ffffff',
        borderRadius: screenWidth * 0.02,
        width: '97%',
        height: screenHeight * 0.2,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    deiscriptionTextInput : {
        width: '100%',
        height: '85%',
        textAlignVertical: 'top',
    },
    picture1Container: {
        width: '47%',
        height: screenHeight * 0.2,
        marginTop: screenHeight * 0.02,
    },
    picture1 : {
        width: '100%',
        height: screenHeight * 0.2,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: screenWidth * 0.02,
    },
    picture2: {
        width: '100%',
        height: screenHeight * 0.2,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: screenWidth * 0.02,
    },
    text: {
        marginBottom: screenHeight * 0.01,
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectImageText: {
        marginTop: screenHeight * 0.08,
        marginLeft: screenWidth * 0.06,
        color: '#888888',
    },
    submitButton: {
        width: '100%',
        height: screenHeight * 0.06,
        backgroundColor: '#4B0082',
        marginTop: screenHeight * 0.09,
        borderRadius: screenWidth * 0.01,
        justifyContent: 'center'
    },
    submitButtonText: {
        color: '#ffffff', 
        fontSize: screenHeight * 0.020, 
        fontWeight: 'bold', 
        textAlign: 'center'
    }
});
export default styles;