import { API_URL } from "@/store/postStore";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../../assets/styles/team';
import { useAuthStore } from "../../store/authStore";
// import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

export default function CreateTeam() {
    // const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8384657725659992/9550281176';
    // const rewardedAd = RewardedAd.createForAdRequest(adUnitId);
    const { token, user } = useAuthStore();
    const router = useRouter();
    const params = useLocalSearchParams();
    const userId = params.userId as string;

    const [name, setName] = useState('');
    const [playerNames, setPlayerNames] = useState<{[key: string]: string}>({});
    const [submit, setSubmit] = useState(false);
    
    const position = [
        {key: 'GK', label: 'GK', top: '80%', left: '45%'},
        {key: 'LB', label: 'LB', top: '62%', left: '27%'},
        {key: 'CB', label: 'CB', top: '62%', left: '70%'},
        {key: 'CM', label: 'CM', top: '42%', left: '45%'},
        {key: 'RW', label: 'RW', top: '23%', left: '75%'},
        {key: 'LW', label: 'LW', top: '23%', left: '16%'},
        {key: 'ST', label: 'ST', top: '8%', left: '45%'},

    ]
   
    const createTeam = async () => {
        try {
            const players = position.map((pos) => ({
                name: playerNames[pos.key] || 'Unnamed',
                position: pos.key
            }))
            setSubmit(true)
            const response = await fetch(`${API_URL}/team/register`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    players
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error ("Failed")
            }
            router.replace({pathname: '/(tabs)/game', params: { userId, myTeam: data.team._id }});
            
        } catch (error) {
            console.log("failed")
        } finally {
            setSubmit(false)
        }
    };
    const handleRequestChallenge = (userId: string) => {
        router.push({pathname: '/(tabs)/game', params: { userId }});
    };
    // useEffect(() => {
    //         const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
    //           rewardedAd.show();
    //         });
    //         rewardedAd.load();
        
    //       return () => {
    //         unsubscribeLoaded();
    //       };
    // }, [rewardedAd]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.topBar} >
                        <MaterialIcons onPress={() => {router.back()}} name="arrow-back-ios" size={34} color="#4B0082"/>
                        <Text style={styles.title}>Create your fantasy team</Text>
                    </View>
                    <TextInput
                        style={styles.teamNameInput}
                        placeholder="Enter team name"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={styles.fieldsContainer}>
                        <View style={styles.field}>
                            <View style={styles.fieldCarpet}>
                                {[...Array(8)].map((_, i) => (
                                    <View
                                    key={i}
                                    style={{
                                        flex: 1,
                                        backgroundColor: i % 2 === 0 ? '#4CAF50' : '#388E3C',
                                        width: '100%',
                                    }}
                                    />
                                ))}
                                <View style={styles.goalArea}>
                                    <View style={styles.goalBox}>
                                        <View style={styles.goalMouth}></View>
                                        
                                    </View>
                                </View>
                                
                            </View>
                            {position.map((pos) => (
                                <View
                                    key={pos.key}
                                    style={{ position: 'absolute', top: pos.top as any, left: pos.left as any, width: 40, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 5 }}>
                                    <Text style={styles.playerLabel}>{pos.label}</Text>
                                    <TextInput 
                                        placeholder="Player Name"
                                        value={playerNames[pos.key] || ''}
                                        onChangeText={(text) => setPlayerNames((prev) => ({...prev, [pos.key]: text}))}
                                        style={styles.playerInput}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.handle1}>

                    </View>
                    <View style={styles.handle2}>

                    </View>
                    <View style={styles.button}>
                        {submit ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <TouchableOpacity onPress={() => {createTeam(), handleRequestChallenge(user._id)}}>
                                <Text style={styles.buttonText}>Submit Team</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}