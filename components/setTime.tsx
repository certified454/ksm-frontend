import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>

export default function TimePickerModal({isVisible, children, onClose}:Props) {
    return (
         <View>
            <Modal visible={isVisible}  presentationStyle="pageSheet" >
                <View style={style.modalContainer}>
                    <View style={style.titleContainer}>
                        <Text style={style.text}>Create Challenge</Text>
                            <Pressable onPress={onClose} style={style.press}>
                                <Ionicons name="close" size={28} color={'#4B0082'} />
                            </Pressable>
                    </View>
                    <ScrollView>
                        <View style={style.childrenContainer}>
                            { children }
                        </View>
                    </ScrollView>
                </View>
                <View>
                    
                </View>
            </Modal>
        </View>

    )
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: 'auto',
        width: '100%',
        backgroundColor: '#f5f5f5'
    },
    titleContainer: {
        height: '10%',
        width: '100%',
        paddingLeft: 10,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    press: {
        flexDirection: 'row',
        alignItems: 'center', 
        position: 'absolute',  
        right: 28    
    },
    childrenContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 40
    }, 
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text1: {
        fontSize: 20
    }
})