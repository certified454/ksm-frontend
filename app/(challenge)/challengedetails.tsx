import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/store/postStore';
import { formatTimeAgo, formatVoteCount } from '@/store/util';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, FlatList, Platform, KeyboardAvoidingView, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import styles from '../../assets/styles/challenge';
import Vote from '../../components/vote';

type Challenge = {
    id: string;
    title: string;
    pools: { optionText: string }[];
    startDate: Date;
    endDate: Date;
    time: Date;
    voteCount: number;
    user: {
        _id: string;
        username: string;
        profilePicture?: string;
    };
}
type Vote = {
    _id: string;
    user: {
        _id: string;
        username: string;
        profilePicture?: string;
    };
    challengeId: string;
    text: string;
    createdAt: string;
}

export default function ChallengeDetail() {
    const {token, user} = useAuthStore();

    const [text, setText] = useState('');
    const [isVoting, setIsVoting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [votes, setVotes] = useState<Vote[]>([]);
    
    const [challengeStatus, setChallengeStatus] = useState<string>('')
    const { challengeId } = useLocalSearchParams();
    const liveAnimation = useRef(new Animated.Value(0)).current;
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    // const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8384657725659992/9550281176';
    // const rewardedAd = RewardedAd.createForAdRequest(adUnitId);

    const createVote = async () => {
            setIsVoting(true);
            try {
                if (challengeStatus === 'Ended') {
                    throw new Error('Challenge has ended. Voting is closed.');
                }
                if (challengeStatus === 'Live') {
                    throw new Error('Challenge is live. Voting is closed.');
                }
                const response = await fetch(`${API_URL}/challenge/${challengeId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text
                    })
                })
                const data = await response.json();
                if(!response.ok) throw new Error(data.message || 'Failed to create vote');
                setIsVoting(false);
                
            } catch (error) {
                console.error('Error creating vote:', error);
                Alert.alert(error instanceof Error ? error.message : 'Failed to create vote');
            } finally {
                setIsVoting(false)
            }
    };
    const handleprofilePicturePress = async (id: string) => {
        router.push({ pathname: '/(profile)', params: {userId: id} });
    }
    const getChallenge = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/challenge/${challengeId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error('Failed', data);
            setChallenge({ ...data.challenge, voteCount: data.totalVotes });
            setIsLoading(false);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };
    const fetchVotes = async (pageNum = 1, refresh = false) => {
                try {
                    if(refresh) setRefreshing(true);
                    else if (pageNum ===1 ) setIsLoading(true);
                    const response = await fetch(`${API_URL}/challenge/${challengeId}/votes?page=${pageNum}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                        }
                    });
                    const data = await response.json();
                    if (!response.ok) 
                    throw new Error(data.message || 'Failed to get Challenge');
                    const uniqueVote = refresh || pageNum === 1
                        ? data.votes
                        : Array.from(new Set([...votes, ...data.votes].map((vote) => vote._id))).map((id) => [
                            ...votes, ...data.votes].find((vote) => vote._id === id)
                    )
                    
                    setVotes(uniqueVote);
                    setHasMore(pageNum < data.totalPages);
                    setPage(pageNum);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error getting Challenge:', error);
                } finally {
                    if(refresh) setRefreshing(false);
                    else setIsLoading(false);
                }
    };
    useEffect(() => {
        getChallenge();
        fetchVotes();
        const socket = io('https://kismit-official.onrender.com/');

        socket.on('new vote created', (newVote) => {
            setChallenge((prevChallenge) => {
                if (prevChallenge && prevChallenge.id === newVote.challengeId) {
                    return {
                        ...prevChallenge,
                        voteCount: prevChallenge.voteCount + 1,
                    };
                }
                return prevChallenge;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [])
    useEffect(() => {
        let animationLoop: Animated.CompositeAnimation | null = null;
        if (challengeStatus === "Live") {
            animationLoop = Animated.loop(
                Animated.sequence([
                    Animated.timing(liveAnimation, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: false,
                    }),
                    Animated.timing(liveAnimation, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: false,
                    })
                ])
            );
            animationLoop.start();
        } else {
            liveAnimation.setValue(0);
        }
        return () => {
            if (animationLoop) animationLoop.stop();
        };
    }, [challengeStatus, liveAnimation]);
    useEffect(() => {
        if (challengeStatus !== 'Ended' && challenge?.endDate) {
            const end = new Date(challenge.endDate);
            const now = new Date();
            if (now > end) {
                setChallengeStatus('Ended');
            }
        }
    }, [challengeStatus]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (challenge?.startDate && challenge?.time && challenge?.endDate) {

                const start = new Date(challenge.startDate);
                const time = new Date(challenge.time);
                const end = new Date(challenge.endDate);
    
                start.setHours(time.getHours());
                start.setMinutes(time.getMinutes());
                start.setSeconds(0);
                start.setMilliseconds(0);
    
                const now = new Date();
    
                if (now < start) {
                    setChallengeStatus(
                        start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    );
                } else if (now >=start && now <= end) {
                    setChallengeStatus('Live');
                } else if (now > end) {
                    setChallengeStatus('Ended');
                }
            }
            }, 1000);
            return () => clearInterval(interval);
    }, [challenge?.startDate, challenge?.time]);
    // useEffect(() => {
    //     const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
    //       rewardedAd.show();
    //     });
    //     rewardedAd.load();
    
    //   return () => {
    //     unsubscribeLoaded();
    //   };
    // }, [rewardedAd]);
    const renderVotes = ({ item }: { item: Vote }) => (
        <View style={styles.voteContainer}>
                <TouchableOpacity onPress={() => handleprofilePicturePress(item.user._id)} style={styles.userItems}>
                    <View style={styles.userItem}>
                        <Image source={{ uri: item.user.profilePicture }} style={styles.itemProfilePicture}/>
                        <Text style={styles.username}>{item.user.username}</Text>
                    </View>
                    <Text style={styles.createdAT}>{formatTimeAgo(item.createdAt)}</Text>
                </TouchableOpacity>
                <View style={styles.voteTextContainer}>
                    <Text style={styles.voteText}>{item.text}</Text>
                </View>
        </View>
    );
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ backgroundColor: '#fff'}}>
                <View style={styles.containers}>
                    {isLoading ? (
                            <ActivityIndicator size="large" color="#4B0082" />
                        ) :user?.isOwner ? (
                            <View style={styles.usersMainContainer}>
                                <View style={styles.userPredictContainer}>
                                    <Text style={styles.userPredictInstrutions}>
                                        Instructions: 
                                        <Text style={styles.userPredictText}> Answer at least 3 out of 5 questions correctly to win this week's challenge! once challenge has started, no enterings are allowed</Text>
                                    </Text>
                                    
                                </View>
                                <View style={styles.challengeItemsContainer}>
                                    { challenge ?  (
                                        <>
                                        <View style={styles.challengeItem}>
                                            <TouchableOpacity onPress={() => {setModalVisible(true), fetchVotes()}} style={styles.currentTime}>
                                                <Ionicons name="chatbox-outline" size={24} color="#4B0082" />
                                                <Text style={styles.voteCount}>
                                                    {formatVoteCount(challenge.voteCount)}
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={styles.currentTime}>
                                                <Ionicons name="time" size={24} color="#4B0082" />
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    {challengeStatus === 'Live' ? (
                                                        <>
                                                            <Animated.View 
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    borderRadius: 7.5,
                                                                    marginRight: 6,
                                                                    borderWidth: 1,
                                                                    borderColor: '#4B0082',
                                                                    backgroundColor: liveAnimation.interpolate({
                                                                        inputRange: [0, 1],
                                                                        outputRange: ["#3800a1a4", "#ff1744"],
                                                                    }),
                                                                }}
                                                                
                                                            />
                                                            <Text style={[styles.currentTimeText, { color: "#ff1744", fontWeight: "bold" }]}>
                                                                Live
                                                            </Text>
                                                        </>

                                                    ) : (
                                                        <Text style={styles.currentTimeText}>{challengeStatus}</Text>
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.challengeItem}>
                                            <View style={styles.currentDate}>
                                                <Text style={styles.itemTime}>Start: </Text>
                                                <Text style={styles.currentTimeText}>{new Date(challenge.startDate).toLocaleDateString()}
                                                </Text>
                                            </View>
                                            <View style={styles.currentDate}>
                                                <Text style={styles.itemTime}>End: </Text>
                                                <Text style={styles.currentTimeText}>{new Date(challenge.endDate).toLocaleDateString()}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.challengeItemQuestion}>
                                            <View style={styles.pools}>
                                                <View style={styles.poolContainer}>
                                                    {challenge.pools.slice(0, 5).map((pool, idx) => (
                                                        <BlurView key={idx} intensity={50} tint='light' style={styles.poolBlurContainer}>
                                                            <Text style={styles.poolText}>{pool.optionText}</Text>
                                                        </BlurView>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                        </>
                                    ) : (
                                        <Text></Text>
                                    )}
                                </View>
                            </View>
                        ) : challenge ?  (
                            <View style={styles.usersMainContainer}>
                                <View style={styles.userPredictContainer}>
                                    <Text style={styles.userPredictInstrutions}>
                                        Instructions: 
                                        <Text style={styles.userPredictText}> Answer at least 3 out of 5 questions correctly to win this week's challenge! once challenge has started, no enterings are allowed</Text>
                                    </Text>
                                </View>
                                <View style={styles.challengeItemsContainer}>
                                        <View style={styles.challengeItem}>
                                            <TouchableOpacity onPress={() => {setModalVisible(true), fetchVotes()}} style={styles.currentTime}>
                                                <Ionicons name="chatbox-outline" size={24} color="#4B0082" />
                                                <Text style={styles.voteCount}>
                                                    {formatVoteCount(challenge.voteCount)}
                                                </Text>
                                            </TouchableOpacity>
                                            <View style={styles.currentTime}>
                                                    <Ionicons name="time" size={24} color="#4B0082" />
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        {challengeStatus === 'Live' ? (
                                                            <>
                                                                <Animated.View
                                                                    style={{
                                                                        width: 12,
                                                                        height: 12,
                                                                        borderRadius: 6,
                                                                        marginRight: 6,
                                                                        backgroundColor: liveAnimation.interpolate({
                                                                            inputRange: [0, 1],
                                                                            outputRange: ["#4B0082", "#ff1744"], // purple to red
                                                                        }),
                                                                    }}
                                                                />
                                                                <Text style={[styles.currentTimeText, { color: "#ff1744", fontWeight: "bold" }]}>
                                                                    Live
                                                                </Text>
                                                            </>
                                                        ) : (
                                                            <Text style={styles.currentTimeText}>{challengeStatus}</Text>
                                                        )}
                                                    </View>
                                            </View>
                                        </View>
                                        <View style={styles.challengeItem}>
                                            <View style={styles.currentDate}>
                                                <Text style={styles.itemTime}>Start: </Text>
                                                <Text style={styles.currentTimeText}>{new Date(challenge.startDate).toLocaleDateString()}
                                                </Text>
                                            </View>
                                            <View style={styles.currentDate}>
                                                <Text style={styles.itemTime}>End: </Text>
                                                <Text style={styles.currentTimeText}>{new Date(challenge.endDate).toLocaleDateString()}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.challengeItemQuestion}>
                                            <View style={styles.pools}>
                                                <View style={styles.poolContainer}>
                                                    {challenge.pools.slice(0, 5).map((pool, idx) => (
                                                        <BlurView key={idx} intensity={50} tint='light' style={styles.poolBlurContainer}>
                                                            <Text style={styles.poolText}>{pool.optionText}</Text>
                                                        </BlurView>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.answerPerUser}>
                                            <Ionicons name="information-circle" size={20} color="#fff" style={{ marginRight: 6 }} />    
                                            <Text style={styles.answerPerUserText}>Only one entry per user is allowed! so please confirm your answers before submitting.</Text>
                                        </View>
                                        <View style={styles.challengeItem}>
                                            <TextInput 
                                                style={styles.answerInput} 
                                                placeholder="Your answer" 
                                                value={text}
                                                onChangeText={setText}
                                                multiline
                                            />
                                        </View>
                                        <View style={styles.voteButtonContainer}>
                                            {isVoting ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ): (
                                                <TouchableOpacity onPress={() => createVote()} style={styles.voteButton}>
                                                
                                                        <Text style={styles.voteButtonText}>Submit Entry</Text>
                                                    
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                </View>
                            </View>
                        ) : (
                            <Text></Text>
                        )}
                </View>
            </ScrollView>
                <Vote isVisible={modalVisible} onClose={() => setModalVisible(false)}>
                <View style={styles.challengeVotes}>    
                    <FlatList
                        data={votes}
                        renderItem={renderVotes}
                        keyExtractor={(item) => item._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={() =>fetchVotes(1, true)}
                            />
                        }
                    />
                </View>
            </Vote>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}