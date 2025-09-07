import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren <{
    isVisible: boolean;
    onClose: () => void
}>

export default function UserDetailPage({isVisible, children, onClose}: Props) {
    const { user } = useAuthStore();
    return(
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={style.modalContent}>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>{user?.username}'s profile details</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close" size={25} color={'#4B0082'}/>
                        </Pressable>
                    </View>
                    <View style={style.childrenContainer}>
                        {children}
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
        backgroundColor: '#fff'
    },
    titleContainer: {
        height: 45,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#4B0082',
        fontSize: 20,
        fontWeight: 'bold'
    },
    childrenContainer: {
        flex: 1,
        top: 10,
        alignItems: 'center',
        gap: 40
    },
})
