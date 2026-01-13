import styles from "@/assets/styles/userposts";
import UserDetailPage from "@/components/userDetail";
import { useNotification } from "@/context/NotificationContext";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { formatFollowingCount } from "@/store/util";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Video } from "expo-av";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLabriary from 'expo-media-library';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, Linking, Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import { captureRef } from 'react-native-view-shot';
import { io } from "socket.io-client";
import countries from 'world-countries';
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
 
    const [countryCode, setCountryCode] = useState<string | undefined>();
    const [withCountryNameButton, setWithCountryNameButton] = useState<Boolean>(false);
    const [withFlag, setWithFlag] = useState<Boolean>(true);
    const [withEmoji, setWithEmoji] = useState<Boolean>(true);
    const [withCallingCode, setWithCallingCode] = useState<Boolean>(false);
    const [displayNativeModal, setDisplayNativeModal] = useState<Boolean>(false);
    const [countryQuery, setCountryQuery] = useState<string>('');
     
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
        {label: '👥 Fan', value: '👥 Fan'},
        {label: '👀 Viewer', value: '👀 Viewer'},
        {label: '📊 Analyst', value: '📊 Analyst'},
        {label: '🎮 Gamer', value: '🎮 Gamer'},
        {label: '⌛ Tipstar', value: '⌛ Tipstar'},
    ];
    // follow user variable
    const [ follow, setFollow ] = useState(false);
    const [ submitFollow, setSubmitFollow ] = useState(false);
    // fetch user post vairable 
    const [posts, setPosts] = useState([]);
    // fetch user analysis variable
    const [analysis, setAnalysis] = useState<any[]>([]); // ensure it's an array
    const [activeTab, setActiveTab] = useState<'posts' | 'analysis' | 'challenges'>('posts');

    const onSelectCountry = (country: any) => {
        setCountryCode(country.cca2 || country.cca2);
        // country.name may be object with common/name; normalize
        const name = (country as any).name?.common || (country as any).name || '';
        setLocation(name);
    }
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
    const onEditProfilePress = () => {
        setIsUpdateUserProfileVisible(true);
        setUsername(user?.username || '');
        setBio(user?.bio || '');
        setfullName(user?.fullName || '');
        setPhone(user?.phone || '');
        setLocation(user?.location || '');
        setGender(user?.gender || '');
        setHobbies(user?.hobbies || []);
    }
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
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again later.');
        } finally {
            setIsUpdating(false);
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
                    Toast.show({
                        type: 'success',
                        text1: 'Saved',
                        text2: 'Image has been downloaded'
                    });
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
    const onCloseDisplayUserDetails = () => {
        setIsModalVisible(false);
    };
    useEffect (() => {
        getUserById();
        fetchUserData();
        fetchUserAnalysis();
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
    const countryCodeToEmoji = (cca2?: string) => {
        if (!cca2) return '';
       // convert 'NG' => regional indicator symbols for flag
        return cca2
            .toUpperCase()
            .split('')
            .map(c => String.fromCodePoint(127397 + c.charCodeAt(0)))
            .join('');
    };
    const filteredCountries = countryQuery.trim().length > 0
        ? countries.filter(c => ((c.name?.common || '').toLowerCase().includes(countryQuery.trim().toLowerCase()))).slice(0, 80)
        : countries.slice(0, 80);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.containerItems}>
                        { isLoading ? (
                            <ActivityIndicator  size={'large'} color={'#4B0082'} style={{top: 150}}/>
                        ): user ? (
                            <View style={styles.userProfileContainer}>
                                <LinearGradient
                                    colors={['#b6e3f4', '#ffdfbf']}
                                    style={styles.userProfile}
                                >
                                    <TouchableOpacity onPress={onImageView}style={styles.userProfile}>
                                        <Image source={{ uri: user.profilePicture}} contentFit="cover" style={styles.image}/>
                                    </TouchableOpacity>
                                </LinearGradient>
                                <View style={styles.userDetailsContainer}>    
                                    <View style={styles.itemProp}>
                                        <Text style={styles.itemPropTextUsername}>{user.username}/
                                            <Text style={styles.itemPropTextGender}>{user.gender}</Text>
                                        </Text>
                                    
                                        { user && currentUser?.id === user._id? (
                                            <View style={styles.editAccountButtonContainer}>
                                                <TouchableOpacity onPress={() => {onEditProfilePress()}} style={styles.editAccount}>
                                                    <Text style={styles.editProfileText }>edit profile</Text>
                                                <MaterialCommunityIcons name="account-edit" size={24} color="black"
                                                        style={styles.icon}
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                        ): (
                                            <View style={styles.followButtonContainer}>
                                                <TouchableOpacity onPress={() => {setFollow(!follow), handleFollow()}} style={[styles.followUser, {backgroundColor: follow? '#e8e8e8' : '#4B0082'}]}>
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
                                                <Ionicons name="call" size={20} style={styles.icon}/>
                                                <Text style={styles.callText}>contact</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.itemLocation}>
                                        <View style={styles.itemLocationContainer}>
                                            <Text style={styles.itemLocationText}>{user.hobbies}</Text>
                                        </View>
                                        <View style={styles.seprateItem}></View>
                                        <View style={styles.itemLocationContainer}>
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
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#4B0082" style={{ top: 150 }} />
                    ): (
                        <View style={styles.flatListContainer}>
                            <FlatList
                                data={
                                    activeTab === 'posts' ? (posts || [])
                                    : activeTab === 'analysis' ? (analysis || [])
                                    : activeTab === 'challenges' ? ([] )
                                    : []
                                }
                                renderItem={
                                    activeTab === 'posts' ? renderUserPost
                                    : activeTab === 'analysis' ? renderUserAnalysis
                                    : activeTab === 'challenges' ? renderUserCHallanges
                                    : undefined
                                }
                                ListEmptyComponent={() =>
                                    activeTab === 'posts' ? <View style={styles.createpostContainer}>
                                        <Image source={require('../../assets/images/createpost.png')} style={styles.createpost} contentFit="contain" />
                                        <Text style={styles.createpostText}>No posts yet</Text>
                                        <Text style={styles.createpostext} numberOfLines={2}> {user?.username}'s posts will appear here</Text>
                                    </View>
                                    : activeTab === 'analysis' ? <View style={styles.createpostContainer}>
                                        <Image source={require('../../assets/images/analysis.png')} style={styles.createpost} contentFit="contain" />
                                        <Text style={styles.createpostText}>No analysis yet</Text>
                                        <Text style={styles.createpostext} numberOfLines={2}> {user?.username}'s analysis will appear here</Text>
                                    </View>
                                    : activeTab === 'challenges' ? <View style={styles.createpostContainer}>
                                        <Image source={require('../../assets/images/challange.png')} style={styles.createpost} contentFit="contain" />
                                        <Text style={styles.createpostText}>No challenges yet</Text>
                                        <Text style={styles.createpostext} numberOfLines={2}>If {user?.username} wins a challenge, it will appear here</Text>
                                    </View>
                                    : <Text />
                                }
                                keyExtractor={(item, index) => `${item?._id || item?.id || index}`}
                                showsVerticalScrollIndicator={false}
                                numColumns={3}
                                contentContainerStyle={{padding: 0}}
                            />
                        </View>
                    )}

                    <ViewImage isVisible={isImageVissable} onClose={onCloseImageView}>
                        <View style={styles.displayOption}>
                            <MaterialIcons onPress={saveImage} name="download" size={30} color="#ffffff" style={styles.iconDownload}    />
                        </View>
                        <View ref={imageRef} collapsable={false}>
                            <Image
                                source={{ uri: user?.profilePicture }}
                                style={styles.postImage}
                                contentFit="cover"
                            />
                        </View>
                    </ViewImage> 
                    <UpdateUserProfile isVisible={isUpdateUserProfileVisible} onClose={onCloseUpdateProfile}>
                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Username:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={username}
                                onChangeText={setUsername}
                                editable={!isUpdating}
                            />
                        </View>
                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Bio:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="enter bio"
                                multiline
                                editable={!isUpdating}
                            />
                        </View>
                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Phone Number:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={phone}
                                onChangeText={setPhone}
                                placeholder="enter your contact"
                                keyboardType="phone-pad"
                                editable={!isUpdating}
                            />
                        </View>
                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Full Name:</Text>
                            <TextInput
                                style={styles.textInput}
                                value={fullName}
                                onChangeText={setfullName}
                                placeholder="enter your first and last name"
                                multiline
                                editable={!isUpdating}
                            />
                        </View>
                        
                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Gender:</Text>
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

                        <Modal
                            visible={displayNativeModal}
                            animationType="slide"
                            transparent={true}
                            onRequestClose={() => setDisplayNativeModal(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modelDetailsContainer}>
                                    <View style={styles.searchCountryContainer}>
                                        <TextInput
                                            value={countryQuery}
                                            onChangeText={(text) => {
                                                setCountryQuery(text);
                                                // update preview (first match) with flag + name while typing
                                                const q = text.trim().toLowerCase();
                                                const match = countries.find(c => (c.name?.common || '').toLowerCase().includes(q));
                                                if (match) {
                                                    setCountryCode(match.cca2);
                                                    setLocation(`${countryCodeToEmoji(match.cca2)} ${(match.name?.common || '')}`);
                                                } else {
                                                    setLocation(text);
                                                }
                                            }}
                                            placeholder="Search country..."
                                            autoFocus
                                            style={styles.searchCountry}
                                        />
                                    </View>
                                    <FlatList
                                        data={filteredCountries}
                                        keyExtractor={(c) => c.cca2}
                                        style={{ maxHeight: 420 }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setCountryCode(item.cca2);
                                                    setLocation(`${countryCodeToEmoji(item.cca2)} ${item.name.common}`);
                                                    setCountryQuery('');
                                                    setDisplayNativeModal(false);
                                                }}
                                                style={styles.countryItem}
                                            >
                                                <Text style={styles.itemtext}>{countryCodeToEmoji(item.cca2)} {item.name.common}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    <TouchableOpacity onPress={() => { setDisplayNativeModal(false); setCountryQuery(''); }} style={styles.closeModal}>
                                        <Text style={{ color: '#4B0082', fontWeight: '600' }}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Location:</Text>
                            <TouchableOpacity
                                style={[styles.updateInputContainer, { justifyContent: 'center' }]}
                                onPress={() => setDisplayNativeModal(true)}
                                activeOpacity={0.8}
                            >
                                <Text style={{ color: location ? '#000' : '#888' }}>
                                    {location || 'Select your location'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Hobbie:</Text>
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}
