import ViewImage from "@/components/viewImage";
import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../assets/styles/menu";

export default function Profile() {
    const { user } = useAuthStore();
    const [ isImageVissable, setImagevisable ] = useState(false);

     const onImageView = () => {
        setImagevisable(true)
    }
    const onCloseImageView = () => {
        setImagevisable(false)
    }
    const handleEditProfile = () => {}

    const handleFollow = () => {}

    const handleCall = () => {}

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <View style={styles.userprofileImage}>
                    <TouchableOpacity onPress={onImageView}>
                        <Image style={styles.profileImage} contentFit='contain' source={{ uri: user.profilePicture}} />
                    </TouchableOpacity>
                    <View style={styles.mainUserContainer}>
                        <View style={[styles.iconView, {justifyContent: 'space-between', paddingHorizontal: 15}]}>
                            <Text style={[styles.text, { fontSize: 24, left: 5, fontWeight: 'bold', color: '#4B0082'}]}>{user.username}</Text>
                            <TouchableOpacity style={styles.editProfile} onPress={handleCall}>
                                <Text style={styles.text}>Edit Profile</Text>
                                <Ionicons name="pencil" size={24} color={'#4B0082'}/>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.iconView}>
                            <View style={{justifyContent:'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: '#4B0082', fontWeight: 'bold'}}>20</Text>
                                <Text style={{fontSize: 17}}>Following</Text>
                            </View>
                            <View style={styles.icon}>
                            </View>
                             <View style={{justifyContent:'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: '#4B0082', fontWeight: 'bold'}}>200</Text>
                                <Text style={{fontSize: 17}}>Followers</Text>
                            </View>
                            <View style={styles.icon}>
                            </View>
                             <TouchableOpacity style={[styles.editProfile, {width: 100, gap:3, backgroundColor: '#4B0092'}]}>
                                <Ionicons name="call" size={24} color={'#f9f9f9'}/>
                                <Text style={[styles.text, {color:'#f9f9f9'}]}>Contact</Text>
                             </TouchableOpacity>
                          
                           
                        </View>

                        <View style={styles.iconView}>
                            <TouchableOpacity style={[styles.editProfile, {backgroundColor: '#4B0082', width: 150}]} onPress={handleFollow}>
                                <Ionicons name="checkmark-sharp" size={24} color={'#f9f9f9'}/>
                                <Text style={[styles.text, {color: '#ffffff', fontWeight: 'bold', fontSize: 19}]}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            <ViewImage isVisible={isImageVissable} onClose={onCloseImageView} />
            </View>
        </KeyboardAvoidingView>
    );
}
