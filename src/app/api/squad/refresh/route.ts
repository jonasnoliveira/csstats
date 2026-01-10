import { NextResponse } from "next/server";
import { CS2PlayerStats } from "@/lib/types";

const PLAYERS = [
    { id: "76561199526211781", name: "JohnGOD" },
    { id: "76561199553832372", name: "Bielzin da ZL" },
    { id: "76561198396424299", name: "Caga Tronco" },
    { id: "76561198143046972", name: "OREIA SECA" },
    { id: "76561198117500081", name: "Silos Malafaio" },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST() {
    try {
        const results: CS2PlayerStats[] = [];

        for (const player of PLAYERS) {
            console.log(`Refreshing: ${player.name}...`);
            const res = await fetch(`http://localhost:3000/api/player/${player.id}`, {
                cache: 'no-store'
            });

            if (res.ok) {
                const data = await res.json();
                results.push(data);
            }

            await delay(3000); // 3 seconds between requests to avoid rate limiting
        }

        return NextResponse.json({
            success: true,
            count: results.length,
            message: `Refreshed ${results.length} players`
        });
    } catch (error) {
        console.error("Refresh failed:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
