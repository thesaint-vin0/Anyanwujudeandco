import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

// Fetches a single site asset by its key (e.g., "cv", "profile_image").
// Returns { url, loading }. Falls back to null if the asset doesn't exist
// or the entity is inaccessible to the current user.
export function useSiteAsset(key) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const assets = await base44.entities.SiteAsset.filter({ key });
        if (active && assets.length > 0) {
          setUrl(assets[0].url);
        }
      } catch {
        // Entity may not be accessible to unauthenticated users — fall back to defaults
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [key]);

  return { url, loading };
}