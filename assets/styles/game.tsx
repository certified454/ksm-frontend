import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        gap: 10, 
        padding: 16,
        minHeight: '100%',
        alignItems: 'center',
        backgroundColor: '#fff', 
    },
    head: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '99%',
        height: screenHeight * 0.3,
        marginBottom: screenHeight * 0.02,
        borderRadius: screenHeight * 0.02,
        backgroundColor: '#4c00823e',
    },
    blurContainer: {
        padding: screenHeight * 0.01,
        width: '40%', 
        height: '50%',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 0,
        position: 'absolute',
        alignItems: 'center',
    },
    title: {
        fontSize: screenHeight * 0.020,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#4B0082',
        marginBottom: screenHeight * 0.025,
        marginTop: screenHeight * 0.01,
    },
    vsText: {
        fontSize: screenHeight * 0.030,
        fontWeight: 'bold',
        color: '#fff',
    },
    username: {
        fontSize: screenHeight * 0.020,
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontStyle: 'italic',
        color: '#4B0082',
    },
    userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        width: screenWidth * 0.18,
        height: screenHeight * 0.08,
        borderRadius: screenHeight * 0.04,
        marginBottom: screenHeight * 0.01,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    description: {
        fontSize: screenHeight * 0.020,
        right: '31%',
        marginTop: screenHeight * 0.01,
    },
    team: {
        fontSize: screenHeight * 0.020,
        color: '#4B0082',
        left: '32%',
        marginTop: screenHeight * 0.01,
        textDecorationLine: 'underline',
    },
    input: {
        width: '90%',
        padding: screenHeight * 0.015,
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 5,
        marginVertical: 10,
        fontSize: screenHeight * 0.016,
    },
    // gameContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // gameTitle: {
    //     fontSize: 32,
    //     fontWeight: 'bold',
    // },
    // gameDescription: {
    //     fontSize: 16,
    //     textAlign: 'center',
    //     marginVertical: 16,
    // // },
    button: {
        backgroundColor: '#4b0082',
        borderRadius: 4,
        width: screenWidth * 0.7,
        height: screenHeight * 0.055,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: screenHeight * 0.004,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: screenHeight * 0.019,
    },
});

export default styles;