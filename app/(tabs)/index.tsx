import styles from "@/assets/styles/index";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { userProfilePictureStore } from "@/store/profileStore";
import { formatComments, formatTimeAgo } from "@/store/util";

export default function Index() {
  const { token } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refresh, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const profilePicture = userProfilePictureStore((state) => state.profilePicture);

  const router = useRouter();

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

      // Count the number of comments for each post and if the post has comments return no comments

      const uniquePosts = refresh || pageNum === 1
        ? data.posts
        : Array.from(new Set([...posts, ...data.posts].map((post) => post._id))).map((id) =>
          [...posts, ...data.posts].find((post) => post._id === id)
      );

      setPosts(uniquePosts)

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
      
    } catch (error) {
      
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    userProfilePictureStore.getState().fetchProfilePicture();
  }, []);

  const handleLoadMorePost = async () => {
    if (hasMore && !loading && !refresh)
      await fetchPosts(page + 1)
  };

  const handlePostPress = async (id: string) => {
    router.push({ pathname: "/(postdetail)", params: { postId: id } });
  }

  const renderPost = ({ item }: {item:any}) => (
    
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image
          source={{ uri: item.user.profilePicture ? item.user.profilePicture : "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf" }}
          style={styles.profileImage}/>
         <View style={styles.userInfoText}>
            <Text style={styles.username}>{item.user.username}</Text>
            <Text style={styles.createdAt}>{formatTimeAgo(item.createdAt)}</Text>
          </View>
      </View>

      <Image
        source={{ uri: item.image }}
        style={styles.postImage}
        contentFit="cover"/>
     
        <View  style={{width: 340, height: "auto",top: 0, padding: 10, right: 12, backgroundColor: "#ffffff"}}>
          
        </View>

        <View style={{backgroundColor: "#ffffff", width: 340, right: 12}}>
            <View style={{ flex: 1, marginRight: 10, width: 300, left: 20 }}>
              <TouchableOpacity onPress={() => handlePostPress(item._id)}>
                <Text
                  style={styles.caption}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  >
                  {item.caption}
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      
        <View style={styles.commentSection}>         
           
            <TouchableOpacity style={styles.commentIcons}onPress={() => handlePostPress(item._id)}>
              <View style={styles. likesSection}> 
                <View style={styles.likesCounts}>
                  <Ionicons  name="heart-outline" size={30} color="#4B0082"/>
                  <Text style={{fontSize:20, bottom:3}}> {formatComments(item.likesCount)}</Text>
                </View>    
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentIcons}onPress={() => handlePostPress(item._id)}>
              <View style={[styles. likesSection, {right:40}]}> 
                <View style={styles.likesCounts}>
                  <Ionicons name="chatbox-outline" size={30} color="#4B0082"/>
                  <Text style={{fontSize:20, bottom:3}}> {formatComments(item.commentsCount)}</Text>
                </View>    
              </View>
            </TouchableOpacity>
            <Ionicons name="share-social-outline" size={30} color="#4B0082"
                style={{right: 15}}/>
        </View>
      <View style={{width: 340, height: 7,top: 0, right: 12, backgroundColor: "#dddddd"}}></View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#eeeeee",
        marginTop: 0,
        paddingTop: 0,
      }}
    >
      <View
        style={[
          styles.card,
          { position: "relative", top: 12, zIndex: 1, paddingVertical: 0 },
        ]}
      >
        <View style={styles.searchcontaiiner}>

          <Image 
            source={{ uri: profilePicture || "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf"}}
            style={styles.profileImage }
          />

          <Ionicons
            name="notifications"
            size={27}
            color="#000"
            style={{
              left: 17,
              backdropFilter: "blur(10px)",
              backgroundColor: "#dddddd",
              borderRadius: 50,
              padding: 10,
            }}
          />

          <TextInput
            style={styles.searchContainer}
            placeholder="Search"
            placeholderTextColor="#4B0082"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons
            name="search"
            size={27}
            color="#4B0082"
            style={{
              backdropFilter: "blur(10px)",
              borderRadius: 50,
              padding: 10,
              position: "absolute",
              right: 12,
            }}
          />
        </View>

        <Text style={styles.generaltext}>Hot Match</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            position: "static",
            width: "auto",
            paddingBottom: 3,
            alignItems: "center",
          }}
        >
          <View style={styles.match}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain",
              }}
              style={styles.imagecard}
            />
            <View style={styles.matchlogo}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain",
                }}
                style={styles.teamlogo}
              />
            </View>

            <View style={[styles.matchlogo, { left: 210 }]}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain",
                }}
                style={[styles.teamlogo, { width: 100, height: 100 }]}
              />
            </View>
            <View style={styles.textcontainer}>
              <Text style={[styles.league, { left: "40%", top: 5 }]}>
                Football
              </Text>
              <Text
                style={[
                  styles.league,
                  { color: "#dddddd", right: 10, fontSize: 13, top: 12 },
                ]}
              >
                Spain-Laliga
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                { top: 70, left: "50%", fontSize: 16, fontFamily: "san" },
              ]}
            >
              Today
            </Text>
            <Text
              style={[
                styles.text,
                {
                  top: 63,
                  left: "65%",
                  fontWeight: 700,
                  fontSize: 28,
                  fontFamily: "san",
                },
              ]}
            >
              |
            </Text>
            <Text
              style={[
                styles.text,
                { top: 70, left: "70%", fontSize: 16, fontFamily: "san" },
              ]}
            >
              20:00
            </Text>
            <Ionicons
              name="flash"
              size={23}
              color="#ffde21"
              style={{
                top: 3,
                left: 3,
                backdropFilter: "blur(10px)",
                position: "absolute",
              }}
            />
          </View>

          <View style={styles.match}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain",
              }}
              style={styles.imagecard}
            />
            <View style={styles.matchlogo}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain",
                }}
                style={styles.teamlogo}
              />
            </View>

            <View style={[styles.matchlogo, { left: 210 }]}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain",
                }}
                style={[styles.teamlogo, { width: 100, height: 100 }]}
              />
            </View>
            <View style={styles.textcontainer}>
              <Text style={[styles.league, { left: "40%", top: 5 }]}>
                Football
              </Text>
              <Text
                style={[
                  styles.league,
                  { color: "#dddddd", right: 10, fontSize: 13, top: 12 },
                ]}
              >
                Spain-Laliga
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                { top: 70, left: "50%", fontSize: 16, fontFamily: "san" },
              ]}
            >
              Today
            </Text>
            <Text
              style={[
                styles.text,
                {
                  top: 63,
                  left: "65%",
                  fontWeight: 700,
                  fontSize: 28,
                  fontFamily: "san",
                },
              ]}
            >
              |
            </Text>
            <Text
              style={[
                styles.text,
                { top: 70, left: "70%", fontSize: 16, fontFamily: "san" },
              ]}
            >
              20:00
            </Text>
            <Ionicons
              name="flash"
              size={23}
              color="#dddddd"
              style={{
                top: 3,
                left: 3,
                backdropFilter: "blur(10px)",
                position: "absolute",
              }}
            />
          </View>

          <View style={styles.match}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIF.7XZOcxC98s3wGrpqtsdiGw?cb=iwc2&rs=1&pid=ImgDetMain",
              }}
              style={styles.imagecard}
            />
            <View style={styles.matchlogo}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.Yhx1VBJ4TC52WU9Mk8zrUQHaEK?cb=iwc2&rs=1&pid=ImgDetMain",
                }}
                style={styles.teamlogo}
              />
            </View>

            <View style={[styles.matchlogo, { left: 210 }]}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/OIP.k4TxdjJE9m1j7E9cOvOCJgHaFj?cb=iwc2&rs=1&pid=ImgDetMain",
                }}
                style={[styles.teamlogo, { width: 100, height: 100 }]}
              />
            </View>
            <View style={styles.textcontainer}>
              <Text style={[styles.league, { left: "40%", top: 5 }]}>
                Football
              </Text>
              <Text
                style={[
                  styles.league,
                  { color: "#dddddd", right: 10, fontSize: 13, top: 12 },
                ]}
              >
                Spain-Laliga
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                { top: 70, left: "50%", fontSize: 16, fontFamily: "san" },
              ]}
            >
              Today
            </Text>
            <Text
              style={[
                styles.text,
                {
                  top: 63,
                  left: "65%",
                  fontWeight: 700,
                  fontSize: 28,
                  fontFamily: "san",
                },
              ]}
            >
              |
            </Text>
            <Text
              style={[
                styles.text,
                { top: 70, left: "70%", fontSize: 16, fontFamily: "san" },
              ]}
            >
              20:00
            </Text>
            <Ionicons
              name="flash"
              size={23}
              color="#ffde21"
              style={{
                top: 3,
                left: 3,
                backdropFilter: "blur(10px)",
                position: "absolute",
              }}
            />
          </View>

        </ScrollView>
        <View
          style={{
            width: "100%",
            height: 8,
            position: "absolute",
            backgroundColor: "#cccccc",
            top: 269,
          }}
        ></View>
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
    </View>
  );
}
