import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { create } from 'zustand';

interface CommentState {
    isLoading: boolean
    commentError: null | string
    addComment: (postId: string, type: 'text' | 'audio', payload: { text?: string, audioUrl?: string}, token: string) => Promise<void>;  
}

const commentStore = create<CommentState>((set) => ({
    isLoading: false,
    commentError: null,
    addComment: async (postId, type, payload, token) => {
        set({ isLoading: true, commentError: null,})

        try {
            const body = {
                postId,
                type,
                    ...(type === 'text' && { text: payload.text}),
                    ...(type === 'audio' && { audioUrl: payload.audioUrl})
            }
            const response = await fetch(
                "https://kismit-official.onrender.com/api/comment",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "Failed to add comment")
            }
            
            Alert.alert("Success", data.message)
            await AsyncStorage.setItem("addComment", JSON.stringify(data.addComment));
            await AsyncStorage.setItem("token", data.token);

            set({ isLoading: false })
        } catch (error: any) {
            console.error("Failed", error)
             set({ isLoading: false, commentError: error.message || "An unexpected error occurred." });
        }
    }
}))

export default commentStore