import SafeScreen from "@/components/safescreen";
import { NotificationProvider } from "@/context/NotificationContext";
import * as Notifications from 'expo-notifications';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


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
   const [loaded] = useState(true)
  useEffect(() => {
    if(loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
            </Stack>
        </NotificationProvider>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
