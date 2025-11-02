import { View, Text } from "react-native";

export default function tagLayout() {
    return (
        <View style={{justifyContent: 'center', alignContent: 'center', flex: 1, gap: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Tag Page</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Coming Soon</Text>
        </View>
    );
}