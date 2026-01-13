import styles from "@/assets/styles/earnings";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { formatTimeFromTimeString, getDateLabel } from "@/store/util";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type Article = {
    _id: string;
    description: string;
    picture1: string;
    picture2: string;
    date: string;
    time: string;
    likesCount: number;
    unlikesCount: number;
    points: number;
    earnings: number;
};

type DailyEarning = {
    date: string;
    totalPoints: number;
    totalEarnings: number;
};

type SummaryEarnings = {
    today: DailyEarning;
    yesterday: DailyEarning;
    pastTotals: DailyEarning;
    allTime: DailyEarning;
};

export default function EarningsScreen() {
    const router = useRouter();
    const {user, token} = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching]= useState(false);
    const [refresh, setRefresh] = useState(false);

    const [balance, setBalance] = useState(0);
    const [articles, setArticles] = useState<Article[]>([]);
    const [groupedDays, setGroupedDays] = useState<Array<{
        date: string;
        label: string;
        totalEarnings: number;
        totalPoints?: number;
        items: Article[];
    }>>([]);
    const [summary, setSummary] = useState<SummaryEarnings | null>(null);
    const [earningByDay, setEarningByDay] = useState<DailyEarning[]>([]);

    const fetchEarnings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/news/dashboard/earnings`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if(!response) {
                Toast.show({
                    type: 'error',
                    text1: 'Error fetching earnings',
                    text2: 'Please try again later.'
                });
                setLoading(false);
                return;
            };

            setBalance(data.balance);
            setArticles(data.articles);
            setSummary(data.summary);
            setEarningByDay(data.earningByDay);

            // Group articles by date and compute per-day totals
            const groupsMap: Record<string, { items: Article[]; totalEarnings: number; totalPoints?: number }> = {};
            (data.articles || []).forEach((a: Article) => {
                const key = a.date; // backend provides yyyy-mm-dd in `date`
                if (!groupsMap[key]) groupsMap[key] = { items: [], totalEarnings: 0 };
                groupsMap[key].items.push(a);
                groupsMap[key].totalEarnings += Number(a.earnings || 0);
            });

            const grouped = Object.keys(groupsMap)
                .sort((a, b) => (a < b ? 1 : -1)) // newest first
                .map(dateKey => ({
                    date: dateKey,
                    label: getDateLabel(dateKey),
                    totalEarnings: Number(groupsMap[dateKey].totalEarnings.toFixed(2)),
                    items: groupsMap[dateKey].items,
                }));

            setGroupedDays(grouped);
             setLoading(false);
        } catch (error) {
            console.error('Error fetching earnings:', error);
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Error fetching earnings',
                text2: 'Please try again later.'
            });
        } finally {
            setLoading(false);
            setRefresh(false);
        }
    }
    
    useEffect(() => {
        fetchEarnings();
    }, []);
    
    const renderDay = ({ item }: { item: { date: string; label: string; totalEarnings: number; items: Article[] } }) => (
        <View style={styles.articleItem}>
            <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>Total: ${item.totalEarnings.toFixed(2)}</Text>
                <View style={styles.summaryLabel}>
                    <Text style={styles.summaryLabelText}>{item.label}</Text>
                </View>
            </View>

            <View style={styles.articleContainer}>
                <Text style={styles.summaryFrame}>Date</Text>
                <Text style={styles.summaryFrame}>Time</Text>
                <Text style={styles.summaryFrame}>Amount</Text>
            </View>

            {item.items.map((a) => (
                <View key={a._id} style={[styles.articleContainer, { paddingVertical: 8 }]}>
                    <Text style={styles.summaryFrame}>{getDateLabel(a.date) === a.date ? a.date : getDateLabel(a.date)}</Text>
                    <Text style={styles.summaryFrame}>{formatTimeFromTimeString(a.time, a.date)}</Text>
                    <Text style={styles.summaryFrame}>${Number(a.earnings).toFixed(2)}</Text>
                </View>
            ))}
        </View>
    );
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 320}}  />
                ): (
                    <View style={styles.container}>
                        <View style={styles.earningsContainer}>
                            <TouchableOpacity style={styles.dashboard}>
                                <MaterialIcons name="space-dashboard" size={25} color="#4B0082" />
                                <Text style={styles.earningText}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.earningBox} onPress={() => router.back()}>
                                <MaterialCommunityIcons name="close" size={25} color="#4B0082" />
                            </TouchableOpacity >
                        </View>

                        <View style={styles.balanceContainer}>
                            <TouchableOpacity style={styles.dashboard}>
                                <Text style={styles.earningText}>Balance: </Text>
                                <Text style={styles.balanceText}>${balance.toFixed(2)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.withdraw} onPress={() => router.back()}>
                                <Text style={styles.withdrawText}>Withdraw</Text>
                            </TouchableOpacity >
                        </View>

                        <View style={styles.flatlistItem}>
                            <FlatList
                                data={groupedDays}
                                renderItem={renderDay}
                                keyExtractor={(d) => d.date}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refresh}
                                        onRefresh={() => {
                                            setRefresh(true);
                                            fetchEarnings();
                                        }}
                                    />
                                }
                            />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
     );
 }
