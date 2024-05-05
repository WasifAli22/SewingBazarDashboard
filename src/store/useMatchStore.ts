// store/useMatchStore.ts
import create from 'zustand';

interface Match {
  matchId: number;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  venue: string;
  referee: string;
  teamAScore: number;
  teamBScore: number;
  matchNotes: string;
  resultSummary: string;
  isCompleted: boolean;
}

interface MatchStore {
  matches: Match[];
  fetchMatches: () => Promise<void>;
  updateMatch: (id: number, updatedMatch: Match) => Promise<void>;
  deleteMatch: (id: number) => Promise<void>;
}

const useMatchStore = create<MatchStore>((set) => ({
  matches: [],
  fetchMatches: async () => {
    try {
      const response = await fetch('https://localhost:7229/api/Matches');
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status}`);
      }
      const matches: Match[] = await response.json();
      set({ matches });
    } catch (error) {
      console.error('Error fetching matches:', error instanceof Error ? error.message : error);
    }
  },
  updateMatch: async (id: number, updatedMatch: Match) => {
    try {
      const response = await fetch(`https://localhost:7229/api/Match/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMatch),
      });
      if (!response.ok) {
        throw new Error(`Failed to update match: ${response.status}`);
      }
      set((state) => {
        const index = state.matches.findIndex((match) => match.matchId === id);
        if (index !== -1) {
          state.matches[index] = updatedMatch;
        }
        return { matches: state.matches };
      });
    } catch (error) {
      console.error('Error updating match:', error instanceof Error ? error.message : error);
    }
  },
  deleteMatch: async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7229/api/Match/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete match: ${response.status}`);
      }
      set((state) => {
        return { matches: state.matches.filter((match) => match.matchId !== id) };
      });
    } catch (error) {
      console.error('Error deleting match:', error instanceof Error ? error.message : error);
    }
  },
}));

export default useMatchStore;