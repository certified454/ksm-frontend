import Inonicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import styles from "../../assets/styles/register";
import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { isLoading, register } = useAuthStore();

  const pickProfileImage = async () => {
        try {
          if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
            if (status !== "granted") {
              Alert.alert("Permission Denied", "You need to grant camera roll permission to upload image");
              return;
            }
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 2],
            quality: 1,
            base64: true,
          })
        
          if (!result.canceled) {
            const base64ProfilePicture = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
            setProfilePicture(base64ProfilePicture);
          }
        } catch (error) {
          console.error("Error picking image", error);
        }
      }

  const handleRegister = async () => {

    const result = await register(username, email, password, profilePicture, router);

    if (!result.success) Alert.alert("Failed", result.error);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.createText,]}>
            Create An Account
          </Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.card} onPress={pickProfileImage}>
          {profilePicture ? (
            <View>
              <Image
                source={{ uri: profilePicture || "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf" }} style={styles.profilePicture}
              />
            </View>
          ): (
            <View style={styles.profilePicturePlaceholder}>
              <Inonicons name="person-circle" size={100} color="#4B0082" />
              <Text style={styles.placeholderText}>Tap to select profile picture</Text>
            </View>
          )}
          </TouchableOpacity>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.textinput}>Username</Text>
          <TextInput
            style={styles.inputform}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.textinputItem}>Email</Text>
          <TextInput
            style={styles.inputform}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.textinputItem}>Password</Text>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.inputform}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordContainer}
            >
              <Inonicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#4B0082"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, { marginTop: 70, alignItems: "center" }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.fonttext}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.cardItems}>
            <Text style={styles.fontText}>
              Already have an account?
            </Text>
            <Link href="/(auth)">
              <Text style={styles.login}>
                Login
              </Text>
            </Link>
            <Text style={styles.sepration}>
              ||
            </Text>
            <Link href="/(auth)/verify" style={styles.login}>
              Verify
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
