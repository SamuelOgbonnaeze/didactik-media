import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiGet, apiPost } from '../../shared/apiHelpers';
import { apiFetch } from '../../shared/api';
import { StatusBadge } from '../components/StatusBadge';
import { DetailRow } from '../../shared/components/DetailRow';
import type { AssetDetail, AssetStatus } from '../../shared/types';

const WITHDRAWABLE: Set<AssetStatus> = new Set([
  'pending_admin_approval',
  'pending_upload',
  'uploaded',
  'under_review',
  'ready_to_list',
]);

const EDITABLE: Set<AssetStatus> = new Set([
  'pending_admin_approval',
  'pending_upload',
  'uploaded',
  'rejected',
]);

const editSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(500),
  production_year: z.union([z.number().int().min(1900).max(2030), z.nan()]).optional(),
  description: z.string().max(5000).optional(),
});

type EditFormData = z.infer<typeof editSchema>;

export function ProductionAssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: asset, isLoading, isError } = useQuery<AssetDetail>({
    queryKey: ['asset', id],
    queryFn: () => apiGet<AssetDetail>(`/api/v1/assets/${id}/`),
    enabled: !!id,
  });

  const withdrawMutation = useMutation({
    mutationFn: () => apiPost(`/api/v1/assets/${id}/withdraw/`, {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['asset', id] });
      qc.invalidateQueries({ queryKey: ['production-assets'] });
      setConfirmWithdraw(false);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  });

  const editMutation = useMutation({
    mutationFn: async (data: EditFormData) => {
      const payload = {
        ...data,
        production_year: Number.isNaN(data.production_year) ? undefined : data.production_year,
      };
      const res = await apiFetch(`/api/v1/assets/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update asset');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['asset', id] });
      qc.invalidateQueries({ queryKey: ['production-assets'] });
      setIsEditModalOpen(false);
    },
  });

  const openEditModal = () => {
    if (asset) {
      reset({
        title: asset.title,
        production_year: asset.production_year ?? undefined,
        description: asset.description ?? undefined,
      });
      setIsEditModalOpen(true);
    }
  };

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (isError || !asset) {
    return (
      <div>
        <Link to="/portal/production/assets" className="text-sm text-indigo-600">← Back to assets</Link>
        <p className="mt-4 text-sm text-red-600">Asset not found or failed to load.</p>
      </div>
    );
  }

  const canWithdraw = WITHDRAWABLE.has(asset.status);
  const canEdit = EDITABLE.has(asset.status);

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/portal/production/assets"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Back to assets
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

      {/* Rejection reason — shown prominently when rejected */}
      {asset.status === 'rejected' && asset.rejection_reason && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm font-medium text-red-800 mb-1">Submission rejected</p>
          <p className="text-sm text-red-700">{asset.rejection_reason}</p>
        </div>
      )}

      {/* Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <dl>
          <DetailRow label="Asset type" value={asset.asset_type.replace(/_/g, ' ')} />
          <DetailRow label="Production year" value={asset.production_year} />
          <DetailRow label="Language" value={asset.primary_language?.english_name} />
          <DetailRow label="Country" value={asset.production_country?.name} />
          <DetailRow
            label="Description"
            value={
              asset.description ? (
                <span className="whitespace-pre-wrap">{asset.description}</span>
              ) : null
            }
          />
          <DetailRow
            label="Submitted"
            value={new Date(asset.created_at).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          />
          {asset.approved_at && (
            <DetailRow
              label="Approved"
              value={new Date(asset.approved_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            />
          )}
        </dl>
      </div>

      {/* Taxonomy tags — if any */}
      {asset.taxonomy_tags.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Taxonomy tags</h2>
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

      {/* Action Bar */}
      {(canWithdraw || canEdit) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Asset Actions</h2>
            <p className="text-sm text-gray-500">
              Manage your asset submission. Withdrawing cannot be undone.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {canEdit && (
              <button
                type="button"
                onClick={openEditModal}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent transition-colors duration-200 ease-out"
              >
                Edit Metadata
              </button>
            )}

            {canWithdraw && !confirmWithdraw && (
              <button
                type="button"
                onClick={() => setConfirmWithdraw(true)}
                className="px-4 py-2 rounded-md text-sm font-medium text-red-700 border border-red-300 hover:bg-red-50 transition-colors"
              >
                Withdraw asset
              </button>
            )}

            {confirmWithdraw && (
              <div className="flex items-center gap-2 border border-red-200 rounded-md p-1 bg-red-50">
                <button
                  type="button"
                  onClick={() => withdrawMutation.mutate()}
                  disabled={withdrawMutation.isPending}
                  className="px-4 py-1.5 rounded text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {withdrawMutation.isPending ? 'Withdrawing…' : 'Confirm'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmWithdraw(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          {withdrawMutation.isError && (
            <p className="w-full mt-2 text-xs text-red-600">
              {withdrawMutation.error instanceof Error
                ? withdrawMutation.error.message
                : 'Withdraw failed. Please try again.'}
            </p>
          )}
        </div>
      )}

      {/* Edit Metadata Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Edit Metadata</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit((data) => editMutation.mutate(data))} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Production Year</label>
                <input
                  type="number"
                  {...register('production_year', { valueAsNumber: true })}
                  placeholder="YYYY"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.production_year && (
                  <p className="mt-1 text-xs text-red-600">{errors.production_year.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
                )}
              </div>
              
              {editMutation.isError && (
                <p className="text-sm text-red-600">
                  {editMutation.error instanceof Error ? editMutation.error.message : 'Update failed.'}
                </p>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || editMutation.isPending}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-accent transition-colors duration-200 ease-out disabled:opacity-50"
                >
                  {isSubmitting || editMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
