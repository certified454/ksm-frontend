import styles from "@/assets/styles/create";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
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
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const {token} = useAuthStore();
  const router = useRouter();

  //handle document picking logic
  const pickFile = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "You need to grant camera roll permission to upload file")
          return
        }
      }
     const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       aspect: [4, 3],
       allowsEditing: true,
       quality: 1,
       base64: false,
     });

     if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setFile(selectedAsset);
        setFilePreview(selectedAsset.uri)
     } else {
      
     }
    } catch (error) {
      console.error("Error picking file", error);
    }
  };

  const handleUpload = async () => {
    if (!description.trim() || !location.trim() || !file){
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('description', description);
      formData.append('location', location);
      formData.append('file', {
        uri: file.uri,
        type: file.type || 'image/png',
        name: file.fileName || `upload-${Date.now()}.${file.type.split('/')[1] || 'png'}`
      } as any);

      const response = await fetch(`${API_URL}/posts/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formData,
      })

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Something went wrong");    
      }

      Alert.alert(
        "Success", "Uploaded succesfully"
      );
      setDescription("");
      setFile(null);
      setLocation("");
      setFilePreview(null);
      router.replace("/(tabs)")

      return {
        success: true,
      };
    } catch(error){
      console.error(error, "Error while uploading")
      const errorMessage = (error instanceof Error && error.message) ? error.message : "Something went Wrong";
      Alert.alert("Failed", errorMessage);
    } finally { setLoading(false)}
  }

  return (
    
      <View style={styles.container}> 
        <View style={styles.profile}></View>
        <View style={styles.createcard}>
          <TextInput 
            style={[styles.inputform, {height: 100, paddingBottom: 70}]}
            placeholder="write a caption"
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            multiline
          />

          <TextInput 
            style={styles.inputform}
            placeholder="enter location optional"
            value={location}
            onChangeText={setLocation}
            />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.imagecard} onPress={pickFile}>
            {filePreview ? (
              <View style={styles.imagecard}>
                <Image style={[styles.imagecard]} source={{ uri: filePreview }} />
              </View>
            ) : (
              <View >
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
            disabled={isLoading}
          > {isLoading ? (
            <ActivityIndicator color="#ffffff" size={"small"}/>
           ) : (
            <Text style={[styles.fonttext, { fontWeight: "bold" }]} > Upload</Text>
           )}
          </TouchableOpacity>
        </View>
      </View>

  )

}