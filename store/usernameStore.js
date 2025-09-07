import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export const usernameStore = create((set, get) => ({
    username: null,

    fetchUsername: async () => {
        try {
            const userData = await AsyncStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                set({ username: user.username });
                return user.username;
            }
        } catch (error) {
            
        }
    }
}))