import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../../shared/apiHelpers';
import { paginationPath } from '../../shared/apiHelpers';
import { StatusBadge } from '../../production/components/StatusBadge';
import type { AssetListItem, PaginatedResponse, SearchAsset } from '../../shared/types';

export function BroadcasterDiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPage, setSearchPage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const isSearching = searchTerm.trim().length > 0;

  // Default: all READY_TO_LIST assets (role-filtered by backend)
  const { data: allAssets, isLoading: allLoading } = useQuery<AssetListItem[]>({
    queryKey: ['broadcaster-assets'],
    queryFn: () => apiGet<AssetListItem[]>('/api/v1/assets/'),
    enabled: !isSearching,
  });

  // Suggest dropdown
  const { data: suggestions } = useQuery<string[]>({
    queryKey: ['broadcaster-suggest', searchTerm],
    queryFn: () => apiGet<string[]>(`/api/v1/suggest/?q=${encodeURIComponent(searchTerm.trim())}`),
    enabled: isSearching && isFocused,
  });

  // Search: paginated results via the search endpoint
  const searchUrl = searchPage ?? `/api/v1/search/?q=${encodeURIComponent(searchTerm.trim())}`;
  const { data: searchResults, isLoading: searchLoading } = useQuery<PaginatedResponse<SearchAsset>>({
    queryKey: ['broadcaster-search', searchTerm, searchPage],
    queryFn: () => apiGet<PaginatedResponse<SearchAsset>>(searchUrl),
    enabled: isSearching,
  });

  const isLoading = isSearching ? searchLoading : allLoading;

  const assets: (AssetListItem | SearchAsset)[] = isSearching
    ? (searchResults?.results ?? [])
    : (allAssets ?? []);

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setSearchPage(null); // reset to first page on new query
  }

  function handleSuggestionClick(suggestion: string) {
    setSearchTerm(suggestion);
    setSearchPage(null);
    setIsFocused(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Discover Content</h1>

      {/* Search */}
      <div className="mb-4 flex items-center relative z-10 w-80">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search titles, descriptions, taxonomy tags…"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Delay hiding to allow click event on suggestions
              setTimeout(() => setIsFocused(false), 200);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow duration-200"
          />
          
          <AnimatePresence>
            {isFocused && suggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden origin-top"
              >
                <ul className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-150"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isSearching && searchResults && (
          <span className="ml-3 text-sm text-gray-400 whitespace-nowrap">
            {searchResults.count} result{searchResults.count !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading…</p>}

      {!isLoading && assets.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p>{isSearching ? 'No results for that query.' : 'No content available yet.'}</p>
        </div>
      )}

      {assets.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Production company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">
                    {asset.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize">
                    {asset.asset_type.replace(/_/g, ' ')}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {asset.primary_language?.english_name ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {asset.production_country?.name ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {asset.production_year ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {asset.production_company?.name ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/portal/broadcaster/discover/${asset.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination — only shown for search results */}
      {isSearching && searchResults && (searchResults.next || searchResults.previous) && (
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={() => searchResults.previous && setSearchPage(paginationPath(searchResults.previous))}
            disabled={!searchResults.previous}
            className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => searchResults.next && setSearchPage(paginationPath(searchResults.next))}
            disabled={!searchResults.next}
            className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
