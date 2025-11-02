import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { API_URL } from "../../store/postStore";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../assets/styles/login";
import { useAuthStore } from "../../store/authStore";
import { useNotification } from "@/context/NotificationContext";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();

  const { expoPushToken, notification, error } = useNotification();
  const { userId } = useLocalSearchParams();
  const { token } = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password, router);

    if (!result.success) Alert.alert("Message", result.error);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.textWelcome}>
            Welcome Back {}
          </Text>     
          <View style={styles.cardformContainer}>
            <Text style={styles.textinput}>Email {}</Text>
            <TextInput
              style={styles.inputform}
              placeholder="enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.textinputItem}>Password {}</Text>
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
                size={20}
                color="#4B0082"
              />
            </TouchableOpacity>
            <Link href="/(auth)/forgotten-password" style={styles.fontText}>
              Forgot Password? {}
            </Link>
            <View style={styles.card}>
              <TouchableOpacity style={styles.buttonInside} onPress={handleLogin} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" size={"small"} />
                ) : (
                  <Text style={styles.login}>
                    Login {}
                  </Text>
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
    </SafeAreaView>
  );
}
