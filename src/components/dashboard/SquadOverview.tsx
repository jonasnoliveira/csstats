"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { CS2PlayerStats } from '@/lib/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { SquadKDChart } from '@/components/charts/SquadKDChart';
import { WinRateRadar } from '@/components/charts/WinRateRadar';
import { Trophy, Crosshair, Zap, Eye, RefreshCw, Users, TrendingUp, Target, Percent } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SquadOverviewProps {
    players: CS2PlayerStats[];
}

// Fallback avatar
const DEFAULT_AVATAR = "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

export function SquadOverview({ players }: SquadOverviewProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Sort helpers for all categories
    const byRating = [...players].sort((a, b) => b.rank.current - a.rank.current);
    const byKD = [...players].sort((a, b) => b.overall.kdRatio - a.overall.kdRatio);
    const byADR = [...players].sort((a, b) => b.overall.adr - a.overall.adr);
    const byWinRate = [...players].sort((a, b) => b.overall.winRate - a.overall.winRate);
    const byHS = [...players].sort((a, b) => b.overall.headshotPercentage - a.overall.headshotPercentage);
    const byHLTV = [...players].sort((a, b) => b.overall.hltvRating - a.overall.hltvRating);

    const topRating = byRating[0];
    const topKD = byKD[0];
    const topADR = byADR[0];
    const topWinRate = byWinRate[0];
    const topHS = byHS[0];
    const topHLTV = byHLTV[0];

    // Get display name (fallback to steamId)
    const getDisplayName = (player: CS2PlayerStats) => {
        if (player.username && player.username !== "Unknown Player") {
            return player.username;
        }
        // Use last 6 digits of steamId as fallback
        return `Player_${player.steamId.slice(-6)}`;
    };

    // Get avatar with fallback
    const getAvatar = (player: CS2PlayerStats) => {
        return player.avatarUrl || DEFAULT_AVATAR;
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('/api/squad/refresh', { method: 'POST' });
            if (res.ok) {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (e) {
            console.error("Refresh failed", e);
        } finally {
            setIsRefreshing(false);
        }
    };

    const loading = isPending || isRefreshing;

    return (
        <div className="space-y-6">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <Users className="text-purple-500" size={32} />
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent tracking-tight">
                            SQUAD STATS
                        </h1>
                    </div>
                    <p className="text-gray-500 mt-1 text-sm">Season 3 · Premier Mode · {players.length} Players</p>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={loading}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 24px',
                        background: loading
                            ? 'rgba(139, 92, 246, 0.1)'
                            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.15) 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                        borderRadius: '50px',
                        color: '#c4b5fd',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
                        opacity: loading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(168, 85, 247, 0.25) 100%)';
                            e.currentTarget.style.boxShadow = '0 6px 30px rgba(139, 92, 246, 0.35)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = loading
                            ? 'rgba(139, 92, 246, 0.1)'
                            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.15) 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <RefreshCw size={18} className={cn(loading && "animate-spin")} />
                    {loading ? "Updating..." : "Refresh Data"}
                </button>
            </div>

            {/* --- CATEGORY PODIUMS --- */}
            <div style={{ marginTop: '32px' }}>
                <h2 style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#64748b',
                    marginBottom: '16px'
                }}>
                    🏆 Category Leaders
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px'
                }}>
                    {/* MVP - Premier Rating */}
                    <GlassCard className="relative overflow-hidden bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/30 hover:scale-[1.02] transition-transform" style={{ padding: '20px' }}>
                        <div className="absolute -top-4 -right-4 text-yellow-500/10 rotate-12">
                            <Trophy size={70} />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <img src={getAvatar(topRating)} className="w-14 h-14 rounded-full border-2 border-yellow-500/50 object-cover" alt="" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-yellow-500 uppercase font-bold tracking-widest">🏆 MVP</p>
                                <p className="text-lg font-black text-white truncate">{getDisplayName(topRating)}</p>
                                <p className="text-yellow-300 font-mono text-sm">{topRating?.rank.current.toLocaleString()} Rating</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Aim God - K/D */}
                    <GlassCard className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30 hover:scale-[1.02] transition-transform" style={{ padding: '20px' }}>
                        <div className="absolute -top-4 -right-4 text-purple-500/10 rotate-12">
                            <Crosshair size={70} />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <img src={getAvatar(topKD)} className="w-14 h-14 rounded-full border-2 border-purple-500/50 object-cover" alt="" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-purple-500 uppercase font-bold tracking-widest">🎯 Aim God</p>
                                <p className="text-lg font-black text-white truncate">{getDisplayName(topKD)}</p>
                                <p className="text-purple-300 font-mono text-sm">{topKD?.overall.kdRatio} K/D</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Impact King - ADR */}
                    <GlassCard className="relative overflow-hidden bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30 hover:scale-[1.02] transition-transform" style={{ padding: '20px' }}>
                        <div className="absolute -top-4 -right-4 text-red-500/10 rotate-12">
                            <Target size={70} />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <img src={getAvatar(topADR)} className="w-14 h-14 rounded-full border-2 border-red-500/50 object-cover" alt="" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest">💥 Impact</p>
                                <p className="text-lg font-black text-white truncate">{getDisplayName(topADR)}</p>
                                <p className="text-red-300 font-mono text-sm">{topADR?.overall.adr} ADR</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Clutch Master - Win Rate */}
                    <GlassCard className="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30 hover:scale-[1.02] transition-transform" style={{ padding: '20px' }}>
                        <div className="absolute -top-4 -right-4 text-green-500/10 rotate-12">
                            <TrendingUp size={70} />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <img src={getAvatar(topWinRate)} className="w-14 h-14 rounded-full border-2 border-green-500/50 object-cover" alt="" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-green-500 uppercase font-bold tracking-widest">🏅 Clutch Master</p>
                                <p className="text-lg font-black text-white truncate">{getDisplayName(topWinRate)}</p>
                                <p className="text-green-300 font-mono text-sm">{topWinRate?.overall.winRate}% Win</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Headshot King - HS% */}
                    <GlassCard className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 hover:scale-[1.02] transition-transform" style={{ padding: '20px' }}>
                        <div className="absolute -top-4 -right-4 text-blue-500/10 rotate-12">
                            <Percent size={70} />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <img src={getAvatar(topHS)} className="w-14 h-14 rounded-full border-2 border-blue-500/50 object-cover" alt="" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-blue-500 uppercase font-bold tracking-widest">💀 Headshot King</p>
                                <p className="text-lg font-black text-white truncate">{getDisplayName(topHS)}</p>
                                <p className="text-blue-300 font-mono text-sm">{topHS?.overall.headshotPercentage}% HS</p>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Pro Player - HLTV Rating */}
                    <GlassCard className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/30 hover:scale-[1.02] transition-transform" style={{ padding: '20px' }}>
                        <div className="absolute -top-4 -right-4 text-cyan-500/10 rotate-12">
                            <Zap size={70} />
                        </div>
                        <div className="relative z-10 flex items-center gap-4">
                            <img src={getAvatar(topHLTV)} className="w-14 h-14 rounded-full border-2 border-cyan-500/50 object-cover" alt="" />
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-cyan-500 uppercase font-bold tracking-widest">⚡ Pro Player</p>
                                <p className="text-lg font-black text-white truncate">{getDisplayName(topHLTV)}</p>
                                <p className="text-cyan-300 font-mono text-sm">{topHLTV?.overall.hltvRating} HLTV</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* --- CHARTS ROW --- */}
            <div style={{ marginTop: '32px', marginBottom: '32px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <GlassCard className="p-0">
                    <div className="px-4 py-3 border-b border-white/5">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">K/D Comparison</h3>
                    </div>
                    <div style={{ height: '400px', padding: '16px' }}>
                        <SquadKDChart players={players} />
                    </div>
                </GlassCard>

                <GlassCard className="p-0">
                    <div className="px-4 py-3 border-b border-white/5">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Performance Radar</h3>
                    </div>
                    <div style={{ height: '400px', padding: '16px' }}>
                        <WinRateRadar players={players} />
                    </div>
                </GlassCard>
            </div>

            {/* --- LEADERBOARD TABLE --- */}
            <GlassCard className="p-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Leaderboard</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-[10px] text-gray-500 uppercase border-b border-white/5">
                                <th className="px-4 py-3 w-10">#</th>
                                <th className="px-4 py-3">Player</th>
                                <th className="px-4 py-3 text-center">Rating</th>
                                <th className="px-4 py-3 text-center">K/D</th>
                                <th className="px-4 py-3 text-center">ADR</th>
                                <th className="px-4 py-3 text-center">Win %</th>
                                <th className="px-4 py-3 text-center hidden md:table-cell">HS %</th>
                                <th className="px-4 py-3 text-center w-24"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {byRating.map((player, idx) => {
                                const rankColors = ['text-yellow-500', 'text-gray-300', 'text-orange-600'];
                                return (
                                    <tr key={player.steamId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className={cn("px-4 py-3 font-black text-lg", rankColors[idx] || "text-gray-600")}>
                                            {idx + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img src={getAvatar(player)} className="w-9 h-9 rounded-full object-cover" alt="" />
                                                <span className="font-bold text-white truncate max-w-[120px] md:max-w-none">{getDisplayName(player)}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center font-mono text-yellow-300">{player.rank.current.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-center font-mono text-purple-300">{player.overall.kdRatio}</td>
                                        <td className="px-4 py-3 text-center font-mono text-red-300">{player.overall.adr}</td>
                                        <td className="px-4 py-3 text-center font-mono text-green-300">{player.overall.winRate}%</td>
                                        <td className="px-4 py-3 text-center font-mono text-blue-300 hidden md:table-cell">{player.overall.headshotPercentage}%</td>
                                        <td className="px-4 py-3 text-center">
                                            <Link
                                                href={`/player/${player.steamId}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 rounded-lg text-xs font-bold transition-colors"
                                            >
                                                <Eye size={12} />
                                                <span className="hidden sm:inline">Details</span>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
