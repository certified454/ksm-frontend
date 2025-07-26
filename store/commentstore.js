import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { create } from 'zustand';
import { useAuthStore } from './authStore';

export const commentStore = create((set, get) => ({
    comment: null,
    isLoading: false,

    registerComment: async ({postId, type, text, audioUrl}) => {
        
        set({ isLoading: true });

        try {
            const { token } = useAuthStore.getState();

            const requestBody = {
                type,
                postId
            }
            if (type === 'text') {
                requestBody.text = text;
            } else if (type === 'audio') {
                requestBody.audioUrl = audioUrl;
            }

            const response = await fetch (
                "https://kismit-official.onrender.com/api/comment", 
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify({
                    postId,
                    type: type,
                    text: text,
                    audioUrl: audio
                }),
                })
                const data = await response.json();
                console.log("Comment API Response Data:", data);
                if(!response.ok) {
                    throw new Error(data.message || "Failed to add comment")
                }
                const successMessage = data.message || "Comment added successfully!";
                Alert.alert("Success", successMessage);
               
                console.log("comment added successfully", data.message)

                await AsyncStorage.setItem("comment", JSON.stringify(data.comment));

                return { success: true, message: successMessage, data: data };
        } catch (error) {
            set({ isLoading: false });
            return {
                success: false,
                error: error.message,
            };
        }
    }
}))