import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Props = PropsWithChildren <{
    isVisible: boolean;
    onClose: () => void;
}>

export default function ViewImage({isVisible, children, onClose}: Props) {
    return(
        <View>
            <Modal visible={isVisible}>
                <View style={style.modalContainer}>
                    <View style={style.titleContainer}>
                        <Pressable onPress={onClose}>
                            <View style={style.icon}>
                                <MaterialIcons name="arrow-back-ios" size={24} style={style.icons} color={'#4B0082'}/>   
                            </View>
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
        marginTop: screenHeight * 0.03,
        marginBottom: screenHeight * 0.02,
        alignItems: 'center',
        justifyContent: "space-between"
    },
    arrowBack: {
        marginLeft: screenHeight * 0.015
    },
    icon: {
        width: screenWidth * 0.11,
        height: screenHeight * 0.05,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4B0082',
        borderRadius: screenHeight * 0.01,
        backgroundColor: '#eee'
    },
    icons: {
        marginLeft: screenWidth * 0.025
    }
})