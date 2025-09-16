import styles from "@/assets/styles/index";
import Search from "@/components/search";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { userProfilePictureStore } from "@/store/profileStore";
import { formatComments, formatTimeAgo } from "@/store/util";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { debounce } from "lodash";
import React, { use, useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Share, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

import io from "socket.io-client";

type Post = {
  _id: string;
  user: {
    username: string;
    profilePicture?: string;
  };
  image: string;
  caption: string;
  tags: {name: string}[];
  mentions: {_id: string; username: string; profilePicture?: string}[];
  createdAt: string;
  likesCount: number;
  commentsCount: number;
};

function parseCaption(caption: string, tags: {name: string}[], mentions: {_id: string; username: string}[] = []) {
  const tagSet = new Set(tags.map(t => `#${t.name}`));
  const mentionSet = new Set(mentions.map(m => `@${m.username}`));
  const words = caption.match(/(@\w+|#\w+|\S+|\s+)/g) || [];

  return words.map((word, idx) => {
    if (tagSet.has(word)) {
      const tag = tags.find(t => `#${t.name}` === word);
      return { type: 'tag', text: tag?.name, key:`tag-${tag?.name}-${idx}` };
    }
    if (mentionSet.has(word)) {
      const mention = mentions.find(m => `@${m.username}` === word);
      return { type: 'mention', text: mention?.username, id: mention?._id, key:`mention-${mention?.username}-${idx}` };
    }
    return { type: 'text', text: word, key: `text-${word}-${idx}` };
  });
}
export default function Index() {
  const { token, user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const profilePicture = userProfilePictureStore((state) => state.profilePicture);
  const [ searchVisible, setSearchVisible ] = useState(false);

  //search variable
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [fixtures, setFixtures] = useState<any[]>([]);
  const [expandCaptionId, setExpandCaptionId]= useState<string | null>(null);

  const router = useRouter();

  const getUpcomingFixtures = async () => {
    try {
      const response = await fetch(`${API_URL}/sports/fixtures`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch upcoming features");
      setFixtures(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSharePost = async (post: Post) => {
          const message = `username : ${post.user.username}\ncomment : ${post.commentsCount}\nlikes : ${post.likesCount}\ncaption : ${post.caption}\nimage : ${post.image}`;
          const shareOptions = {
              title: 'Share Post',
              message,
              type: 'image/jpeg',
          };
  
          await Share.share(shareOptions);
    }
  const fetchPosts = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/post?page=${pageNum}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch posts");

      const uniquePosts = (refresh || pageNum === 1
        ? data.posts
        : Array.from(new Set([...posts, ...data.posts].map((post) => post._id))).map((id) =>
            ({ ...( [...posts, ...data.posts].find((post) => post._id === id) ) })
          )
      );

      setPosts(uniquePosts)
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
      setLoading(false);
    } catch (error) {
      
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };
  const SearchUsers = async (query: any, token: any) => {
    setSearchLoading(true);
    setSearchVisible(true);
    try {
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if(!response.ok) throw new Error(data.message || "Failed to search users");
      setSearchResults(data);
    } catch (error) {

    } finally {
        setSearchLoading(false);
    }
  }
  const debounceSearch = useCallback(
    debounce((text: string) => {
      SearchUsers(text, token)
    }, 1000 ),
    [ token]
  )
  useEffect(() => {
    fetchPosts();
    getUpcomingFixtures();
    const socket = io('https://kismit-official.onrender.com/');

    socket.on('new post created', (newPost) => {
      setPosts((posts) => {
        const exits = posts.some(post => post._id === newPost._id);
        return exits ? posts :
        [newPost, ...posts]
      });
    });

   socket.on('new like created', ({postId, userId, liked}) =>{
      setPosts((posts) => {
        return posts.map(post => {
          if (post._id === postId) {
            const updatedLikesCount = liked ? post.likesCount + 1 : post.likesCount - 1;
            return { ...post, likesCount: updatedLikesCount };
          }
          return post;
        });
      });
   })

    socket.on('new comment created', (newComment) => {
      setPosts((posts) => {
        return posts.map(post => {
          if (post._id === newComment.postId) {
            return { ...post, commentsCount: post.commentsCount + 1 };
          }
          return post;
        });
      });
    });
    userProfilePictureStore.getState().fetchProfilePicture();

    return () => {
      socket.disconnect();
      };
  }, []);

  const handleLoadMorePost = async () => {
    if (hasMore && !loading && !refresh)
      await fetchPosts(page + 1);
  };
  const handlePostPress = async (id: string) => {
    router.push({ pathname: "/(postdetail)", params: { postId: id } });
  }
  const handleProfilePress = () => {
    router.push({pathname: "/(menu)"});
  }
  const handleSearchClose = () => {
    setSearchVisible(false);
  }
  const handleprofilePicturePress = async (id: string) => {
      router.push({ pathname: '/(profile)', params: { userId: id }})
  }
  const handleTagPress = (tagName: string) => {
  router.push({ pathname: "/(tag)", params: { tag: tagName } });
  };

  const handleMentionPress = (userId: string) => {
    router.push({ pathname: "/(profile)", params: { userId } });
  };
  const handleEditPost = (postId: string) => {
    router.push({ pathname: "/", params: { postId } });
  }
  const renderPost = ({ item }: {item:any}) => (    
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() =>handleprofilePicturePress(item.user?._id)}>
            <Image
            source={{ uri: item.user?.profilePicture ? item.user.profilePicture : "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf" }}
            style={styles.profileImage}/>

          </TouchableOpacity>
          
          <View style={styles.userInfoText}>
              <Text style={styles.username}>{item.user?.username}</Text>
              <Text style={styles.createdAt}>{formatTimeAgo(item.createdAt)}</Text>
          </View>
          <View>
            <Ionicons name="ellipsis-vertical" size={24} color="#000"  onLongPress={() => handleEditPost(item._id)}/>
          </View>
          <TouchableOpacity onPress={() => {handleEditPost(item._id)}}>
            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: item.image }}
          style={styles.postImage}
          contentFit="cover"/>

          <TouchableOpacity onPress={() => setExpandCaptionId(expandCaptionId === item._id ? null: item._id )} activeOpacity={0.8} style={styles.tagContainer}>
            <View style={styles.captionContainer}>
              <Text style={styles.caption} numberOfLines={expandCaptionId === item._id ? undefined : 3} ellipsizeMode={expandCaptionId === item._id ? undefined : "tail"}>
                {parseCaption(item.caption, item.tags, item.mentions).map((part) => {
                  if (part.type === 'tag' && part.text) {
                    return (
                      <Text key={part.key} style={styles.tag} onPress={() => handleTagPress(part.text!)}>
                        #{part.text}
                      </Text>
                    );
                  }
                  if (part.type === 'mention') {
                    return (
                      <Text key={part.key} style={styles.mention} onPress={() => handleMentionPress(part.id!)}>
                        @{part.text}
                      </Text>
                    );
                  }
                  return <Text key={part.key}>{part.text}</Text>;
                })}
              </Text>
            </View>
          </TouchableOpacity>
        
          <View style={styles.commentSection}>         
              <TouchableOpacity style={styles.commentIcons} onPress={() => handlePostPress(item._id)}>
                <View style={styles. likesSection}> 
                  <View style={styles.likesCounts}>
                    <Ionicons  name="heart-outline" size={25} color="#4B0082"/>
                    <Text style={{fontSize:20}}> {formatComments(item.likesCount)}</Text>
                  </View>    
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentIcons}onPress={() => handlePostPress(item._id)}>
                <View style={[styles. likesSection, {right:40}]}> 
                  <View style={styles.likesCounts}>
                    <Ionicons name="chatbox-outline" size={24} color="#4B0082"/>
                    <Text style={{fontSize:20}}> {formatComments(item.commentsCount)}</Text>
                  </View>    
                </View>
              </TouchableOpacity>
            
              <TouchableOpacity style={styles.likesCounts}onPress={() => handleSharePost(item)}>
                  <Ionicons name="share-social" size={34} color="#4B0082" style={styles.share}/>
              </TouchableOpacity>
            
          </View>
        <View style={styles.seprationLine}></View>
      </View>
  );
  const renderSearch = ({ item }: {item:any}) => (
     <TouchableOpacity onPress={() => handleprofilePicturePress(item._id)} style={styles.userContainer}>
            <View style={styles.containerClick}>
                <Image style={styles.image} contentFit='cover' source={{ uri: item.profilePicture}}/>
                <Text style={styles.text1}>{item.username}</Text>
            </View>
            <View style={styles.containerHobbies}>
               <Text style={styles.text2}>{item.hobbies}</Text>
            </View>
    </TouchableOpacity>
  );
  return (
    <View  style={styles.containerItem}>
      <View
        style={[
          styles.card,
          { zIndex: 1, paddingVertical: 0 },
        ]}
      >
        <View style={styles.searchcontaiiner}>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image 
              source={{ uri: profilePicture || "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf"}}
              style={styles.profileImage }
            />
          </TouchableOpacity>
          <Ionicons name="notifications" size={27} color="#000" style={styles.notification}
          />
          <TextInput style={styles.textInput} 
            placeholder="Search"
            value={query}
            editable={!searchLoading}
            multiline
            onChangeText={(text) => {setQuery(text); debounceSearch(text)} }
          />
          {searchLoading ? (
            <></>
          ): (
             <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                <TouchableOpacity  onPress={() => {SearchUsers(query, token), setSearchVisible(true)}} style={styles.searchBar}>
                  <Ionicons name="search" size={30} color="#4B0082" style={styles.search}
                  />
                </TouchableOpacity>

                </View>
             </View>   
          )}
        </View>

        <Text style={styles.generaltext}>Hot Match</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            width: "auto",
            height: 125,
            top: 25,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
       
        
              {fixtures.map((fixture) => (
                    <View key={fixture.id} style={styles.match}>
                      <Text style={{ fontWeight: "bold", fontSize: 16, color: '#fff' }}>{fixture.name}</Text>
                      <Text style={{ color: "#888" }}>{fixture.result_info}</Text>
                      <Text style={{ color: "#4B0082" }}>
                        {new Date(fixture.starting_at).toLocaleString()}
                      </Text>
                      <Text style={{ color: "#aaa" }}>{fixture.short_code}</Text>
                      <Text style={{ color: "#aaa" }}> {fixture.sub_type}</Text>
                      <Text style={{ color: "#aaa" }}> {fixture.type}</Text>
                    </View>
                ))}  
               
        </ScrollView>
        <View style={styles.sepration}></View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMorePost}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() =>  fetchPosts(1, true)}
          />
        }
      />
      <Search isVisible={searchVisible} onClose={handleSearchClose}>
        <TextInput 
                placeholder="Search"
                value={query}
                editable={!searchLoading}
                multiline
                style={styles.searchTextInput}
                onChangeText={(text) => {setQuery(text); debounceSearch(text)} }
          />
          {searchLoading ? (
              <View>
                <Text>Searching....</Text>
              </View>
          ): (
             <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                <TouchableOpacity  onPress={() => {SearchUsers(query, token), setSearchVisible(true)}} style={styles.searchBar}>
                  <Ionicons name="search" size={30} color="#4B0082" style={styles.search}
                  />
                </TouchableOpacity>

                </View>
             </View>   
          )}
          {searchLoading ? (
            <></>
          ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderSearch}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.container}
                refreshControl={<RefreshControl 
                  refreshing={refresh}
                  onRefresh={() =>  fetchPosts(1, true)}
                  />}
              />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No user found</Text>
          )}
    </Search>
      
    </View>
  );
}
