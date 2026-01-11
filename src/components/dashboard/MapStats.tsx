import { CS2MapStats } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import styles from "./MapStats.module.css";
import { cn } from "@/lib/utils";

interface MapStatsProps {
    maps: CS2MapStats[];
}

export function MapStats({ maps }: MapStatsProps) {
    return (
        <GlassCard className={styles.container}>
            <h3 className={styles.title}>Map Performance</h3>
            <div className={styles.list}>
                {maps.map((map) => (
                    <div key={map.name} className={styles.mapItem}>
                        <div className={styles.mapInfo}>
                            <span className={styles.mapName}>{map.name}</span>
                            <span className={styles.matches}>{map.matches} Matches</span>
                        </div>

                        <div className={styles.statsRow}>
                            <div className={styles.statGroup}>
                                <span className={styles.label}>Win Rate</span>
                                <span className={cn(
                                    styles.value,
                                    map.winRate >= 50 ? styles.positive : styles.negative
                                )}>
                                    {map.winRate}%
                                </span>
                            </div>
                            <div className={styles.statGroup}>
                                <span className={styles.label}>K/D</span>
                                <span className={cn(
                                    styles.value,
                                    map.kdRatio >= 1 ? styles.positive : styles.negative
                                )}>
                                    {map.kdRatio}
                                </span>
                            </div>
                        </div>

                        <div className={styles.progressBarBg}>
                            <div
                                className={styles.progressBarFill}
                                style={{ width: `${map.winRate}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
