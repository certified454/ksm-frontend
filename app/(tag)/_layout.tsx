import { Stack } from "expo-router";
import SafeScreen from "@/components/safescreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TagLayout() {
    return (
        <SafeAreaProvider>
            <SafeScreen>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="index" options={{ title: "Tag" }} />
                </Stack>
            </SafeScreen>
        </SafeAreaProvider>
    );
}