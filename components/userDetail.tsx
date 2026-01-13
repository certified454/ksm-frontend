import { useAuthStore } from "@/store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
                             <Pressable onPress={onClose} style={style.press}>
                                <View style={style.icon}>
                                    <MaterialIcons name="arrow-back-ios" size={24} style={style.icons} color={'#4B0082'}/>    
                                </View>
                                <Text style={style.title}>{user?.username}'s profile details</Text>
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
        height: '5%',
        paddingLeft: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    icon: {
        width: screenWidth * 0.11,
        height: screenHeight * 0.05,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4c00829f',
        borderRadius: screenHeight * 0.01
    },
    icons: {
        marginLeft: screenWidth * 0.025
    },
    press: {
        flexDirection: 'row',
        alignItems: 'center', 
        position: 'absolute', 
        top: screenHeight * 0.05, 
        left:10,
        gap: 10
    },
    title: {
        fontSize: screenHeight * 0.022,
        fontWeight: 'bold'
    },
    childrenContainer: {
        flex: 1,
        top: screenHeight * 0.07,
        alignItems: 'center',
        gap: 40
    },
})

