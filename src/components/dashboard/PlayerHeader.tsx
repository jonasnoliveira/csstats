/* eslint-disable @next/next/no-img-element */
import { CS2PlayerStats } from '@/lib/types';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './PlayerHeader.module.css';
import { Trophy, Target, Crosshair } from 'lucide-react';

interface PlayerHeaderProps {
    player: CS2PlayerStats;
}

export function PlayerHeader({ player }: PlayerHeaderProps) {
    return (
        <GlassCard className={styles.header}>
            <div className={styles.profileSection}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={player.avatarUrl}
                        alt={player.username}
                        className={styles.avatar}
                    />
                    <div className={styles.rankBadge}>
                        {player.rank.current.toLocaleString()}
                    </div>
                </div>

                <div className={styles.info}>
                    <h1 className={styles.username}>{player.username}</h1>
                    <div className={styles.badges}>
                        <span className={styles.tierBadge}>{player.rank.tier}</span>
                        <span className={styles.steamId}>{player.steamId}</span>
                    </div>
                </div>
            </div>

            <div className={styles.quickStats}>
                <div className={styles.statItem}>
                    <Crosshair className={styles.statIcon} size={20} />
                    <div>
                        <div className={styles.statValue}>{player.overall.kdRatio}</div>
                        <div className={styles.statLabel}>K/D Ratio</div>
                    </div>
                </div>
                <div className={styles.statItem}>
                    <Trophy className={styles.statIcon} size={20} />
                    <div>
                        <div className={styles.statValue}>{player.overall.winRate}%</div>
                        <div className={styles.statLabel}>Win Rate</div>
                    </div>
                </div>
                <div className={styles.statItem}>
                    <Target className={styles.statIcon} size={20} />
                    <div>
                        <div className={styles.statValue}>{player.overall.headshotPercentage}%</div>
                        <div className={styles.statLabel}>Headshots</div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
