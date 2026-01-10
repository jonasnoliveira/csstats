import { Navbar } from '@/components/layout/Navbar';
import { PlayerDetail } from '@/components/dashboard/PlayerDetail';
import { getSquadData } from '@/lib/storage';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ steamId: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
    const { steamId } = await params;

    // Use cached squad data instead of making API requests
    const squadData = await getSquadData();
    const player = squadData.find(p => p.steamId === steamId) || null;

    if (!player) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            <Navbar />
            <main className="container pt-8">
                <PlayerDetail player={player} />
            </main>
        </div>
    );
}
