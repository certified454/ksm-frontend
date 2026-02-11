import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { formatVoteCount } from "../../store/util";
// import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { scale } from "@/assets/styles/responsive";
import { SafeAreaView } from "react-native-safe-area-context";
import io from "socket.io-client";
import challangeStyles from "../../assets/styles/challenge";
import Vote from "../../components/vote";

type Challenge = {
  id: string;
  title: string;
  pools: { optionText: string }[];
  startDate: Date;
  endDate: Date;
  time: Date;
  voteCount: number;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
};
type Vote = {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  challengeId: string;
  text: string;
  createdAt: string;
};

export default function ChallengeDetail() {
  const { width, height } = useWindowDimensions();
  const styles = challangeStyles(width, height);
  const { token, user } = useAuthStore();

  const [text, setText] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);

  const [challengeStatus, setChallengeStatus] = useState<string>("");
  const { challengeId } = useLocalSearchParams();
  const liveAnimation = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [expandedSections, setExpandedSections] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  // const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8384657725659992/9550281176';
  // const rewardedAd = RewardedAd.createForAdRequest(adUnitId);
  const getChallenge = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/challenge/${challengeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Failed", data);
      setChallenge({ ...data.challenge, voteCount: data.totalVotes });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchVotes = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setIsLoading(true);
      const response = await fetch(
        `${API_URL}/challenge/${challengeId}/votes?page=${pageNum}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to get Challenge");
      const uniqueVote =
        refresh || pageNum === 1
          ? data.votes
          : Array.from(
              new Set([...votes, ...data.votes].map((vote) => vote._id)),
            ).map((id) =>
              [...votes, ...data.votes].find((vote) => vote._id === id),
            );

      setVotes(uniqueVote);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);

      // Check if current user has voted
      const userHasVoted = uniqueVote.some(
        (vote: any) => vote.user._id === user.id,
      );
      setHasVoted(userHasVoted);

      setIsLoading(false);
    } catch (error) {
      console.error("Error getting Challenge:", error);
    } finally {
      if (refresh) setRefreshing(false);
      else setIsLoading(false);
    }
  };
  useEffect(() => {
    getChallenge();
    fetchVotes();
    const socket = io("https://kismit-official.onrender.com/");

    socket.on("new vote created", (newVote) => {
      setChallenge((prevChallenge) => {
        if (prevChallenge && prevChallenge.id === newVote.challengeId) {
          return {
            ...prevChallenge,
            voteCount: prevChallenge.voteCount + 1,
          };
        }
        return prevChallenge;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    let animationLoop: Animated.CompositeAnimation | null = null;
    if (challengeStatus === "Live") {
      animationLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(liveAnimation, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(liveAnimation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ]),
      );
      animationLoop.start();
    } else {
      liveAnimation.setValue(0);
    }
    return () => {
      if (animationLoop) animationLoop.stop();
    };
  }, [challengeStatus, liveAnimation]);
  useEffect(() => {
    if (challengeStatus !== "Ended" && challenge?.endDate) {
      const end = new Date(challenge.endDate);
      const now = new Date();
      if (now > end) {
        setChallengeStatus("Ended");
      }
    }
  }, [challengeStatus]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (challenge?.startDate && challenge?.time && challenge?.endDate) {
        const start = new Date(challenge.startDate);
        const time = new Date(challenge.time);
        const end = new Date(challenge.endDate);

        start.setHours(time.getHours());
        start.setMinutes(time.getMinutes());
        start.setSeconds(0);
        start.setMilliseconds(0);

        const now = new Date();

        if (now < start) {
          setChallengeStatus(
            start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        } else if (now >= start && now <= end) {
          setChallengeStatus("Live");
        } else if (now > end) {
          setChallengeStatus("Ended");
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [challenge?.startDate, challenge?.time]);
  // useEffect(() => {
  //     const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //       rewardedAd.show();
  //     });
  //     rewardedAd.load();

  //   return () => {
  //     unsubscribeLoaded();
  //   };
  // }, [rewardedAd]);

  //expand and collapse rules and requirements section
  const toogleExpand = (section: string): void => {
    if (expandedSections === section) {
      setExpandedSections(null);
    } else {
      setExpandedSections(section);
    }
  };
  const handleJoinChallenge = () => {
    if (!hasVoted && challengeStatus !== "Ended") {
      router.push({
        pathname: "/(challenge)/joinChallange",
        params: { challengeId },
      });
    }
  };
  const hanleEntriesPress = () => {
    router.push({
      pathname: "/(challenge)/entries",
      params: { challengeId },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.containers}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#4B0082" />
          ) : challenge ? (
            <View style={styles.usersMainContainer}>
              <View style={styles.userPredictContainer}>
                <TouchableOpacity
                  style={[
                    styles.press,
                    { right: scale(145, width), top: scale(10, width) },
                  ]}
                  onPress={() => router.back()}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    style={styles.arrowback}
                    color="#4B0082"
                  />
                </TouchableOpacity>
                <Text style={styles.userPredictInstrutions}>Football Quiz</Text>
                <View style={styles.liveContainer}>
                  {challengeStatus === "Live" ? (
                    <>
                      <Animated.View
                        style={{
                          width: scale(9, width),
                          height: scale(9, width),
                          borderRadius: Math.round(scale(4.5, width)),
                          marginRight: scale(3, width),
                          backgroundColor: liveAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["#4B0082", "#ff1744"],
                          }),
                        }}
                      />
                      <Text style={[styles.live, { color: "#ff1744" }]}>
                        Live
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.live}>{challengeStatus}</Text>
                  )}
                </View>
                <View style={styles.seprationLine} />
                <View style={styles.instruction}>
                  <View style={styles.trophyContainer}>
                    <View style={styles.trophyIcon}>
                      <Ionicons name="trophy" size={22} color="#d6b704" />
                    </View>
                    <Text style={styles.trophyText}>N 20,000 Cash Prize</Text>
                  </View>
                  <View style={styles.seprationLineVertical} />
                  <TouchableOpacity
                    style={styles.trophyContainer}
                    onPress={hanleEntriesPress}
                  >
                    <View style={styles.peopleIcon}>
                      <Ionicons name="people" size={22} color="#4B0082" />
                    </View>
                    <Text style={styles.trophyText}>
                      {formatVoteCount(challenge.voteCount)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    styles.joinChallange,
                    {
                      backgroundColor:
                        hasVoted || challengeStatus === "Ended"
                          ? "#ccc"
                          : styles.joinChallange.backgroundColor,
                      opacity:
                        hasVoted || challengeStatus === "Ended" ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleJoinChallenge}
                  disabled={hasVoted || challengeStatus === "Ended"}
                >
                  <Text style={styles.joinChallangeText}>
                    {challengeStatus === "Active"
                      ? "Joing Close"
                      : hasVoted
                        ? "Already Joined"
                        : challengeStatus === "Ended"
                          ? "Quiz Ended"
                          : "Join Quiz"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.userPredictContainer}>
                <Text style={styles.aboutChallengeText}>About This Quiz</Text>
                <Text style={styles.challengeTitle}>
                  Test your knowledge on football matches and predict the
                  outcomes! Join our Football Quiz and showcase your expertise
                  in the beautiful game.
                </Text>
                <View style={styles.space} />
              </View>
              <Text style={styles.rulesAndRequirements}>
                Rules & Requirements
              </Text>
              <View style={styles.userPredictContainer}>
                <TouchableOpacity
                  onPress={() => toogleExpand("participate")}
                  style={styles.expandButton}
                >
                  <View style={styles.expandButtonContent}>
                    <View style={styles.gppIcon}>
                      <MaterialIcons
                        name="gpp-good"
                        size={20}
                        color="#4c008279"
                      />
                    </View>
                    <Text style={styles.expandButtonText}>
                      How to participate
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      expandedSections === "participate"
                        ? "expand-less"
                        : "expand-more"
                    }
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
                {expandedSections === "participate" && (
                  <View style={styles.participateContainer}>
                    <Text style={styles.participate}>
                      1. Tap Join Quiz at the top of this page
                    </Text>
                    <Text style={styles.participate}>
                      2. You will be taken to the question page
                    </Text>
                    <Text style={styles.participate}>
                      3. Answer all questions correctly
                    </Text>
                    <Text style={styles.participate}>
                      4. Tap Submit to finalize your answers
                    </Text>
                    <Text style={styles.participate}>
                      5. We recommend submitting early to avoid any issues.
                    </Text>
                  </View>
                )}

                <View style={styles.seprationLine} />
                <TouchableOpacity
                  onPress={() => toogleExpand("entry")}
                  style={styles.expandButton}
                >
                  <View style={styles.expandButtonContent}>
                    <View style={styles.gppIcon}>
                      <FontAwesome6
                        name="unlock-keyhole"
                        size={15}
                        color="#4c008279"
                      />
                    </View>
                    <Text style={styles.expandButtonText}>Entry rule</Text>
                  </View>
                  <MaterialIcons
                    name={
                      expandedSections === "entry"
                        ? "keyboard-arrow-right"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                {expandedSections === "entry" && (
                  <View style={styles.participateContainer}>
                    <Text style={styles.participate}>
                      1. Only one entry per user is allowed.
                    </Text>
                    <Text style={styles.participate}>
                      2. Entries must be submitted before the Quiz go live or
                      active
                    </Text>
                    <Text style={styles.participate}>
                      3. Incomplete or invalid entries will be disqualified.
                    </Text>
                  </View>
                )}

                <View style={styles.seprationLine} />
                <TouchableOpacity
                  onPress={() => toogleExpand("close entry")}
                  style={styles.expandButton}
                >
                  <View style={styles.expandButtonContent}>
                    <View style={styles.gppIcon}>
                      <Ionicons name="time" size={20} color="#4c008279" />
                    </View>
                    <Text style={styles.expandButtonText}>
                      When entries close
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      expandedSections === "close entry"
                        ? "keyboard-arrow-right"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                {expandedSections === "close entry" && (
                  <View style={styles.participateContainer}>
                    <Text style={styles.participate}>
                      1. Entries close immediately Quiz go live
                    </Text>
                    <Text style={styles.participate}>
                      2. Late submission are authomatically locked
                    </Text>
                    <Text style={styles.participate}>
                      3. Countdown timer shows time remaining before entries
                      close
                    </Text>
                  </View>
                )}

                <View style={styles.seprationLine} />
                <TouchableOpacity
                  onPress={() => toogleExpand("winners selection")}
                  style={styles.expandButton}
                >
                  <View style={styles.expandButtonContent}>
                    <View style={styles.gppIcon}>
                      <Ionicons name="trophy" size={20} color="#4c008279" />
                    </View>
                    <Text style={styles.expandButtonText}>
                      How winners are selected
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      expandedSections === "winners selection"
                        ? "keyboard-arrow-right"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                {expandedSections === "winners selection" && (
                  <View style={styles.participateContainer}>
                    <Text style={styles.participate}>
                      1. Winners are selected based on accuracy of predictions.
                    </Text>
                    <Text style={styles.participate}>
                      2. In case of a tie, the earliest submission wins.
                    </Text>
                    <Text style={styles.participate}>
                      3. Winners will be announced within 24 hours after Quiz
                      ends.
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.rulesAndRequirements}>Prize Pool</Text>
              <View style={styles.prizePoolContainer}>
                <View style={styles.prizeAmountMainContainer}>
                  <View style={styles.capion}>
                    <Ionicons name="trophy" size={28} color="#fbff00" />
                  </View>
                  <View style={styles.prizeAmountContainer}>
                    <Text style={styles.prizeAmountText}>🥇 N 10,000</Text>
                  </View>
                </View>
                <View style={styles.space} />
                <View style={styles.prizeAmountMainContainer}>
                  <View style={styles.prizeAmountContainer}>
                    <Text style={styles.prizeAmountText}>🥈 N 7,000</Text>
                  </View>
                </View>
                <View style={styles.space} />
                <View style={styles.prizeAmountMainContainer}>
                  <View style={styles.prizeAmountContainer}>
                    <Text style={styles.prizeAmountText}>🥉 N 3,000</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
