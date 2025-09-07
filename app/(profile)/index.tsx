import styles from "@/assets/styles/userposts";
import UserDetailPage from "@/components/userDetail";
import { useNotification } from "@/context/NotificationContext";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { formatFollowingCount } from "@/store/util";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Video } from "expo-av";
import { Image } from "expo-image";
import * as MediaLabriary from 'expo-media-library';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Linking, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { captureRef } from 'react-native-view-shot';
import { io } from "socket.io-client";
import UpdateUserProfile from '../../components/updateProfile';
import ViewImage from "../../components/viewImage";

type User = {
 _id: string;
 profilePicture: string;
 username: string;
 email: string;
 followingCount: number;
 followersCount: number;
 bio: string;
 fullName: string;
 location: string;
 gender: string;
 hobbies: string;
 phone: string;
};

export default function Index() {
    const { token, user: currentUser } = useAuthStore();
    const [user, setUser ] = useState<User | null >(null);
    const { userId } = useLocalSearchParams();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isImageVissable, setImagevisable ] = useState(false);

    // variables to update profile
    const [username, setUsername] = useState(currentUser.username || '');
    const [bio, setBio] = useState(currentUser.bio || '');
    const [fullName, setfullName] = useState(currentUser.fullName || '');
    const [phone, setPhone] = useState(currentUser.phone || '');
    const [location, setLocation] = useState(currentUser.location || '');
    const [gender, setGender] = useState(currentUser.gender || '');
    const [hobbies, setHobbies] = useState(currentUser.hobbies || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUpdateUserProfileVisible, setIsUpdateUserProfileVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const imageRef = useRef<View>(null)

    const { expoPushToken, notification, error } = useNotification();

    const locationOptions = [
    { label: 'Lagos', value: 'Lagos' },
    { label: 'Abuja', value: 'Abuja' },
    { label: 'Port Harcourt', value: 'Port Harcourt' },
    { label: 'Kano', value: 'Kano' },
    { label: 'Enugu', value: 'Enugu' },
    { label: 'Edo', value: 'Edo' },
    ];
    const genderOptions = [
        {label: 'He', value: 'He'},
        {label: 'She', value: 'She'},
        {label: 'Other', value: 'Other'}
    ];
    const hobbiesOptions = [
        {label: '👥Fan', value: '👥Fan'},
        {label: '👀Viewer', value: '👀Viewer'},
        {label: '📊Analyst', value: '📊Analyst'},
        {label: '🎮Gamer', value: '🎮Gamer'},
        {label: '⌛Tipstar', value: '⌛Tipstar'},
    ];
    // follow user variable
    const [ follow, setFollow ] = useState(false);
    const [ submitFollow, setSubmitFollow ] = useState(false);
    // fetch user post vairable 
    const [posts, setPosts] = useState([]);
    // fetch user analysis variable
    const [analysis, setAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState<'posts' | 'analysis' | 'challenges'>('posts');

    const getUserById = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/user/profile/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            if (!response.ok) 
                throw new Error(data.message || 'Failed to fetch user data');
            setUser({
                _id: data.user._id,
                profilePicture: data.user.profilePicture,
                username: data.user.username,
                email: data.user.email,
                followingCount: data.user.followingCount,
                followersCount: data.user.followersCount,
                bio: data.user.bio,
                fullName: data.user.fullName,
                phone: data.user.phone,
                location: data.user.location,
                gender: data.user.gender,
                hobbies: data.user.hobbies,
            });
            setFollow(data.followingUser);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            Alert.alert('Error', 'Failed to fetch user data. Please try again later.');
        } finally {
            setIsLoading(false)
        }
    };
    const fetchUserData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}/user/profile/${userId}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch user post");

        setPosts(data.posts);
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Failed to load profile data.");
        } finally {
        setIsLoading(false);
        }
    };
    const fetchUserAnalysis = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/user/profile/${userId}/analysis`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if(!response.ok) throw new Error(data.message || "Failed to fetch user analysis");
            setAnalysis(data.analysis)
        } catch (error) {
            console.error("Error fetching user analysis:", error);
            Alert.alert("Error", "Failed to load user analysis.");
        }
    }
    const onImageView = () => {
        setImagevisable(true)
    };
    const onCloseImageView = () => {
        setImagevisable(false)
    };
    const onCloseUpdateProfile = () => {
        setIsUpdateUserProfileVisible(false);
    };
    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`${API_URL}/user/profile/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        bio,
                        fullName,
                        location,
                        gender,
                        hobbies,
                        phone
                    })
                }
            )
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update profile');
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Updating failed', 'Failed to update profile. Please try again later.');
        } finally {
            setIsUpdating(false)
        }
    };
    const handleFollow = async () => {
        setSubmitFollow(true);
        try {
            const response = await fetch(`${API_URL}/user/profile/${userId}/follow`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to follow user');
            setFollow(!follow);
            setSubmitFollow(false)
        } catch (error) {
            console.error('Error following user:', error);
            Alert.alert('Error', 'Failed to follow user. Please try again later.');
        }
    };
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
    };
    const handleCallPress = async (phoneNumber: string) => {
        const url = `tel:${phoneNumber || phone}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            Linking.openURL(url);
        } else {
            Alert.alert('Error', 'Unable to open dialer');
        }
    };
    const handlePostPress = async (id: string) => {
        router.push({pathname: '/(postdetail)', params: {postId:id}})
    };
    const handleFollowersPress = async (id: string) => {
      router.push({ pathname: '/(menu)/follower', params: { userId: id}})
    };
    const handleFollowedUsersPress = async (id: string) => {
      router.push({ pathname: '/(menu)/following', params: { userId: id}})
    };
    const getUpdatedFcmToken = async () => {
        if(!expoPushToken || !user?._id) return;
            const response = await fetch(`${API_URL}/user/profile/${userId}/expoPushToken`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ expoPushToken })
            });
            if (!response.ok) {
              throw new Error('Failed to update FCM token');
            }
    };
    const displayUserDetails = () => {
        setIsModalVisible(true);
    };
    const onCloseDisplayUserDetails = () => {
        setIsModalVisible(false);
    };
    useEffect (() => {
        getUserById();
        fetchUserData();
        fetchUserAnalysis();
        getUpdatedFcmToken();
        const socket = io('https://kismit-official.onrender.com/');

        socket.on('userProfileUpdated', ({userId, updatedFields}) => {
            setUser((user) => {
                if (user && user._id === userId) {
                    return { ...user, ...updatedFields };
                }
                return user;
            });
        });
        socket.on('new follower', ({userId, followerId, followed}) => {
            setUser((user) => {
                if (user && user._id === userId) {
                    const updatedFollowCount = followed ? user.followersCount + 1 : user.followersCount - 1;
                    return { ...user, followersCount: updatedFollowCount };
                }
                return user;
            });
        });
    }, []);
    const renderUserPost = ({ item }: { item: any }) => (
        <View style={styles.postItems}>
            <TouchableOpacity style={styles.image} onPress={() => handlePostPress(item._id)}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    contentFit="cover"
                />
            </TouchableOpacity>

        </View>
    );
    const renderUserAnalysis = ({ item }: { item: any }) => (
        <View style={styles.postItems}>
            <TouchableOpacity style={styles.image} onPress={() => handlePostPress(item._id)}>
                <Video
                    source={{ uri: item.video }}
                    style={styles.video}
                />
                <Ionicons name="videocam" size={24} color="#000000a6" style={styles.videoIcon} />
            </TouchableOpacity>

        </View>
    );
    const renderUserCHallanges = ({ item }: { item: any }) => (
        <View style={styles.postItems}>
            <TouchableOpacity style={styles.image} onPress={() => handlePostPress(item._id)}>
                <Video
                    source={{ uri: item.video }}
                    style={styles.video}
                />
                <Ionicons name="videocam" size={24} color="#000000a6" style={styles.videoIcon} />
            </TouchableOpacity>

        </View>
    );

    return (
         <View style={styles.container}>
            <View style={styles.containerItems}>
                { isLoading ? (
                    <ActivityIndicator  size={'large'} color={'#4B0082'} style={{top: 150}}/>
                ): user ? (
                    <View style={styles.userProfileContainer}>
                        <TouchableOpacity onPress={onImageView}style={styles.userProfile}>
                            <Image source={{ uri: user.profilePicture}} contentFit="cover" style={styles.image}/>
                        </TouchableOpacity>
                        <View style={styles.userDetailsContainer}>    
                            <View style={styles.itemProp}>
                                <Text style={styles.itemPropTextUsername}>{user.username}/
                                    <Text style={styles.itemPropTextGender}>{user.gender}</Text>
                                </Text>
                               
                                { user && currentUser?.id === user._id? (
                                    <View style={styles.editAccountButtonContainer}>
                                        <TouchableOpacity onPress={() => {setIsUpdateUserProfileVisible(true)}} style={styles.editAccount}>
                                            <Text style={styles.editProfileText }>edit profile</Text>
                                           <MaterialCommunityIcons name="account-edit" size={26} color="black"
                                                style={styles.icon}
                                            />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity onPress={getUpdatedFcmToken }><Text>get expoPushToken</Text></TouchableOpacity> */}
                                    </View>

                                ): (
                                    <View style={styles.followButtonContainer}>
                                        <TouchableOpacity onPress={() => {setFollow(!follow), handleFollow(), getUpdatedFcmToken()}} style={[styles.followUser, {backgroundColor: follow? '#e8e8e8' : '#4B0082'}]}>
                                            <Ionicons
                                                name={follow? 'checkmark-sharp' : 'add'}
                                                size={24}
                                                style={[styles.icon, {color: follow? '#4B0082' : '#ffffff'}]}
                                            />
                                            <Text style={[styles.itemTitleText, {color: follow?  '#4B0082' : '#ffffff'}]}>{follow ? 'following' : 'follow'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            <View style={styles.itemCall}>
                                <TouchableOpacity onPress={() => handleFollowedUsersPress(user?._id)} style={styles.itemInnerContainer}>
                                    <Text style={styles.itemCallText}>{formatFollowingCount(user.followingCount)}</Text>
                                    <Text style={styles.itemTitleText}>following</Text>
                                </TouchableOpacity>
                                <View style={styles.seprateItem}></View>
                                <TouchableOpacity onPress={() => handleFollowersPress(user?._id)} style={styles.itemInnerContainer}>
                                    <Text style={styles.itemCallText}>{formatFollowingCount(user.followersCount)}</Text>
                                    <Text style={styles.itemTitleText}>followers</Text>
                                </TouchableOpacity>
                                <View style={styles.seprateItem}></View>
                                <View style={styles.itemInnerContainer}>
                                    <TouchableOpacity onPress={() => handleCallPress(user?.phone)} style={styles.call}>
                                        <Ionicons name="call" size={22} style={styles.icon}/>
                                        <Text style={styles.callText}>contact</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.itemLocation}>
                                <View style={styles.itemLocationContainer}>
                                    <Text style={styles.itemLocationText}>{user.hobbies}</Text>
                                </View>
                                <View style={styles.seprateItem}></View>
                                <View style={styles.itemInnerContainer}>
                                    <Text style={styles.itemLocationText}>{user.location}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.itemBio}>
                                    <Text style={styles.itemBioText} numberOfLines={5} ellipsizeMode="tail">{user.bio}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ):(
                    <View>
                        <Text></Text>
                    </View>
                )}
            </View>
            
            <View style={styles.itemTitle}>
                <TouchableOpacity
                    onPress={() => setActiveTab('posts')} style={[styles.itemTitleContainer, activeTab === 'posts' && { backgroundColor: '#4B0082' }]}>
                    <Text style={[styles.itemTitleText, activeTab === 'posts' && { color: '#fff', fontWeight: 'bold' }]}>
                        Posts
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('analysis')} style={[styles.itemTitleContainer, activeTab === 'analysis' && { backgroundColor: '#4B0082' }]}>
                    <Text style={[styles.itemTitleText, activeTab === 'analysis' && { color: '#fff', fontWeight: 'bold' }]}>
                        Analysis
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('challenges')} style={[styles.itemTitleContainer, activeTab === 'challenges' && { backgroundColor: '#4B0082' }]}>
                    <Text style={[styles.itemTitleText, activeTab === 'challenges' && { color: '#fff', fontWeight: 'bold' }]}>
                        Challanges
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={
                        activeTab === 'posts'
                        ? posts
                        : activeTab === 'analysis'
                        ? analysis
                        : activeTab === 'challenges'
                        ? null
                        : null
                    }
                    renderItem={
                        activeTab === 'posts' 
                        ? renderUserPost
                        : activeTab === 'analysis'
                        ? renderUserAnalysis || <Text>No analysis yet</Text>
                        : activeTab === 'challenges'
                        ? renderUserCHallanges || <Text>No challanges yet</Text>
                        : null
                    }
                    keyExtractor={(item, index) => `${item._id || item.id || index}}`}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    contentContainerStyle={{padding: 0}}
                />
            </View>

            <ViewImage isVisible={isImageVissable} onClose={onCloseImageView}>
                <View style={styles.displayOption}>
                    <Text style={styles.displayUsername}>{user?.username}</Text>
                    <Feather style={{bottom: 21}} onPress={saveImage} name="download" size={25} color="#ffffff" />
                </View>
                <View ref={imageRef} collapsable={false}>
                    <Image
                        source={{ uri: user?.profilePicture }}
                        style={[styles.postImage, {height:450, left: 0}]}
                        contentFit="cover"
                    />
                </View>
            </ViewImage> 
            <UpdateUserProfile isVisible={isUpdateUserProfileVisible} onClose={onCloseUpdateProfile}>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>username</Text>
                    <View style={styles.updateInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={username}
                            onChangeText={setUsername}
                            multiline
                            editable={!isUpdating}
                        />
                    </View>
                </View>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>Bio</Text>
                    <View style={styles.updateInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={bio}
                            onChangeText={setBio}
                            placeholder="enter bio"
                            multiline
                            editable={!isUpdating}
                        />
                    </View>
                </View>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>Phone Number</Text>
                    <View style={styles.updateInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="enter your contact"
                            keyboardType="phone-pad"
                            editable={!isUpdating}
                        />
                    </View>
                </View>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>Full Name</Text>
                    <View style={styles.updateInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={fullName}
                            onChangeText={setfullName}
                            placeholder="enter your first and last name"
                            multiline
                            editable={!isUpdating}
                        />
                    </View>
                </View>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>Location</Text>
                    <View style={styles.updateInputContainer}>
                        <RNPickerSelect
                            value={location}
                            onValueChange={(value) => setLocation(value)}
                            placeholder={{ label: 'Select your location', value: null }}
                            items={locationOptions}
                            style={{inputAndroid: { color: '#000', bottom: 7 }}}
                        />
                    </View>
                </View>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>Gender</Text>
                    <View style={styles.updateInputContainer}>
                        <RNPickerSelect
                            value={gender}
                            onValueChange={(value) => setGender(value)}
                            placeholder={{ label: 'Select your gender', value: null }}
                            items={genderOptions}
                            style={{inputAndroid: { color: '#000', bottom: 7 }}}
                        />
                    </View>
                </View>
                <View style={styles.updateContainer}>
                    <Text style={styles.updateText}>Hobbie</Text>
                    <View style={styles.updateInputContainer}>
                        <RNPickerSelect
                            value={hobbies}
                            onValueChange={(value) => setHobbies(value)}
                            placeholder={{ label: 'Select your hobbie', value: null }}
                            items={hobbiesOptions}
                            style={{inputAndroid: { color: '#000', bottom: 7 }}}
                        />
                    </View>
                </View>
                <View style={styles.warinigContainer}>
                    <Text style={styles.warning}>WARNING: 
                        <Text style={styles.notice}> Username can olny be edited after each 20 days. Ensure your username is correct to avoid restriction of changing</Text>
                    </Text>
                </View>
                <TouchableOpacity style={styles.updateOpacityContainer} onPress={() =>  handleUpdateProfile()}>
                    {isUpdating ? (
                        <ActivityIndicator size={'small'} color={'#ffff'}>
                        </ActivityIndicator>
                    ) : (
                        <Text style={styles.text}>Submit</Text>
                    )}
                </TouchableOpacity>
            </UpdateUserProfile>
            
            <UserDetailPage isVisible={isModalVisible} onClose={onCloseDisplayUserDetails}>
                <View style={styles.userInfo}>
                    <View style={styles.userProfilePicture}>
                        <Image source={{ uri: user?.profilePicture }} style={styles.image} contentFit="cover" />
                    </View>
                    <View style={styles.userDetailsInfo}>
                        <Text style={styles.userText}>{user?.fullName}/
                            <Text style={styles.userTextGender}>{user?.gender}</Text>
                        </Text>
                    </View>
                    <View style={styles.userDetailsInfoOther}>
                        <Text style={styles.userTextPlaceHolder}>Phone Number: <Text style={styles.userTextLocation}>{user?.phone}</Text></Text>
                        <Text style={styles.userTextPlaceHolder}>Hobby: <Text style={styles.userTextLocation}>{user?.hobbies}</Text></Text>
                        <Text style={styles.userTextPlaceHolder}>Location: <Text style={styles.userTextLocation}>{user?.location}</Text></Text>
                        <Text style={styles.userTextPlaceHolder}>Email: <Text style={styles.userTextLocation}>{user?.email}</Text></Text>
                    </View>
                    <View style={styles.userDetailsInfoOther}>
                        <Text style={styles.userTextPlaceHolder}> </Text>
                        <Text style={styles.userTextLocation}>{user?.bio}</Text>
                    </View>
                </View>
            </UserDetailPage>
        </View>
          );

}
