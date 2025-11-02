import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import io from "socket.io-client";
import styles from "../../assets/styles/challenge";
import { SafeAreaView } from "react-native-safe-area-context";
import TimePickerModal from "../../components/setTime";

type Challenge = {
    _id: string;
    profilePicture: string; 
    user: {
        _id: string;
        username: string;
        profilePicture?: string;
    };
    title: string;
    description: string;
    createdAt: string;
    pools: { optionText: string }[];
    startDate: Date;
    isChallengeActive: boolean;
    endDate: Date;
    voteCount: number,
    time: Date;
};
function isChallengeActive(startDate: Date | string, endDate: Date | string): 'upcoming' | 'active' | 'ended' {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'active';
}

export default function Challenge(){

    const [modalVisible, setModalVisible] = useState(false);

    //time picker variables
    const [time, setTime] = useState<Date>(new Date());
    const [showTime, setShowTime] = useState(false);

    //start date and end date variables
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState<Date>(new Date());
    
    const [showEndDate, setShowEndDate] = useState(false);

    //challenge details variables
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [refresh, setRefreshing] = useState(false);

    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { challengeId } = useLocalSearchParams();

    //loading variables
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {token, user} = useAuthStore();
    const [poolInput, setPoolInput] = useState('');
    const [pools, setPools] = useState<string[]>([]);

    const addPoolOption = () => {
        if (poolInput.trim()) {
            setPools([...pools, `⚽ ${poolInput.trim()}`]);
            setPoolInput('');
        }
    };
    const timePicker = (event: any, selectedTime?: Date) => {
        setShowTime(false);
        if(selectedTime){
            setTime(selectedTime)
        }
    };
    const startDatePicker = (event: any, selectedTime?: Date) => {
        setShowStartDate(false);
        if(selectedTime) {
            setStartDate(selectedTime);
        }
    };
    const endDatePicker = (evenet: any, selectedTime?:  Date) => {
        setShowEndDate(false);
        if(selectedTime) {
            setEndDate(selectedTime);
        }
    };
    const onTimePickerOpen = () => {
        setModalVisible(true);
    };
    const onTimePickerClose = () => {
        setModalVisible(false);
    };
    const handleChallengePress = async(id: string) => {
        router.push({pathname: '/challengedetails', params: {challengeId: id}})
    }
    const createChallenge = async () => {
        setIsUploading(true);
        try {
            const response = await fetch(`${API_URL}/challenge/register`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    pools: pools.map(option => ({ optionText: option })), 
                    time,
                    startDate,
                    endDate,
                    user
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || 'Failed to create challenge');
            router.push({ pathname: '/(challenge)'});
            console.log('Success: ', data.message);
            setChallenges(data.challenges);
            setIsUploading(false);
        } catch (error) {
            console.log('Failed: ', "Failed to created challenge")
            Alert.alert("Error", "Failed to create challenge")
        } finally{
            setIsUploading(false);
        }
    };
    const handleprofilePicturePress = async (id: string) => {
      router.push({ pathname: '/(profile)', params: { userId: id }})
    };
    const fetchChallenge = async (pageNum = 1, refresh = false) => {
        try {
            if(refresh) setRefreshing(true);
            else if (pageNum ===1 ) setIsLoading(true);
            const response = await fetch(`${API_URL}/challenge/all?page=${pageNum}&limit=20`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (!response.ok) 
            throw new Error(data.message || 'Failed to get Challenge');
            const uniqueChallenge = refresh || pageNum === 1
                ? data.challenges
                : Array.from(new Set([...challenges, ...data.challenges].map((challenge) => challenge._id))).map((id) => [
                    ...challenges, ...data.challenges].find((challenge) => challenge._id === id)
            )
            
            setChallenges(uniqueChallenge);
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
        fetchChallenge();
        const socket = io('https://kismit-official.onrender.com/');

        socket.on('new challenge created', (newChallenge) => {
            setChallenges(newChallenge)
        });
        // socket.on('new vote created', (newVote) => {
        //     setVotechallenge(newVote)
        // });
        return () => {
        socket.disconnect();
        };
    }, []);

    const renderChallenge = ({ item }: { item: Challenge }) => {
        const status = isChallengeActive(item.startDate, item.endDate);
        return (
            <View style={styles.challengeItems}>
                { user.isOwner ? (
                    <>
                        <ScrollView>
                            <View style={styles.challengeDetailsContainer}>
                                <TouchableOpacity onPress={() => handleChallengePress(item._id)} style={styles.checkItOutButton}>
                                    <Text style={styles.checkItOutText}>Check it out</Text>
                                </TouchableOpacity>
                                <Image style={styles.backgrounImage} source={{uri: 'https://avatars.mds.yandex.net/i?id=e70cd60a4cf4c5faccd2e56342e46e0ef6dc5bfb-10651780-images-thumbs&n=13'}}/>
                                <BlurView tint="light" intensity={70} style={styles.challengeDetails}>
                                    <Text style={styles.adminText}>{item.title}</Text>
                                    <Text style={styles.detailText} ellipsizeMode="tail" numberOfLines={3}>{item.description}</Text>
                                    <View style={styles.challengeitems}>
                                        <View style={styles.startDate}>
                                            <Text style={styles.itemTime}>Start: </Text>
                                            <Text style={styles.currentTimeText}>{new Date(item.startDate).toLocaleDateString()}</Text>
                                        </View>
                                        <View style={styles.endDate}>
                                            <Text style={styles.itemTime}>End: </Text>
                                            <Text style={styles.currentTimeText}>{new Date(item.endDate).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                    <View>
                                    <TouchableOpacity style={styles.creator} onPress={() => handleprofilePicturePress(item.user._id)}>
                                        <Image source={{ uri: item.user.profilePicture }} style={styles.profilePicture} />
                                        <Text style={styles.username}>{item.user.username}</Text>
                                    </TouchableOpacity>
                                   
                                    {status === "active" && (
                                            <View style={styles.activeChallenge}>
                                                <Text style={styles.textActive}>Active</Text>
                                                <Ionicons name="checkmark-circle" size={24} color='white'/>
                                            </View>
                                        )}
                                        {status === "upcoming" && (
                                            <View style={styles.upcomingChallenge}>
                                                <Text style={styles.textActive}>Upcoming</Text>
                                                <MaterialIcons name="schedule" size={24} color="white" />
                                            </View>
                                        )}
                                        {status === "ended" && (
                                            <View style={styles.endedChallenge}>
                                                <Text style={styles.textActive}>Ended</Text>
                                                <Ionicons name="close-circle-sharp" size={24} color="white" />
                                            </View>
                                        )}
                                    </View>
                                </BlurView>
                                <View style={styles.challengeItemQuestion}>
                                </View>
                            </View>
                        </ScrollView>
                    </>

                ):(
                    <>
                        <ScrollView>
                            <View style={styles.challengeDetailsContainer}>
                                <TouchableOpacity onPress={() => handleChallengePress(item._id)} style={styles.checkItOutButton}>
                                    <Text style={styles.checkItOutText}>Check it out</Text>
                                </TouchableOpacity>
                                <Image style={styles.backgrounImage} source={{uri: 'https://avatars.mds.yandex.net/i?id=e70cd60a4cf4c5faccd2e56342e46e0ef6dc5bfb-10651780-images-thumbs&n=13'}}/>
                                <BlurView tint="light" intensity={70} style={styles.challengeDetails}>
                                    <Text style={styles.adminText}>{item.title}</Text>
                                    <Text style={styles.detailText} ellipsizeMode="tail" numberOfLines={3}>{item.description}</Text>
                                    <View style={styles.challengeitems}>
                                        <View style={styles.startDate}>
                                            <Text style={styles.itemTime}>Start: </Text>
                                            <Text style={styles.currentTimeText}>{new Date(item.startDate).toLocaleDateString()}</Text>
                                        </View>
                                        <View style={styles.endDate}>
                                            <Text style={styles.itemTime}>End: </Text>
                                            <Text style={styles.currentTimeText}>{new Date(item.endDate).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                    <View>
                                    <TouchableOpacity style={styles.creator} onPress={() => handleprofilePicturePress(item.user._id)}>
                                        <Image source={{ uri: item.user.profilePicture }} style={styles.profilePicture} />
                                        <Text style={styles.username}>{item.user.username}</Text>
                                    </TouchableOpacity>
                                    {status === "active" && (
                                            <View style={styles.activeChallenge}>
                                                <Text style={styles.textActive}>Active</Text>
                                                <Ionicons name="checkmark-circle" size={24} color='white'/>
                                            </View>
                                        )}
                                        {status === "upcoming" && (
                                            <View style={styles.upcomingChallenge}>
                                                <Text style={styles.textActive}>Upcoming</Text>
                                                <MaterialIcons name="schedule" size={24} color="white" />
                                            </View>
                                        )}
                                        {status === "ended" && (
                                            <View style={styles.endedChallenge}>
                                                <Text style={styles.textActive}>Ended</Text>
                                                <Ionicons name="close-circle-sharp" size={24} color="white" />
                                            </View>
                                        )}
                                    </View>
                                </BlurView>
                                <View style={styles.challengeItemQuestion}>
                                </View>
                            </View>
                        </ScrollView>
                    </>

                )}
            </View>
        );
    };
    return(
           <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
             <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.container}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'}  color={'#4B0082'}/>
                    ): user.isOwner? (
                        <>
                            <View style={styles.header}>
                                    <TouchableOpacity style={styles.userInfo} onPress={() => handleprofilePicturePress(user.id)}>
                                        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
                                        <Text style={styles.username}>{user.username}</Text>
                                    </TouchableOpacity>
                                    <BlurView tint='light' intensity={50} style={styles.create}>
                                        <TouchableOpacity onPress={() => onTimePickerOpen()}>
                                            <Ionicons name="add-circle-outline" size={40} color="#4B0082" />
                                        </TouchableOpacity>
                                        
                                    </BlurView>
                            </View>
                            <FlatList
                                data={challenges}
                                renderItem={renderChallenge}
                                keyExtractor={(item: Challenge) => item._id}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl 
                                        refreshing={refresh} 
                                        onRefresh={() => fetchChallenge(1, true)} 
                                    />
                                }
                            />
                        </>
                    ):(
                        <>
                            <View style={styles.userHeader}>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Ionicons name="arrow-back" size={30} color="#4B0082" />
                                    <Text style={styles.dontMissOutText}>Don't miss out on this week's Challenge</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.userInfo} onPress={() => handleprofilePicturePress(user.id)}>
                                    <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
                                    <Text style={styles.username}>{user.username}</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={challenges}
                                renderItem={renderChallenge}
                                keyExtractor={(item: Challenge) => item._id}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl 
                                        refreshing={refresh} 
                                        onRefresh={() => fetchChallenge(1, true)} 
                                    />
                                }
                            />
                        </>
                    )}
                    
                    <View style={{padding: 10}}>
                        <TimePickerModal isVisible={modalVisible} onClose={onTimePickerClose}>

                            <View style={styles.itemsContainer}>
                                <View style={styles.inputContainer}>
                                    <TextInput 
                                        style={styles.inputItem}
                                        placeholder="Title"
                                        value={title}
                                        onChangeText={setTitle}
                                        editable={!isUploading}
                                        multiline
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput 
                                        style={styles.inputItem}
                                        placeholder="Description"
                                        value={description}
                                        onChangeText={setDescription}
                                    editable={!isUploading}
                                    multiline
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.addPoolsInput}
                                        placeholder="⚽Add question"
                                        value={poolInput}
                                        onChangeText={setPoolInput}
                                        editable={!isUploading}
                                        multiline
                                />
                                <TouchableOpacity onPress={addPoolOption}>
                                    <Ionicons 
                                    name={poolInput ? "checkmark-circle" : 'add-circle-outline'} 
                                    size={35} 
                                    color="#4B0082" 
                                />
                                </TouchableOpacity>
                                </View>
                                {pools.map((option, index) => (
                                        <View key={index} style={styles.indexItems}>
                                            <Text style={styles.text}>{option}</Text>
                                            <MaterialIcons name="question-mark" size={27} color="#4B0082" />
                                        </View>
                                ))}
                                <Text style={styles.predictText}>
                                    3/5 correct answers take home this week challenge winnings
                                </Text>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity onPress={() => {setShowStartDate(true)}} style={styles.inputContainerDate}>
                                        <Ionicons name="calendar-number-sharp" size={24} color="#4B0082" />
                                        <Text>{startDate.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity  onPress={() => {setShowEndDate(true)}} style={styles.inputContainerDate}>
                                        <Ionicons name="calendar-number-sharp" size={24} color="#4B0082" />
                                        <Text>{endDate.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })}</Text>
                                    </TouchableOpacity>
                                </View>
                                { showStartDate && (
                                    <DateTimePicker
                                        value={startDate}
                                        mode="date"
                                        display="default"
                                        onChange={startDatePicker}
                                    />
                                )}
                                { showEndDate && (
                                    <DateTimePicker
                                        value={endDate}
                                        mode="date"
                                        display="default"
                                        onChange={endDatePicker}
                                    />
                                )}
                                <TouchableOpacity onPress={() => setShowTime(true)} style={styles.time}>
                                    <Ionicons 
                                        name={ time ? "time" : "time-outline"} 
                                        size={24} 
                                        color="#4B0082" 
                                    />
                                    <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</Text>
                                </TouchableOpacity>
                                            
                                { showTime && Platform.OS === 'android' && (
                                    <DateTimePicker
                                        value={time}
                                        mode="time"
                                        display="default"
                                        onChange={timePicker}
                                    />
                                )}
                                <TouchableOpacity style={styles.createChallenge} onPress={() =>  createChallenge()}>
                                    {isUploading ? (
                                        <ActivityIndicator size={'small'} color={'#ffff'}>
                                        </ActivityIndicator>
                                    ) : (
                                        <Text style={styles.createText}>Upload</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                            <View style={{height: 90}}>

                            </View>
                        </TimePickerModal>
                    </View>
                </View>
             </KeyboardAvoidingView>
           </SafeAreaView>
    )
}