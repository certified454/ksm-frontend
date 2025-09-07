import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren <{
    isVisible: boolean;
    onClose: () => void
}>

export default function CreateVideoPage({isVisible, children, onClose}: Props) {
    return(
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={style.modalContent}>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>Create Analysis</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close-circle-outline" size={35} color={'#000'}/>
                        </Pressable>
                    </View>
                    <View style={style.childrenContainer}>
                        { children }
                    </View>
                </View>
            </Modal>
        </View>
    )
}
 const style = StyleSheet.create({
     modalContent: {
        height: '100%',
        width: '100%',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        flex: 1,
        backgroundColor: '#4c008223'
    },
    titleContainer: {
        backgroundColor: '#fff',
        height: '7%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#000',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    childrenContainer: {
        flex: 1,
        alignItems: 'center'
    }
})
