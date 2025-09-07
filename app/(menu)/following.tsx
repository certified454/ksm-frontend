import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/store/postStore';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
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

    useEffect(() => {
        fetchFollowedUsers();
    }, [])

    const renderFollowing = ({ item }: { item: any} ) =>(
        <TouchableOpacity style={styles.container}>
            <View style={styles.containerClick}>
                <Image style={styles.image} contentFit='cover' source={{ uri: item.profilePicture}}/>
                <Text style={styles.text}>{item.username}</Text>
                <Text style={styles.text}>{item.hobbies}</Text>
            </View>
            <TouchableOpacity style={styles.cancel} onPress={() => router.dismiss()}>
                <Entypo name="cross" size={29} color={'#4B0082'}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
    return(
        <View style={styles.flatList}>
            <TouchableOpacity onPress={() => router.back()} style={styles.username}>
                <Ionicons name='arrow-back' size={30} color={'#4B0082'}/>
                <Text style={styles.text}>{user?.username}</Text>
            </TouchableOpacity>
            <FlatList
                renderItem={renderFollowing}
                data={following}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}