import { StyleSheet } from "react-native";

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
        height: 'auto',
        top: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerClick: {
        width: '100%',
        height: 70,
        gap: 10,
        margin: 2,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#8b8b8b56',
        borderBottomWidth: 1
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    cancel: {
        position: 'relative',
        right: 55,
    }
})

export default styles;