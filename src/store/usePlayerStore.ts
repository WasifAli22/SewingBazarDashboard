// store/useStore.ts
import create from 'zustand';

interface Player {
    id: number;
    fullName: string;
    dob: string;
    phoneNumber: string;
    address?: string;
    height?: string;
    weight?: string;
    bloodType?: string;
    medicalNotes?: string;
    position?: string;
    role?: string;
    tutor?: string;
    teamId?: number;
  }
interface PlayerState {
    players: Player[];
    fetchPlayers: () => Promise<void>;
}

const usePlayerStore = create<PlayerState>((set) => ({
    players: [],
    fetchPlayers: async () => {
        try {
            const response = await fetch('https://localhost:7229/api/Player');
            if (!response.ok) {
                throw new Error(`Failed to fetch players: ${response.status}`);
            }
            const players: Player[] = await response.json();
            set({ players });
        } catch (error) {
            console.error('Error fetching players:', error instanceof Error ? error.message : error);
        }
    }
}));

export default usePlayerStore;
