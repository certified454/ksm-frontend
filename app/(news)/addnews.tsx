import createAddNewsStyles from "@/assets/styles/addnews";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { MaterialIcons } from "@expo/vector-icons";
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
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function addNewsLayout() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = useWindowDimensions();
  const styles = createAddNewsStyles(width, height);

  const [submiting, setSubmitting] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [picture1, setPicture1] = useState<any>(null);
  const [picture2, setPicture2] = useState<any>(null);
  const [picture1Base64, setPicture1Base64] = useState<string | null>(null);
  const [picture2Base64, setPicture2Base64] = useState<string | null>(null);

  const selectPicture1 = async () => {
    if (Platform.OS != "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera roll permission to upload image",
        );
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setPicture1(selectedAsset);
      setPicture1Base64(
        selectedAsset.base64
          ? `data:image/*;base64,${selectedAsset.base64}`
          : selectedAsset.uri,
      );
    }
  };

  const selectPicture2 = async () => {
    if (Platform.OS != "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera roll permission to upload image",
        );
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setPicture2(selectedAsset);
      setPicture2Base64(
        selectedAsset.base64
          ? `data:image/*;base64,${selectedAsset.base64}`
          : selectedAsset.uri,
      );
    }
  };

  const handleAddNews = async () => {
    try {
      setSubmitting(true);

      const uriPart1 = picture1.uri.split(".");
      const picture1Exten = uriPart1[uriPart1.length - 1];
      const picture1Type = picture1Exten
        ? `image/${picture1Exten.toLowerCase()}`
        : "image/jpg";
      const picutre1DataUrl = `data:${picture1Type};base64,${picture1.base64}`;

      const uriPart2 = picture2.uri.split(".");
      const picture2Exten = uriPart2[uriPart2.length - 1];
      const picture2Type = picture2Exten
        ? `image/${picture2Exten.toLowerCase()}`
        : "image/jpg";
      const picutre2DataUrl = `data:${picture2Type};base64,${picture2.base64}`;

      const response = await fetch(`${API_URL}/news/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          picture1: picutre1DataUrl,
          picture2: picutre2DataUrl,
        }),
      });
      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error adding news",
          text2: "Please try again later.",
        });
      }
      Toast.show({
        type: "success",
        text1: "News added successfully",
      });
      setSubmitting(false);
      setDescription("");
      setPicture1(null);
      setPicture2(null);
      setPicture1Base64(null);
      setPicture2Base64(null);
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#4B0082"
            style={{ marginTop: 120 }}
          />
        ) : (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.backIcon}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={25}
                  color="#4B0082"
                  onPress={() => router.back()}
                />
              </View>
              <Text style={styles.title}>Add News</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text>* Enter Description</Text>
              <TextInput
                style={styles.descriptionTextInput}
                value={description}
                onChangeText={setDescription}
                multiline
                editable={!submiting}
              />
            </View>

            <View style={styles.imagesContainer}>
              <View style={styles.picture1Container}>
                <Text style={styles.text}>
                  * Select First Image to be display
                </Text>
                <TouchableOpacity
                  onPress={selectPicture1}
                  style={styles.picture1}
                >
                  {picture1Base64 ? (
                    <Image
                      source={{ uri: picture1Base64 }}
                      style={styles.picture1}
                    />
                  ) : (
                    <Text style={styles.selectImageText}>Select Image 1</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.picture1Container}>
                <Text style={styles.text}>
                  * Select Second Image to be display
                </Text>
                <TouchableOpacity
                  onPress={selectPicture2}
                  style={styles.picture2}
                >
                  {picture2Base64 ? (
                    <Image
                      source={{ uri: picture2Base64 }}
                      style={styles.picture2}
                    />
                  ) : (
                    <Text style={styles.selectImageText}>Select Image 2</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleAddNews}
              style={styles.submitButton}
              disabled={submiting}
            >
              {submiting ? (
                <ActivityIndicator color="#ffffff" size={"small"} />
              ) : (
                <Text style={styles.submitButtonText}> Submit News </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
