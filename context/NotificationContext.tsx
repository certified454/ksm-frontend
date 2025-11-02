import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationAsync';
import { Subscription } from 'expo-media-library';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
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

    const router = useRouter();

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
            const url = response.notification.request.content.data?.url;
            if (url) {
                const path = url.replace('ksm://', '/');
                router.push(path);
            }
        });
        return () => {
            if (notificationListener.current && typeof notificationListener.current.remove === 'function') {
                notificationListener.current.remove();
            }
            if (responseListener.current && typeof responseListener.current.remove === 'function') {
                responseListener.current.remove();
            }
        }
    }, []);
   
    return (
        <NotificationContext.Provider 
        value={{ expoPushToken, notification, error }} >{children}</NotificationContext.Provider>
    )
}