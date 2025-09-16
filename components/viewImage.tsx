import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

type Props = PropsWithChildren <{
    isVisible: boolean;
    onClose: () => void;
}>

export default function ViewImage({isVisible, children, onClose}:Props) {
    return(
        <View>
            <Modal  visible={isVisible}>
                <View style={style.modalContainer}>
                    <View style={style.titleContainer}>
                        <Pressable onPress={onClose}>
                            <Ionicons  name="arrow-back" size={30} color={'#ffffff'}/>
                        </Pressable>
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: "absolute",
        backgroundColor: '#000000'
    },
    titleContainer: {
        height: '5%',
        paddingLeft: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        top: 30,
        alignItems: 'center',
        justifyContent: "space-between"
    }
})