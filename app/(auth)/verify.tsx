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
} from 'react-native';

import { RouteProp, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import styles from "../../assets/styles/register";
import { useAuthStore } from "../../store/authStore";

type VerifyScreenParams = {
  email: string;
}
type RootStackParamList ={
  Verify: VerifyScreenParams;
}
type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>

export default function Verify() {

    const route = useRoute<VerifyScreenRouteProp>();
    const [code, setCode] = useState("");
    const {isLoading, verifyAccount, newVerificationCode } = useAuthStore();
    const [email, setEmail] = useState("");
    const userEmailFromRoute = route.params?.email;
    
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

     if(!email || !code) {
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
          Alert.alert("Success", `${email} We have send a new verification code to your email.`);
        } else if (result && result.success === false) {
          const message = result?.console.error || "Resend code failed";
          Alert.alert("Failed", result.error)  
        }
      } else if (!email) {
        Alert.alert("Failed", "Please enter your email");
      } else {
        Alert.alert("Failed", `You can only request a new code after ${counter} seconds`);
      }
    };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.text, { marginTop: 80 }]}>Verify Account</Text>
        </View>

        <View style={[styles.card, { marginTop: 80 }]}>
            <Text style={styles.textinput}>Email</Text>
            <TextInput
                style={styles.inputform}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={[styles.inputform, { marginTop: 20, borderColor: '#f8f8f8', backgroundColor: '#f8f8f8'}]}
                placeholder="Enter your verification code"
                value={code}
                onChangeText={setCode}
                />
            <Inonicons name="pencil-sharp" size={25} color={"#4B0082"} style={{position: 'absolute', top: 105, right: 36}}/>
            
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
                onPress = {handleResendCode}>
                  {counter > 0 ? (
                    <Text style={[styles.textinput, { color: "#4B0082" }]}>
                      Didn't get the code?
                    </Text>
                  ) : (
                    <Text style={[styles.textinput, { color: "#4B0082" }]}>
                      Resend code
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
                style={[styles.button, { marginTop: 60 , alignItems: 'center',}]}
                onPress= {handleVerifyAccount} disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="ffffff" />
                ) : (
                  <Text style={styles.fonttext}> Verify Account</Text>
                )}
              </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

