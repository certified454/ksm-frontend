import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
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

import styles from "../../assets/styles/login";
import { useAuthStore } from "../../store/authStore";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password, router);

    if (!result.success) Alert.alert("Message", result.error);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/background.png")}
            transition={1000}
            style={styles.image}
          />
          <View
            style={[styles.card, { position: "absolute", top: 20, left: 20 }]}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-circle-sharp"
                size={35}
                color="#4B0082"
                style={[styles.text, { marginTop: 10, fontSize: 40 }]}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { position: "absolute", top: 90 }]}>
            Welcome Back
          </Text>
        </View>

        <View
          style={[
            styles.cardform,
            { position: "absolute", top: 200, borderRadius: 20 },
          ]}
        >
          <Text style={[styles.text, { alignSelf: "center" }]}></Text>
          <Text style={[styles.textinput, { marginTop: 20 }]}>Email</Text>
          <TextInput
            style={styles.inputform}
            placeholder="enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.textinput, { marginTop: 20 }]}>Password</Text>
          <TextInput
            style={styles.inputform}
            placeholder="enter your password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", top: 206, right: 40 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#4B0082"
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.fonttext,
              { color: "#4B0082", fontSize: 15, marginTop: 20, left: 195 },
            ]}
          >
            forgoten password?
          </Text>

          <View style={styles.card}>
            <TouchableOpacity
              style={[
                styles.button,
                { justifyContent: "center", alignItems: "center" },
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size={"small"} />
              ) : (
                <Text style={[styles.fonttext, { fontWeight: "bold" }]}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <View
              style={[styles.card, { flexDirection: "row", marginTop: 50 }]}
            >
              <Text style={[styles.fonttext, { fontSize: 18, color: "#000" }]}>
                Don't have an account?
              </Text>
              <Link
                href="/(auth)/register"
                style={[
                  styles.fonttext,
                  {
                    fontSize: 18,
                    color: "#4B0082",
                    fontWeight: "bold",
                    marginLeft: 7,
                  },
                ]}
              >
                Register
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
