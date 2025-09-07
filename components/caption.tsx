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
        flex: 1,
        height: 'auto',
        width: '100%',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
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
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
})
