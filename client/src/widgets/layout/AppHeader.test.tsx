import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { AppHeader } from './AppHeader';

const renderHeader = (props: Partial<ComponentProps<typeof AppHeader>> = {}) => {
  return render(
    <MemoryRouter>
      <AppHeader
        hasPendingChanges={false}
        isOnline
        isSyncing={false}
        lastSyncedAt={null}
        syncError={null}
        username="demo"
        onLogout={vi.fn()}
        onSyncNow={vi.fn()}
        {...props}
      />
    </MemoryRouter>
  );
};

describe('AppHeader', () => {
  it('shows offline mode', () => {
    renderHeader({ isOnline: false });

    expect(screen.getByText('Offline mode')).toBeInTheDocument();
  });

  it('shows pending sync state', () => {
    renderHeader({ hasPendingChanges: true });

    expect(screen.getByText('Sync pending')).toBeInTheDocument();
  });

  it('shows sync failure state', () => {
    renderHeader({ syncError: 'failed' });

    expect(screen.getByText('Sync failed')).toBeInTheDocument();
  });

  it('shows syncing state', () => {
    renderHeader({ isSyncing: true });

    expect(screen.getByText('Syncing...')).toBeInTheDocument();
  });
});
