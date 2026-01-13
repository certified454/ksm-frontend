import { useAuthStore } from '@/store/authStore';
import { API_URL } from '@/store/postStore';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styles from '../../assets/styles/contest';

export default function ContestIndex() {
    const router = useRouter();
    const {token, user} = useAuthStore();

    const [description, setDescription] = useState(" ");
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const pickVideoFunction = async () => {
        try {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', " You have to allow this app to access you camera rol");
                    return;
                }
            };
            const videoResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'videos',
                allowsEditing: true,
                quality: 1,
                allowsMultipleSelection: false,
                aspect: [16, 9],
                base64: true,
            });
            if (!videoResult.canceled && videoResult && videoResult.assets.length > 0) {
                const selectedVideo = videoResult.assets[0];
                setVideoUri(selectedVideo.uri);
            } else {
                return;
            }
        } catch (error) {
            
        }
    }
    const pickAudioFunction = async () => {
        try {
          const audioResult = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
            
          });
            if (!audioResult.canceled && audioResult.assets && audioResult.assets.length > 0) {
                setAudioUrl(audioResult.assets[0].uri);
            } else {
                return;
            }
        } catch (error) {  
            console.log("Error picking audio file:", error);

        }
    }
    const submitContest = async () => {
        const formData = new FormData();
        
        if (videoUri) formData.append('video', { uri: videoUri, name: 'contest.mp4', type: 'video/mp4' } as any);
        if (audioUrl) formData.append('audio', { uri: audioUrl, name: 'contest.mp3', type: 'audio/mpeg' } as any);
        formData.append('description', description);

        try {
            const response = await fetch(`${API_URL}/contest/contest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
                        if (!response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Contest submission successful!',
                    position: 'bottom'
                });
                setDescription(" ");
                setVideoUri(null);
                setAudioUrl(null);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Contest submission failed!',
                    position: 'bottom'
                }); 
            }

        } catch (error) {
            console.log("Error submitting contest:", error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text>Contest Form</Text>
                <TextInput
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                style={{ borderWidth: 1, marginVertical: 10 }}
                />
                <Pressable onPress={pickVideoFunction}>
                <Text>Choose Video</Text>
                </Pressable>
                <Pressable onPress={pickAudioFunction}>
                <Text>Choose Audio</Text>
                </Pressable>
                <Pressable onPress={submitContest}>
                <Text>Submit Contest</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

