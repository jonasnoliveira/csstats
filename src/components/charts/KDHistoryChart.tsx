"use client";

import ReactECharts from 'echarts-for-react';

interface KDHistoryChartProps {
    history: { date: string; kdRatio: number; result: 'W' | 'L' | 'T' }[];
}

export function KDHistoryChart({ history }: KDHistoryChartProps) {
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: 'rgba(255,255,255,0.1)',
            textStyle: { color: '#fff' },
            formatter: (params: any) => {
                const p = params[0];
                const result = history[p.dataIndex]?.result;
                const color = result === 'W' ? '#10B981' : result === 'L' ? '#EF4444' : '#888';
                return `<strong>${p.name}</strong><br/>K/D: <span style="color:${color};font-weight:bold">${p.value}</span><br/>Result: <span style="color:${color}">${result}</span>`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: history.map(h => h.date.slice(5)), // Show month-day
            axisLabel: { color: '#666', fontSize: 10, rotate: 45 },
            axisLine: { lineStyle: { color: '#333' } },
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: Math.max(...history.map(h => h.kdRatio)) + 0.5,
            axisLabel: { color: '#666' },
            splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
        },
        series: [
            {
                name: 'K/D',
                type: 'line',
                smooth: true,
                data: history.map(h => h.kdRatio),
                lineStyle: {
                    color: '#8B5CF6',
                    width: 3
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(139, 92, 246, 0.4)' },
                            { offset: 1, color: 'rgba(139, 92, 246, 0)' }
                        ]
                    }
                },
                itemStyle: {
                    color: (params: any) => {
                        const result = history[params.dataIndex]?.result;
                        return result === 'W' ? '#10B981' : result === 'L' ? '#EF4444' : '#888';
                    }
                },
                symbolSize: 8,
                emphasis: {
                    itemStyle: { borderColor: '#fff', borderWidth: 2 }
                }
            },
            // Reference line at K/D = 1.0
            {
                type: 'line',
                markLine: {
                    silent: true,
                    symbol: 'none',
                    lineStyle: { color: '#444', type: 'dashed' },
                    data: [{ yAxis: 1 }],
                    label: { formatter: '1.0', color: '#666', fontSize: 10 }
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
