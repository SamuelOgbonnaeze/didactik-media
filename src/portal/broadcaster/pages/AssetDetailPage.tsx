import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiGet } from '../../shared/apiHelpers';
import { StatusBadge } from '../../production/components/StatusBadge';
import { DetailRow } from '../../shared/components/DetailRow';
import type { AssetDetail } from '../../shared/types';
import { useAuth } from '../../shared/AuthContext';
import { useRecentlyViewed } from '../RecentlyViewedContext';

const licensingSchema = z.object({
  intended_use: z.string().min(1, 'Please select intended use'),
  territories: z.string().min(1, 'Territories are required'),
  duration: z.string().min(1, 'Duration is required'),
  notes: z.string().optional(),
});

type LicensingFormData = z.infer<typeof licensingSchema>;

export function BroadcasterAssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { registerView } = useRecentlyViewed();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LicensingFormData>({
    resolver: zodResolver(licensingSchema),
  });

  const onSubmit = (data: LicensingFormData) => {
    if (!asset) return;
    
    // Construct mailto link
    const subject = encodeURIComponent(`Licensing enquiry — ${asset.title}`);
    const body = encodeURIComponent(`Asset ID: ${asset.id}
Title: ${asset.title}
Requester: ${user?.email}

--- Request Details ---
Intended Use: ${data.intended_use}
Territories: ${data.territories}
Duration: ${data.duration}
Notes: ${data.notes || 'None'}
`);
    
    window.location.assign(`mailto:admin@didactikmedia.com?subject=${subject}&body=${body}`);
    
    // Reset and close
    reset();
    setIsModalOpen(false);
  };

  const { data: asset, isLoading, isError } = useQuery<AssetDetail>({
    queryKey: ['broadcaster-asset', id],
    queryFn: () => apiGet<AssetDetail>(`/api/v1/assets/${id}/`),
    enabled: !!id,
  });

  useEffect(() => {
    if (asset) {
      registerView(asset);
    }
  }, [asset, registerView]);

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (isError || !asset) {
    return (
      <div>
        <Link to="/portal/broadcaster/discover" className="text-sm text-primary hover:text-accent transition-colors duration-200 ease-out">
          ← Back to discover
        </Link>
        <p className="mt-4 text-sm text-red-600">Asset not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/portal/broadcaster/discover"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Back to discover
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{asset.title}</h1>
          {asset.original_title && (
            <p className="text-sm text-gray-400 mt-0.5">{asset.original_title}</p>
          )}
        </div>
        <StatusBadge status={asset.status} />
      </div>

      {/* Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <dl>
          <DetailRow label="Asset type" value={asset.asset_type.replace(/_/g, ' ')} />
          <DetailRow label="Production year" value={asset.production_year} />
          <DetailRow label="Language" value={asset.primary_language?.english_name} />
          <DetailRow label="Country" value={asset.production_country?.name} />
          <DetailRow label="Production company" value={asset.production_company?.name} />
          {asset.description && (
            <DetailRow
              label="Description"
              value={<span className="whitespace-pre-wrap">{asset.description}</span>}
            />
          )}
        </dl>
      </div>

      {/* Taxonomy tags */}
      {asset.taxonomy_tags.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Content taxonomy</h2>
          <div className="flex flex-wrap gap-2">
            {asset.taxonomy_tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                title={tag.english_gloss}
              >
                {tag.term}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Licensing enquiry */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Licensing enquiry</h2>
        <p className="text-sm text-gray-500 mb-4">
          Interested in licensing rights to this content? Fill out a request to contact Didactik's rights team.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent transition-colors duration-200 ease-out"
        >
          Request licensing
        </button>
      </div>

      {/* Licensing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Request Licensing</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intended Use</label>
                <select
                  {...register('intended_use')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select intended use...</option>
                  <option value="Broadcast TV">Broadcast TV</option>
                  <option value="VOD / Streaming">VOD / Streaming</option>
                  <option value="Educational / Institutional">Educational / Institutional</option>
                  <option value="Theatrical">Theatrical</option>
                  <option value="Other">Other</option>
                </select>
                {errors.intended_use && (
                  <p className="mt-1 text-xs text-red-600">{errors.intended_use.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Territories</label>
                <input
                  type="text"
                  {...register('territories')}
                  placeholder="e.g., Worldwide, Africa, UK only"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.territories && (
                  <p className="mt-1 text-xs text-red-600">{errors.territories.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration of License</label>
                <input
                  type="text"
                  {...register('duration')}
                  placeholder="e.g., 1 Year, 5 Years, Perpetuity"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.duration && (
                  <p className="mt-1 text-xs text-red-600">{errors.duration.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent transition-colors duration-200 ease-out disabled:opacity-50"
                >
                  {isSubmitting ? 'Preparing...' : 'Create Email Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
