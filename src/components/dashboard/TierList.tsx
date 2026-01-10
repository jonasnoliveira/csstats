import { CS2FriendStats } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import styles from "./TierList.module.css";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

interface TierListProps {
    friends: CS2FriendStats[];
}

export function TierList({ friends }: TierListProps) {
    // Sort friends by rating descending just in case
    const sortedFriends = [...friends].sort((a, b) => b.rating - a.rating);

    return (
        <GlassCard className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Squad Ranking</h3>
                <Trophy className={styles.icon} size={20} />
            </div>

            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <span>Rank</span>
                    <span>Player</span>
                    <span className={styles.alignRight}>Rating</span>
                    <span className={styles.alignRight}>K/D</span>
                    <span className={styles.alignRight}>Tier</span>
                </div>

                {sortedFriends.map((friend, index) => (
                    <div key={friend.id} className={styles.row}>
                        <div className={styles.rankCol}>
                            <span className={cn(styles.rankNumber, index < 3 && styles.topRank)}>
                                #{index + 1}
                            </span>
                        </div>

                        <div className={styles.playerCol}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={friend.avatarUrl} alt={friend.username} className={styles.avatar} />
                            <span className={styles.username}>{friend.username}</span>
                        </div>

                        <div className={styles.statCol}>{friend.rating.toLocaleString()}</div>
                        <div className={styles.statCol}>{friend.kdRatio}</div>

                        <div className={styles.tierCol}>
                            <span className={cn(styles.tierBadge, styles[`tier${friend.tier}`])}>
                                {friend.tier}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
