import { API_URL } from "@/store/postStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, Platform, KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import styles from '../../assets/styles/team';
import { useAuthStore } from "../../store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

type Compete = {
  _id: string;
  creator: {
    id: string;
    username: string;
    profilePicture: string;
  };
  targetedUser: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  description: string;
  status: string;
  team: string;
};

type Team = {
  _id: string;
  name: string;
  owner: string;
  player: string[];
};
export default function CreateTeam() {
    const { token, user } = useAuthStore();

    const router = useRouter();
    const {competeId} = useLocalSearchParams();

    const [competition, setCompetition] = useState<Compete | null>(null);

    const [name, setName] = useState('');
    const [playerNames, setPlayerNames] = useState<{[key: string]: string}>({});
    const [submit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [targetTeam, setTargetTeam] = useState<Team | null>(null);
    const [status, setStatus] = useState(user.status || 'pending');
    
    const position = [
        {key: 'GK', label: 'GK', top: '80%', left: '45%'},
        {key: 'LB', label: 'LB', top: '62%', left: '30%'},
        {key: 'CB', label: 'CB', top: '62%', left: '65%'},
        {key: 'CM', label: 'CM', top: '40%', left: '45%'},
        {key: 'RW', label: 'RW', top: '23%', left: '80%'},
        {key: 'LW', label: 'LW', top: '23%', left: '13%'},
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
            console.log(data);
        await fetchTargetTeam();
        if (targetTeam && targetTeam._id) {
            await respondingToChallenge();
        }
        console.log("success", targetTeam);
           
            
        } catch (error) {
            console.log("failed")
        } finally {
            setSubmit(false)
        }
    };
     const fetchTargetTeam = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/team`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setTargetTeam(data.targetTeam);
        } catch (error) {
            console.error('Error fetching target team:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const getChallangeId = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/compete/${competeId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            };
            setCompetition(data.competition);
            setIsLoading(false);
            console.log(data.competition);
        } catch (error) {
            console.error('Error fetching challenge:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const respondingToChallenge = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/compete/${competeId}/respond`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: status,
                        targetTeam: targetTeam?._id
                    })
                }
            )
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Spmething went wrong')
            };
            setIsLoading(false)
        } catch (error) {
            console.error('Error responding to challenge:', error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (competeId) {
            getChallangeId();
            console.log(competeId);
        }
    }, [competeId]);

    return (
       <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.topBar} >
                        <Ionicons onPress={() => {router.back()}} name="arrow-back" size={34} color="#4B0082"/>
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
                            <TouchableOpacity onPress={() => createTeam()} disabled={!name || Object.keys(playerNames).length < position.length}>
                                <Text style={styles.buttonText}>Submit Team</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View >
                        {isLoading && targetTeam ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <TouchableOpacity onPress={() => respondingToChallenge()} style={{backgroundColor: '#4B0082', padding: 10, borderRadius: 5, marginTop: 20}}>
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>Respond to Challenge</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}