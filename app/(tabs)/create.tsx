import styles from "@/assets/styles/create";
import { userProfilePictureStore } from "@/store/profileStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../store/postStore";

export default function Index() {
  const [caption, setcaption] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const {token, user} = useAuthStore();
  const router = useRouter();

  //handle document picking logic
  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "You need to grant camera roll permission to upload image")
          return
        }
      }
     const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
     });

     if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset);
        setImageBase64(selectedAsset.base64 ? `data:image/*;base64,${selectedAsset.base64}` : selectedAsset.uri);
     } else {
      
     }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  useEffect(() => {
    userProfilePictureStore.getState().fetchProfilePicture();
  }, []);

  const handleUpload = async () => {
    if (!caption.trim() || !image){
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      setLoading(true);

      // get image extension from uri or default to jpg
      const uriParts = image.uri.split(".");
      const imageExtension = uriParts[uriParts.length - 1];
      const imageType = imageExtension ? `image/${imageExtension.toLowerCase()}` : "image/jpg";

      const imageDataUrl = `data:${imageType};base64,${image.base64}`;

      const response = await fetch(`${API_URL}/post/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: caption.trim(),
          image: imageDataUrl,
        })
      })

      const data = await response.json();
      if(!response.ok) throw new Error(data.message || "Failed to upload post");

      setcaption("");
      setImage(null);
      setImageBase64(null);
  
      router.push("/");
      
    } catch(error){
      console.error(error, "Error while uploading")
      const errorMessage = (error instanceof Error && error.message) ? error.message : "Something went Wrong";
      Alert.alert("Failed", errorMessage);
    } finally { setLoading(false)}
  }

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="#4B0082" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create Post</Text>
            <Image
              source = {{ uri: user.profilePicture || "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf"}}
              style={styles.profile}/>    
        </View>

        <View style={styles.createcard}>
          <TextInput 
            style={styles.caption}
            placeholder="write a caption"
            value={caption}
            onChangeText={setcaption}
            editable={!isLoading}
            multiline
            />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.imagecard} onPress={pickImage}>
            {imageBase64 ? (
              <View style={styles.imagecard}>
                <Image style={[styles.imagecard]} source={{ uri: imageBase64 }} />
              </View>
            ) : (
              <View>
                <Ionicons style={{left:"15%"}} name="camera" size={40} color={"#4B0082"} />
                <Text style={styles.text}> Choose a file </Text>
              </View>
            )
          }
          </TouchableOpacity>
        </View>

        <View style={styles.post}>
          <TouchableOpacity
            style={[styles.button,  { justifyContent: "center", alignItems: "center" },
            ]}
            onPress={handleUpload}
            disabled={isLoading}> 
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size={"small"}/>
           ) : (
              <Text style={[styles.fonttext, { fontWeight: "bold" }]}> Upload </Text>
           )}
          </TouchableOpacity>
        </View>
      </View>
  )
}