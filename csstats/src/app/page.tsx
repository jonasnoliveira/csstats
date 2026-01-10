import { Navbar } from '@/components/layout/Navbar';
import { SquadOverview } from '@/components/dashboard/SquadOverview';
import { RankingSidebar } from '@/components/layout/RankingSidebar';
import { getSquadData } from '@/lib/storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard() {
  const players = await getSquadData();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0b10 0%, #12141c 50%, #0a0b10 100%)'
    }}>
      <Navbar />

      {/* Fixed Sidebars */}
      <RankingSidebar
        players={players}
        sections={['kd', 'rating', 'winrate']}
        title="TOP PERFORMERS"
        position="left"
      />
      <RankingSidebar
        players={players}
        sections={['adr', 'hs', 'matches']}
        title="STAT LEADERS"
        position="right"
      />

      {/* Center - Main Content with margins for fixed sidebars */}
      <main style={{
        marginLeft: '308px',
        marginRight: '308px',
        padding: '24px 32px',
        minHeight: 'calc(100vh - 80px)'
      }}>
        <SquadOverview players={players} />
      </main>
    </div>
  );
}
