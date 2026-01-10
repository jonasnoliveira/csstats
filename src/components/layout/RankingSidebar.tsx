"use client";

import Link from 'next/link';
import { CS2PlayerStats } from '@/lib/types';
import { Trophy, Crosshair, Target, TrendingUp, Percent, Activity, Gamepad2 } from 'lucide-react';
import styles from './RankingSidebar.module.css';

type RankingType = 'kd' | 'rating' | 'winrate' | 'adr' | 'hs' | 'matches';

interface RankingSidebarProps {
    players: CS2PlayerStats[];
    sections: RankingType[];
    title: string;
    position: 'left' | 'right';
}

const DEFAULT_AVATAR = "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

const getDisplayName = (player: CS2PlayerStats) => {
    if (player.username && player.username !== "Unknown Player") {
        return player.username;
    }
    return `Player_${player.steamId.slice(-6)}`;
};

const getAvatar = (player: CS2PlayerStats) => player.avatarUrl || DEFAULT_AVATAR;

const rankingConfigs: Record<RankingType, {
    title: string;
    icon: React.ReactNode;
    iconClass: string;
    getValue: (p: CS2PlayerStats) => number;
    formatValue: (v: number) => string;
    valueColor: string;
}> = {
    kd: {
        title: 'K/D Ratio',
        icon: <Crosshair size={12} color="#fff" />,
        iconClass: 'kd',
        getValue: (p) => p.overall.kdRatio,
        formatValue: (v) => v.toFixed(2),
        valueColor: 'purple'
    },
    rating: {
        title: 'HLTV Rating',
        icon: <Activity size={12} color="#fff" />,
        iconClass: 'rating',
        getValue: (p) => p.overall.hltvRating,
        formatValue: (v) => v.toFixed(2),
        valueColor: 'gold'
    },
    winrate: {
        title: 'Win Rate',
        icon: <TrendingUp size={12} color="#fff" />,
        iconClass: 'winrate',
        getValue: (p) => p.overall.winRate,
        formatValue: (v) => `${v}%`,
        valueColor: 'green'
    },
    adr: {
        title: 'ADR',
        icon: <Target size={12} color="#fff" />,
        iconClass: 'adr',
        getValue: (p) => p.overall.adr,
        formatValue: (v) => v.toString(),
        valueColor: 'red'
    },
    hs: {
        title: 'Headshot %',
        icon: <Percent size={12} color="#fff" />,
        iconClass: 'hs',
        getValue: (p) => p.overall.headshotPercentage,
        formatValue: (v) => `${v}%`,
        valueColor: 'blue'
    },
    matches: {
        title: 'Premier Rating',
        icon: <Gamepad2 size={12} color="#fff" />,
        iconClass: 'matches',
        getValue: (p) => p.rank.current,
        formatValue: (v) => v.toLocaleString(),
        valueColor: 'cyan'
    }
};

interface RankItemProps {
    player: CS2PlayerStats;
    position: number;
    value: string;
    valueColor: string;
}

function RankItem({ player, position, value, valueColor }: RankItemProps) {
    const positionClass = position === 1 ? styles.gold :
        position === 2 ? styles.silver :
            position === 3 ? styles.bronze : styles.default;

    return (
        <Link href={`/player/${player.steamId}`} className={styles.rankItem}>
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

function RankingSection({ type, players }: { type: RankingType; players: CS2PlayerStats[] }) {
    const config = rankingConfigs[type];
    const sortedPlayers = [...players]
        .sort((a, b) => config.getValue(b) - config.getValue(a))
        .slice(0, 5);

    return (
        <div className={styles.rankingSection}>
            <div className={styles.sectionHeader}>
                <div className={`${styles.sectionIcon} ${styles[config.iconClass]}`}>
                    {config.icon}
                </div>
                <span className={styles.sectionTitle}>{config.title}</span>
            </div>
            <div className={styles.rankingList}>
                {sortedPlayers.map((player, idx) => (
                    <RankItem
                        key={player.steamId}
                        player={player}
                        position={idx + 1}
                        value={config.formatValue(config.getValue(player))}
                        valueColor={config.valueColor}
                    />
                ))}
            </div>
        </div>
    );
}

export function RankingSidebar({ players, sections, title, position }: RankingSidebarProps) {
    if (!players || players.length === 0) return null;

    const positionStyle = position === 'left'
        ? { left: '24px' }
        : { right: '24px' };

    return (
        <aside className={styles.sidebar} style={positionStyle}>
            <div className={styles.sidebarHeader}>
                <Trophy className={styles.sidebarIcon} size={18} />
                <h2 className={styles.sidebarTitle}>{title}</h2>
            </div>

            {sections.map((section, idx) => (
                <div key={section}>
                    <RankingSection type={section} players={players} />
                    {idx < sections.length - 1 && <div className={styles.divider} />}
                </div>
            ))}
        </aside>
    );
}
