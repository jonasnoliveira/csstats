"use client";

import ReactECharts from 'echarts-for-react';
import { CS2PlayerStats } from '@/lib/types';

interface SquadKDChartProps {
    players: CS2PlayerStats[];
}

export function SquadKDChart({ players }: SquadKDChartProps) {
    const sortedPlayers = [...players].sort((a, b) => b.overall.kdRatio - a.overall.kdRatio);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: 'rgba(255,255,255,0.1)',
            textStyle: { color: '#fff' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: sortedPlayers.map(p => p.username),
            axisLabel: { color: '#888', fontSize: 11 },
            axisLine: { lineStyle: { color: '#333' } }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: Math.max(...sortedPlayers.map(p => p.overall.kdRatio)) + 0.5,
            axisLabel: { color: '#888' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        series: [
            {
                name: 'K/D Ratio',
                type: 'bar',
                data: sortedPlayers.map((p, i) => ({
                    value: p.overall.kdRatio,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#8B5CF6' },
                                { offset: 1, color: i === 0 ? '#B8860B' : i === 1 ? '#808080' : i === 2 ? '#8B4513' : '#6D28D9' }
                            ]
                        },
                        borderRadius: [8, 8, 0, 0]
                    }
                })),
                barWidth: '60%',
                label: {
                    show: true,
                    position: 'top',
                    color: '#fff',
                    fontWeight: 'bold',
                    formatter: '{c}'
                }
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
