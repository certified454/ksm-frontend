import iconSet from '@expo/vector-icons/build/Fontisto';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignContent: 'center', 
        gap: 10, 
        alignItems: 'center'
    },
    icons: {
        top: 20,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'serif',
        marginTop: 30,
        color: '#4B0082'
    },
    iconContainer: { 
        marginTop: 20 
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        color: '#4B0082'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#4B0082',
        borderRadius: 4,
        marginBottom: 16,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    button: {
        backgroundColor: '#4B0082',
        padding: 12,
        borderRadius: 4,
        width: '100%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default styles;