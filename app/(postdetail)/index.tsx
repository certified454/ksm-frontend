import styles from '@/assets/styles/postindex';
import Caption from '@/components/caption';
import ViewImage from '@/components/viewImage';
import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/store/postStore';
import { formatTimeAgo } from '@/store/util';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';

import { Image } from 'expo-image';
import * as MediaLabriary from 'expo-media-library';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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
import { captureRef } from 'react-native-view-shot';
import io from 'socket.io-client';

type Post = {
    id: string;
    profilePicture: string; 
    user: {
        _id: string;
        username: string;
        profilePicture?: string;
    };
    image: string;
    caption: string;
    createdAt: string;
};

type Comment = {
    _id: string;
    postId: string;
    user: {
        id: string;
        username: string;
        profilePicture?: string;
    };
    text: string;
    audio: string;
    createdAt: string;
};

export default function PostDetail() {
    //get a post variables
    const { token } = useAuthStore();
    const [ post, setPost ] = useState<Post | null>(null);
    const { postId } = useLocalSearchParams();
    const [ loading, setLoading] = useState(true);
    const [ isImageVissable, setIsImageVisile ] = useState(false);
    const [ isModelVisible, setModelIsvisible] = useState(false);
    const [ soundPlay, setSoundPlay ] = useState<Audio.Sound | null>(null);
    const [ play, setPlay] = useState(false);
    const [playingId, setPlayingId] = useState(null);
    const imageRef = useRef<View>(null);


    // create a  comment variables
    const [ text, setText ] = useState('');
    const [ audio, setAudio ] = useState<Audio.Recording | null>(null)
    const [ audioUri, setAudioUri ] = useState<string | null>(null);
    const [ isRecording, setIsRecording ] = useState(false);
    const [ duration, setDuration] = useState<string | null>(null);
    const [ submitComment, setSubmitComment ] = useState(false);
    const [ uploading, setUploading ] = useState(false);

    //fetch comments vairables
    const [ comments, setComments] = useState<Comment[]>([]);
    const [ refresh, setRefreshing] = useState(false);
    const [ hasMoreComments, setHasMoreComments] = useState(true);
    const [ page, setPage ] = useState(1);

    //like Variables
    const [like, setLike] = useState(false);
    const [ submitLike, setSubmitLike ] = useState(false);

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
            setLike(data.liked)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post:', error);
            Alert.alert('Error', 'Failed to fetch post');
        } finally {
        setLoading(false);
        }
    };
    const onCloseReadMore = () => {
        setModelIsvisible(false)
    }
    const onCloseImageView = () => {
        setIsImageVisile(false)
    }

    const saveImage = async () => {
        try {
            const imageUri = await captureRef(imageRef, {height: 450, quality:1});
            await MediaLabriary.saveToLibraryAsync(imageUri)

            if(imageUri) {
                Alert.alert("Saved", "Image has been downloaded")
            }
        } catch (error) {
            console.error('Failed')
        }
    }

    const fetchComments = async (pageNum = 1, refresh = false) => {
        try {
            if (refresh) setRefreshing(true)
                else if (pageNum === 1) setLoading(true)

            const response = await fetch(`${API_URL}/post/${postId}/comments?page=${pageNum}&limi=20`,
                { headers: {Authorization: `Bearer ${token}`}}
            );
            
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message);

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
    const playAudioFromUrl = async (url: string) => {
        if (soundPlay) {
            await soundPlay.unloadAsync();
            setSoundPlay(null);
            setPlay(false);

        }
        const {sound} = await Audio.Sound.createAsync(
            {
                uri: url
            },
            {
                shouldPlay: true
            }
        )
        setSoundPlay(sound);
        setPlay(true);

    };

    const pauseAudio = async () => {
        if (soundPlay) {
            await soundPlay.pauseAsync();
            setPlay(false)
        }
    };

    const resumeAudio = async () => {
        if (soundPlay) {
            await soundPlay.playAsync();
            setPlay(true)
        }
    }
  
    const uploadedAudioToCloudinary = async (uri: string) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                type: 'audio/m4a',
                name: 'audio.m4a'
            } as any);
            formData.append('upload_preset', UPLOAD_PRESET);
            
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`, {
                    method: 'POST',
                    body: formData,
                })
    
                const data = await response.json();
                console.log('Cloudinary response:', data);
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
                    audio: audioUrl,
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

    const handleSubmitLike = async () => {
        setSubmitLike(true)
        try {
            const response = await fetch(`${API_URL}/post/${postId}/like`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ like: !like })
            })
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to like post');
            setLike(!like);
            setSubmitLike(false);
        } catch (error) {
            console.error('Error liking post:', error);
            Alert.alert('Error', 'Failed to like post');
        }
    }

    useEffect(() => {
        getPost();
        fetchComments();
        const socket = io('https://kismit-official.onrender.com/');

        socket.on('new comment created', (newComment) => {
        setComments((comments) => {
            const exits = comments.some(comment => comment._id === newComment._id);
            return exits ? comments :
            [newComment, ...comments]
            });
        });

        return () => {
            socket.disconnect();
        };
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

    const handleprofilePicturePress = async (id: string) => {
        router.push({ pathname: '/(profile)', params: {userId: id} });
      }

    const renderComment = ({ item}: {item: any }) => (
        <View style={styles.commentContainer}>
                <Image
                    source={{ uri: item.user?.profilePicture ? item.user?.profilePicture : "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf" }}
                    style={[styles.userImage, {width: 40, height: 40}]}/>

                <View style={styles.userInfoText}>
                    <Text style={[styles.username, {fontSize: 16, bottom: 30, left: 50}]}>{item.user?.username}</Text>
                </View>
                <View style={styles.commentAt}>
                    <Text style={styles.createdAt}>{formatTimeAgo(item.createdAt)}</Text>
                </View>
                <View style={styles.itemContainer}>
                    { item.audio && 
                        <View> 
                            { playingId !== item.id ? (
                                <TouchableOpacity  style={styles.audio} onPress={() => {
                                    playAudioFromUrl(item.audio);
                                    setPlayingId(item.id);
                                }}>
                                    <Ionicons name='play-circle-outline' size={35} color='#4B0082' style={styles.audio} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.audio} onPress={() => {
                                    pauseAudio();
                                    setPlayingId(null);
                                }}>

                                    <Ionicons name='pause-circle-outline' size={35} color='#4B0082' style={styles.audio} />
                                </TouchableOpacity>
                            )
                            }
                        </View>
                    }
                </View>  
                <View>
                    { item.text &&
                    <View style={styles.textCommented}>
                        <Text style={styles.commenttext}>{item.text}</Text>
                    </View>
                    } 
                </View>  
        </View>
    )

    return(
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: '#ffffff' }} keyboardVerticalOffset={50}>
        <View>
            <ScrollView contentContainerStyle={{ padding: 5 }}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={'#4B0082'} style={{ top: 300 }} />
                ) : post ? (
                    <View style={styles.container}>
                        <View style={styles.userdetail}>
                            <TouchableOpacity onPress={ () => router.back()}>
                                <Ionicons
                                    name="arrow-back"
                                    size={37}
                                    color="#4B0082"
                                    style={styles.text}
                                />

                            </TouchableOpacity>
                            <View style={styles.userInfo}>
                                <TouchableOpacity onPress={() => handleprofilePicturePress(post.user._id)} >
                                    <Image
                                        source={{ uri: post.user.profilePicture|| 'https://via.placeholder.com/50' }}
                                        style={styles.userImage}
                                    />
                                </TouchableOpacity>
                                <View style={styles.userInfoText}>
                                    <Text style={styles.username}>{post.user.username}</Text>
                                    <Text style={styles.createdAt}>{formatTimeAgo(post.createdAt)}</Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => setIsImageVisile(true)}>
                                <Image
                                    source={{ uri: post.image }}
                                    style={styles.postImage}
                                    contentFit="cover"
                                />
                            </TouchableOpacity>
                            
                            
                            <View style={styles.userPost}> 
                                <TouchableOpacity onPress={() => setModelIsvisible(true)}>
                                    <Text style={styles.caption} ellipsizeMode='tail' numberOfLines={2}>{post.caption}</Text>
                                </TouchableOpacity>                            
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
                                <TouchableOpacity onPress={() => { setLike(!like); handleSubmitLike() } }>
                                    <Ionicons
                                        name={like ? 'heart' : 'heart-outline'}
                                        size={32}
                                        color={like ? '#4B0082' : '#4B0082'}
                                        style={styles.like}
                                    />
                                </TouchableOpacity>
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
                    <ActivityIndicator size={'large'} color={'#4B0082'} style={{top: 300}}></ActivityIndicator>
                )}
            </ScrollView>
        </View> 
            <FlatList 
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMoreComments}
                    ItemSeparatorComponent={() => <View style={{ height: -4 }} />}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => fetchComments(1, true)}
                        />
                    }
                />
            <Caption isVisible={isModelVisible} onClose={onCloseReadMore}>
                <View style={styles.diplayIsModelVisible}>
                    <Text style={styles.readmore}>{post?.caption}</Text>
                    <View style={{margin:20}}>
                    </View>
                </View>
            </Caption>   
            <ViewImage isVisible={isImageVissable} onClose={onCloseImageView}>
                <View style={styles.displayOption}>
                    <Text style={styles.displayUsername}>{post?.user.username}</Text>
                    <Feather style={{bottom: 21}} onPress={saveImage} name="download" size={25} color="#ffffff" />
                </View>
                <View ref={imageRef} collapsable={false}>
                    <Image
                        source={{ uri: post?.image }}
                        style={[styles.postImage, {height:450, left: 0}]}
                        contentFit="cover"
                    />
                </View>
            </ViewImage>
       </KeyboardAvoidingView> 
    );
}
