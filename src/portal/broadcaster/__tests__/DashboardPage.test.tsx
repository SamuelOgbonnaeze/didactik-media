import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BroadcasterDashboardPage } from '../pages/DashboardPage';
import { apiFetch } from '../../shared/api';
import { RecentlyViewedProvider } from '../RecentlyViewedContext';

vi.mock('../../shared/AuthContext', () => ({
  useAuth: () => ({ user: { email: 'broadcaster@example.com', role: 'broadcaster_user' } }),
}));

vi.mock('../../shared/api', () => ({
  apiFetch: vi.fn(),
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <RecentlyViewedProvider>
          {children}
        </RecentlyViewedProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('BroadcasterDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders stats and latest additions when assets are present', async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 5);
    
    const mockAssets = [
      { id: 1, title: 'Asset 1', status: 'ready_to_list', created_at: thirtyDaysAgo.toISOString(), asset_type: 'feature_film' },
      { id: 2, title: 'Asset 2', status: 'ready_to_list', created_at: new Date('2020-01-01').toISOString(), asset_type: 'documentary' },
    ];
    vi.mocked(apiFetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ count: mockAssets.length, next: null, previous: null, results: mockAssets }),
    } as unknown as Response);

    render(<BroadcasterDashboardPage />, { wrapper: Wrapper });

    expect(screen.getByText('Welcome back, broadcaster')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Total Catalogue')).toBeDefined();
    });

    // Stat values
    expect(screen.getByText('2')).toBeDefined(); // Total Catalogue
    expect(screen.getByText('1')).toBeDefined(); // New This Month

    // Table rows
    expect(screen.getByText('Asset 1')).toBeDefined();
    expect(screen.getByText('feature film')).toBeDefined();
    expect(screen.getByText('Asset 2')).toBeDefined();
    
    // Recently viewed should not be visible
    expect(screen.queryByText('Recently Viewed')).toBeNull();
  });
});
