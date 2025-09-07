import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>

export default function UpdateUserProfile({isVisible, children, onClose}:Props) {
    return (
        <KeyboardAvoidingView>
            <View>
                <Modal visible={isVisible} animationType="fade">
                    <View style={style.modalContainer}>
                        <View style={style.titleContainer}>
                             <Pressable onPress={onClose} style={style.press}>
                                <Ionicons style={{top: 0}} name="arrow-back" size={30} color={'#4B0082'}/>
                                <Text style={{ left:15, fontSize: 20, fontWeight: 'bold'}}>Votes</Text>
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
        height: '100%',
        width: '100%',
        position: "absolute",
        backgroundColor: '#f9f9f9'
    },
    titleContainer: {
        height: '5%',
        paddingLeft: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    press: {
        flexDirection: 'row',
        alignItems: 'center', 
        position: 'absolute', 
        top: 20, left:10
    },
    childrenContainer: {
        flex: 1,
        top: 90,
        alignItems: 'center',
        gap: 40
    }
})