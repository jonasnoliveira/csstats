import { ReactNode, CSSProperties } from 'react';
import styles from './GlassCard.module.css';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
}

export function GlassCard({ children, className, hoverEffect = false, style, onClick }: GlassCardProps) {
    return (
        <div
            className={cn(
                styles.card,
                hoverEffect && styles.hoverEffect,
                className
            )}
            style={style}
            onClick={onClick}
        >
            <div className={styles.reflection} />
            {children}
        </div>
    );
}
