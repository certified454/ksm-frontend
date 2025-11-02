import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type Compete = {
  id: string;
  creator: {
    id: string;
    username: string;
    profilePicture: string;
  };
  targetedUser: {
    id: string;
    username: string;
    profilePicture: string;
  };
  description: string;
  status: string;
  team: string;
};

export default function tagLayout() {
    const router = useRouter();
    const {token, user} = useAuthStore();

    //variables to update a challenge
  
    
    
    return (
        <View style={{justifyContent: 'center', alignContent: 'center', flex: 1, gap: 10, alignItems: 'center'}}>
            <Text>Respond to Challenge</Text>
        </View>
    );
}