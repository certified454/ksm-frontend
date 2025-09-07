import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SafeScreen from "../../components/safescreen";


export default function AuthLayout() {
  // const { isLoading } = useAuthStore();
  const pathname = usePathname();

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="verify" options={{ headerShown: false }} />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}