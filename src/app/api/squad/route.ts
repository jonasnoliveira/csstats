import { NextResponse } from "next/server";
import { getSquadData } from "@/lib/storage";

export async function GET() {
    try {
        const players = await getSquadData();
        return NextResponse.json(players);
    } catch (error) {
        console.error("Failed to get squad data:", error);
        return NextResponse.json([], { status: 500 });
    }
}
