import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync("default", {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250, 250],
        lightColor: '#f0f0f0'
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if(existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if ( finalStatus !== 'granted') {
        throw new Error('Permission not granted to get push notifications on this device!');
    }
    const projectId = 
        Constants?.expoConfig?.extra?.eas?.projectId ?? 
        Constants?.easConfig?.projectId;
    if (!projectId) {
        throw new Error('Project ID not found')
    };
    try {
        const pushToken = (await Notifications.getExpoPushTokenAsync({projectId})).data;
        console.log(pushToken);
        return pushToken;
    } catch (error) {
        console.error('Error getting push token:', error);
    }
  } else {
    throw new Error('Must use physical device for Push Notifications');
  }
}
