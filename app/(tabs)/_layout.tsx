import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '../../components/safescreen';

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Tabslayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Tabs screenOptions={{
          headerShown: false, 
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            shadowColor: "#4B0082",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.75,
            shadowRadius: 3.5,
            elevation: 5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
            bottom: 2.5,
            height: 60,
          },
          tabBarActiveTintColor: "#f2f2f2",
          tabBarShowLabel: false
          }}>
          <Tabs.Screen 
            name="index"
            options={{
              tabBarBadge: 3,
              tabBarIcon: ({ focused }) => (<Ionicons name="home"  size={30} style={{position: "absolute", top: 3}} color=
                {focused? "#4B0082" :"#000"} />)
            }}
           />
          <Tabs.Screen name="create"
            options={{
            tabBarIcon: ({focused}) => (<Ionicons name="add-circle" size={33} style={{position: "absolute", top: 3}} color={focused ? "#4B0082" : "#000"}/>)
          }} />
          <Tabs.Screen name="profile"
            options={{
            tabBarIcon: ({focused}) => (<Ionicons name="game-controller" size={32} style={{position: "absolute", top: 4 }} color={focused ? "#4B0082": "#000"}/>)
          }} />
        </Tabs>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}