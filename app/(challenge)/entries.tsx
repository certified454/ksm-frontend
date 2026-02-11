import { KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//leaderboard page for a challenge, showing the entries and their scores
export default function ChallengeEntries() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Challenge Entries will be displayed here.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
