import menuStyles from "@/assets/styles/menu";
import { useAuthStore } from "@/store/authStore";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
  const { width, height } = useWindowDimensions();
  const styles = menuStyles(width, height);
  const { logout, user } = useAuthStore();

  if (!user) return null;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancle", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logout();
          router.replace("/(auth)");
        },
        style: "destructive",
      },
    ]);
  };
  const handleprofilePicturePress = async (id: string) => {
    router.push({ pathname: "/(profile)", params: { userId: id } });
  };
  const handleFollowersPress = async (id: string) => {
    router.push({ pathname: "/(menu)/follower", params: { userId: id } });
  };
  const handleAnalysisPress = () => {
    router.push("/(videos)");
  };
  const handleChallengePress = () => {
    router.push({ pathname: "/(challenge)" });
  };
  const handleNewsPress = () => {
    router.push({ pathname: "/(news)" });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.userContainer}>
            <MaterialIcons
              name="arrow-back-ios"
              color={"#4B0082"}
              size={30}
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.menuTitle}>Menu{}</Text>
            <View style={styles.userprofile}>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  style={styles.profilePictureContainer}
                  onPress={() => handleprofilePicturePress(user?.id)}
                >
                  <Image
                    style={styles.profilePicture}
                    source={{ uri: user.profilePicture }}
                  />
                </TouchableOpacity>
                <Text style={styles.username}>{user.username}</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => handleFollowersPress(user?.id)}
              style={styles.onpress}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <Ionicons
                    style={styles.itemslist}
                    name={"person-add"}
                    color={"#4B0082"}
                    size={24}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Followers{}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.onpress}>
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <Ionicons
                    style={styles.itemslist}
                    name={"tv"}
                    color={"#4B0082"}
                    size={24}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Live</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity
              onPress={handleAnalysisPress}
              style={styles.onpress}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <MaterialIcons
                    style={styles.itemslist}
                    name="analytics"
                    size={25}
                    color={"#4B0082"}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Analysis</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.onpress} onPress={handleNewsPress}>
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <Ionicons
                    style={styles.itemslist}
                    name={"newspaper"}
                    color={"#4B0082"}
                    size={24}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>News</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.item]}>
            <TouchableOpacity
              style={styles.onpress}
              onPress={() => handleChallengePress()}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <MaterialCommunityIcons
                    style={styles.itemslist}
                    name="head-lightbulb"
                    size={30}
                    color={"#4B0092"}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Quiz</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.onpress}>
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <MaterialIcons
                    style={styles.itemslist}
                    name="sports-esports"
                    size={30}
                    color={"#4B0082"}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Sports</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.item]}>
            <TouchableOpacity
              style={styles.onpress}
              onPress={() =>
                Linking.openURL("https://www.youtube.com/@kismetKSM")
              }
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <MaterialIcons
                    style={styles.itemslist}
                    name="slideshow"
                    size={29}
                    color={"#4B0082"}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Highlights</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.onpress}>
              <View style={styles.itemContainer}>
                <View style={styles.itemslists}>
                  <MaterialIcons
                    style={styles.itemslist}
                    name="help"
                    size={29}
                    color={"#4B0082"}
                  />
                </View>
                <View style={styles.itemslists}>
                  <Text style={styles.text}>Help</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity style={styles.logout} onPress={handleLogout}>
              <View style={styles.logoutContent}>
                <Ionicons name={"log-out"} color={"#f9f9f9"} size={26} />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
