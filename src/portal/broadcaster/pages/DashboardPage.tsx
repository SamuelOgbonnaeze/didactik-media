import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/AuthContext';
import { apiFetch } from '../../shared/api';
import type { AssetListItem, PaginatedResponse } from '../../shared/types';
import { StatCard } from '../../shared/components/StatCard';
import { useRecentlyViewed } from '../RecentlyViewedContext';
import { StatusBadge } from '../../production/components/StatusBadge';

export function BroadcasterDashboardPage() {
  const { user } = useAuth();
  const { recentlyViewed } = useRecentlyViewed();

  const { data: response, isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const res = await apiFetch('/api/v1/assets/');
      if (!res.ok) throw new Error('Failed to fetch assets');
      return res.json() as Promise<PaginatedResponse<AssetListItem>>;
    },
  });

  const assets = response?.results || [];

  const totalAssets = assets.length;
  
  // Calculate "New This Month" (created within last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newThisMonth = assets.filter((a) => new Date(a.created_at) >= thirtyDaysAgo).length;

  // Sort by created_at desc to get latest additions
  const latestAdditions = [...assets].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const newestFive = latestAdditions.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Welcome back, {user?.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-gray-500">
          Discover the latest content available for licensing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <StatCard
          label="Total Catalogue"
          value={totalAssets}
          loading={isLoading}
          accent="primary"
        />
        <StatCard
          label="New This Month"
          value={newThisMonth}
          loading={isLoading}
          accent="green"
        />
      </div>

      {/* Recently Viewed (Only visible if there are any) */}
      {recentlyViewed.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {recentlyViewed.map((asset) => (
              <Link
                key={asset.id}
                to={`/portal/broadcaster/discover/${asset.id}`}
                className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors block"
              >
                <div className="font-medium text-gray-900 truncate mb-1" title={asset.title}>
                  {asset.title}
                </div>
                <div className="text-xs text-gray-500 flex items-center justify-between mt-2">
                  <span className="truncate max-w-[120px]">
                    {asset.production_company?.name || 'Unknown Studio'}
                  </span>
                  <span>{asset.production_year || 'N/A'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newest Titles Table */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Latest Additions</h2>
          <Link to="/portal/broadcaster/discover" className="text-sm font-medium text-primary hover:text-accent transition-colors">
            View all →
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading latest assets...</div>
          ) : newestFive.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No assets available yet.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Studio
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newestFive.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{asset.title}</div>
                      {asset.production_year && (
                        <div className="text-xs text-gray-500">{asset.production_year}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.asset_type.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.production_company?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={asset.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/portal/broadcaster/discover/${asset.id}`} className="text-primary hover:text-accent">
                        View details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
