import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SafeScreen from "../../components/safescreen";
import { useNewPostStore } from "../../store/newPostStore";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
export default function Tabslayout() {
  const insets = useSafeAreaInsets();
  const newPostCount = useNewPostStore((state) => state.newPostCount);
  const resetNewPostCount = useNewPostStore((state) => state.resetNewPostCount);
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <SafeScreen>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                height: 60,
                alignItems: "center",
              },
              tabBarShowLabel: true,
              tabBarActiveTintColor: "#4B0082",
              tabBarInactiveTintColor: "#a1a1a1ff",
              tabBarLabelStyle: {
                fontSize: 12,
                marginTop: 4,
                fontWeight: "600",
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarBadge: newPostCount > 0 ? newPostCount : undefined,
                tabBarIcon: ({ focused }) => (
                  <Octicons
                    name={focused ? "home-fill" : "home"}
                    size={focused ? 20 : 18}
                    color={focused ? "#4B0082" : "#a1a1a1ff"}
                  />
                ),
              }}
              listeners={{
                tabPress: () => resetNewPostCount(),
              }}
            />
            <Tabs.Screen
              name="create"
              options={{
                title: "Create",
                tabBarIcon: ({ focused }) => (
                  <MaterialIcons
                    name={focused ? "add-circle" : "add-circle-outline"}
                    size={focused ? 24 : 22}
                    color={focused ? "#4B0082" : "#a1a1a1ff"}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="game"
              options={{
                title: "Game",
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={
                      focused ? "game-controller" : "game-controller-outline"
                    }
                    size={focused ? 20 : 18}
                    color={focused ? "#4B0082" : "#a1a1a1ff"}
                  />
                ),
              }}
            />
          </Tabs>
        </SafeScreen>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
