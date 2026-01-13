import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/store/postStore';
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../assets/styles/followers';

type Following ={
    _id: string;
    username: string;
    profilePicture: string;
}
export default function Followers() {
    const {token, user } = useAuthStore();
    const router  = useRouter();
    
    const { userId } = useLocalSearchParams();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ following, setFollowing] = useState<Following[]>([]);

    const fetchFollowedUsers = async () => {
         try {
             setIsLoading(true);
 
             const response = await fetch(`${API_URL}/user/profile/${userId}/following`, {
                 headers: {Authorization: `Bearer ${token}`}
             });
             
             const data = await response.json();
             if(!response.ok){
                 throw new Error(data.message || 'Failed to fetch followers')
             };
            setFollowing(data.following)
         } catch (error) {
             Alert.alert('Failed', 'Failed to fetch following')
         } finally {
             setIsLoading(false)
         }
    };
    const handleProfilePress = (id: string) => {
        router.push({pathname: '/(profile)', params: { userId: id }});
    }

    useEffect(() => {
        fetchFollowedUsers();
    }, [])

    const renderFollowing = ({ item }: { item: any} ) =>(
        <TouchableOpacity onPress={() => handleProfilePress(item._id)} style={styles.container}>
            <View style={styles.containerClick}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} contentFit='cover' source={{ uri: item.profilePicture}}/>
                </View>
                <Text style={styles.followersusername}>{item.username}</Text>
                {/* <View style={styles.hobbiesContainer}>
                    <Text >{item.location}</Text>
                </View> */}
            </View>
   
        </TouchableOpacity>
    )
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.flatList}>
                <TouchableOpacity onPress={() => router.back()} style={styles.username}>
                    <MaterialIcons name='arrow-back-ios' size={30} color={'#4B0082'} style={styles.backIcon}  />
                    <Text style={styles.text}>{user?.username}</Text>
                </TouchableOpacity>
                <FlatList
                    renderItem={renderFollowing}
                    data={following}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}