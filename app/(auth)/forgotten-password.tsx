import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import forgotPasswordStyles from "../../assets/styles/forgotten-password";
import { useAuthStore } from "../../store/authStore";

type ForgottenPasswordScreenParams = {
  email?: string;
};
type RootStackParamList = {
  ForgottenPassword: ForgottenPasswordScreenParams;
};
type ForgottenPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  "ForgottenPassword"
>;
export default function ForgottenPassword() {
  const { width, height } = useWindowDimensions();
  const styles = forgotPasswordStyles(width, height);
  const route = useRoute<ForgottenPasswordScreenRouteProp>();
  const { isLoading, forgotPassword } = useAuthStore();
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (!emailInput && route.params?.email) {
      setEmailInput(route.params.email);
    }
  }, [route.params?.email, emailInput]);

  const handleSendForgotPassword = async () => {
    const result = await forgotPassword(emailInput, router);
    if (!emailInput) {
      Alert.alert("Failed", "Please enter your email");
      return;
    }
    Alert.alert("Success", "Password reset email sent");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: "#fff" }}
      >
        <View style={styles.header}>
          <View style={styles.icons}>
            <MaterialIcons
              name="arrow-back-ios"
              color={"#4B0082"}
              size={24}
              onPress={() => router.back()}
              style={styles.arrow}
            />
          </View>
          <Text style={styles.title}>Forgotten Password</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed-outline" size={70} color="#4B0082" />
          </View>
          <Text style={styles.subtitle}>
            Please enter your email to receive a password reset link.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendForgotPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Send Reset Email</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
