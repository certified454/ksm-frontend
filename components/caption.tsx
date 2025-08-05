import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren <{
    isVisible: boolean;
    onClose: () => void
}>

export default function Caption({isVisible, children, onClose}: Props) {
    return(
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={style.modalContent}>
                    <View style={style.titleContainer}>
                        <Text style={style.title}> Read more</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close-circle-outline" size={35} color={'#fff'}/>
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
        height: 'auto',
        width: '100%',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff'
    },
    titleContainer: {
        height: 45,
        backgroundColor: '#4B0082',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
})
