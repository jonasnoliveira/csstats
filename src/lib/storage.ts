import fs from 'fs-extra';
import path from 'path';
import { CS2PlayerStats } from './types';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'squad.json');

export async function getSquadData(): Promise<CS2PlayerStats[]> {
    try {
        if (await fs.pathExists(DATA_FILE)) {
            return await fs.readJson(DATA_FILE);
        }
    } catch (error) {
        console.error("Failed to read squad data", error);
    }
    return [];
}

export async function saveSquadMember(player: CS2PlayerStats) {
    try {
        let currentData = await getSquadData();
        // Update or Add
        const index = currentData.findIndex(p => p.steamId === player.steamId);
        if (index >= 0) {
            currentData[index] = player;
        } else {
            currentData.push(player);
        }
        await fs.writeJson(DATA_FILE, currentData, { spaces: 2 });
    } catch (error) {
        console.error("Failed to save squad data", error);
    }
}
