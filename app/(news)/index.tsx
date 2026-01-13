import { formatComments, formatDateWithTime } from "@/store/util";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "../../assets/styles/news";

import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

type NewsItem = {
    _id: string;
    description: string;
    picture1: string;
    picture2: string,
    createdAt: string;
    user: {
        _id: string;
        username: string;
        profilePicture: string;
    };
    likesCount: number;
    unlikesCount: number;
    likedByUser: boolean;
    unlikedByUser: boolean;
}
export default function newsLayout() {

    const {user, token} = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [newsData, setNewsData] = useState<NewsItem[]>([])
    const [page, setPage] = useState(1);
    const [fetchingNews, setFetchingNews] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [like, setLike] = useState<{ [key: string]: boolean }>({});
    const [submitLike, setSubmitLike] = useState<{ [key: string]: boolean }>({});
    const [unlike, setUnlike] = useState<{[ key: string]: boolean}>({});
    const [submitUnLike, setSubmitUnLike] = useState<{[ key: string]: boolean}>({});
    const newsId = useLocalSearchParams().newsId as string;

   const [expandNewsDescriptionId, setExpandNewsDescriptionId] = useState<string | null>(null);
    const handleAddNews = () => {
      router.push('/(news)/addnews');
    };
    const handelEarnings = () => {
        router.push('/(news)/earnings');
    }
    const fetchNews = async (pageNum = 1, refresh = false) => {
        setFetchingNews(true);
        try {
            const response = await fetch(`${API_URL}/news/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            
            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching news',
                    text2: 'Please try again later.'
                })
                setFetchingNews(false);
                return;
            }
            const articles = data.newsArticles ?? [];
            setNewsData(refresh || pageNum === 1 ? articles : articles);
            setPage(pageNum);
            setFetchingNews(false);
         } catch (error) {
             console.error('Error fetching news:', error);
             setFetchingNews(false);
             Toast.show({
                 type: 'error',
                 text1: 'Error fetching news',
                 text2: 'Please try again later.'
             });
         } finally {
             setFetchingNews(false);
         }
    };
    const handleLikeNews = async (newsId: string) => {
        setSubmitLike(prev => ({...prev, [newsId]: true}));
        try {
            const currentLiked = newsData.find(n => n._id === newsId)?.likedByUser ?? false;
            const response = await fetch(`${API_URL}/news/${newsId}/like`, {
                 method: 'POST',
                 headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                 },
                body: JSON.stringify({ like: !currentLiked })
             });
             const data = await response.json();
             if (!response.ok) {
                 Toast.show({
                     type: 'error',
                     text1: 'Error liking news',
                     text2: data.message || 'Please try again later.'
                 });
                 setSubmitLike(prev => ({...prev, [newsId]: false}));
                 return;
             };
            // Update newsData with new likedByUser status
            setNewsData(prev => prev.map(n => {
                if (n._id !== newsId) return n;
                const newLiked = !currentLiked;
                return {
                    ...n,
                    likedByUser: newLiked,
                    likesCount: newLiked ? n.likesCount + 1 : Math.max(0, n.likesCount - 1)
                };
            }));
             setSubmitLike(prev => ({...prev, [newsId]: false}));
         } catch (error) {
            console.error('Error liking news:', error);
            setSubmitLike(prev => ({...prev, [newsId]: false}));
            Toast.show({
                type: 'error',
                text1: 'Error liking news',
                text2: 'Please try again later.'
            }); 
         } finally {
             setSubmitLike(prev => ({...prev, [newsId]: false}));
         }
    };
    const handleUnlikeNews = async (newsId: string) => {
         setSubmitUnLike(prev => ({...prev, [newsId]: true}));
        try {
            const uncurrentLiked = newsData.find(n => n._id === newsId)?.unlikedByUser ?? false;
            const response = await fetch(`${API_URL}/news/${newsId}/unlike`, {
                 method: 'POST',
                 headers: {
                     'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                 },
                body: JSON.stringify({ unlike: !uncurrentLiked })
             });
             const data = await response.json();
             if (!response.ok) {
                 Toast.show({
                     type: 'error',
                     text1: 'Error unliking news',
                     text2: data.message || 'Please try again later.'
                 });
                 setSubmitUnLike(prev => ({...prev, [newsId]: false}));
                 return;
             };
            // Update newsData with new likedByUser status
            setNewsData(prev => prev.map(n => {
                if (n._id !== newsId) return n;
                const newUnLiked = !uncurrentLiked;
                return {
                    ...n,
                    unlikedByUser: newUnLiked,
                    unlikesCount: newUnLiked ? n.unlikesCount + 1 : Math.max(0, n.unlikesCount - 1)
                };
            }));
             setSubmitUnLike(prev => ({...prev, [newsId]: false}));
         } catch (error) {
            console.error('Error unliking news:', error);
            setSubmitUnLike(prev => ({...prev, [newsId]: false}));
            Toast.show({
                type: 'error',
                text1: 'Error unliking news',
                text2: 'Please try again later.'
            }); 
         } finally {
             setSubmitUnLike(prev => ({...prev, [newsId]: false}));
         }
    };
    useEffect(() => {
        fetchNews();
     }, [])
    const renderNewsItems = ({item}: {item: any}) => (
        <View style={styles.newsItemContainer}>
            <View style={styles.newsItemContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.picture1 }}
                        style={styles.newsPicture1}
                    />
                    <Image
                        source={{ uri: item.picture2 }}
                        style={styles.newsPicture2}
                    />
                </View>
                <Image
                    source={{ uri: item.user.profilePicture }}
                    style={styles.userImage}
                />
                <Text style={styles.newsUsername}>{item.user.username}</Text>
                <TouchableOpacity onPress={() => setExpandNewsDescriptionId(expandNewsDescriptionId === item._id ? null : item._id)}>
                    <Text style={styles.newsDescription} numberOfLines={expandNewsDescriptionId === item._id ? undefined : 4}>
                        {item.description}
                    </Text>
                </TouchableOpacity>

                <View style={styles.newsReactions}>
                    <View style={styles.downloadContainer}> 
                        <TouchableOpacity style={styles.downloadIcon}>
                            <Ionicons name="bookmark-outline" size={24} color={'#4B0082'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.likeContainer}> 
                        <TouchableOpacity style={styles.likeIcon}  onPress={() => handleLikeNews(item._id)}>
                            <SimpleLineIcons name='like' size={24} color={item.likedByUser ? '#4b0082' :"#ccc"} />
                        </TouchableOpacity>
                        <Text style={styles.newsReaction}>{formatComments(item.likesCount)}</Text>
                    </View>
                    <View style={styles.unlikeContainer}> 
                        <TouchableOpacity style={styles.likeIcon} onPress={() => {handleUnlikeNews(item._id)}}>
                            <SimpleLineIcons name="dislike" size={24} color={item.unlikedByUser ? '#4B0082' :"#ccc"} />
                        </TouchableOpacity>
                        <Text style={styles.newsReaction}>{formatComments(item.unlikesCount)}</Text>
                    </View>
                </View>
                <Text style={styles.newsTimestamp}>{formatDateWithTime(item.createdAt)}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 320}} />
                ): (
                    <View style= {styles.container}>
                        <View>
                            <ScrollView 
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', gap: 5, height: 60, backgroundColor: '#ffffff'}}
                                >
                                <View style={styles.clubLogo}>

                                </View>
                                <View style={styles.clubLogo}>

                                </View>
                                <View style={styles.clubLogo}>

                                </View>
                                <View style={styles.clubLogo}>

                                </View>
                                <View style={styles.clubLogo}>

                                </View>
                                <View style={styles.clubLogo}>

                                </View>
                                <View style={styles.clubLogo}>

                                </View>
                               
                            </ScrollView>
                        </View>
                        <View style={styles.newsContainer}>
                            <Text style={styles.newsHeading}>News Heading</Text>
                            <View style={styles.newsProperties}>
                                <TouchableOpacity style={styles.addIcon} onPress={handleAddNews}>
                                    <Ionicons name="add-circle" size={40} color="#4B0082" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.searchIcon} >
                                    <Ionicons name="search-outline" size={24} color="#4B0082" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.earnings} onPress={handelEarnings}>
                                    <FontAwesome name="dollar" size={20} color="#fff" />
                                    <Text style={styles.earningsText}>Earnings</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.flatListContainer}>
                            <FlatList
                                data={newsData}
                                renderItem={renderNewsItems}
                                keyExtractor={(item) => item._id}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refresh}
                                        onRefresh={() =>  fetchNews(1, true)}
                                    />
                                }
                            />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}