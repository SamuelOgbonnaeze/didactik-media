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
    vi.mocked(apiFetch).mockResolvedValueOnce({ count: 0, next: null, previous: null, results: [] });

    render(<ProductionDashboardPage />, { wrapper: Wrapper });

    expect(screen.getByText('Welcome back, prod')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Welcome to the portal!')).toBeDefined();
    });
    
    expect(screen.getByText("You haven't uploaded any assets yet. Get started by submitting your first title for review.")).toBeDefined();
  });

  it('shows stat cards when there are assets', async () => {
    const mockAssets = [
      { id: 1, title: 'Asset 1', status: 'READY_TO_PITCH' },
      { id: 2, title: 'Asset 2', status: 'REVIEW_PENDING' },
      { id: 3, title: 'Asset 3', status: 'REVIEW_PENDING' },
      { id: 4, title: 'Asset 4', status: 'UPLOADED' },
    ];
    vi.mocked(apiFetch).mockResolvedValueOnce({ count: mockAssets.length, next: null, previous: null, results: mockAssets });

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
