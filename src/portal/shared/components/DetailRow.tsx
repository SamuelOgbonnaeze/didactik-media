import React from 'react';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
      <dt className="w-40 shrink-0 text-sm text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900 flex-1">{value ?? '—'}</dd>
    </div>
  );
}
