import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Dimensions, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import styles from '../assets/styles/challenge';
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
                                <MaterialIcons name="arrow-back-ios" size={30} style={styles.arrowback} color={'#4B0082'}/>
                                <Text style={style.titleText}>Votes on this Challange</Text>
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
};

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        marginTop: screenHeight * -0.02,
        height: '100%',
        width: '100%',
        position: "absolute",
        backgroundColor: '#fff'
    },
    titleContainer: {
        height: '5%',
        paddingLeft: screenWidth * 0.01,
        marginTop: screenHeight * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    press: {
        flexDirection: 'row',
        alignItems: 'center', 
        position: 'absolute', 
        marginLeft: screenWidth * 0.01,
        marginTop: screenHeight * 0.035
    },
    childrenContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 40,
        marginTop: screenHeight * 0,
    },
    titleText: { 
        marginLeft: screenWidth * 0.06,
        fontSize: screenHeight * 0.023, 
        fontWeight: 'bold'
    },
})