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
            borderTopWidth: 1,
            shadowColor: "#4B0082",
            shadowOpacity: 2,
            shadowRadius: 3.5,
            elevation: 5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 60,
          },
        
          tabBarShowLabel: false
          }}>
          <Tabs.Screen 
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (<Ionicons name="home"  size={30} style={{position: "absolute", top: 3}} color=
                {focused? "#4B0082" :"#000"} />)
            }}
           />
          <Tabs.Screen name="create"
            options={{
            tabBarIcon: ({focused}) => (<Ionicons name="add-circle" size={33} style={{position: "absolute", top: 3}} color={focused ? "#4B0082" : "#000"}/>)
          }} />
          <Tabs.Screen name="game"
            options={{
            tabBarIcon: ({focused}) => (<Ionicons name="game-controller" size={32} style={{position: "absolute", top: 4 }} color={focused ? "#4B0082": "#000"}/>)
          }} />
        </Tabs>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}