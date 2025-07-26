import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const userProfilePictureStore = create((set, get) => ({
    profilePicture: null,
    
    fetchProfilePicture: async () => {
        try {
            const userData = await AsyncStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                set({ profilePicture: user.profilePicture });
                return user.profilePicture;
            }
            set({ profilePicture: "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf"})
            return "https://api.dicebear.com/9.x/miniavs/svg?seed=George&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,ffdfbf";
        } catch (error) {
            
        }
    }
}))