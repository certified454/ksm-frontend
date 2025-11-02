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
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="register"/>
          <Stack.Screen name="verify" />
          <Stack.Screen name="forgotten-password"/>
          <Stack.Screen name="reset-password/[token]"/>
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}