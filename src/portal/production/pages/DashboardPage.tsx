import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../../shared/AuthContext';
import { apiFetch } from '../../shared/api';
import type { AssetListItem, PaginatedResponse } from '../../shared/types';
import { StatCard } from '../../shared/components/StatCard';

export function ProductionDashboardPage() {
  const { user } = useAuth();

  const { data: response, isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: () => apiFetch<PaginatedResponse<AssetListItem>>('/api/v1/assets/'),
  });

  const assets = response?.results || [];

  const totalAssets = assets.length;
  const readyToList = assets.filter((a) => a.status === 'READY_TO_PITCH').length;
  const reviewPending = assets.filter((a) => a.status === 'REVIEW_PENDING').length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Welcome back, {user?.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-gray-500">
          Here is an overview of your production catalogue.
        </p>
      </div>

      {!isLoading && totalAssets === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to the portal!
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't uploaded any assets yet. Get started by submitting your first title for review.
          </p>
          <Link
            to="/portal/production/submit"
            className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit New Asset
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Assets"
            value={totalAssets}
            loading={isLoading}
            accent="primary"
          />
          <StatCard
            label="Ready to Pitch"
            value={readyToList}
            loading={isLoading}
            accent="green"
            sublabel="Approved and visible to broadcasters"
          />
          <StatCard
            label="Review Pending"
            value={reviewPending}
            loading={isLoading}
            accent="yellow"
            sublabel="Waiting for admin approval"
          />
        </div>
      )}
    </div>
  );
}
