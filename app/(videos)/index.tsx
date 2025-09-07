import Caption from '@/components/caption';
import CreateVideoPage from '@/components/videos';
import { API_URL } from '@/store/postStore';
import { formatTimeAgo } from '@/store/util';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Video } from 'expo-av';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { io } from 'socket.io-client';
import styles from '../../assets/styles/analysis';
import { useAuthStore } from '../../store/authStore';
import { formatLikes } from '../../store/util';

type Analysis ={
    _id: string;
    user: {
        username: string;
        profilePicture: string;
    };
    title: string;
    video: string;
    likesCount: number;
    createdAt: string;
}
export default function Analysis() {
    const [ title, setTitle ] = useState("");
    const [ video, setVideo ] = useState<any>(null);
    const [ videoUri, setVideoUri ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ uploading, setUploading ] = useState(false);
    const [submiting, setSubmiting] = useState(false)
    const [ isVisible, setIsVisible ] = useState(false);
    const [ isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<any>(null)
    
    const {token, user} = useAuthStore();
    const router = useRouter();

    const [analysis, setAnalysis] = useState<Analysis[]>([]);
    const [refresh, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [captionVisible, setCaptionVisible] = useState(false);

    const [like, setLike] = useState(false);
    const [submitLike, setSubmitLike] = useState(false);
    const { analysisId} = useLocalSearchParams();

    const CLOUDINARY_NAME = 'dimg4aui1'
    const UPLOAD_PRESET = 'multiplecomment';

    const handleCreateVideoClose =() => {
        setIsVisible(false)
    }
    const handleCaptionPress = () => {
        setCaptionVisible(true)
    }
    const handleCaptionClose = () => {
        setCaptionVisible(false)
    }
    const pickVideo = async () => {
        try {
            if (Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', " You have to allow this app to access you camera rol");
                    return;
                }
            };
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'videos',
                allowsEditing: true,
                allowsMultipleSelection: false,
                aspect: [16, 9],
                quality: 1,
                base64: true
            });
            if (!result.canceled && result.assets && result.assets.length > 0 ) {
                const selectedVideo = result.assets[0];
                setVideo(selectedVideo);
                setVideoUri(selectedVideo.uri);
            } else{
                return;
            }
        } catch (error) {
            
        }
    };

    const handeleVideoPress = async () => {
        if(videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
                setIsPlaying(false)
            }   else {
                    await videoRef.current.playAsync();
                    setIsPlaying(true)
            } 
        }
    }
    const uploadedVideoToCloudinary = async (uri: string) => {
            setUploading(true);
            try {
                const formData = new FormData();
                formData.append('file', {
                    uri,
                    type: 'video/mp4',
                    name: `upload_${Date.now()}.mp4`
                } as any);
                formData.append('upload_preset', UPLOAD_PRESET);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to upload video to Cloudinary");
                }
                return data.secure_url;
            } catch (error) {
                console.error('Error uploading to Cloudinary', error);
                Alert.alert('Error', 'Failed to upload video');
            } finally {
                setUploading(false);
            }
    }
    const uploadVideo = async () => {
        if(!title && !video) {
            console.log('Failed', 'all fileds are required please provide both')
            Alert.alert('Failed', 'All Fields are required');
            return;
        };
        setSubmiting(true);
        try {
            let videoUrl = await uploadedVideoToCloudinary(video.uri)
            if (!videoUrl) {
              console.log('Failed', 'Video upload failed');
              Alert.alert('Failed', 'Video upload failed');
              return;
            }
            
            const response = await fetch(`${API_URL}/analysis/register`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        video: videoUrl
                    })
                }
            )
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || 'Failed to upload Video')
            router.push('/(videos)')
        } catch (error) {
            console.error('Error uploading video', error);
            Alert.alert('Failed', error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setTitle("");
            setVideo(null);
            setVideoUri(null);
            setSubmiting(false)
        }
    }
    const fetchAnalysis = async (pageNum = 1, refresh = false) => {
        try {
            if (refresh) setRefreshing(true);
            else if (pageNum === 1) setIsLoading(true);

            const response = await fetch(`${API_URL}/analysis?page=${pageNum}&limit=3`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || 'Failed to fetch analysis');

            const uniqueAnalysis = refresh || pageNum === 1
                ? data.analysis
                : Array.from(new Set([...analysis, ...data.analysis].map((analysis) => analysis._id))).map((id) =>
                [...analysis, ...data.analysis].find((analysis) => analysis._id === id)
            );

            setAnalysis(uniqueAnalysis);
            setHasMore(pageNum < data.totalPages);
            setPage(pageNum)
        } catch (error) {
            console.error('Error fetching analysis', error);
      } finally {
            if (refresh) setRefreshing(false)
                else setIsLoading(false);
      }
    }
    const handleLoadMore = () => {
        if (hasMore && !isLoading) {
            fetchAnalysis(page + 1);
        }
    }
    const handeleVideoDetail = (id: string) => {
        router.push({pathname: '/(videos)/details', params: {analysisId: id}})
    }
    const handleShareAnalysis = async ( ) => {

    }
    const handleSaveAnalysis = async ( ) => {
    }

    useEffect(() => {
        fetchAnalysis();
        const socket = io('https://kismit-official.onrender.com/');

        socket.on('new analysis created', (newAnalysis) => {
            setAnalysis((analysis) => {
                const existing = analysis.some(analysis => analysis._id == newAnalysis._id)
                return existing ? analysis : 
                [newAnalysis, ...analysis]
            })
        });
        socket.on('new like created', ({analysisId, userId, liked}) => {
            setAnalysis((analysis) => {
                return analysis.map(analysis => {
                    if (analysis._id === analysisId) {
                        const updatedLikesCount = liked ? analysis.likesCount + 1 : analysis.likesCount - 1;
                        return { ...analysis, likesCount: updatedLikesCount };
                    }
                    return analysis;
                });
            });
        });

    }, [])
    const renderAnalysis = ({ item }: { item: Analysis }) => (
        <View style={styles.itemContainer}>
            <View style={styles.analysisContainer}>
                <View style={styles.userContainer}>
                    <TouchableOpacity >
                        <Image source={{uri: item.user?.profilePicture}} style={styles.profilePicture} />
                    </TouchableOpacity>
                    <View style={styles.items}>
                        <Text style={styles.text}>{item.user.username}</Text>
                        <Text style={[styles.createdAt]}>{formatTimeAgo(item.createdAt)}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleCaptionPress()} style={styles.titleContainer}>
                    <Text style={styles.titleText} ellipsizeMode='tail' numberOfLines={2}>{item.title}</Text>
                </TouchableOpacity>
               
            </View>
             < View style={styles.videoItem} >
                <View style={styles.videoItemVideo}>
                    <TouchableOpacity onPress={() => handeleVideoDetail(item._id)} style={styles.videoPlayer}>
                            <Video
                                source={{ uri: item.video }}
                                style={styles.videoItemVideo}
                                ref={videoRef}
                                resizeMode='contain'
                                isLooping
                                shouldPlay={isPlaying}
                            />
                    </TouchableOpacity>
                    
                </View>
                 <View style={styles.likeAnalysis}>
                        <Ionicons 
                            name={'heart'}
                            size={50} 
                            color="#ffffff" 
                            style={styles.icons} 
                        />
                        <Text style={styles.analysisLikesCount}>{formatLikes(item.likesCount)}</Text>
            </View>
            <TouchableOpacity onPress={handleShareAnalysis} style={styles.shareAnalysis}>
                        <Ionicons name="share-social" size={45} color="#ffffff" style={styles.icons}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveAnalysis} style={styles.saveAnalysis}>
                       <MaterialIcons name="save-alt" size={50} color="#ffffff" style={styles.icons}/>
            </TouchableOpacity>
            </View>
        </View>
    )
    return(
        <View style={styles.container}>
             <>
                <FlatList
                    data={analysis}
                    keyExtractor={(item) => item._id}
                    renderItem={renderAnalysis}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                />
            </>
            <TouchableOpacity onPress={() => {setIsVisible(true); pickVideo()}}>
                <Ionicons name='videocam' size={45} color={'#4B0082'} />
            </TouchableOpacity> 
            <CreateVideoPage isVisible={isVisible} onClose={handleCreateVideoClose}>
                {videoUri && (
                    <>
                        <TouchableOpacity onPress={  handeleVideoPress }  style={styles.videoSize}>
                            <Video
                                style={[ { aspectRatio: 1, backgroundColor: videoUri ? '#fff' : '#000'}]}
                                source={{ uri: videoUri}}
                                ref={videoRef}
                                isLooping
                                resizeMode='contain'
                                shouldPlay={isPlaying}
                                useNativeControls={false}
                            />
                        </TouchableOpacity>
                    </>
                )}
                <View style={styles.video}>
                    <TouchableOpacity style={styles.videocam} onPress={pickVideo}>
                        <Ionicons name='videocam' size={30} color={'#4B0082'} />
                    </TouchableOpacity>
                    <TextInput
                            style={styles.inputContainer}
                            placeholder="Enter analysis title"
                            value={title}
                            onChangeText={setTitle}
                            editable={!isLoading}
                            multiline
                        />
                    <View style={styles.upload}>
                        { submiting ? (
                            <ActivityIndicator size="large" color="#4B0082" />
                        ) : (
                            <TouchableOpacity onPress={uploadVideo}>
                                <Ionicons name={ submiting ? 'send-outline' : 'send'}size={30} color="#4B0082" />
                            </TouchableOpacity>
                        )}
                    </View>

                </View>
    
            </CreateVideoPage>
            <Caption isVisible={captionVisible} onClose={handleCaptionClose}>
                
            </Caption>
           
        </View> 
    )
}