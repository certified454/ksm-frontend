import styles from "@/assets/styles/menu";
import { useAuthStore } from "@/store/authStore";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function Menu() {
    const { logout, user } = useAuthStore();

    if(!user) return null;

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {text: 'Cancle', style: 'cancel'},
            {text: "Logout", onPress: () => {logout(); router.replace('/(auth)')}, style: 'destructive'}
        ])
    };
    const handleprofilePicturePress = async (id: string) => {
      router.push({ pathname: '/(profile)', params: { userId: id }})
    };
    const handleFollowersPress = async (id: string) => {
      router.push({ pathname: '/(menu)/follower', params: { userId: id}})
    };
    const handleAnalysisPress = () => {
        router.push('/(videos)')
    }
    const handleChallengePress = () => {
        router.push({ pathname: '/(challenge)' })
    }
    return (
      
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.userContainer}>
                        <Ionicons name={"arrow-back"} color={'#4B0082'} size={35} onPress={() => router.back()} style={{left:3}}/>
                        <Text style={styles.menuTitle}>Menu</Text>
                        <View style={styles.userprofile}>
                            <View style={styles.userInfo}>
                                <TouchableOpacity onPress={() => handleprofilePicturePress(user?.id)}>
                                   <Image  style={styles.profilePicture} source={{ uri: user.profilePicture}}/>
                                </TouchableOpacity>
                            <Text style={styles.username}>{user.username}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={ styles.item}>
                        <TouchableOpacity onPress={() => handleFollowersPress(user?.id)} style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View>
                                    <Ionicons style={styles.itemslist} name={'person-add'} color={'#4B0082'} size={24}/>
                                    <Text style={[styles.text, { left: 50}]}>Followers</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View>
                                    <Ionicons style={styles.itemslist} name={'tv'} color={'#4B0082'} size={24}/>
                                    <Text style={[styles.text, { left: 64 }]}>Live</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={ [styles.item, { bottom: 10 }]}>
                        <TouchableOpacity onPress={handleAnalysisPress} style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View >
                                    <MaterialIcons style={styles.itemslist}name="analytics" size={25} color={'#4B0082'} />
                                    <Text style={[styles.text, { left: 53 }]}>Analysis</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View>
                                    <Ionicons style={styles.itemslist} name={'newspaper'} color={'#4B0082'} size={24}/>
                                    <Text style={[styles.text, { left: 61 }]}>News</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={ [styles.item, { bottom: 10 }]}>
                        <TouchableOpacity style={styles.onpress} onPress={() => handleChallengePress()}>
                            <View style={styles.itemContainer}>
                                <View >
                                    <MaterialCommunityIcons style={[styles.itemslist,{bottom: 3}]} name="head-lightbulb" size={30} color={'#4B0092'} />
                                    <Text style={[styles.text, {bottom: 3, left: 45, fontSize: 16 }]}>Challenges</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View>
                                    <MaterialIcons style={[styles.itemslist, {top:2}]}name="sports-esports" size={30} color={'#4B0082'} />
                                    <Text style={[styles.text, { left: 60 }]}>Sports</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={ [styles.item, { bottom: 10 }]}>
                        <TouchableOpacity style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View >
                                    <MaterialIcons style={styles.itemslist}name="help" size={29} color={'#4B0082'} />
                                    <Text style={[styles.text, { left: 67 }]}>help</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.onpress}>
                            <View style={styles.itemContainer}>
                                <View>
                                    <Ionicons style={styles.itemslist} name={'settings'} color={'#4B0082'} size={24}/>
                                    <Text style={[styles.text, { left: 52 }]}>Settings</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                        <Ionicons  name={'log-out'} color={'#f9f9f9'} size={26}
                        />
                        <Text style={[styles.text, {color: '#f9f9f9'}]}>Logout</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}
