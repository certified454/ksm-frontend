import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>

export default function Search({isVisible, children, onClose}:Props) {
    return (
        <KeyboardAvoidingView>
            <View>
                <Modal visible={isVisible}  presentationStyle="pageSheet" >
                    <View style={style.modalContainer}>
                        <View style={style.titleContainer}>
                            <Text style={style.text}>Search results</Text>
                             <Pressable onPress={onClose} style={style.press}>
                               <Ionicons name="close" size={28} color={'#4B0082'} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={style.childrenContainer}>
                        { children }
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        top: 30,
        height: '100%',
        width: '100%',
        position: "absolute",
    },
    titleContainer: {
        height: '5%',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    press: {
        flexDirection: 'row',
        alignItems: 'center', 
        position: 'absolute', 
        top: 20, 
        right: 28    },
    childrenContainer: {
        flex: 1,
        top: 110,
        alignItems: 'center',
        gap: 40
    }, 
    text: {
        fontSize: 20,
        top: 20,
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 20
    }
})