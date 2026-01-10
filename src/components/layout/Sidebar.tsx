"use client";

import Link from 'next/link';
import { CS2PlayerStats } from '@/lib/types';
import { Trophy, Crosshair, Target, TrendingUp, Percent, Activity } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
    players: CS2PlayerStats[];
}

// Fallback avatar
const DEFAULT_AVATAR = "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

// Get display name (fallback to steamId)
const getDisplayName = (player: CS2PlayerStats) => {
    if (player.username && player.username !== "Unknown Player") {
        return player.username;
    }
    return `Player_${player.steamId.slice(-6)}`;
};

// Get avatar with fallback
const getAvatar = (player: CS2PlayerStats) => {
    return player.avatarUrl || DEFAULT_AVATAR;
};

interface RankingItemProps {
    player: CS2PlayerStats;
    position: number;
    value: string | number;
    valueColor: 'purple' | 'gold' | 'green' | 'red' | 'blue';
}

function RankingItem({ player, position, value, valueColor }: RankingItemProps) {
    const positionClass = position === 1 ? styles.gold :
        position === 2 ? styles.silver :
            position === 3 ? styles.bronze : styles.default;

    return (
        <Link
            href={`/player/${player.steamId}`}
            className={styles.rankItem}
        >
            <div className={`${styles.rankPosition} ${positionClass}`}>
                {position}
            </div>
            <img
                src={getAvatar(player)}
                alt={getDisplayName(player)}
                className={styles.rankAvatar}
            />
            <div className={styles.rankInfo}>
                <div className={styles.rankName}>{getDisplayName(player)}</div>
            </div>
            <div className={`${styles.rankValue} ${styles[valueColor]}`}>
                {value}
            </div>
        </Link>
    );
}

interface RankingSectionProps {
    title: string;
    icon: React.ReactNode;
    iconClass: string;
    players: CS2PlayerStats[];
    getValue: (player: CS2PlayerStats) => number;
    formatValue: (value: number) => string;
    valueColor: 'purple' | 'gold' | 'green' | 'red' | 'blue';
}

function RankingSection({ title, icon, iconClass, players, getValue, formatValue, valueColor }: RankingSectionProps) {
    const sortedPlayers = [...players].sort((a, b) => getValue(b) - getValue(a)).slice(0, 5);

    return (
        <div className={styles.rankingSection}>
            <div className={styles.sectionHeader}>
                <div className={`${styles.sectionIcon} ${styles[iconClass]}`}>
                    {icon}
                </div>
                <span className={styles.sectionTitle}>{title}</span>
            </div>
            <div className={styles.rankingList}>
                {sortedPlayers.map((player, idx) => (
                    <RankingItem
                        key={player.steamId}
                        player={player}
                        position={idx + 1}
                        value={formatValue(getValue(player))}
                        valueColor={valueColor}
                    />
                ))}
            </div>
        </div>
    );
}

export function Sidebar({ players }: SidebarProps) {
    if (!players || players.length === 0) return null;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <Trophy className={styles.sidebarIcon} size={20} />
                <h2 className={styles.sidebarTitle}>SQUAD RANKINGS</h2>
            </div>

            <RankingSection
                title="K/D Ratio"
                icon={<Crosshair size={12} color="#fff" />}
                iconClass="kd"
                players={players}
                getValue={(p) => p.overall.kdRatio}
                formatValue={(v) => v.toFixed(2)}
                valueColor="purple"
            />

            <div className={styles.divider} />

            <RankingSection
                title="Rating"
                icon={<Activity size={12} color="#fff" />}
                iconClass="rating"
                players={players}
                getValue={(p) => p.overall.hltvRating}
                formatValue={(v) => v.toFixed(2)}
                valueColor="gold"
            />

            <div className={styles.divider} />

            <RankingSection
                title="Win Rate"
                icon={<TrendingUp size={12} color="#fff" />}
                iconClass="winrate"
                players={players}
                getValue={(p) => p.overall.winRate}
                formatValue={(v) => `${v}%`}
                valueColor="green"
            />

            <div className={styles.divider} />

            <RankingSection
                title="ADR"
                icon={<Target size={12} color="#fff" />}
                iconClass="adr"
                players={players}
                getValue={(p) => p.overall.adr}
                formatValue={(v) => v.toString()}
                valueColor="red"
            />

            <div className={styles.divider} />

            <RankingSection
                title="Headshot %"
                icon={<Percent size={12} color="#fff" />}
                iconClass="hs"
                players={players}
                getValue={(p) => p.overall.headshotPercentage}
                formatValue={(v) => `${v}%`}
                valueColor="blue"
            />
        </aside>
    );
}
