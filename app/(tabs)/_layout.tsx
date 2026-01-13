import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '../../components/safescreen';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
export default function Tabslayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Tabs screenOptions={{
          headerShown: false, 
          tabBarStyle: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 60,              
            paddingTop: 6,    
            alignItems: 'center',
          },
         
          tabBarShowLabel: false
          }}>
          <Tabs.Screen 
            name="index"
            options={{
              tabBarIcon: ({ focused }) => (
                <Octicons 
                  name={focused ? "home-fill" : "home"} 
                  size={focused ? 30 : 26}  
                  color={focused ? "#4B0082" : "#a1a1a1ff"}  
                  style={{ borderBottomWidth: focused? 2 : 0, borderBottomColor: focused? '#4B0082': 'transparent', borderRadius: 10, width: focused ? 50 : 50, height: focused ? 31 : 40, marginTop: focused ? -1 : 7, textAlign: 'center', textAlignVertical: 'center' }}
                />
              )
            }}
           />
          <Tabs.Screen name="create"
            options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons 
                name={focused? "add-circle" : "add-circle-outline"} 
                size={focused ? 40 : 32}
                color={focused ? "#4B0082" : "#a1a1a1ff"}  
                style={{ borderBottomWidth: focused? 2 : 0, borderBottomColor: focused? '#4B0082': 'transparent', borderRadius: 10, width: focused ? 50 : 50, height: focused ? 40 : 40, marginTop: focused ? -1 : 7, textAlign: 'center', textAlignVertical: 'center' }}
              />
            )
          }} />
          <Tabs.Screen name="game"
            options={{
            tabBarIcon: ({focused}) => (
              <Ionicons
                name={focused ? "game-controller" : "game-controller-outline"}
                size={focused ? 40 : 28}
                color={focused ? "#4B0082" : "#a1a1a1ff"}  
                style={{ borderBottomWidth: focused? 2 : 0, borderBottomColor: focused? '#4B0082': 'transparent', borderRadius: 10, width: focused ? 50 : 50, height: focused ? 37 : 40, marginTop: focused ? -1 : 7, textAlign: 'center', textAlignVertical: 'center' }}
              />
            )
          }} />
        </Tabs>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}