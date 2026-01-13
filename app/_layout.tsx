import SafeScreen from "@/components/safescreen";
import { NotificationProvider } from "@/context/NotificationContext";
import { useAuthStore } from "@/store/authStore";
import { Image } from 'expo-image';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true  
  })
})

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { token, user, checkAuth } = useAuthStore();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  
  useEffect(() => {
    const init = async () => {
      await checkAuth?.();
      setTimeout(() => setLoaded(true), 3000);
    };
    init();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (token && user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)');
      }
    }
  }, [loaded, token, user]);

  if (!loaded) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#4B0082" }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{ width: 230, height: 230, top: 15 }}
        />
        <ActivityIndicator size="large" color="#fff" style={{ top: -118, left: 5 }} />
      </View>
    );
  };
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
