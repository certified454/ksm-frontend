import SafeScreen from "@/components/safescreen";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function NewsLayout() {
    return (
        <SafeAreaProvider>
            <SafeScreen>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="addnews" />
                    <Stack.Screen name="earnings" />
                </Stack>
            </SafeScreen>
        </SafeAreaProvider>
    );
}