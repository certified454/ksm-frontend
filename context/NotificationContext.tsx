import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationAsync';
import { Subscription } from 'expo-media-library';
import * as Notifications from 'expo-notifications';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

interface NotificationContextType{
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null
};

const NotificationContext =  createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);

    const notificationListener = useRef<Subscription | null>(null);
    const responseListener = useRef<Subscription | null>(null);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            if (typeof token === 'string') {
                setExpoPushToken(token);
            } else {
                setExpoPushToken(null);
            }
        });
        
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification)
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        
        });
        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        }
    }, []);
   
    return (
        <NotificationContext.Provider 
        value={{ expoPushToken, notification, error }} >{children}</NotificationContext.Provider>
    )
}