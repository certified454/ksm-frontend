import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeScreen from "../components/safescreen";
import { useAuthStore } from "../store/authStore";

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync successed: ${result}`))
  .catch(console.warn);

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepareApp() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("SplashScreen hidden");
      } catch (error) {
        console.warn("Error hiding SplashScreen:", error);
      } finally {
        setIsAppReady(true);
        console.log("App is now ready");
      }
    }
    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async() => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
      console.log("SplashScreen hidden");
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }
  
  useEffect(() => {
    const initialize = async () => {
    await checkAuth();
    setIsLoading(false);
    setMounted(true);}
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

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
