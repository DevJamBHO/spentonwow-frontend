import { create } from 'zustand';

interface TokenState {
    notificationTime: Date | null;
    setNotificationTime: (time: Date) => void;
}

const useTokenStore = create<TokenState>((set) => ({
    notificationTime: (() => {
        if (typeof window !== 'undefined') {
            const savedTime = localStorage.getItem('notificationTime');
            return savedTime ? new Date(savedTime) : null;
        }
        return null;
    })(),
    setNotificationTime: (time: Date) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('notificationTime', time.toISOString());
        }
        set({ notificationTime: time });
    }
}));

export default useTokenStore;