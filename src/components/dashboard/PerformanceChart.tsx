"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import styles from "./PerformanceChart.module.css";

interface HistoryPoint {
    date: string;
    kdRatio: number;
    result: "W" | "L" | "T";
    map: string;
}

interface PerformanceChartProps {
    data: HistoryPoint[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
    // Format data for chart if necessary
    const chartData = data.map((d) => ({
        ...d,
        date: new Date(d.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    }));

    return (
        <GlassCard className={styles.container}>
            <h3 className={styles.title}>Performance History</h3>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorKd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="var(--text-tertiary)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="var(--text-tertiary)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "8px",
                            }}
                            itemStyle={{ color: "var(--text-primary)" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="kdRatio"
                            stroke="var(--accent-primary)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorKd)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
