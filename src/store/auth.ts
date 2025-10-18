import { create } from "zustand";

import { authHelper } from "@app/utils";

export interface AuthStore {
  authToken: Nullable<string>;
  setAuthToken: (authToken: string) => void;
  clearAuthToken: VoidFunction;
}

const initialState = {
  authToken: null,
};

export const useAuth = create<AuthStore>((set) => ({
  ...initialState,
  setAuthToken: (authToken: string) => set({ authToken }),
  clearAuthToken: () => {
    authHelper.clearAuthToken();
    set({ authToken: null });
  },
}));
