import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './GamerButton.module.css';
import { cn } from '@/lib/utils';

interface GamerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
}

export function GamerButton({ children, className, variant = 'primary', ...props }: GamerButtonProps) {
    return (
        <button
            className={cn(styles.button, styles[variant], className)}
            {...props}
        >
            <span className={styles.content}>{children}</span>
            <div className={styles.glow} />
        </button>
    );
}
