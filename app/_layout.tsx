import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import SafeScreen from "../components/safescreen";
import { useAuthStore } from "../store/authStore";

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync successed: ${result}`))
  .catch(console.warn);
// SplashScreen.setOptions({
//   duration: 4000,
//   fade: true,
// });

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("SplashScreen hidden");
      } catch (e) {
        console.warn("Error hiding SplashScreen:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
       SplashScreen.hideAsync();
      console.log("SplashScreen hidden");
    }
  }, [appIsReady]);
  
  useEffect(() => {
    const initialize = async () => {
    await checkAuth();
    setIsLoading(false);
    setMounted(true);
  };
    initialize();
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments, mounted, isLoading]);

  if(!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
      <View onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </View>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
