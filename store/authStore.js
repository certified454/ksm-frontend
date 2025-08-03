import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (username, email, password, profilePicture, router) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://kismit-official.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, profilePicture }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Alert.alert(
        "Success",
        "Registration on Kismet is successful! please check your email for verification code to verify your account"
      );
      router.push({
        pathname: "/(auth)/verify",
        params: { email: data.user.email },
      });
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return {
        success: true,
      };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },

  verifyAccount: async (email, code, router) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://kismit-official.onrender.com/api/auth/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something wenht wrong");
      }

      Alert.alert("Success", "Your account has been verified successfully! you can now login");

      router.push({
        pathname: "/(auth)/login",
        params: { email: data.user.email },
      });
      

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return {
        success: true,
      };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },

  newVerificationCode: async (email ) => {
    if (!email) {
      alert("Please provide your email address");
      return {
        success: false,
        error: error.message,
      };
    }

    try {
      set({ isLoading: true });
      const response = await fetch(
        "https://kismit-official.onrender.com/api/auth/resend-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Resend verification code failed");
      }

      set({ isLoading: false });
      return {
        success: true,
      };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },

  login: async (email, password, router) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://kismit-official.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Account is not verified"){
          alert("Failed", "Account is not verified, please check your email for verification code");
          router.push({
            pathname: "/(auth)/verify",
            params: { email },
          });
          set({ isLoading: false });
          return {
            success: false,
            error: data.message,
          };
        }
        throw new Error(data.message || "Something went wrong");
      };
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      router.push({
        pathname: "/(tabs)",
      })
      return {
        success: true,
        message: "Login Successful",
      };
    } catch (error) {
      console.log("Login error:", error);
      set({ isLoading: false });
      return {
        success: false,
        error: error.message,
      };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Error checking auth:", error);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
