import { create } from "zustand";

export interface UserState {
  usersData: any[];
  detailsPage: boolean;
  detailsIndex: number;
  originalData: any[];
  showCountry: boolean;
  searchValue: string;
  updateSearchValue: (val: string) => void;
  updateShowCountry: () => void;
  updateOriginalData: (data: any[]) => void;
  updateUserData: (data: any[]) => void;
  updateDetailsPage: () => void;
  updateDetailsIndex: (val: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  usersData: [],
  detailsPage: false,
  detailsIndex: 0,
  originalData: [],
  showCountry: true,
  searchValue: "",
  updateSearchValue: (val: string) => {
    set(() => ({
      searchValue: val,
    }));
  },
  updateShowCountry: () => {
    set((state) => ({
      showCountry: !state.showCountry,
    }));
  },
  updateOriginalData: (val) =>
    set(() => ({
      originalData: val,
    })),
  updateDetailsIndex: (val: number) => {
    set(() => ({
      detailsIndex: val,
    }));
  },
  updateDetailsPage: () =>
    set((state) => ({
      detailsPage: !state.detailsPage,
    })),
  updateUserData: (val) =>
    set(() => ({
      usersData: val,
    })),
}));

export default useUserStore;
