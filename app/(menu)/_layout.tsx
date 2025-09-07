import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../../components/safescreen";
import { StatusBar } from "expo-status-bar";


export default function MenuLayout() {
    return (
        <SafeAreaProvider>
            <SafeScreen>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="follower" />
                    <Stack.Screen name="following" />
                </Stack>
            </SafeScreen>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    
    );
}