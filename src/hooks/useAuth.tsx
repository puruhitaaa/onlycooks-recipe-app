import create from 'zustand';
import { authDefaults } from '../constants/authDefaults';
import { IUser } from '../types/user';

interface Auth {
  user: IUser | null;
  successMsg: string;
  errorMsg: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  setError: (incomingError: string) => void;
  setSuccess: (incomingSuccess: string) => void;
  login: (loggedInUser: IUser) => void;
  register: (registeredUser: IUser) => void;
  logout: () => void;
}

export const useAuth = create<Auth>((set) => ({
  user: JSON.parse(localStorage.getItem('auth') || '{}') || authDefaults,
  isError: false,
  isSuccess: false,
  isLoading: true,
  errorMsg: '',
  successMsg: '',
  setError: (incomingError: string) => {
    set((state) => ({ ...state, errorMsg: incomingError, isError: true }));

    setTimeout(() => set({ isError: false, errorMsg: '' }), 3000);
  },
  setSuccess: (incomingSuccess: string) =>
    set((state) => ({
      ...state,
      successMsg: incomingSuccess,
      isSuccess: true,
    })),
  login: (loggedInUser: IUser) =>
    set((state) => ({ ...state, user: loggedInUser })),
  register: (registeredUser: IUser) =>
    set((state) => ({ ...state, user: registeredUser })),
  logout: () => {
    set((state) => ({ ...state, user: null }));
    localStorage.removeItem('auth');
  },
}));
