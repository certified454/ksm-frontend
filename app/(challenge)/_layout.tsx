import SafeScreen from "@/components/safescreen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ChallengeLayout() {
    return (
        <SafeAreaProvider>
            <SafeScreen>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="challengedetails" />
                    </Stack>
                </KeyboardAvoidingView>
            </SafeScreen>
            <StatusBar style="dark" />
        </SafeAreaProvider>
    );
}
