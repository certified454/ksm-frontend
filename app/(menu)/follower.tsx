import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import followStyles from "../../assets/styles/followers";
type Followers = {
  _id: string;
  username: string;
  profilePicture: string;
};
export default function Followers() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const styles = followStyles(screenWidth, screenHeight);
  const { token, user } = useAuthStore();
  const router = useRouter();

  const { userId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<Followers[]>([]);

  const fetchFollowers = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/user/profile/${userId}/followers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch followers");
      }
      setFollowers(data.followers);
    } catch (error) {
      Alert.alert("Failed", "Failed to fetch followers");
    } finally {
      setIsLoading(false);
    }
  };
  const handleProfilePress = (id: string) => {
    router.push({ pathname: "/(profile)", params: { userId: id } });
  };
  useEffect(() => {
    fetchFollowers();
  }, []);

  const renderFollowers = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleProfilePress(item._id)}
      style={styles.container}
    >
      <Text style={styles.followersusername}>{item.hobbies}</Text>
      <View style={styles.containerClick}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            contentFit="cover"
            source={{ uri: item.profilePicture }}
          />
        </View>
        <Text style={styles.followersusername}>{item.username}</Text>
        {/* <View style={styles.hobbiesContainer}>
                    <Text >{item.location}he</Text>
                </View> */}
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.flatList}>
        <View style={styles.userInfor}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <MaterialIcons
              name="arrow-back-ios"
              size={30}
              color={"#4B0082"}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{user?.username}</Text>
        </View>
        <FlatList
          renderItem={renderFollowers}
          data={followers}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
