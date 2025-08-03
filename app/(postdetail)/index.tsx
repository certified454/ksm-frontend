import styles from '@/assets/styles/postindex';
import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/store/postStore';
import { formatTimeAgo } from '@/store/util';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type Post = {
    id: string;
    profilePicture: string; 
    user: {
        id: string;
        username: string;
        profilePicture?: string;
    };
    image: string;
    caption: string;
    createdAt: string;
};

export default function PostDetail() {
    //get a post variables
    const { token } = useAuthStore();
    const [post, setPost ] = useState<Post | null>(null);
    const {postId } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);

    // create a  comment variables
    const [ text, setText ] = useState('');
    const [ audio, setAudio ] = useState<Audio.Recording | null>(null)
    const [ audioUri, setAudioUri ] = useState<string | null>(null);
    const [ isRecording, setIsRecording ] = useState(false);
    const [duration, setDuration] = useState<string | null>(null);
    const [ submitComment, setSubmitComment ] = useState(false);
    const [ uploading, setUploading ] = useState(false);

    //fetch comments vairables
    const [ comments, setComments] = useState([]);
    const [ refresh, setRefreshing] = useState(false);
    const [ hasMoreComments, setHasMoreComments] = useState(true);
    const [page, setPage ] = useState(1);
    
    // clodinary variables
    const CLOUDINARY_NAME = 'dimg4aui1'
    const UPLOAD_PRESET = 'multiplecomment';

    const getPost = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/post/${postId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            const data = await response.json();

            if (!response.ok) 
                throw new Error(data.message || 'Failed to fetch post');
            setPost(data.post);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post:', error);
            Alert.alert('Error', 'Failed to fetch post');
        } finally {
        setLoading(false);
        }
    };

    const fetchComments = async (pageNum = 1, refresh = false) => {
        try {
            if (refresh) setRefreshing(true)
                else if (pageNum === 1) setLoading(true)

            const response = await fetch(`${API_URL}/post/${postId}/comments?page=${pageNum}&limi=20`,
                { headers: {Authorization: `Bearer ${token}`}}
            );

            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message || 'Failed to fetch comments');

            const uniqueCommments = refresh || pageNum === 1
                ? data.comments
                : Array.from(new Set([...comments, ...data.comments].map((comment) => comment._id))).map((id) =>
                [...comments, ...data.comments].find((comment) => comment._id === id) 
            )
        
            setComments(uniqueCommments)

            setHasMoreComments(pageNum < data.totalPages)
            setPage(pageNum)
        } catch (error) {
            console.error('Error fetching comments:', error);
            Alert.alert('Error', 'Failed to fetch comments');
            
        } finally {
            if (refresh) setRefreshing(false)
                else setLoading(false)
        }
    }

    const handleLoadMoreComments = async () => {
        if ( hasMoreComments && !loading && !refresh )
            await fetchComments(page + 1)
    }

    const startRecordingAudio = async () => {
        try {
            const { status} = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'You need to grant microphone permission to record audio');
                return;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                playThroughEarpieceAndroid: true,
                shouldDuckAndroid: true
            })
            console.log('Starting recording...');
            const audio = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            )
            setAudio(audio.recording);
            setIsRecording(true);
            setAudioUri(null);
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording', error);
            Alert.alert('Error', 'Failed to start recording');
        } 
    }
  
    const stopRecordingAudio = async () => {
        setIsRecording(false);
        try {
            if (audio) {
                console.log('Stopping recording....');
                const uri = audio.getURI();
                if (uri) {
                    setAudioUri(uri);
                    setAudio(null);
                }

                console.log('Recording stopped and saved at', uri);
            }
            // const {sound } = await Audio.Sound.createAsync( { uri: audioUri ? audioUri: '' },);
            // setPLaysound(sound);
        } catch (error) {
            console.error('Error stopping recording', error);
            Alert.alert('Error', 'Failed to stop recording');
        }
    }

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(
            { uri: audioUri ? audioUri : '' },
            { shouldPlay: true, isLooping: false } 
        );
          if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && status.durationMillis) {
                const seconds = (status.durationMillis / 1000).toFixed(2);
                setDuration(seconds);
            }
          }

        console.log('Playing audio from', audioUri);
    }
    // Function for sound duration

    const playAudioFromUrl = async (url: string) => {
        const { sound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );
        await sound.playAsync();
    };
  
    const uploadedAudioToCloudinary = async (uri: string) => {
        setUploading(true);
        try {
            const base64Audio = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
    
            const formData = new FormData();
            formData.append('file', `data:audio/m4a;base64,${base64Audio}`);
            formData.append('upload_preset', UPLOAD_PRESET);
            console.log('Uploading audio to Cloudinary...', formData);
    
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                })
    
                const data = await response.json();
                    
                if (!response.ok) {
                    throw new Error(data.message || "Failed to upload audio to cloudinary")
                }
                return data.secure_url;
            } catch (error) {
                console.error('Error uploading to Cloudinary', error);
                Alert.alert('Error', 'Failed to upload audio');
            }
        } catch (error) {
            console.error('Error in uploadToCloudinary', error);
            Alert.alert('Error', 'Failed to upload audio');
        } finally {
            setUploading(false);
        }
    }
    
    const handleCommentSubmit = async () => {
        try {
            if (!text.trim() && !audioUri ) {
                Alert.alert('Error', 'Please enter a comment or record audio to comment');
                return;
             }
            
             setSubmitComment(true);
             let audioUrl = null;
    
            if (audioUri) {
                console.log('Uploading audio to Cloudinary...');
                 
                audioUrl = await uploadedAudioToCloudinary(audioUri)
    
                if (!audioUrl) {
                    setSubmitComment(false);
                    console.error('Failed to upload audio');
                    Alert.alert('Error', 'Failed to upload audio');
                    return;
                }
            }
            if (text.trim()){
                setIsRecording(false)
            }
            const response = await fetch(`${API_URL}/post/${postId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text.trim(),
                    audio: audioUrl
                })
            })
    
            const data = await response.json();
            if (!response.ok) {
                Alert.alert(data.message)
                throw new Error(data.message); 
            };
            
        } catch (error) {
            console.error('Error submitting comment', error);
            Alert.alert('Error', 'Failed to submit comment');
        } finally {
            setText('');
            setAudioUri(null);
            setAudio(null);
            setSubmitComment(false);
        }
    }

    useEffect(() => {
        getPost();
        fetchComments();
    }, [])
    
    useEffect(() => {
        return() => {
            if (audio) {
                 (async () => {
                    await audio.stopAndUnloadAsync();
                })();
            }
        }
    }, [audio])

    const renderComment = ({ item}: {item: any }) => (
        <View style={styles.commentContainer}>
            <View style={styles.innerCommentcontainer}>
                <Image
                    source={{ uri: item.user.profilePicture ? item.user.profilePicture : "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf" }}
                    style={[styles.userImage, {width: 40, height: 40}]}/>

                <View style={styles.userInfoText}>
                    <Text style={[styles.username, {fontSize: 16, bottom: 30, left: 50}]}>{item.user.username}</Text>
                </View>
                <View style={styles.commentAt}>
                    <Text style={styles.createdAt}>{formatTimeAgo(item.createdAt)}</Text>
                </View>
                { item.audio && 
                    <View>
                        <TouchableOpacity style={styles.audio} onPress={() => playAudioFromUrl(item.audio)}>
                        <Ionicons name='play-circle-outline' size={32} color='#4B0082' style={styles.audio} />
                    </TouchableOpacity>
                    </View>
                }
                { item.text &&
                    <View style={styles.textCommented}>
                        <Text style={styles.commenttext}>{item.text}</Text>
                    </View>
                }
            </View>
        </View>
    )

    return(
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }} keyboardVerticalOffset={50}>
            <View>
            <ScrollView contentContainerStyle={{ padding: 5 }}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={'#4B0082'} style={{ top: 300 }} />
                ) : post ? (
                    <View style={styles.container}>
                        <View style={styles.userdetail}>
                            <TouchableOpacity onPress={ () => router.back()}>
                                <Ionicons
                                    name="arrow-back-circle-sharp"
                                    size={37}
                                    color="#4B0082"
                                    style={styles.text}
                                />

                            </TouchableOpacity>
                            <View style={styles.userInfo}>
                                <Image
                                    source={{ uri: post.user.profilePicture|| 'https://via.placeholder.com/50' }}
                                    style={styles.userImage}
                                />
                                <View style={styles.userInfoText}>
                                    <Text style={styles.username}>{post.user.username}</Text>
                                    <Text style={styles.createdAt}>{formatTimeAgo(post.createdAt)}</Text>
                                </View>
                            </View>
                            
                                <Image
                                    source={{ uri: post.image }}
                                    style={styles.postImage}
                                    contentFit="cover"
                                />
                            
                            <View style={styles.userPost}>                             
                                <Text style={styles.caption}>{post.caption}</Text> 
                            </View>
                        </View>
                        <View style={styles.recordedAudioContainer}>
                            { audioUri && (
                               <>
                                    <TouchableOpacity onPress={playAudio}>
                                        <Ionicons name='play-circle-outline' size={40} color='#4B0092'/>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#4B0082', fontSize: 16, marginTop: 7 }}>Audio Duration: {duration ? `${duration} seconds` : 'Calculating...'}</Text>
                               </>
                            )}
                        </View>
                        
                        <View style={styles.commentSection}>
                                <View style={styles.textInputContainer}>
                                    <TextInput 
                                    style={styles.comment}
                                    placeholder='Add a comment...'
                                    value={text}
                                    onChangeText={setText}
                                    editable={!isRecording}
                                    multiline
                                    />
                                </View>
                               <TouchableOpacity
                                    style={styles.recordSection}
                                    onPress={isRecording? stopRecordingAudio : startRecordingAudio }
                               >
                                    <Ionicons size={35} 
                                        name={isRecording ? 'mic-off' : 'mic-outline'}
                                        style={isRecording ? styles.recordButton : styles.recordButton} />
                               </TouchableOpacity>
                               
                                <TouchableOpacity
                                onPress={handleCommentSubmit} disabled={submitComment}
                                >
                                <Ionicons size={32} color={submitComment ? '#4B0082' : '#4B0082'} 
                                name={submitComment ? 'send' : 'send-outline'}
                                style={styles.sendButton}
                                />                 
                            </TouchableOpacity>
                          
                        </View>
                    </View>
                ) : (
                    <Text>No post found.</Text>
                )}
            </ScrollView>
            </View>

            <FlatList 
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMoreComments}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => fetchComments(1, true)}
                        />
                    }
                />
       </KeyboardAvoidingView> 
    );
}
