"use client";

import ReactECharts from 'echarts-for-react';
import { CS2PlayerStats } from '@/lib/types';

interface WinRateRadarProps {
    players: CS2PlayerStats[];
}

export function WinRateRadar({ players }: WinRateRadarProps) {
    // Take top 5 players by rating
    const topPlayers = [...players]
        .sort((a, b) => b.rank.current - a.rank.current)
        .slice(0, 5);

    const indicators = [
        { name: 'Win Rate', max: 100 },
        { name: 'K/D', max: 2 },
        { name: 'ADR', max: 120 },
        { name: 'HS %', max: 70 },
        { name: 'Rating', max: 2 }
    ];

    const colors = ['#FFD700', '#8B5CF6', '#EF4444', '#10B981', '#3B82F6'];

    const seriesData = topPlayers.map((p, i) => ({
        name: p.username,
        value: [
            p.overall.winRate,
            p.overall.kdRatio,
            p.overall.adr,
            p.overall.headshotPercentage,
            p.overall.hltvRating
        ],
        lineStyle: { color: colors[i], width: 2 },
        areaStyle: { color: colors[i], opacity: 0.1 },
        itemStyle: { color: colors[i] }
    }));

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: 'rgba(255,255,255,0.1)',
            textStyle: { color: '#fff' }
        },
        legend: {
            data: topPlayers.map(p => p.username),
            bottom: 0,
            textStyle: { color: '#888', fontSize: 10 },
            itemWidth: 12,
            itemHeight: 12
        },
        radar: {
            indicator: indicators,
            shape: 'polygon',
            splitNumber: 4,
            axisName: { color: '#888', fontSize: 10 },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
            splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)'] } },
            axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
        },
        series: [
            {
                type: 'radar',
                data: seriesData,
                symbol: 'circle',
                symbolSize: 6
            }
        ]
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
        />
    );
}
