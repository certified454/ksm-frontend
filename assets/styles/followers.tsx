import { StyleSheet, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },
    username: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '90%',
        top: 5,
        padding: 5
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
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
        margin: 2,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#8b8b8b56',
        borderBottomWidth: 1
    },
    image: {
        width: screenWidth * 0.15,
        height: screenWidth * 0.15,
        borderRadius: 100
    },
    cancel: {
        position: 'relative',
        right: 55,
    }
})

export default styles;