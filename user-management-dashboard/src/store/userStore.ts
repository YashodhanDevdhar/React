import { create } from "zustand";
import { fetchUserById} from "../api/userApi";

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
};

type UserStore = {
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  currentUserId: number | null;
  fetchUserDetails: (id: number) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  isLoading: false,
  error: null,
  currentUserId: null,


  fetchUserDetails: async (id : number) => {
    set((state) => {
      if (state.currentUserId === id) return state; // Prevent redundant fetch
      return { isLoading: true, currentUserId: id, error: null };
  });
    try {
      const user = await fetchUserById(id);
      set({ selectedUser: user, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      set({error: "Failed to fetch user details", isLoading: false });
    }
  },

  }));
