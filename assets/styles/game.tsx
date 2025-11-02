import { StyleSheet } from "react-native";

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
        height: 230,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#4c008265',
    },
    blurContainer: {
        padding: 10,
        width: '40%', 
        height: '50%',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 0,
        position: 'absolute',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082',
        marginBottom: 20,
        top: 10,
    },
    vsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    description: {
        fontSize: 18,
        right: '33%',
        top: 10
    },
    team: {
        fontSize: 18,
        color: '#4B0082',
        left: '32%',
        top: 10,
        textDecorationLine: 'underline',
    },
    input: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 5,
        marginVertical: 10,
    },
    gameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameTitle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    gameDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 16,
    },
    buttonContainer: {
        marginTop: 20,
        width: '90%',
        height: 40,
        alignItems: 'center',
        backgroundColor: '#4B0082',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4B0082',
        padding: 12,
        borderRadius: 4,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default styles;