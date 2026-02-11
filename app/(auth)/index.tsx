import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";

import { useNotification } from "@/context/NotificationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import loginStylesScreen from "../../assets/styles/login";
import { useAuthStore } from "../../store/authStore";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const styles = loginStylesScreen(width, height);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();

  const { expoPushToken, notification, error } = useNotification();
  const { userId } = useLocalSearchParams();
  const { token } = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password);

    if (!result.success) {
      Toast.show({ type: "error", text1: "Login Failed", text2: result.error });
      return;
    }

    const username = result.user?.username || email;
    Toast.show({
      type: "success",
      text1: "Login Successful",
      text2: `Welcome back, ${username}!`,
      visibilityTime: 3500,
    });
    setTimeout(() => {
      router.push({ pathname: "/(tabs)" });
    }, 3500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.textWelcome}>Welcome Back {}</Text>
          <View style={styles.cardformContainer}>
            <Text style={styles.textinput}>* Email {}</Text>
            <TextInput
              style={styles.inputform}
              placeholder="enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.textinputItem}>* Password {}</Text>
            <TextInput
              style={styles.inputform}
              placeholder="enter your password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeicon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#4B0082"
              />
            </TouchableOpacity>
            <Link href="/(auth)/forgotten-password" style={styles.fontText}>
              Forgot Password? {}
            </Link>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.buttonInside}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" size={"small"} />
                ) : (
                  <Text style={styles.login}>Login {}</Text>
                )}
              </TouchableOpacity>

              <View style={styles.cardView}>
                <Text style={styles.accountText}>
                  Don't have an account? {}
                </Text>
                <Link href="/(auth)/register" style={styles.register}>
                  Register {}
                </Link>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
