import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import challangeStyles from "../assets/styles/challenge";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function UpdateUserProfile({
  isVisible,
  children,
  onClose,
}: Props) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const styles = challangeStyles(screenWidth, screenHeight);
  return (
    <KeyboardAvoidingView>
      <View>
        <Modal visible={isVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.titleContainers}>
                <Pressable onPress={onClose} style={styles.press}>
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    style={styles.arrowback}
                    color={"#4B0082"}
                  />
                </Pressable>
                <Text style={styles.titleText}>Votes on this Challange</Text>
              </View>
            </View>
          </View>
          <View style={styles.childrenContainer}>{children}</View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
