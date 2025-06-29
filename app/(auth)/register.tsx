import Inonicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { useState } from "react";
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

import styles from "../../assets/styles/register";
import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, register } = useAuthStore();

  const handleRegister = async () => {
    const result = await register(username, email, password, router);

    if (!result.success) Alert.alert("Failed", result.error);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.text, { marginTop: 80 }]}>
            Create An Account
          </Text>
        </View>

        <View style={[styles.card, { marginTop: 80 }]}>
          <Text style={styles.textinput}>Username</Text>
          <TextInput
            style={styles.inputform}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={[styles.textinput, { marginTop: 20 }]}>Email</Text>
          <TextInput
            style={styles.inputform}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={[styles.textinput, { marginTop: 20 }]}>Password</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={styles.inputform}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: 20 }}
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
              <Text style={[styles.fonttext]}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={[styles.card, { flexDirection: "row", marginTop: 50 }]}>
            <Text style={[styles.fonttext, { fontSize: 18, color: "#000" }]}>
              Already have an account?
            </Text>
            <Link href="/(auth)/login">
              <Text
                style={[
                  styles.fonttext,
                  {
                    fontSize: 18,
                    color: "#4B0082",
                    fontWeight: "bold",
                    marginLeft: 5,
                  },
                ]}
              >
                Login
              </Text>
            </Link>
            <Text
              style={[
                styles.fonttext,
                { fontSize: 18, color: "#000", marginLeft: 8 },
              ]}
            >
              ||
            </Text>
            <Link
              href="/(auth)/verify"
              style={[
                styles.fonttext,
                {
                  fontSize: 18,
                  color: "#4B0082",
                  fontWeight: "bold",
                  marginLeft: 10,
                },
              ]}
            >
              Verify
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
