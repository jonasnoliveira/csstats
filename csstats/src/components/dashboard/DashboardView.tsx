"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { CS2PlayerStats } from '@/lib/types';
import { PlayerHeader } from './PlayerHeader';
import { PerformanceChart } from './PerformanceChart';
import { MapStats } from './MapStats';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';
import { Trophy, Crosshair, Target, Zap, Activity, RefreshCw, Medal } from 'lucide-react';

interface DashboardViewProps {
    players: CS2PlayerStats[];
}

type SortKey = 'rating' | 'kdRatio' | 'winRate' | 'adr' | 'headshotPercentage';

export function DashboardView({ players }: DashboardViewProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>(players[0]?.steamId);
    const [sortKey, setSortKey] = useState<SortKey>('rating');

    const selectedPlayer = players.find(p => p.steamId === selectedPlayerId) || players[0];

    // Sorting Logic
    const sortedPlayers = [...players].sort((a, b) => {
        const getVal = (p: CS2PlayerStats, key: SortKey) => {
            if (key === 'rating') return p.rank.current;
            if (key === 'kdRatio') return p.overall.kdRatio;
            if (key === 'winRate') return p.overall.winRate;
            if (key === 'adr') return p.overall.adr;
            if (key === 'headshotPercentage') return p.overall.headshotPercentage;
            return 0;
        };
        return getVal(b, sortKey) - getVal(a, sortKey);
    });

    const getTopPlayer = (key: SortKey) => sortedPlayers.slice().sort((a, b) => {
        const getVal = (p: CS2PlayerStats) => {
            if (key === 'kdRatio') return p.overall.kdRatio;
            if (key === 'adr') return p.overall.adr;
            if (key === 'rating') return p.rank.current;
            return 0;
        };
        return getVal(b) - getVal(a);
    })[0];

    const topFragger = getTopPlayer('kdRatio');
    const topRating = getTopPlayer('rating');
    const topDamage = getTopPlayer('adr');

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <div className="space-y-8 relative">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        SQUAD STATS
                    </h1>
                    <p className="text-sm text-gray-500">Live tracker for the boys</p>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={isPending}
                    className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all disabled:opacity-50"
                >
                    <RefreshCw size={18} className={cn("text-accent-primary transition-spin", isPending && "animate-spin")} />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {isPending ? "Updating..." : "Refresh Data"}
                    </span>
                </button>
            </div>

            {/* --- PODIUM / SUPER LEADERBOARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* GOLD: Top Rating */}
                <GlassCard className="relative flex items-center gap-4 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/30 shadow-[0_0_30px_-10px_rgba(234,179,8,0.2)]">
                    <div className="absolute -top-3 -right-3 text-yellow-500 opacity-20 rotate-12">
                        <Trophy size={80} />
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-500/20 text-yellow-500 shadow-inner border border-yellow-500/20">
                        <Trophy size={32} />
                    </div>
                    <div>
                        <p className="text-xs text-yellow-500 uppercase font-bold tracking-widest mb-1">MVP (Rating)</p>
                        <p className="text-2xl font-bold text-white truncate max-w-[150px]">{topRating?.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-mono text-yellow-200">{topRating?.rank.current.toLocaleString()}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/20">Premier</span>
                        </div>
                    </div>
                </GlassCard>

                {/* SILVER: Top K/D */}
                <GlassCard className="relative flex items-center gap-4 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]">
                    <div className="absolute -top-3 -right-3 text-purple-500 opacity-20 rotate-12">
                        <Crosshair size={80} />
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/20 text-purple-500 shadow-inner border border-purple-500/20">
                        <Crosshair size={32} />
                    </div>
                    <div>
                        <p className="text-xs text-purple-500 uppercase font-bold tracking-widest mb-1">Aim God</p>
                        <p className="text-2xl font-bold text-white truncate max-w-[150px]">{topFragger?.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-mono text-purple-200">{topFragger?.overall.kdRatio}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/20">K/D</span>
                        </div>
                    </div>
                </GlassCard>

                {/* BRONZE: Top ADR */}
                <GlassCard className="relative flex items-center gap-4 bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]">
                    <div className="absolute -top-3 -right-3 text-red-500 opacity-20 rotate-12">
                        <Zap size={80} />
                    </div>
                    <div className="p-4 rounded-xl bg-red-500/20 text-red-500 shadow-inner border border-red-500/20">
                        <Zap size={32} />
                    </div>
                    <div>
                        <p className="text-xs text-red-500 uppercase font-bold tracking-widest mb-1">Highest Impact</p>
                        <p className="text-2xl font-bold text-white truncate max-w-[150px]">{topDamage?.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-mono text-red-200">{topDamage?.overall.adr}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/20">ADR</span>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* --- LEFT SIDEBAR: ROSTER --- */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Leaderboard</h3>
                        <div className="flex gap-1">
                            <button onClick={() => setSortKey('rating')} className={cn("px-2 py-1 rounded text-[10px] font-bold transition-all", sortKey === 'rating' ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300")}>RATING</button>
                            <button onClick={() => setSortKey('kdRatio')} className={cn("px-2 py-1 rounded text-[10px] font-bold transition-all", sortKey === 'kdRatio' ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300")}>K/D</button>
                            <button onClick={() => setSortKey('adr')} className={cn("px-2 py-1 rounded text-[10px] font-bold transition-all", sortKey === 'adr' ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300")}>ADR</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {sortedPlayers.map((player, idx) => {
                            const isTop3 = idx < 3;
                            // Medal Colors
                            let rankColor = "text-gray-500";
                            if (idx === 0) rankColor = "text-yellow-500 drop-shadow-md";
                            if (idx === 1) rankColor = "text-gray-300 drop-shadow-md";
                            if (idx === 2) rankColor = "text-orange-700 drop-shadow-md";

                            return (
                                <GlassCard
                                    key={player.steamId}
                                    className={cn(
                                        "cursor-pointer transition-all border-l-4 group relative overflow-hidden",
                                        selectedPlayerId === player.steamId
                                            ? "bg-white/10 border-l-accent-primary"
                                            : "border-l-transparent hover:bg-white/5",
                                        isTop3 && sortKey === 'rating' ? "border-r border-r-white/5" : ""
                                    )}
                                    onClick={() => setSelectedPlayerId(player.steamId)}
                                >
                                    {/* Subtle Ranking Background Number */}
                                    <div className="absolute right-2 -bottom-4 text-6xl font-black text-white/5 pointer-events-none select-none italic">
                                        {idx + 1}
                                    </div>

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={cn("flex-shrink-0 font-black w-8 text-center text-xl", rankColor)}>
                                            {idx + 1}
                                        </div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <div className="relative">
                                            <img src={player.avatarUrl} className="w-12 h-12 rounded-full bg-gray-800 border-2 border-white/5" alt="" />
                                            {isTop3 && (
                                                <div className="absolute -top-1 -right-1 bg-black/50 rounded-full p-0.5 border border-white/10">
                                                    <Medal size={10} className={rankColor} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <p className={cn("font-bold truncate text-base", selectedPlayerId === player.steamId ? "text-white" : "text-gray-300 group-hover:text-white")}>
                                                {player.username}
                                            </p>
                                            <div className="flex gap-4 text-xs text-gray-500 font-mono mt-0.5">
                                                <span className={sortKey === 'rating' ? "text-accent-primary font-bold" : ""}>★ {player.rank.current.toLocaleString()}</span>
                                                <span className={sortKey === 'kdRatio' ? "text-accent-primary font-bold" : ""}>{player.overall.kdRatio} K/D</span>
                                                <span className={sortKey === 'adr' ? "text-accent-primary font-bold" : ""}>{player.overall.adr} ADR</span>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            )
                        })}
                    </div>
                </div>

                {/* --- RIGHT CONTENT: SELECTED PLAYER DETAILED VIEW --- */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="animate-fade-in key={selectedPlayerId}">
                        {/* Re-mount on change for fresh animation */}
                        <PlayerHeader player={selectedPlayer} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <GlassCard className="flex flex-col justify-center items-center p-6 text-center hover:bg-white/5 transition-colors group">
                                <Activity className="text-accent-secondary mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-4xl font-bold font-['Outfit'] text-white">{selectedPlayer.overall.hltvRating || '-'}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">HLTV Rating Estimate</div>
                            </GlassCard>
                            <GlassCard className="flex flex-col justify-center items-center p-6 text-center hover:bg-white/5 transition-colors group">
                                <Target className="text-accent-red mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-4xl font-bold font-['Outfit'] text-white">{selectedPlayer.overall.adr || '-'}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Avg Damage / Round</div>
                            </GlassCard>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mt-6">
                            <div className="h-[400px]">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 ml-1">Performance History (Last 20 Matches)</h3>
                                <div className="h-full bg-black/20 rounded-xl border border-white/5 p-4">
                                    <PerformanceChart data={selectedPlayer.history} />
                                </div>
                            </div>
                            <MapStats maps={selectedPlayer.topMaps} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
