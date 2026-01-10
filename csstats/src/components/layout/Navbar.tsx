import { Search } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './Navbar.module.css';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <GlassCard className={styles.navContainer}>
                <div className={styles.logo}>
                    <span className="text-gradient">CS2</span>STATS
                </div>

                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder="Search player (Steam ID / URL)..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.actions}>
                    {/* Placeholder for login or other actions */}
                    <div className={styles.userIcon}>JD</div>
                </div>
            </GlassCard>
        </nav>
    );
}
