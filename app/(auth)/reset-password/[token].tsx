import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../../../assets/styles/forgotten-password";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://kismit-official.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password");
      Alert.alert("Success", "Password reset successful! You can now login.");
      router.push("/(auth)");
    } catch (error) {
      console.error("Error resetting password:", error);
      Alert.alert("Error", "An error occurred while resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.icons}>
          <Ionicons name="arrow-back"  size={35} onPress={() => router.back()} color={'#4B0082'} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Reset Your Password</Text>
          <View style={styles.iconContainer}> 
            <Ionicons name="lock-closed-outline" size={80} color={'#4B0082'} />
          </View>
          <Text style={styles.subtitle}>Please enter your new password below.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#4B0082"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleReset} disabled={loading || !newPassword} style={{ width: '100%' }}  >
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {loading ? "Resetting..." : "Reset Password"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}