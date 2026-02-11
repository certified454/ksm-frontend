import TimePickerModal from "@/components/setTime";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import io from "socket.io-client";
import challangeStyles from "../../assets/styles/challenge";
import { calculateTimeRemaining, formatDateRange } from "../../store/util";

interface User {
  _id: string;
  username: string;
  profilePicture?: string;
}

interface Pool {
  optionText: string;
}

interface Challenge {
  _id: string;
  profilePicture: string;
  user: User;
  leagueImage: string;
  title: string;
  description: string;
  createdAt: string;
  questions: any[];
  startDate: Date;
  isChallengeActive: boolean;
  endDate: Date;
  voteCount: number;
  time: Date;
}

function isChallengeActive(
  startDate: Date | string,
  endDate: Date | string,
): "upcoming" | "active" | "ended" {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "active";
}

export default function Challenge() {
  const { width, height } = useWindowDimensions();
  const styles = challangeStyles(width, height);
  const [modalVisible, setModalVisible] = useState(false);

  //start date and end date variables
  const [time, setTime] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showTime, setShowTime] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  //challenge details variables
  const [leagueImage, setLeagueImage] = useState<any>(null);
  const [leagueImageBase64, setLeagueImageBase64] = useState<string | null>(
    null,
  );

  const [questions, setQuestions] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [checkBox, setCheckBox] = useState<{ option: string; value: string }[]>(
    [],
  );
  const [optionText, setOptionText] = useState("");
  const [optionValue, setOptionValue] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefreshing] = useState(false);

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { challengeId } = useLocalSearchParams();

  //loading variables
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuthStore();
  const [expandedSections, setExpandedSections] = useState<{
    upcoming: boolean;
    active: boolean;
    ended: boolean;
  }>({
    upcoming: false,
    active: false,
    ended: false,
  });
  // force re-render every minute so countdown text updates as time passes
  const [, setNowTick] = useState(0);

  const pickLeagueImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Permission to access media library is required!",
          );
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
          base64: true,
        });
        if (!result.canceled && result.assets && result.assets.length > 0) {
          const selectedAsset = result.assets[0];
          setLeagueImage(selectedAsset);
          if (selectedAsset.base64) {
            const mimeType = selectedAsset.mimeType || "image/jpeg";
            setLeagueImageBase64(
              `data:${mimeType};base64,${selectedAsset.base64}`,
            );
          } else {
            Toast.show({
              type: "error",
              text1: "Image Error",
              text2:
                "Could not process image. Please try selecting another image.",
            });
          }
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error picking image",
        text2: "An error occurred while picking the image. Please try again.",
      });
    }
  };
  const timePicker = (event: any, selectedTime?: Date) => {
    setShowTime(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  const startDatePicker = (event: any, selectedTime?: Date) => {
    setShowStartDate(false);
    if (selectedTime) {
      setStartDate(selectedTime);
    }
  };
  const endDatePicker = (evenet: any, selectedTime?: Date) => {
    setShowEndDate(false);
    if (selectedTime) {
      setEndDate(selectedTime);
    }
  };
  const onTimePickerOpen = () => {
    setModalVisible(true);
  };
  const onTimePickerClose = () => {
    setModalVisible(false);
  };
  const handleChallengePress = async (id: string) => {
    router.push({
      pathname: "/(challenge)/challengedetails",
      params: { challengeId: id },
    });
  };
  const addOption = () => {
    if (!optionText || !optionValue) return;
    setCheckBox([...checkBox, { option: optionText, value: optionValue }]);
    setOptionText("");
    setOptionValue("");
  };

  const addQuestion = () => {
    if (!text || checkBox.length < 2) {
      Toast.show({
        type: "error",
        text1: "Invalid Question",
        text2: "Each question needs text and at least 2 options.",
      });
      return;
    }
    setQuestions([...questions, { text, checkBox }]);
    setText("");
    setCheckBox([]);
  };
  const createChallenge = async () => {
    setIsUploading(true);
    try {
      // Validate all required fields
      if (!title || !description) {
        throw new Error("Title and description are required");
      }
      if (!questions || questions.length === 0) {
        throw new Error("At least one question is required");
      }
      if (startDate >= endDate) {
        throw new Error("End date must be after start date");
      }
      // Ensure leagueImage exists before accessing uri
      if (!leagueImage || !leagueImage.uri) {
        throw new Error("League image is required");
      }

      const uriParts = leagueImage.uri.split(".");
      const fileExtension = uriParts[uriParts.length - 1];
      const fileType = fileExtension
        ? `image/${fileExtension.toLowerCase()}`
        : `image/jpg`;

      // Use leagueImageBase64 directly if already prefixed with data URI
      const fileDataUrl = `data:${fileType};base64,${leagueImage.base64}`;

      const response = await fetch(`${API_URL}/challenge/register`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueImage: fileDataUrl,
          title,
          description,
          questions,
          time: time.toISOString(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || `Failed to create challenge: ${response.status}`,
        );

      router.push({ pathname: "/(challenge)" });
      console.log("Success: ", data.message);

      if (data.challenges && Array.isArray(data.challenges)) {
        setChallenges(data.challenges);
      }
      setLeagueImageBase64(null);
      setDescription("");
      setTitle("");
      setEndDate(new Date());
      setStartDate(new Date());
      setQuestions([]);
      setTime(new Date());

      Toast.show({
        type: "success",
        text1: "Challenge Created",
        text2: "Your challenge has been created successfully.",
      });
    } catch (error) {
      console.error("Create Challenge Error:", error);
      Toast.show({
        type: "error",
        text1: "Create Challenge Failed",
        text2:
          error instanceof Error
            ? error.message
            : "An error occurred while creating the challenge. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };
  const handleprofilePicturePress = async (id: string) => {
    router.push({ pathname: "/(profile)", params: { userId: id } });
  };
  const fetchChallenge = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setIsLoading(true);
      const response = await fetch(
        `${API_URL}/challenge/all?page=${pageNum}&limit=20`,
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
      const uniqueChallenge =
        refresh || pageNum === 1
          ? data.challenges || []
          : Array.from(
              new Set(
                [...(challenges || []), ...(data.challenges || [])].map(
                  (challenge) => challenge._id,
                ),
              ),
            ).map((id) =>
              [...(challenges || []), ...(data.challenges || [])].find(
                (challenge) => challenge._id === id,
              ),
            );

      setChallenges(uniqueChallenge || []);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting Challenge:", error);
    } finally {
      if (refresh) setRefreshing(false);
      else setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchChallenge();
    const socket = io("https://kismit-official.onrender.com/");

    socket.on("new challenge created", (newChallenge) => {
      if (newChallenge && Array.isArray(newChallenge)) {
        setChallenges(newChallenge);
      }
    });
    // socket.on('new vote created', (newVote) => {
    //     setVotechallenge(newVote)
    // });
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => t + 1), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  const renderChallenge = ({ item }: { item: Challenge }) => {
    return (
      <View style={styles.challengeItems}>
        <View style={styles.challengeDetailsContainer}>
          <View style={styles.challengeDetails}>
            <View style={styles.challengeFee}>
              <Text style={styles.freeEntryText}>Free entry</Text>
            </View>
            <View style={styles.creator}>
              <View style={styles.leageImage}>
                <Image
                  source={{ uri: item.leagueImage }}
                  style={styles.profilePicture}
                />
              </View>
              <View style={styles.challengeTextContainer}>
                <Text style={styles.adminText}>{item.title}</Text>
                <Text style={styles.detailText}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.challengeitem}>
              <View
                style={[
                  styles.challengeStatus,
                  isChallengeActive(item.startDate, item.endDate) === "active"
                    ? styles.activeChallenge
                    : isChallengeActive(item.startDate, item.endDate) ===
                        "ended"
                      ? styles.endedChallenge
                      : styles.upcomingChallenge,
                ]}
              >
                {isChallengeActive(item.startDate, item.endDate) ===
                  "active" && <Ionicons name="flame" size={14} color="green" />}
                {isChallengeActive(item.startDate, item.endDate) ===
                  "ended" && (
                  <Ionicons name="time-outline" size={14} color="red" />
                )}
                {isChallengeActive(item.startDate, item.endDate) ===
                  "upcoming" && (
                  <Ionicons name="calendar" size={14} color="#4B0082" />
                )}
                <Text
                  style={[
                    isChallengeActive(item.startDate, item.endDate) === "active"
                      ? styles.textActiveChallenge
                      : isChallengeActive(item.startDate, item.endDate) ===
                          "ended"
                        ? styles.textEndedChallenge
                        : styles.textUpcomingChallenge,
                  ]}
                >
                  {isChallengeActive(item.startDate, item.endDate) === "active"
                    ? "Active"
                    : isChallengeActive(item.startDate, item.endDate) ===
                        "ended"
                      ? "Ended"
                      : "Upcoming"}
                </Text>
              </View>
              <Text style={styles.challengeTime}>
                {isChallengeActive(item.startDate, item.endDate) === "active"
                  ? "Ends in: " +
                    calculateTimeRemaining(item.startDate, item.endDate)
                  : isChallengeActive(item.startDate, item.endDate) ===
                      "upcoming"
                    ? "Starts in: " +
                      calculateTimeRemaining(item.startDate, item.endDate)
                    : formatDateRange(item.startDate, item.endDate)}
              </Text>
            </View>

            <View style={styles.seprationLine}></View>
            <TouchableOpacity
              onPress={() => handleChallengePress(item._id)}
              style={[
                styles.checkItOutButton,
                {
                  backgroundColor:
                    isChallengeActive(item.startDate, item.endDate) === "ended"
                      ? "transparent"
                      : "#4B0082",
                },
              ]}
            >
              <Text
                style={[
                  styles.checkItOutText,
                  {
                    color:
                      isChallengeActive(item.startDate, item.endDate) ===
                      "ended"
                        ? "#4b0082"
                        : "#fff",
                  },
                ]}
              >
                {isChallengeActive(item.startDate, item.endDate) === "ended"
                  ? "View Results"
                  : "View Quiz"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderChallengeSection = (
    data: Challenge[],
    status: "upcoming" | "active" | "ended",
  ) => {
    if (data.length === 0) return null;

    const isExpanded = expandedSections[status];
    const displayData = isExpanded ? data : data.slice(0, 1);

    return (
      <View key={status}>
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sectionHeaderStyles}
        >
          <FlatList
            data={displayData}
            renderItem={renderChallenge}
            keyExtractor={(item: Challenge) => item._id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    );
  };
  const renderQuestion = ({ item }: { item: any }) => (
    <View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.text}</Text>
        <View style={styles.optionsContainer}>
          {item.checkBox.map((opt: any, idx: number) => (
            <View key={idx} style={styles.optionItem}>
              <Text style={styles.optionText}>
                {opt.option}. {opt.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size={"large"} color={"#4B0082"} />
          ) : (
            <>
              {user.isOwner ? (
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.userInfo}
                    onPress={() => handleprofilePicturePress(user.id)}
                  >
                    <Image
                      source={{ uri: user.profilePicture }}
                      style={styles.profilePicture}
                    />
                    <Text style={styles.username}>{user.username}</Text>
                  </TouchableOpacity>
                  <BlurView tint="light" intensity={50} style={styles.create}>
                    <TouchableOpacity onPress={() => onTimePickerOpen()}>
                      <Ionicons
                        name="add-circle-outline"
                        size={40}
                        color="#4B0082"
                      />
                    </TouchableOpacity>
                  </BlurView>
                </View>
              ) : (
                <>
                  <View style={styles.userHeader}>
                    <TouchableOpacity
                      onPress={() => router.back()}
                      style={styles.backButton}
                    >
                      <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color="#4B0082"
                      />
                      <Text style={styles.dontMissOutText}>
                        Don't miss out on the fun!
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.userInfos}>
                      <TouchableOpacity
                        style={styles.userInfo}
                        onPress={() => handleprofilePicturePress(user.id)}
                      >
                        <Image
                          source={{ uri: user.profilePicture }}
                          style={styles.profilePicture}
                        />
                      </TouchableOpacity>
                      <Text style={styles.username}>{user.username}</Text>
                    </View>
                  </View>
                </>
              )}
              <View style={styles.challengeList}>
                <TouchableOpacity
                  onPress={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      upcoming: !prev.upcoming,
                    }))
                  }
                  style={styles.sectionHeaderContainer}
                >
                  <Text style={styles.sectionHeader}>Upcoming Quiz</Text>
                  <Text style={styles.sectionHeaderMore}>
                    See {expandedSections.upcoming ? "Less" : "More"}
                  </Text>
                </TouchableOpacity>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refresh}
                      onRefresh={() => fetchChallenge(1, true)}
                    />
                  }
                  contentContainerStyle={styles.sectionHeaderStyle}
                >
                  {renderChallengeSection(
                    (challenges || []).filter(
                      (c) =>
                        isChallengeActive(c.startDate, c.endDate) ===
                        "upcoming",
                    ),
                    "upcoming",
                  )}
                </ScrollView>
                <TouchableOpacity
                  onPress={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      active: !prev.active,
                    }))
                  }
                  style={styles.sectionHeaderContainer}
                >
                  <Text style={styles.sectionHeader}>Ongoing Quiz</Text>
                  <Text style={styles.sectionHeaderMore}>
                    {" "}
                    See {expandedSections.active ? "Less" : "More"}
                  </Text>
                </TouchableOpacity>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refresh}
                      onRefresh={() => fetchChallenge(1, true)}
                    />
                  }
                  contentContainerStyle={styles.sectionHeaderStyle}
                >
                  {renderChallengeSection(
                    (challenges || []).filter(
                      (c) =>
                        isChallengeActive(c.startDate, c.endDate) === "active",
                    ),
                    "active",
                  )}
                </ScrollView>
                <TouchableOpacity
                  onPress={() =>
                    setExpandedSections((prev) => ({
                      ...prev,
                      ended: !prev.ended,
                    }))
                  }
                  style={styles.sectionHeaderContainer}
                >
                  <Text style={styles.sectionHeader}>Past Quiz</Text>
                  <Text style={styles.sectionHeaderMore}>
                    {" "}
                    See {expandedSections.ended ? "Less" : "More"}
                  </Text>
                </TouchableOpacity>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refresh}
                      onRefresh={() => fetchChallenge(1, true)}
                    />
                  }
                  contentContainerStyle={styles.sectionHeaderStyle}
                >
                  {renderChallengeSection(
                    (challenges || []).filter(
                      (c) =>
                        isChallengeActive(c.startDate, c.endDate) === "ended",
                    ),
                    "ended",
                  )}
                </ScrollView>
              </View>
            </>
          )}

          <TimePickerModal isVisible={modalVisible} onClose={onTimePickerClose}>
            <ScrollView
              style={styles.createChallengeContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.addLeagueImageText}>Add league image</Text>
              <TouchableOpacity
                onPress={pickLeagueImage}
                style={styles.leagueImagePicker}
              >
                {leagueImageBase64 ? (
                  <Image
                    source={{ uri: leagueImageBase64 }}
                    style={styles.leagueImage}
                  />
                ) : (
                  <Ionicons name="camera" size={30} color={"#4B0082"} />
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="*Title"
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                placeholder="*Description"
                style={[styles.textInputs, { marginTop: 40 }]}
                value={description}
                onChangeText={setDescription}
                editable={!isUploading}
                multiline
              />
              <TextInput
                placeholder="*Enter question text"
                value={text}
                onChangeText={setText}
                editable={!isUploading}
                style={styles.textInputs}
                multiline
              />
              <View style={styles.optionContainer}>
                <TextInput
                  placeholder="*Option"
                  value={optionText}
                  onChangeText={setOptionText}
                  style={styles.textOption}
                />

                <TextInput
                  placeholder="*Value"
                  value={optionValue}
                  onChangeText={setOptionValue}
                  style={styles.textValue}
                  multiline
                />
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={addOption} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Option</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={addQuestion}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Save Question</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateTimeContainer}>
                <TouchableOpacity
                  onPress={() => setShowStartDate(true)}
                  style={styles.inputContainerDate}
                >
                  <View style={styles.gppIcon}>
                    <Ionicons
                      name="calendar-number-sharp"
                      size={20}
                      color="#4B0082"
                    />
                  </View>
                  <Text style={styles.dateText}>
                    {startDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowEndDate(true)}
                  style={styles.inputContainerDate}
                >
                  <View style={styles.gppIcon}>
                    <Ionicons
                      name="calendar-number-sharp"
                      size={20}
                      color="#4B0082"
                    />
                  </View>
                  <Text style={styles.dateText}>
                    {endDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowTime(true)}
                  style={styles.inputContainerDate}
                >
                  <View style={styles.gppIcon}>
                    <Ionicons name="time" size={20} color="#4B0082" />
                  </View>
                  <Text style={styles.dateText}>
                    {time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>
              </View>

              {showStartDate && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={startDatePicker}
                />
              )}
              {showEndDate && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={endDatePicker}
                />
              )}
              {showTime && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={timePicker}
                />
              )}
              <View style={styles.seprationLine} />
              {checkBox.map((opt, idx) => (
                <Text key={idx} style={styles.optionText}>
                  ({opt.option}) {opt.value}
                </Text>
              ))}
              <FlatList
                data={questions}
                keyExtractor={(item) => item._id || item.text}
                renderItem={renderQuestion}
                contentContainerStyle={styles.questionContainer}
              />
              {isUploading ? (
                <ActivityIndicator size="large" color="#4B0082" />
              ) : (
                <TouchableOpacity
                  onPress={createChallenge}
                  style={styles.createChallengeButton}
                >
                  <Text style={styles.createChallengeText}>Create Quiz</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </TimePickerModal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
