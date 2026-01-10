export interface CS2MapStats {
    name: string;
    matches: number;
    winRate: number; // Percentage 0-100
    kdRatio: number;
}

export interface CS2WeaponStats {
    name: string;
    kills: number;
    accuracy: number; // Percentage
}

export interface CS2PlayerStats {
    id: string;
    steamId: string;
    username: string;
    avatarUrl: string;
    rank: {
        current: number; // e.g. 15000 (Premier)
        tier: string; // "Global Elite", "Premier", etc.
        iconUrl?: string;
    };
    overall: {
        kdRatio: number;
        winRate: number;
        headshotPercentage: number;
        totalMatches: number;
        wins: number;
        losses: number;
        ties: number;
        damagePerRound: number;
        adr: number;
        hltvRating: number;
        kast: number; // Kill, Assist, Survive, Trade %
    };
    history: {
        date: string;
        kdRatio: number;
        result: 'W' | 'L' | 'T';
        map: string;
    }[];
    topMaps: CS2MapStats[];
}

export interface CS2FriendStats {
    id: string;
    rank: number;
    username: string;
    avatarUrl: string;
    rating: number; // Premier rating or CS Rating
    kdRatio: number;
    winRate: number;
    tier: string;
}

export interface DashboardData {
    currentUser: CS2PlayerStats;
    friends: CS2FriendStats[];
}
