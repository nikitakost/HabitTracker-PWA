import { Button } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  hasPendingChanges: boolean;
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: number | null;
  onLogout: () => Promise<void>;
  onSyncNow: () => Promise<void>;
  syncError: string | null;
  username: string;
}

const formatSyncTime = (value: number) =>
  new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(value);

export const AppHeader = ({
  hasPendingChanges,
  isOnline,
  isSyncing,
  lastSyncedAt,
  onLogout,
  onSyncNow,
  syncError,
  username,
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const statusLabel = !isOnline
    ? 'Offline mode'
    : isSyncing
      ? 'Syncing...'
      : syncError
        ? 'Sync failed'
        : hasPendingChanges
          ? 'Sync pending'
          : lastSyncedAt
            ? `Synced ${formatSyncTime(lastSyncedAt)}`
            : 'Online';
  const statusTone = !isOnline
    ? 'bg-amber-50 text-warning'
    : syncError
      ? 'bg-red-50 text-danger'
      : hasPendingChanges
        ? 'bg-teal-50 text-primary'
        : 'bg-emerald-50 text-success';

  return (
    <header className="glass-panel sticky top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-[1.8rem] border border-white/80 px-4 py-4 shadow-panel sm:px-6">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-muted">
          Daily rhythm dashboard
        </div>
        <div className="mt-1 font-display text-2xl text-dark">
          Hello, <Link to="/profile" className="text-primary hover:text-dark transition-colors">{username}</Link>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className={`hidden items-center gap-2 rounded-full px-3 py-2 shadow-soft sm:flex ${statusTone}`}>
          {isSyncing && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
          <span className="text-sm font-semibold">{statusLabel}</span>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="hidden px-4 py-3 text-sm sm:inline-flex"
          disabled={!isOnline || isSyncing}
          onClick={() => void onSyncNow()}
        >
          Sync now
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/profile')}>
          Profile
        </Button>
        <Button type="button" variant="ghost" onClick={() => void onLogout()}>
          Logout
        </Button>
      </div>
    </header>
  );
};
