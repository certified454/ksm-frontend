import SafeScreen from "@/components/safescreen";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function MenuLayout() {
    return (
        <SafeAreaProvider>
            <SafeScreen>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="profile" />       
                    <Stack.Screen name="settings" />       
                    <Stack.Screen name="help" />       
                </Stack>
            </SafeScreen>
        </SafeAreaProvider>
    
    );
}