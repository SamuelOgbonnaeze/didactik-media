import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductionDashboardPage } from '../pages/DashboardPage';
import { apiFetch } from '../../shared/api';

vi.mock('../../shared/AuthContext', () => ({
  useAuth: () => ({ user: { email: 'prod@example.com', role: 'production_company_user' } }),
}));

vi.mock('../../shared/api', () => ({
  apiFetch: vi.fn(),
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('ProductionDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows empty state when there are no assets', async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ count: 0, next: null, previous: null, results: [] }),
    } as unknown as Response);

    render(<ProductionDashboardPage />, { wrapper: Wrapper });

    expect(screen.getByText('Welcome back, prod')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Welcome to the portal!')).toBeDefined();
    });
    
    expect(screen.getByText("You haven't uploaded any assets yet. Get started by submitting your first title for review.")).toBeDefined();
  });

  it('shows stat cards when there are assets', async () => {
    const mockAssets = [
      { id: 1, title: 'Asset 1', status: 'ready_to_list' },
      { id: 2, title: 'Asset 2', status: 'pending_admin_approval' },
      { id: 3, title: 'Asset 3', status: 'pending_admin_approval' },
      { id: 4, title: 'Asset 4', status: 'uploaded' },
    ];
    vi.mocked(apiFetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ count: mockAssets.length, next: null, previous: null, results: mockAssets }),
    } as unknown as Response);

    render(<ProductionDashboardPage />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText('Total Assets')).toBeDefined();
    });

    // We check values rendered in StatCard by querying their values
    expect(screen.getByText('4')).toBeDefined(); // Total Assets
    expect(screen.getByText('1')).toBeDefined(); // Ready to Pitch
    expect(screen.getByText('2')).toBeDefined(); // Review Pending
    
    // Ensure empty state is not visible
    expect(screen.queryByText('Welcome to the portal!')).toBeNull();
  });
});
