import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';
import { apiGet, apiPost } from '../../shared/apiHelpers';
import { StatusBadge } from '../../production/components/StatusBadge';
import { DetailRow } from '../../shared/components/DetailRow';
import type { AssetDetail } from '../../shared/types';
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
  // useAuth removed // kept if we need to show user info, though backend handles user auth natively
  const { registerView } = useRecentlyViewed();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LicensingFormData>({
    resolver: zodResolver(licensingSchema),
  });

  const { data: asset, isLoading, isError } = useQuery<AssetDetail>({
    queryKey: ['broadcaster-asset', id],
    queryFn: () => apiGet<AssetDetail>(`/api/v1/assets/${id}/`),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (data: LicensingFormData) => {
      if (!asset) throw new Error('Asset not found');
      return apiPost(`/api/v1/assets/${asset.id}/request-license/`, data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setTimeout(() => {
          setIsSuccess(false);
          reset();
        }, 300);
      }, 2000);
    },
  });

  const onSubmit = (data: LicensingFormData) => {
    mutation.mutate(data);
  };

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
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6 active:scale-[0.97] transition-transform duration-150"
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
          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent active:scale-[0.97] transition-all duration-150 ease-out"
        >
          Request licensing
        </button>
      </div>

      {/* Licensing Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => !mutation.isPending && !isSuccess && setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col"
            >
              {isSuccess ? (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
                  >
                    <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Sent</h3>
                  <p className="text-sm text-gray-500">
                    Didactik's rights team has been notified. We will review your request and get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-10">
                    <h2 className="text-lg font-semibold text-gray-900">Request Licensing</h2>
                    <button
                      type="button"
                      onClick={() => !mutation.isPending && setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-[0.97] transition-all"
                      disabled={mutation.isPending}
                    >
                      &times;
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Intended Use</label>
                      <select
                        {...register('intended_use')}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
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
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        placeholder="Any specific requirements or questions..."
                      />
                    </div>

                    {mutation.isError && (
                      <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100 flex items-start">
                        <span className="block">Failed to submit request. Please try again or contact support.</span>
                      </div>
                    )}

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 active:scale-[0.97] transition-all"
                        disabled={mutation.isPending}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="inline-flex items-center justify-center min-w-[140px] px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent active:scale-[0.97] transition-all duration-150 ease-out disabled:opacity-70 disabled:active:scale-100"
                      >
                        {mutation.isPending ? (
                          <FiLoader className="w-4 h-4 animate-spin" />
                        ) : (
                          'Submit Request'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
