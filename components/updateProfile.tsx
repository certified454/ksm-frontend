import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
                                <View style={style.icon}>
                                    <MaterialIcons name="arrow-back-ios" size={24} style={style.icons} color={'#4B0082'}/>    
                                </View>
                                <Text style={style.title}>Update your profile</Text>
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
        top: 3,
        width: '100%',
        position: "absolute",
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
        top: 40, 
        left:10
    },
    title: {
        fontSize: screenHeight * 0.022,
        fontWeight: 'bold',
        marginLeft: 10
    },
    childrenContainer: {
        flex: 1,
        top: screenHeight * 0.12,
        alignItems: 'center',
        gap: screenHeight * 0.03
    }
})