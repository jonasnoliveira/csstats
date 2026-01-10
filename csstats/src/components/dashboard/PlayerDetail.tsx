"use client";

import { CS2PlayerStats } from '@/lib/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { KDHistoryChart } from '@/components/charts/KDHistoryChart';
import { Crosshair, Target, TrendingUp, Percent, Activity, ArrowLeft, Map } from 'lucide-react';
import Link from 'next/link';

interface PlayerDetailProps {
    player: CS2PlayerStats;
}

export function PlayerDetail({ player }: PlayerDetailProps) {
    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                href="/"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '50px',
                    color: '#a78bfa',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(139, 92, 246, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                <ArrowLeft size={18} />
                <span>Back to Squad</span>
            </Link>

            {/* --- PLAYER HEADER --- */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="relative">
                    <img
                        src={player.avatarUrl}
                        className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-purple-500/50 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
                        alt={player.username}
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 rounded-full text-xs font-bold text-white shadow-lg">
                        #{player.rank.tier}
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{player.username}</h1>
                    <p className="text-2xl font-mono text-yellow-400 mt-2">{player.rank.current.toLocaleString()} <span className="text-sm text-gray-500">Premier Rating</span></p>
                </div>
            </div>

            {/* --- STATS GRID --- */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Top row - 3 main stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <GlassCard className="text-center p-5 hover:bg-white/5 transition-colors group">
                        <Crosshair className="mx-auto text-purple-400 mb-2 group-hover:scale-110 transition-transform" size={28} />
                        <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white' }}>{player.overall.kdRatio}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginTop: '4px' }}>K/D Ratio</div>
                    </GlassCard>

                    <GlassCard className="text-center p-5 hover:bg-white/5 transition-colors group">
                        <Target className="mx-auto text-red-400 mb-2 group-hover:scale-110 transition-transform" size={28} />
                        <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white' }}>{player.overall.adr}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginTop: '4px' }}>ADR</div>
                    </GlassCard>

                    <GlassCard className="text-center p-5 hover:bg-white/5 transition-colors group">
                        <TrendingUp className="mx-auto text-green-400 mb-2 group-hover:scale-110 transition-transform" size={28} />
                        <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white' }}>{player.overall.winRate}%</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginTop: '4px' }}>Win Rate</div>
                    </GlassCard>
                </div>

                {/* Bottom row - 2 secondary stats side by side centered */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <GlassCard className="text-center p-5 hover:bg-white/5 transition-colors group" style={{ flex: '1', maxWidth: '280px' }}>
                        <Percent className="mx-auto text-blue-400 mb-2 group-hover:scale-110 transition-transform" size={28} />
                        <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white' }}>{player.overall.headshotPercentage}%</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginTop: '4px' }}>Headshot %</div>
                    </GlassCard>

                    <GlassCard className="text-center p-5 hover:bg-white/5 transition-colors group" style={{ flex: '1', maxWidth: '280px' }}>
                        <Activity className="mx-auto text-yellow-400 mb-2 group-hover:scale-110 transition-transform" size={28} />
                        <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white' }}>{player.overall.hltvRating}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginTop: '4px' }}>Rating</div>
                    </GlassCard>
                </div>
            </div>

            {/* --- K/D HISTORY CHART --- */}
            <GlassCard className="p-0">
                <div className="p-4 border-b border-white/5">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">K/D History (Last 20 Matches)</h3>
                </div>
                <div className="h-[350px] p-4">
                    <KDHistoryChart history={player.history} />
                </div>
            </GlassCard>

            {/* --- TOP MAPS --- */}
            {player.topMaps && player.topMaps.length > 0 && (
                <GlassCard className="p-0">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2">
                        <Map size={16} className="text-gray-500" />
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Top Maps</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        {player.topMaps.map(map => (
                            <div key={map.name} className="bg-white/5 rounded-lg p-4 text-center">
                                <p className="font-bold text-white text-lg">{map.name}</p>
                                <div className="flex justify-center gap-4 mt-2 text-sm">
                                    <span className="text-green-400">{map.winRate}% WR</span>
                                    <span className="text-purple-400">{map.kdRatio} K/D</span>
                                    <span className="text-gray-500">{map.matches} games</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            )}
        </div>
    );
}
