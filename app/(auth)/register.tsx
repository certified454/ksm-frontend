import Inonicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";

import { SafeAreaView } from "react-native-safe-area-context";
import registerScreenStylesindexScreenStyles from "../../assets/styles/register";
import { useAuthStore } from "../../store/authStore";

// Password strength calculator
const calculatePasswordStrength = (pwd: string) => {
  let strength = 0;
  if (pwd.length >= 8) strength += 1;
  if (pwd.length >= 12) strength += 1;
  if (/[a-z]/.test(pwd)) strength += 1;
  if (/[A-Z]/.test(pwd)) strength += 1;
  if (/[0-9]/.test(pwd)) strength += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;
  return strength;
};

// Generate strong password
const generateStrongPassword = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*";
  const allChars = uppercase + lowercase + numbers + symbols;

  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = password.length; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

// Validate username format
const validateUsername = (username: string) => {
  // Check if username contains spaces or invalid characters
  if (/\s/.test(username)) {
    const cleanUsername = username.replace(/\s+/g, "");
    return {
      isValid: false,
      message: "Username cannot contain spaces",
      suggested: cleanUsername,
    };
  }

  // Check for invalid characters (only allow alphanumeric, underscore, and hyphen)
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    const cleanUsername = username.replace(/[^a-zA-Z0-9_-]/g, "");
    return {
      isValid: false,
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
      suggested: cleanUsername,
    };
  }

  return { isValid: true, message: "", suggested: "" };
};

export default function Register() {
  const { width, height } = useWindowDimensions();
  const styles = registerScreenStylesindexScreenStyles(width, height);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { isLoading, register } = useAuthStore();
  const passwordStrength = calculatePasswordStrength(password);

  const pickProfileImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
          Toast.show({
            type: "error",
            text1: "Permission Denied",
            text2: "Sorry, we need camera roll permissions to make this work!",
          });
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 2],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64ProfilePicture = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
        setProfilePicture(base64ProfilePicture);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  const handleRegister = async () => {
    const usernameValidation = validateUsername(username);
    if (!username || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "All fields marked with * are required.",
      });
      return;
    } else if (!usernameValidation.isValid) {
      Toast.show({
        type: "error",
        text1: "Invalid Username Format",
        text2: usernameValidation.message,
      });
      if (usernameValidation.suggested) {
        setTimeout(() => {
          Toast.show({
            type: "info",
            text1: "Suggested Username",
            text2: `Try using: ${usernameValidation.suggested}`,
          });
        }, 500);
      }
      return;
    } else if (passwordStrength < 3) {
      Toast.show({
        type: "error",
        text1: "Weak Password",
        text2:
          "Password must be stronger. Use uppercase, lowercase, numbers, and symbols.",
      });
      return;
    }

    const result = await register(
      username,
      email,
      password,
      profilePicture,
      router,
    );
    //check for all fields filled

    if (!result.success) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: result.error,
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Registration Successful",
      text2:
        "Please check your email for verification code to verify your account",
    });
    setTimeout(() => {
      router.push({
        pathname: "/(auth)/verify",
        params: { email: result.user?.email || "" },
      });
    }, 3500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.createText}>Create An Account</Text>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.sellectProfile}
              onPress={pickProfileImage}
            >
              {profilePicture ? (
                <View>
                  <Image
                    source={{
                      uri:
                        profilePicture ||
                        "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf",
                    }}
                    style={styles.profilePicture}
                  />
                </View>
              ) : (
                <View style={styles.profilePicturePlaceholder}>
                  <Inonicons name="person-circle" size={100} color="#4B0082" />
                  <Text style={styles.placeholderText}>
                    Tap to select profile picture {}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.cardItem}>
            <Text style={styles.textinput}>* Username {}</Text>
            <TextInput
              style={styles.inputform}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {username.length > 0 && (
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: validateUsername(username).isValid
                    ? "#6BCB77"
                    : "#FF6B6B",
                  fontWeight: "500",
                }}
              >
                {validateUsername(username).isValid
                  ? "✅ Valid username"
                  : `❌ ${validateUsername(username).message}`}
              </Text>
            )}
            {username.length > 0 &&
              !validateUsername(username).isValid &&
              validateUsername(username).suggested && (
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    backgroundColor: "#fff3cd",
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: "#FFD93D",
                  }}
                  onPress={() =>
                    setUsername(validateUsername(username).suggested)
                  }
                >
                  <Text
                    style={{
                      color: "#856404",
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    💡 Use suggested: {validateUsername(username).suggested}
                  </Text>
                </TouchableOpacity>
              )}

            <Text style={styles.textinputItem}>* Email {}</Text>
            <TextInput
              style={styles.inputform}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.textinputItem}>* Password {}</Text>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.inputform}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
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

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View>
                <View style={styles.passwordStrenght}>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <View
                      key={index}
                      style={[
                        styles.passwordBar,
                        {
                          backgroundColor:
                            index < passwordStrength
                              ? passwordStrength < 3
                                ? "#FF6B6B"
                                : passwordStrength < 5
                                  ? "#FFD93D"
                                  : "#6BCB77"
                              : "#e0e0e0",
                        },
                      ]}
                    />
                  ))}
                </View>
                <Text
                  style={[
                    styles.passwordText,
                    {
                      color:
                        passwordStrength < 3
                          ? "#FF6B6B"
                          : passwordStrength < 5
                            ? "#FFD93D"
                            : "#6BCB77",
                    },
                  ]}
                >
                  {passwordStrength < 3
                    ? "⚠️ Weak Password"
                    : passwordStrength < 5
                      ? "⚡ Medium Password"
                      : "✅ Strong Password"}
                </Text>
              </View>
            )}

            {/* Suggest Password Button */}
            <TouchableOpacity
              style={styles.suggestPassword}
              onPress={() => setPassword(generateStrongPassword())}
            >
              <Text style={styles.suggestText}>💡 Suggest Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.fonttext}>Register {}</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.fontText}>Already have an account? {}</Text>
          <View style={styles.cardItems}>
            <Link href="/(auth)">
              <Text style={styles.login}>Login {}</Text>
            </Link>
            <Text style={styles.sepration}>||</Text>
            <Link href="/(auth)/verify" style={styles.login}>
              Verify {}
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
