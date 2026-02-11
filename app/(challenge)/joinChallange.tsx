import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/store/postStore";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import challangeStyles from "../../assets/styles/challenge";

interface CheckBoxOption {
  option: string;
  value: string;
}

interface Question {
  _id: string;
  text: string;
  checkBox: CheckBoxOption[];
}

interface Challenge {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  time: string;
  endDate: string;
  questions: Question[];
}

interface ChallengeResponse {
  populatedChallenge?: Challenge;
  challenge?: Challenge;
  message?: string;
}

interface AnswersMap {
  [key: string]: string | null;
}

interface VoteSubmissionResponse {
  message?: string;
}

type VotingStatus =
  | "loading"
  | "submitting-open"
  | "submitting-closed"
  | "quiz-started"
  | "quiz-ended"
  | "already-answered";

export default function JoinChallenge() {
  const { challengeId } = useLocalSearchParams();
  const { token } = useAuthStore();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const styles = challangeStyles(width, height);

  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [questions, setQuestions] = useState<
    { text: string; checkBox: { option: string; value: string }[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [votingStatus, setVotingStatus] = useState<VotingStatus>("loading");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isVotingAllowed = votingStatus === "submitting-open";
  const isSubmitDisabled = !isVotingAllowed || submitting || loading;

  const handleSelectAnswer = (questionId: string, optionValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === optionValue ? null : optionValue,
    }));
  };

  const checkVotingStatus = (challengeData: Challenge): VotingStatus => {
    const now = new Date();
    const startDate = new Date(challengeData.startDate);
    const endDate = new Date(challengeData.endDate);
    const challengeTime = new Date(challengeData.time);

    // Set the time on the start date
    startDate.setHours(challengeTime.getHours());
    startDate.setMinutes(challengeTime.getMinutes());
    startDate.setSeconds(0);

    if (now >= startDate) {
      return "quiz-started";
    }

    if (now >= new Date(endDate)) {
      return "quiz-ended";
    }

    return "submitting-open";
  };

  const fetchChallenge = async (id: string | undefined) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/challenge/${id}`, {
        method: "GET",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });
      const data = await res.json();
      // Handle different response structures
      const challengeData = data.populatedChallenge || data.challenge || data;

      if (res.ok && challengeData && challengeData._id) {
        setChallenge(challengeData);
        setQuestions(challengeData.questions || []);

        // Initialize answers map
        const init: Record<string, null> = {};
        (challengeData.questions || []).forEach((q: any, idx: number) => {
          init[`q${idx + 1}`] = null;
        });
        setAnswers(init);

        // Check voting status
        const status = checkVotingStatus(challengeData);
        setVotingStatus(status);
      } else {
        setErrorMessage(data.message || "Challenge not found");
        setVotingStatus("submitting-closed");
      }
    } catch (err) {
      setErrorMessage("Failed to load challenge");
      setVotingStatus("submitting-closed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge(challengeId as string | undefined);
  }, [challengeId]);

  const handleSubmitAnswers = async () => {
    const unanswered = questions.filter(
      (_, idx) => answers[`q${idx + 1}`] === null,
    );

    if (unanswered.length > 0) {
      Toast.show({
        type: "error",
        text1: "Incomplete",
        text2: `Please answer all questions before submitting. (${unanswered.length} remaining)`,
      });
      return;
    }

    setSubmitting(true);
    try {
      // Transform answers to include the 'option' field required by backend
      const transformedAnswers = Object.entries(answers).reduce(
        (acc, [key, value]) => {
          acc[key] = { option: value };
          return acc;
        },
        {} as Record<string, { option: string | null }>,
      );

      const payload = { answers: transformedAnswers };

      const response = await fetch(`${API_URL}/challenge/${challengeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message || "Your answers have been submitted!",
        });
        // Reset answers
        const init: Record<string, null> = {};
        questions.forEach((_, idx) => {
          init[`q${idx + 1}`] = null;
        });
        setAnswers(init);
        setVotingStatus("already-answered");
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            data.message || `Failed to submit answers (${response.status})`,
        });
      }
    } catch (err) {
      console.error("Submit error details:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          err instanceof Error
            ? err.message
            : "Network error while submitting answers",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusMessage = () => {
    switch (votingStatus) {
      case "loading":
        return "Loading quiz...";
      case "submitting-open":
        return "✓ Submission is open! Start Submitting your answers before the quiz goes live.";
      case "quiz-started":
        return "✗ Quiz has started. Submitting of answers is now closed.";
      case "quiz-ended":
        return "✗ Quiz has ended. Answers submitting is closed.";
      case "already-answered":
        return "✓ Your answers have been submitted for this quiz!";
      default:
        return errorMessage || "Loading quiz...";
    }
  };

  const getStatusColor = () => {
    switch (votingStatus) {
      case "submitting-open":
        return "#4CAF50"; // Green
      case "quiz-started":
      case "quiz-ended":
      case "already-answered":
        return "#f44336"; // Red
      default:
        return "#999"; // Gray
    }
  };

  const renderQuestion = (q: any, idx: number) => {
    const id = `q${idx + 1}`;
    return (
      <View key={id} style={styles.questionMainContainer}>
        <Text style={styles.questiontext}>
          {q.text || `Question ${idx + 1}`}
        </Text>
        <View style={styles.optionContainers}>
          {q.checkBox.map((opt: any, optIndex: number) => (
            <TouchableOpacity
              key={optIndex}
              onPress={() =>
                isVotingAllowed && handleSelectAnswer(id, opt.option)
              }
              disabled={!isVotingAllowed}
              style={styles.isVoting}
            >
              <MaterialIcons
                name={
                  answers[id] === opt.option
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={22}
                color={answers[id] === opt.option ? "#4c00827c" : "#00000031"}
              />
              <Text
                style={[
                  styles.questionsText,
                  {
                    color: answers[id] === opt.option ? "#4c00827c" : "#333",
                    fontWeight: answers[id] === opt.option ? "600" : "400",
                  },
                ]}
              >
                {opt.option}. {opt.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.statusMessageContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.press, { marginRight: 10 }]}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={28}
            color="#4B0082"
            style={styles.arrowback}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.statusMessageBox,
            {
              backgroundColor: getStatusColor() + "20",
              borderLeftColor: getStatusColor(),
            },
          ]}
        >
          <Text style={[styles.statusMessageText, { color: getStatusColor() }]}>
            {getStatusMessage()}
          </Text>
        </View>
      </View>

      {/* Questions */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4B0082" />
          <Text style={styles.loadingText}>Loading challenge...</Text>
        </View>
      ) : votingStatus === "submitting-open" ? (
        questions.map((q, idx) => renderQuestion(q, idx))
      ) : (
        <View style={styles.loadingContainer}>
          <MaterialIcons
            name={votingStatus === "already-answered" ? "check-circle" : "lock"}
            size={48}
            color={votingStatus === "already-answered" ? "#4CAF50" : "#f44336"}
          />
          <Text
            style={[
              styles.loadingText,
              {
                color:
                  votingStatus === "already-answered" ? "#4CAF50" : "#f44336",
              },
            ]}
          >
            {votingStatus === "already-answered"
              ? "You have submitted your answers successfully!"
              : "Answers submission is no longer available"}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.isSubmitting,
          { backgroundColor: isSubmitDisabled ? "#ccc" : "#4B0082" },
        ]}
        onPress={handleSubmitAnswers}
        disabled={isSubmitDisabled}
      >
        {submitting && <ActivityIndicator color="#4B0082" />}
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {submitting ? "Submitting..." : "Submit Answers"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
