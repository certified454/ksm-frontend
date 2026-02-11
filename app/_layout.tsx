import SafeScreen from "@/components/safescreen";
import { NotificationProvider } from "@/context/NotificationContext";
import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const router = useRouter();
  const { token, user, checkAuth } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const charIndexAnim = useRef(new Animated.Value(0)).current;
  const textToDisplay = "    Kismet KSM";

  useEffect(() => {
    const init = async () => {
      // Ensure the native splash screen stays visible until we finish setup
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // ignore if already prevented
      }

      const listener = charIndexAnim.addListener(({ value }) => {
        const index = Math.floor(value);
        setDisplayedText(textToDisplay.substring(0, index));
      });

      // start the intro animations immediately
      Animated.timing(charIndexAnim, {
        toValue: textToDisplay.length,
        duration: 1500,
        useNativeDriver: false,
      }).start();

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      // run auth check in background but don't block the intro animation
      try {
        await checkAuth?.();
      } catch (e) {
        /* ignore auth errors here */
      }

      // show the React splash view after the intro completes
      setTimeout(() => setLoaded(true), 3000);

      return () => {
        charIndexAnim.removeListener(listener);
      };
    };
    init();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (token && user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [loaded, token, user]);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4B0082",
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 230, height: 230, bottom: 15 }}
        />
        <Animated.Text
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            bottom: 320,
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "serif",
            opacity: fadeAnim,
            minWidth: 150,
            marginLeft: 40,
          }}
        >
          {displayedText}
        </Animated.Text>
        <Text
          style={{
            position: "absolute",
            bottom: 80,
            color: "#ffffff9c",
            fontSize: 12,
          }}
        >
          Powered By
        </Text>
        <Text
          style={{
            position: "absolute",
            bottom: 55,
            color: "#ffffff9c",
            fontSize: 12,
          }}
        >
          SighterTech
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <NotificationProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(postdetail)" />
            <Stack.Screen name="(profile)" />
            <Stack.Screen name="(menu)" />
            <Stack.Screen name="(videos)" />
            <Stack.Screen name="(challenge)" />
            <Stack.Screen name="(tag)" />
            <Stack.Screen name="(respond)" />
            <Stack.Screen name="(news)" />
            <Stack.Screen name="(contest)" />
          </Stack>
        </NotificationProvider>
      </SafeScreen>
      <StatusBar style="dark" />
      <Toast />
    </SafeAreaProvider>
  );
}
