import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
    Animated,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertDialogProps {
  visible: boolean;
  type: AlertType;
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress: () => void;
    style?: "default" | "destructive" | "cancel";
  }>;
  onDismiss?: () => void;
}

const getIconConfig = (
  type: AlertType,
): { icon: string; color: string; bgColor: string } => {
  switch (type) {
    case "success":
      return {
        icon: "checkmark-circle",
        color: "#6BCB77",
        bgColor: "#E8F5E9",
      };
    case "error":
      return {
        icon: "close-circle",
        color: "#FF6B6B",
        bgColor: "#FFEBEE",
      };
    case "warning":
      return {
        icon: "alert-circle",
        color: "#FFD93D",
        bgColor: "#FFF3CD",
      };
    case "info":
      return {
        icon: "information-circle",
        color: "#4B0082",
        bgColor: "#F3E5F5",
      };
    default:
      return {
        icon: "information-circle",
        color: "#4B0082",
        bgColor: "#F3E5F5",
      };
  }
};

export default function AlertDialog({
  visible,
  type,
  title,
  message,
  buttons = [{ text: "OK", onPress: () => {}, style: "default" }],
  onDismiss,
}: AlertDialogProps) {
  const { icon, color, bgColor } = getIconConfig(type);
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.dialogContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Icon Section */}
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <Ionicons name={icon} size={50} color={color} />
          </View>

          {/* Content Section */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === "destructive" && styles.destructiveButton,
                  button.style === "cancel" && styles.cancelButton,
                  buttons.length > 1 && index === 0 && styles.firstButton,
                ]}
                onPress={() => {
                  button.onPress();
                  onDismiss?.();
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.style === "destructive" && styles.destructiveText,
                    button.style === "cancel" && styles.cancelText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dialogContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 340,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  iconContainer: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingHorizontal: 0,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  firstButton: {
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  destructiveButton: {
    backgroundColor: "#FFEBEE",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B0082",
  },
  destructiveText: {
    color: "#FF6B6B",
  },
  cancelText: {
    color: "#999",
  },
});
