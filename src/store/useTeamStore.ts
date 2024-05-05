// Assuming you have installed zustand and zustand/middleware, correct the import as necessary
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface Team {
    id: number;
    name: string;
    managerName: string;
}

interface TeamState {
    teams: Team[];
    setTeams: (teams: Team[]) => void;
    fetchTeams: () => Promise<void>;  // Specify that fetchTeams is an async function
}
export const useTeamStore = create<TeamState>((set) => ({
    teams: [],
    setTeams: (teams: Team[]) => {
        set({ teams });
        console.log("Teams updated:", teams);  // Log the new state
    },
    fetchTeams: async () => {
        try {
            const response = await fetch('https://localhost:7229/api/Teams');
            if (!response.ok) {
                throw new Error('Failed to fetch teams: ' + response.status);
            }
            const teams: Team[] = await response.json();
            set({ teams });
            console.log("Teams fetched and set:", teams);  // Log the fetched data
        } catch (error) {
            console.error('Error fetching teams:', error instanceof Error ? error.message : error);
        }
    }
}));
