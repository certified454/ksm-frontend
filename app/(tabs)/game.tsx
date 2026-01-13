import { API_URL } from '@/store/postStore';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styles from '../../assets/styles/game';
import { useAuthStore } from '../../store/authStore';

type Compete = {
  _id: string;
  creator: string;
  targetedUser: string;
  description: string;
  status: string;
  team: string;
};
type Team = {
  _id: string;
  name: string;
  owner:string;
  player: string[];
};
type TargetUserInfo = {
  username: string;
  profilePicture: string;
};

export default function Game() {
  const { token, user } = useAuthStore();
  const router = useRouter();
  const params = useLocalSearchParams();
  const targetedUserId = params.userId as string;

  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitCompetition, setSubmitCompetition] = useState(false);

  // Extract the targeted user ID from the route parameters
  const [targetUser, setTargetedUser] = useState<TargetUserInfo | null>(null);

  const getTargetedUser = async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/compete/target/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user');
      }
      setTargetedUser(data.targetUser);
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch user information. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const fetchMyTeam = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/team`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch team');
      };
      setUserTeam(data.userTeam);
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  const createChallenge = async (userId: string) => {
    setSubmitCompetition(true);
    try {
      const response = await fetch(`${API_URL}/compete/register`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          targetedUserObjectId: targetedUserId,
          description,
          creatorTeam: userTeam?._id
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      };
      setSubmitCompetition(false);
      Toast.show({
        type: "success",
        text1: "Challenge Created",
        text2: "Your challenge has been sent",
      });
      router.push('/(tabs)')
    } catch (error) {
      console.error(error);
    } finally {
      setDescription('');
      setSubmitCompetition(false);
    }
  }; 
  
  useEffect(() => {
    if (targetedUserId) {
      getTargetedUser(targetedUserId);
    }
  }, [targetedUserId]);

  useEffect(() => {
    fetchMyTeam();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <View style={styles.head}>
            <MaterialIcons name="arrow-back-ios" size={34} color="#4B0082" onPress={() => router.back()} />
            <Text style={styles.title}>Challenge a friend!</Text>
          </View>
              <View style={styles.header}>
              <BlurView intensity={100} style={[styles.blurContainer, { left: 0, top: 0, borderBottomRightRadius: 50 }]}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: user.profilePicture }} style={styles.profile} />
                  <Text style={styles.username}>{user.username}</Text>
                </View>
              </BlurView>
              <Text style={styles.vsText}>VS</Text>
              {targetUser ? (
                <BlurView intensity={100} style={[styles.blurContainer, { right: 0, bottom: 0, borderTopLeftRadius: 50 }]}>
                  <View style={styles.userInfo}>
                    <Image source={{ uri: targetUser.profilePicture }} style={styles.profile} />
                    <Text style={styles.username}>{targetUser.username}</Text>
                  </View>
                </BlurView>
              ): null }
              </View>
              <Text style={styles.description}>Description</Text>
              <TextInput 
                placeholder='Enter a short description'
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              
                {submitCompetition ? 
                (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <TouchableOpacity 
                      onPress={() => {createChallenge(targetedUserId)}} 
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Create Challenge</Text>
                    </TouchableOpacity>
                )}
              
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}