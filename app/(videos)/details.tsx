import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Video } from 'expo-av';
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Platform, KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native";
import styles from '../../assets/styles/analysis';
import { SafeAreaView } from 'react-native-safe-area-context';

type Analysis ={
    id: string;
    user: {
        username: string;
        profilePicture: string;
    };
    title: string;
    video: string;
    createdAt: string;
}

export default function VideoDetails() {
    const {token, user} = useAuthStore();
    const router  = useRouter();
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loading, setLoading] = useState(false);
    const { analysisId } = useLocalSearchParams();
    const videoRef = useRef<any>(null)

    const [videoUri, setVideoUri] = useState('')
    
    const [like, setLike] = useState(false);
    const [submitLike, setSubmitLike]= useState(false)

    const fetchAnalysis = async () => {
         try {
            setLoading(true);
                    const response = await fetch(`${API_URL}/analysis/${analysisId}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        });
                    const data = await response.json();
        
                    if (!response.ok) 
                        throw new Error(data.message || 'Failed to fetch analysis');
                    setAnalysis(data.analysis);
                    setLike(data.liked);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching analysis:', error);
                    Alert.alert('Error', 'Failed to fetch analysis');
                } finally {
            setLoading(false);
        }
    }
    const handleLikeAnalysis = async ( ) => {
        setSubmitLike(true);
        try {
            const response = await fetch(`${API_URL}/analysis/${analysisId}/like`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            console.log("Analysis liked")
            if(!response.ok) throw new Error(data.message || 'Failed to like analysis');
            setLike(!like);
            setSubmitLike(false)
        } catch (error) {
            console.error('Error liking analysis', error);
            Alert.alert('Error', 'Failed to like analysis');
        }
    }
    const handleShareAnalysis = async ( ) => {

    }
    const handleSaveAnalysis = async ( ) => {
    }
    
    useEffect(() => {
        fetchAnalysis();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={styles.analysisDetailContainer}>
                    
                        {loading ? (
                            <ActivityIndicator size={'large'} color={"#4B0082"} />
                        ) : analysis ? (
                            <View style={styles.analysisDetailItems}>
                                <TouchableOpacity>
                                    <Image source={{ uri: analysis.user.profilePicture }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                    <Video 
                                        source={{ uri: analysis.video }}
                                        style={styles.video}
                                        resizeMode="contain"
                                        isLooping
                                        
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text>No analysis found</Text>
                        )}


                    
                    <Text>{analysis?.title}</Text>
                    <TouchableOpacity onPress={() => { setLike(!like); handleLikeAnalysis()}} style={styles.likeAnalysis}>
                                <Ionicons 
                                    name={ like ? 'heart' : 'heart-outline'}
                                    size={40} 
                                    color="#4B0082" 
                                    style={styles.icons} 
                                />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShareAnalysis} style={styles.shareAnalysis}>
                                <Ionicons name="share-social-outline" size={40} color="#4B0082" style={styles.icons}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSaveAnalysis} style={styles.saveAnalysis}>
                                <MaterialIcons name="save-alt" size={40} color="#4B0082" style={styles.icons}/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}