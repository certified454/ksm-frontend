import {  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { use, useEffect, useState } from "react";
import styles from "../../assets/styles/forgotten-password";
import { SafeAreaView } from "react-native-safe-area-context";

type ForgottenPasswordScreenParams = {
  email?: string;
}
type RootStackParamList ={
  ForgottenPassword: ForgottenPasswordScreenParams;
}
type ForgottenPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ForgottenPassword'>
export default function ForgottenPassword() {
    const route = useRoute<ForgottenPasswordScreenRouteProp>();
    const { isLoading, forgotPassword } = useAuthStore();
    const [emailInput, setEmailInput] = useState("");

    useEffect(() => {
      if (!emailInput && route.params?.email) {
        setEmailInput(route.params.email);
      }
    }, [route.params?.email, emailInput])

    const handleSendForgotPassword = async () => {
        const result = await forgotPassword(emailInput, router)
            if(!emailInput) {
            Alert.alert("Failed", "Please enter your email");
            return;
        }
        Alert.alert("Success", "Password reset email sent");
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, backgroundColor: '#fff' }}
        >
        <View style={styles.icons}>
            <Ionicons name='arrow-back' size={30} color="#4B0082" onPress={() => router.back()} />
        </View>
          <View style={styles.container}>
            <Text style={styles.title}>Forgotten Password</Text>
            <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={70} color="#4B0082" />
            </View>
            <Text style={styles.subtitle}>Please enter your email to receive a password reset link.</Text>

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