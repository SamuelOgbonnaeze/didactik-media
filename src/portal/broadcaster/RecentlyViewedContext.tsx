import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AssetListItem } from '../shared/types';

interface RecentlyViewedContextValue {
  recentlyViewed: AssetListItem[];
  registerView: (asset: AssetListItem) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<AssetListItem[]>([]);

  const registerView = (asset: AssetListItem) => {
    setRecentlyViewed((prev) => {
      // Remove if it already exists, then prepend it so it's most recent
      const filtered = prev.filter((a) => a.id !== asset.id);
      return [asset, ...filtered].slice(0, 10); // Keep max 10
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, registerView }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
