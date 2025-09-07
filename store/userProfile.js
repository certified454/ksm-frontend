import { create } from 'zustand';

export const userProfileStore = create((set, get) => ({
    getUserProfile: async (router, userId = null) => {
    const { token: authToken } = useAuthStore.getState();
    set({ isLoading: true });

    const endpoint = userId
        ? `https://kismit-official.onrender.com/api/user/profile/${userId}`
        : `https://kismit-official.onrender.com/api/user/profile/me`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if (!response.ok)
            throw new Error(data.message || "Something went wrong");

        router.push({ pathname: '/(profile)' });

        if (userId) {
            set({ others: data.user, isLoading: false });
        } else {
            set({ user: data.user, isLoading: false });
        }

        return { success: true };
    } catch (error) {
        console.log(error, "failed");
        set({ isLoading: false });
        return { success: false, error: error.message };
    }
},
}))