import { MaterialIcons } from "@expo/vector-icons";
import Inonicons from "@expo/vector-icons/Ionicons";
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

import { RouteProp, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import registerScreenStylesindexScreenStyles from "../../assets/styles/register";
import { useAuthStore } from "../../store/authStore";

type VerifyScreenParams = {
  email: string;
};
type RootStackParamList = {
  Verify: VerifyScreenParams;
};
type VerifyScreenRouteProp = RouteProp<RootStackParamList, "Verify">;

export default function Verify() {
  const { width, height } = useWindowDimensions();
  const styles = registerScreenStylesindexScreenStyles(width, height);

  const route = useRoute<VerifyScreenRouteProp>();
  const [code, setCode] = useState("");
  const { isLoading, verifyAccount, newVerificationCode } = useAuthStore();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!email && route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email, email]);

  const [counter, setCounter] = useState(30);
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCouter) => prevCouter - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  const handleVerifyAccount = async () => {
    const result = await verifyAccount(email, code, router);

    if (!email || !code) {
      Alert.alert("Failed", "Please enter your email and verification code");
    }

    if (result && result.success) {
      Alert.alert("Success", "Account verified successfully");
    } else if (result && result.success === false) {
      const message = result?.console.error || "Verification failed";
      Alert.alert("Failed", message);
    }
  };

  const handleResendCode = async () => {
    if (counter === 0) {
      const result = await newVerificationCode(email);
      if (result && result.success) {
        setCounter(30);
        Alert.alert(
          "Success",
          `${email} We have send a new verification code to your email.`,
        );
      } else if (result && result.success === false) {
        const message = result?.console.error || "Resend code failed";
        Alert.alert("Failed", result.error);
      }
    } else if (!email) {
      Alert.alert("Failed", "Please enter your email");
    } else {
      Alert.alert(
        "Failed",
        `You can only request a new code after ${counter} seconds`,
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.verifyAccount}>Verify Account</Text>
          </View>
          <View
            style={[styles.card, { position: "absolute", top: 20, left: 20 }]}
          >
            <TouchableOpacity onPress={() => router.back()} style={styles.back}>
              <MaterialIcons
                name="arrow-back-ios"
                color={"#4B0082"}
                size={24}
                onPress={() => router.back()}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.card, { marginTop: 80 }]}>
            <Text style={styles.textinput}> *Email</Text>
            <TextInput
              style={styles.inputform}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.code}
              placeholder="Enter verification code"
              value={code}
              onChangeText={setCode}
            />
            <Inonicons
              name="pencil-sharp"
              size={25}
              color={"#4B0082"}
              style={styles.pen}
            />

            <View style={styles.sendCode}>
              <TouchableOpacity onPress={handleResendCode}>
                {counter > 0 ? (
                  <Text style={[styles.textinput, { color: "#4B0082" }]}>
                    Didn't get the code?
                  </Text>
                ) : (
                  <Text style={[styles.textinput, { color: "#4B0082" }]}>
                    Request a new code
                  </Text>
                )}
              </TouchableOpacity>
              {counter > 0 && (
                <Text style={[styles.textinput, { margin: 10 }]}>
                  {counter} secounds
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, { marginTop: 60, alignItems: "center" }]}
              onPress={handleVerifyAccount}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.fonttext}> Verify Account {}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
