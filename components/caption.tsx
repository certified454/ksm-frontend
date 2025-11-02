import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren <{
    isVisible: boolean;
    onClose: () => void
}>

export default function EditPost({isVisible, children, onClose}: Props) {
    return(
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={style.modalContent}>
                    <View style={style.titleContainer}>
                        <Text style={style.title}> Edit Post</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close" size={25} color={'#4B0082'}/>
                        </Pressable>
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    )
}
 const style = StyleSheet.create({
    modalContent: {
        minHeight: 500,
        maxHeight: '80%',
        overflow: 'hidden',
        width: '100%',
        position: 'absolute',
        top: 35,
    },
    titleContainer: {
        height: 45,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
})
