import EditPost from "@/components/caption";
import Match from "@/components/match";
import Search from "@/components/search";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { userProfilePictureStore } from "@/store/profileStore";
import { useNewPostStore } from "@/store/newPostStore";
import { formatComments, formatTimeAgo } from "@/store/util";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import io from "socket.io-client";
import indexScreenStyles from "../../assets/styles/index";

type Post = {
  _id: string;
  user: {
    username: string;
    profilePicture?: string;
  };
  image: string;
  caption: string;
  tags: { name: string }[];
  mentions: { _id: string; username: string; profilePicture?: string }[];
  createdAt: string;
  likesCount: number;
  commentsCount: number;
};

type Match = {
  _id: string;
  leagueName: string;
  matchDate: Date;
  time: Date;
  location: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
};

function parseCaption(
  caption: string,
  tags: { name: string }[] | string[] = [],
  mentions: { _id: string; username: string }[] = [],
) {
  // Normalize tags to array of objects
  const normalizedTags = tags.map((t) =>
    typeof t === "string" ? { name: t } : t,
  );
  const tagSet = new Set(normalizedTags.map((t) => `#${t.name}`));
  const mentionSet = new Set(mentions.map((m) => `@${m.username}`));
  const words = caption.match(/(@\w+|#\w+|\S+|\s+)/g) || [];

  return words.map((word, idx) => {
    if (tagSet.has(word)) {
      const tag = normalizedTags.find((t) => `#${t.name}` === word);
      return { type: "tag", text: tag?.name, key: `tag-${tag?.name}-${idx}` };
    }
    if (mentionSet.has(word)) {
      const mention = mentions.find((m) => `@${m.username}` === word);
      return {
        type: "mention",
        text: mention?.username,
        id: mention?._id,
        key: `mention-${mention?.username}-${idx}`,
      };
    }
    return { type: "text", text: word, key: `text-${word}-${idx}` };
  });
}

export default function Index() {
  const { token, user } = useAuthStore();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const styles = indexScreenStyles(width, height);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const profilePicture = userProfilePictureStore(
    (state) => state.profilePicture,
  );
  const [searchVisible, setSearchVisible] = useState(false);

  //match variable
  const [submiting, setSubmiting] = useState(false);
  const [leagueName, setLeagueName] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [time, setTime] = useState<Date>(new Date());
  const [showTime, setShowTime] = useState(false);
  const [location, setLocation] = useState("");
  const [homeTeamName, setHomeTeamName] = useState("");
  const [awayTeamName, setAwayTeamName] = useState("");
  const [homeTeamLogo, setHomeTeamLogo] = useState<any>(null);
  const [awayTeamLogo, setAwayTeamLogo] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [homeTeamBase64, setHomeTeamBase64] = useState<string | null>(null);
  const [awayTeamBase64, setAwayTeamBase64] = useState<string | null>(null);

  // fetch matches
  const [matches, setMatches] = useState<Match[]>([]);

  //search variable
  const [searchResults, setSearchResults] = useState<{
    users: any[];
    tags: any[];
  }>({ users: [], tags: [] });
  const combinedResults = [
    ...searchResults.users.map((user) => ({ ...user, type: "user" })),
    ...searchResults.tags.map((tag) => ({ ...tag, type: "tag" })),
  ];
  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [fixtures, setFixtures] = useState<any[]>([]);

  const [editVisible, setEditVisible] = useState(false);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const [expandCaptionId, setExpandCaptionId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [optionsDropdownId, setOptionsDropdownId] = useState<string | null>(
    null,
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();

  const animationValueRef = React.useRef(new Animated.Value(0));

  const timePicker = (event: any, selectedTime?: Date) => {
    setShowTime(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  const pickHomeTeamLogo = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "You need to allow access to the media library to pick an image",
          );
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setHomeTeamLogo(selectedAsset);
        setHomeTeamBase64(
          selectedAsset.base64
            ? `data:image/*;base64,${selectedAsset.base64}`
            : selectedAsset.uri,
        );
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };
  const pickAwayTeamLogo = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "You need to allow access to the media library to pick an image",
          );
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setAwayTeamLogo(selectedAsset);
        setAwayTeamBase64(
          selectedAsset.base64
            ? `data:image/*;base64,${selectedAsset.base64}`
            : selectedAsset.uri,
        );
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };
  const createMatch = async () => {
    setSubmiting(true);
    try {
      //get home team logo extention from uri or default to jpg
      const uriPart = homeTeamLogo.uri.split(".");
      const homeExtention = uriPart[uriPart.length - 1];
      const homeType = homeExtention
        ? `image/${homeExtention.toLowerCase()}`
        : "image/jpg";
      const homeImageDataUrl = `data:${homeType};base64,${homeTeamLogo.base64}`;

      //get away team logo extention from uri or default to jpg
      const uriParts = awayTeamLogo.uri.split(".");
      const awayExtention = uriParts[uriParts.length - 1];
      const awayType = awayExtention
        ? `image/${awayExtention.toLowerCase()}`
        : "image/jpg";
      const awayImageDataUrl = `data:${awayType};base64,${awayTeamLogo.base64}`;

      const response = await fetch(`${API_URL}/match/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueName,
          matchDate,
          time,
          location,
          homeTeamName,
          awayTeamName,
          homeTeamLogo: homeImageDataUrl,
          awayTeamLogo: awayImageDataUrl,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setModalVisible(false);
      Alert.alert("Success", "Match created successfully");
      setSubmiting(false);
      setLeagueName("");
      setMatchDate("");
      setTime(new Date());
      setLocation("");
      setHomeTeamName("");
      setAwayTeamName("");
      setHomeTeamBase64(null);
      setAwayTeamBase64(null);
      setHomeTeamLogo(null);
      setAwayTeamLogo(null);
      router.push({ pathname: "/" });
    } catch (error) {
      console.error("failed", error);
    } finally {
      setSubmiting(false);
    }
  };
  const getUpcomingFixtures = async () => {
    try {
      const response = await fetch(`${API_URL}/sports/fixtures`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch upcoming features");
      setFixtures(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSharePost = async (post: Post) => {
    try {
      // Prefer an HTTPS web URL so other apps (WhatsApp, Facebook) generate a clickable link/preview.
      // This domain is already referenced in app.json intent filters; ensure the backend route exists
      // and provides Open Graph meta tags for rich previews.
      const webUrl = `https://kismit-official.onrender.com/post/${encodeURIComponent(post._id)}`;
      // Also prepare app deep links as fallback
      let appUrl = "";
      try {
        appUrl = Linking.createURL("/(postdetail)", {
          queryParams: { postId: post._id },
        });
      } catch (e) {
        appUrl = `kismet://post/${encodeURIComponent(post._id)}`;
      }

      // Most platforms render a preview when the shared text contains an https:// URL on its own line.
      const message = `${post.caption || "Check out this post"}\n\n${webUrl}`;
      const shareOptions: any = {
        title: "Share Post",
        message,
        url: webUrl,
      };

      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing post", error);
    }
  };
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

      const uniquePosts =
        refresh || pageNum === 1
          ? data.posts
          : Array.from(
              new Set([...posts, ...data.posts].map((post) => post._id)),
            ).map((id) => ({
              ...[...posts, ...data.posts].find((post) => post._id === id),
            }));

      setPosts(uniquePosts);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
      setLoading(false);
    } catch (error) {
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };
  const fetchMatches = async (pageNum = 1, refresh = false) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/match?page=${pageNum}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch matches");

      const uniqueMatches =
        refresh || pageNum === 1
          ? data.matches
          : Array.from(
              new Set([...matches, ...data.matches].map((match) => match._id)),
            ).map((id) => ({
              ...[...matches, ...data.matches].find(
                (match) => match._id === id,
              ),
            }));

      setMatches(uniqueMatches);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
      setLoading(false);
    } catch (error) {
      console.error(error, "failed to fetch matches");
    }
  };
  const SearchUsers = async (query: any, token: any) => {
    setSearchLoading(true);
    setSearchVisible(true);
    try {
      const response = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to search users");
      setSearchResults(data);
    } catch (error) {
    } finally {
      setSearchLoading(false);
      // clear search results after 5 secounds of inactivity
      setTimeout(() => setQuery(""), 1000);
    }
  };
  const debounceSearch = useCallback(
    debounce((text: string) => {
      SearchUsers(text, token);
    }, 1000),
    [token],
  );
  const showOptions = (postId: string) => {
    setOptionsDropdownId(optionsDropdownId === postId ? null : postId);
  };
  useEffect(() => {
    fetchPosts();
    fetchMatches();
    // getUpcomingFixtures();
    const socket = io("https://kismit-official.onrender.com/");

    socket.on("new post created", (newPost) => {
      setPosts((posts) => {
        const exits = posts.some((post) => post._id === newPost._id);
        if (!exits) {
          useNewPostStore.getState().incrementNewPostCount();
        }
        return exits ? posts : [newPost, ...posts];
      });
    });

    socket.on("new like created", ({ postId, userId, liked }) => {
      setPosts((posts) => {
        return posts.map((post) => {
          if (post._id === postId) {
            const updatedLikesCount = liked
              ? post.likesCount + 1
              : post.likesCount - 1;
            return { ...post, likesCount: updatedLikesCount };
          }
          return post;
        });
      });
    });
    socket.on("new match created", (newMatch) => {
      setMatches((matches) => {
        const exists = matches.some((match) => match._id === newMatch._id);
        return exists ? matches : [newMatch, ...matches];
      });
    });

    socket.on("new comment created", (newComment) => {
      setPosts((posts) => {
        return posts.map((post) => {
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

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValueRef.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValueRef.current, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const scale = animationValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.4],
  });
  const pulseOpacity = animationValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 3],
  });
  const handleLoadMorePost = async () => {
    if (hasMore && !loading && !refresh) await fetchPosts(page + 1);
  };
  const handlePostPress = async (id: string) => {
    router.push({ pathname: "/(postdetail)", params: { postId: id } });
  };
  const handleProfilePress = () => {
    router.push({ pathname: "/(menu)" });
  };
  const handleSearchClose = () => {
    setSearchVisible(false);
  };
  const handleprofilePicturePress = async (id: string) => {
    router.push({ pathname: "/(profile)", params: { userId: id } });
  };
  const handleTagPress = (tagName: string) => {
    router.push({ pathname: "/(tag)", params: { tag: tagName } });
  };
  const handleMentionPress = (userId: string) => {
    router.push({ pathname: "/(profile)", params: { userId } });
  };
  const modalClicked = (postId: string) => {
    setEditingPostId(postId);
    setEditVisible(true);
    const post = posts.find((p) => p._id === postId);
    if (post) {
      setCaption(post.caption);
    }
  };
  const handleEditPost = async (postId: string | null) => {
    setIsUpdatingPost(true);
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          caption,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      setEditVisible(false);
      router.push({ pathname: "/" });
    } catch (error) {
    } finally {
      setIsUpdatingPost(false);
    }
  };
  const handleDeletePost = async (postId: string) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            if (postId) {
              const response = await fetch(`${API_URL}/post/${postId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const data = await response.json();
              console.log(data);
              if (!response.ok)
                throw new Error(data.message || "Something went wrong");
              setPosts((posts) => posts.filter((post) => post._id !== postId));
              router.push({ pathname: "/" });
            }
          } catch (error) {
            console.error(error);
          }
        },
        style: "destructive",
      },
    ]);
  };
  const handleRequestChallenge = (userId: string) => {
    router.push({ pathname: "/(challenge)/create-team", params: { userId } });
  };
  const renderPost = ({ item }: { item: any }) => {
    const isPostOwner = !!user && item.user && item.user._id === user.id;

    return (
      <View style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.posterPfrofile}
              onPress={() => handleprofilePicturePress(item.user?._id)}
            >
              <Image
                source={{
                  uri: item.user?.profilePicture
                    ? item.user.profilePicture
                    : "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf",
                }}
                style={styles.profileImages}
              />
            </TouchableOpacity>

            <View style={styles.userInfoText}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.createdAt}>
                {formatTimeAgo(item.createdAt)}
              </Text>
            </View>
            {isPostOwner ? (
              <View>
                <TouchableOpacity
                  onPress={() => showOptions(item._id)}
                  style={styles.optionButton}
                >
                  <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                </TouchableOpacity>
                {optionsDropdownId === item._id && (
                  <View style={styles.optionsDropdown}>
                    <TouchableOpacity style={styles.arrowUp}></TouchableOpacity>
                    <View style={styles.editPost}>
                      <TouchableOpacity
                        onPress={() => {
                          setOptionsDropdownId(null);
                          modalClicked(item._id);
                        }}
                        style={styles.post}
                      >
                        <View style={styles.select}></View>
                        <Text style={styles.text4}>Edit Post</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setOptionsDropdownId(null);
                          handleDeletePost(item._id);
                        }}
                        style={styles.post}
                      >
                        <View style={styles.select}></View>
                        <Text style={styles.text5}>Delete Post</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => setOptionsDropdownId(null)}
                      style={styles.backPost}
                    >
                      <Text style={styles.text3}>Back</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => showOptions(item._id)}
                  style={styles.optionButton}
                >
                  <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                </TouchableOpacity>
                {optionsDropdownId === item._id && (
                  <View style={styles.optionDropdown}>
                    <TouchableOpacity style={styles.arrowUp}></TouchableOpacity>
                    <View style={styles.editPost}>
                      <TouchableOpacity
                        onPress={() => {
                          setOptionsDropdownId(null);
                          handleRequestChallenge(item.user._id);
                        }}
                        style={styles.post}
                      >
                        <View style={styles.select}></View>
                        <Text style={styles.text6}>challenge user</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => setOptionsDropdownId(null)}
                      style={styles.backPost}
                    >
                      <Text style={styles.text3}>Back</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.postImage}
              contentFit="cover"
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              setExpandCaptionId(expandCaptionId === item._id ? null : item._id)
            }
            activeOpacity={0.8}
            style={styles.tagContainer}
          >
            <View style={styles.captionContainer}>
              <Text
                style={styles.caption}
                numberOfLines={expandCaptionId === item._id ? undefined : 4}
                ellipsizeMode={
                  expandCaptionId === item._id ? undefined : "tail"
                }
              >
                {parseCaption(item.caption, item.tags, item.mentions).map(
                  (part) => {
                    if (part.type === "tag" && part.text) {
                      return (
                        <Text
                          key={part.key}
                          style={styles.tag}
                          onPress={() => handleTagPress(part.text!)}
                        >
                          #{part.text}
                        </Text>
                      );
                    }
                    if (part.type === "mention") {
                      return (
                        <Text
                          key={part.key}
                          style={styles.mention}
                          onPress={() => handleMentionPress(part.id!)}
                        >
                          @{part.text}
                        </Text>
                      );
                    }
                    return <Text key={part.key}>{part.text}</Text>;
                  },
                )}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.commentSection}>
            <TouchableOpacity
              style={styles.commentIcons}
              onPress={() => handlePostPress(item._id)}
            >
              <View style={styles.likesSection}>
                <View style={styles.likesCounts}>
                  <Ionicons name="heart-outline" size={25} color="#4B0082" />
                  <Text style={styles.textcomment}>
                    {" "}
                    {formatComments(item.likesCount)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commentIcons}
              onPress={() => handlePostPress(item._id)}
            >
              <View style={styles.likesSection}>
                <View style={styles.likesCounts}>
                  <Ionicons name="chatbox-outline" size={24} color="#4b0082" />
                  <Text style={styles.textcomment}>
                    {" "}
                    {formatComments(item.commentsCount)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.likesSection}
              onPress={() => handleSharePost(item)}
            >
              <Ionicons
                name="share-social"
                size={30}
                color="#4b0082"
                style={styles.share}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.seprationLine}></View>
        </View>
      </View>
    );
  };
  const formatMatchDate = (date: string | Date) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return date.toString();
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const formatMatchTime = (time: string | Date) => {
    const t = typeof time === "string" ? new Date(time) : time;
    if (isNaN(t.getTime())) return t.toString();
    return t.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const renderMatch = ({ item }: { item: any }) => (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.match}
        onPress={() => Linking.openURL("https://www.youtube.com/@kismetKSM")}
      >
        <View style={styles.item}>
          <View style={styles.matchDate}>
            <View style={styles.leagueName}>
              <Ionicons name="trophy" size={20} color="#f7e651ff" />
              <Text style={styles.leagueText}>{item.leagueName}</Text>
            </View>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.teams}>
            <View style={styles.team}>
              <Text style={styles.teamName}>{item.homeTeamName}</Text>
              <Image source={{ uri: item.homeTeamLogo }} style={styles.logo} />
            </View>
            <Text style={styles.vsText}> VS </Text>
            <View style={styles.team}>
              <Text style={styles.teamName}>{item.awayTeamName}</Text>
              <Image source={{ uri: item.awayTeamLogo }} style={styles.logo} />
            </View>
          </View>
          <View style={styles.matchTime}>
            <Text style={styles.timeText}>{formatMatchTime(item.time)}</Text>
            <Text>||</Text>
            <Text style={styles.timeText}>
              {formatMatchDate(item.matchDate)}
            </Text>
          </View>
          {/* Button to open YouTube link */}
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.youtube.com/")}
          ></TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderCombinedSearch = ({ item }: { item: any }) => {
    if (item.type === "user") {
      return (
        <TouchableOpacity
          onPress={() => handleprofilePicturePress(item._id)}
          style={styles.userContainer}
        >
          <View style={styles.containerClick}>
            <Image
              style={styles.image}
              contentFit="cover"
              source={{ uri: item.profilePicture }}
            />
            <Text style={styles.text1}>{item.username}</Text>
          </View>
          <View style={styles.containerHobbies}>
            <Text style={styles.text2}>{item.hobbies}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (item.type === "tag") {
      return (
        <TouchableOpacity
          onPress={() => handleTagPress(item.name)}
          style={styles.userContainer}
        >
          {item.image && (
            <Image
              style={styles.image}
              contentFit="cover"
              source={{ uri: item.image }}
            />
          )}
          <Text style={styles.text1}>#{item.name}</Text>
          {item.description && (
            <Text style={styles.text2}>{item.description}</Text>
          )}
        </TouchableOpacity>
      );
    }
    return null;
  };
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.main}>
          <View style={styles.containerItem}>
            {user && user.isOwner ? (
              <>
                <View style={[styles.card, { zIndex: 1, paddingVertical: 0 }]}>
                  <LinearGradient
                    colors={["#4c008241", "#fff"]}
                    style={styles.profileItems}
                  >
                    <TouchableOpacity
                      onPress={handleProfilePress}
                      style={styles.profileButton}
                    >
                      <Image
                        source={{
                          uri:
                            profilePicture ||
                            "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf",
                        }}
                        style={styles.profileImage}
                      />
                    </TouchableOpacity>
                    <View style={styles.hotmatchContainer}>
                      {submiting ? (
                        <ActivityIndicator size="small" color="#4B0082" />
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            modalVisible
                              ? setModalVisible(false)
                              : setModalVisible(true)
                          }
                        >
                          <Ionicons name="add-circle" size={34} color="#000" />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.searchcontaiiner}>
                      <TextInput
                        style={styles.textsearchInput}
                        placeholder="Search"
                        value={query}
                        editable={!searchLoading}
                        onChangeText={(text) => {
                          setQuery(text);
                          debounceSearch(text);
                        }}
                      />
                      {searchLoading ? (
                        <></>
                      ) : (
                        <View style={styles.searchContainer}>
                          <View style={styles.searchBar}>
                            <TouchableOpacity
                              onPress={() => {
                                (SearchUsers(query, token),
                                  setSearchVisible(true));
                              }}
                              style={styles.searchBar}
                            >
                              <Ionicons
                                name="search"
                                size={24}
                                color="#9b9b9bff"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                      <Ionicons
                        name="notifications-outline"
                        size={21}
                        color="#4B0082"
                        style={styles.notification}
                      />
                    </View>
                  </LinearGradient>

                  <Text style={styles.generaltext}>Hot Match</Text>

                  {/* <View style={styles.adsbannerChallenge}></View> */}
                  <FlatList
                    data={matches}
                    renderItem={renderMatch}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ top: 60, gap: 5, maxHeight: 144 }}
                  />
                  <View style={styles.sepration}></View>
                </View>
                <FlatList
                  data={posts}
                  renderItem={renderPost}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  onEndReached={handleLoadMorePost}
                  contentContainerStyle={[
                    styles.container,
                    { paddingBottom: insets.bottom + 80 },
                  ]}
                  refreshControl={
                    <RefreshControl
                      refreshing={refresh}
                      onRefresh={() => fetchPosts(1, true)}
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
                    onChangeText={(text) => {
                      setQuery(text);
                      debounceSearch(text);
                    }}
                  />
                  {searchLoading ? (
                    <View>
                      <Text>Searching....</Text>
                    </View>
                  ) : (
                    <>
                      <FlatList
                        data={combinedResults}
                        renderItem={renderCombinedSearch}
                        keyExtractor={(item) => item._id + item.type}
                        contentContainerStyle={styles.container}
                        ListEmptyComponent={
                          <Text style={{ textAlign: "center", marginTop: 20 }}>
                            No user or tag found
                          </Text>
                        }
                      />
                      {!searchResults.users?.length &&
                        !searchResults.tags?.length && (
                          <Text style={{ textAlign: "center", marginTop: 20 }}>
                            No user or tag found
                          </Text>
                        )}
                    </>
                  )}
                </Search>
                <EditPost
                  isVisible={editVisible}
                  onClose={() => setEditVisible(false)}
                >
                  <SafeAreaProvider>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      keyboardVerticalOffset={80}
                    >
                      <View style={styles.captionContainer1}>
                        <TextInput
                          style={styles.input}
                          value={caption}
                          onChangeText={setCaption}
                          multiline
                          editable={!isLoading}
                        />
                        <View style={styles.updatePostButtonContainer}>
                          {isUpdatingPost ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <TouchableOpacity
                              style={styles.updatePostButton}
                              onPress={() => handleEditPost(editingPostId)}
                            >
                              <Text style={styles.saveText}>Update Post</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </KeyboardAvoidingView>
                  </SafeAreaProvider>
                </EditPost>
                <Match
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                >
                  <View style={styles.matchContainer}>
                    <Text>League Name</Text>
                    <TextInput
                      placeholder="League Name"
                      value={leagueName}
                      onChangeText={setLeagueName}
                      style={styles.textinput}
                    />
                    <TextInput
                      placeholder="Match Date (YYYY-MM-DD)"
                      value={matchDate}
                      onChangeText={setMatchDate}
                      style={styles.input}
                    />
                    <TouchableOpacity onPress={() => setShowTime(true)}>
                      <Ionicons
                        name={time ? "time" : "time-outline"}
                        size={24}
                        color="#4B0082"
                      />
                      <Text>
                        {time.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </TouchableOpacity>
                    {showTime && Platform.OS === "android" && (
                      <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={timePicker}
                      />
                    )}
                    <TextInput
                      placeholder="Location"
                      value={location}
                      onChangeText={setLocation}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Home Team Name"
                      value={homeTeamName}
                      onChangeText={setHomeTeamName}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Away Team Name"
                      value={awayTeamName}
                      onChangeText={setAwayTeamName}
                      style={styles.input}
                    />
                    <View>
                      <TouchableOpacity onPress={pickHomeTeamLogo}>
                        {homeTeamBase64 ? (
                          <View>
                            <Image
                              source={{ uri: homeTeamBase64 }}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                left: "15%",
                              }}
                            />
                          </View>
                        ) : (
                          <View>
                            <Ionicons
                              name="camera"
                              size={30}
                              color={"#4B0082"}
                            />
                            <Text style={styles.text}> Choose a file </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={pickAwayTeamLogo}>
                        {awayTeamBase64 ? (
                          <View>
                            <Image
                              source={{ uri: awayTeamBase64 }}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                left: "15%",
                              }}
                            />
                          </View>
                        ) : (
                          <View>
                            <Ionicons
                              name="camera"
                              size={30}
                              color={"#4B0082"}
                            />
                            <Text style={styles.text}> Choose a file </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={createMatch}
                      style={styles.updatePostButtonContainer}
                    >
                      {submiting ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.saveText}>Create Match</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </Match>
              </>
            ) : (
              <>
                <View style={styles.itemCard}>
                  <View style={styles.profileItems}>
                    {/* join contest button moved to top-level so it's not clipped by overflow */}
                    <TouchableOpacity
                      onPress={handleProfilePress}
                      style={styles.profileButton}
                    >
                      <Image
                        source={{
                          uri:
                            profilePicture ||
                            "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf",
                        }}
                        style={[
                          styles.profileImage,
                          { marginRight: insets.bottom + 14 },
                        ]}
                      />
                    </TouchableOpacity>
                    <View style={styles.searchcontaiiner}>
                      <TextInput
                        style={styles.textsearchInput}
                        placeholder="Search"
                        value={query}
                        editable={!searchLoading}
                        onChangeText={(text) => {
                          setQuery(text);
                          debounceSearch(text);
                        }}
                      />
                      {searchLoading ? (
                        <></>
                      ) : (
                        <View style={styles.searchContainer}>
                          <View style={styles.searchBar}>
                            <TouchableOpacity
                              onPress={() => {
                                (SearchUsers(query, token),
                                  setSearchVisible(true));
                              }}
                              style={styles.searchBar}
                            >
                              <Ionicons
                                name="search"
                                size={24}
                                color="#9b9b9bff"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}

                      <Ionicons
                        name="notifications-outline"
                        size={21}
                        color="#4B0082"
                        style={styles.notification}
                      />
                    </View>
                  </View>

                  <Text style={styles.generaltext}>Hot Match</Text>

                  {/* <View style={styles.adsbannerChallenge}></View> */}
                  <FlatList
                    data={matches}
                    renderItem={renderMatch}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{
                      paddingBottom: insets.bottom + 8,
                      marginTop: insets.top + 15,
                      minHeight: 144,
                    }}
                  />
                  <View style={styles.sepration}></View>
                </View>
                <FlatList
                  data={posts}
                  renderItem={renderPost}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  onEndReached={handleLoadMorePost}
                  contentContainerStyle={[
                    styles.container,
                    {
                      marginTop: insets.bottom + 15,
                    },
                  ]}
                  refreshControl={
                    <RefreshControl
                      refreshing={refresh}
                      onRefresh={() => fetchPosts(1, true)}
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
                    onChangeText={(text) => {
                      setQuery(text);
                      debounceSearch(text);
                    }}
                  />
                  {searchLoading ? (
                    <View>
                      <Text>Searching....</Text>
                    </View>
                  ) : (
                    <>
                      <FlatList
                        data={combinedResults}
                        renderItem={renderCombinedSearch}
                        keyExtractor={(item) => item._id + item.type}
                        contentContainerStyle={styles.container}
                        ListEmptyComponent={
                          <Text style={{ textAlign: "center", marginTop: 20 }}>
                            No user or tag found
                          </Text>
                        }
                      />
                      {!searchResults.users?.length &&
                        !searchResults.tags?.length && (
                          <Text style={{ textAlign: "center", marginTop: 20 }}>
                            No user or tag found
                          </Text>
                        )}
                    </>
                  )}
                </Search>
                <EditPost
                  isVisible={editVisible}
                  onClose={() => setEditVisible(false)}
                >
                  <SafeAreaProvider>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      keyboardVerticalOffset={80}
                    >
                      <View style={styles.captionContainer1}>
                        <TextInput
                          style={styles.input}
                          value={caption}
                          onChangeText={setCaption}
                          multiline
                          editable={!isLoading}
                        />
                        <View style={styles.updatePostButtonContainer}>
                          {isUpdatingPost ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <TouchableOpacity
                              style={styles.updatePostButton}
                              onPress={() => handleEditPost(editingPostId)}
                            >
                              <Text style={styles.saveText}>Update Post</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </KeyboardAvoidingView>
                  </SafeAreaProvider>
                </EditPost>
              </>
            )}
          </View>
          {/* Top-level animated Join Contest button (not clipped by parents) */}
          <Animated.View
            style={[
              styles.animated,
              {
                opacity: pulseOpacity,
                bottom: insets.bottom + 12,
                transform: [{ scale }],
              },
            ]}
          >
            <Pressable
              onPress={() => router.push({ pathname: "/(contest)" })}
              style={styles.animationPress}
            >
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/join-now-win-special-rewards-background-open-web-contest_1017-55839.jpg",
                }}
                style={styles.animationPress}
                contentFit="contain"
              />
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
