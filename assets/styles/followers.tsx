import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: '100%',
        gap: 20,
        backgroundColor: '#fff'
    },
    backIcon: {
        marginLeft: 10,
    },
    username: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '90%',
        top: 5,
        padding: 5
    },
    followersusername: {
        fontWeight: '500',
        fontSize: screenHeight * 0.02,
    },
    text: {
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: screenHeight * 0.025,
    },
    container: {
        width: '100%',
        minHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerClick: {
        width: '100%',
        minHeight: 60,
        gap: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#8b8b8b56',
        borderBottomWidth: 1
    },
    imageContainer: {
        width: screenWidth * 0.15,
        height: screenHeight * 0.07,
        borderRadius: 100,
        borderColor: '#cccccc',
        backgroundColor: '#d9d9d9',
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        overflow: 'hidden',
        shadowOpacity: 0.05,
        elevation: 1,
    },
    image: {
        width:'100%',
        height: '100%',
        borderRadius: 100,
    },
    hobbiesContainer: {
        width: screenWidth / 5,
        height: screenHeight * 0.03,
        position: 'absolute',
        right: 30,
        backgroundColor: '#f0f0f0',
    }
})

export default styles;