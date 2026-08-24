import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Loader2, Trash2, Mail } from "lucide-react";
import UploadSlot from "@/components/admin/UploadSlot";

const ASSET_SLOTS = [
  { key: "cv", label: "CV / Resume (PDF)", hint: "Linked to the Download CV button", accept: ".pdf", type: "pdf" },
  { key: "profile_image", label: "Profile Portrait", hint: "Shown in the About section", accept: "image/*", type: "image" },
  { key: "portfolio_1", label: "Portfolio Image 1", hint: "Copy URL to embed in content", accept: "image/*", type: "image" },
  { key: "portfolio_2", label: "Portfolio Image 2", hint: "Copy URL to embed in content", accept: "image/*", type: "image" },
  { key: "portfolio_3", label: "Portfolio Image 3", hint: "Copy URL to embed in content", accept: "image/*", type: "image" },
  { key: "portfolio_4", label: "Portfolio Image 4", hint: "Copy URL to embed in content", accept: "image/*", type: "image" },
];

export default function Admin() {
  const [assets, setAssets] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [assetList, subList] = await Promise.all([
        base44.entities.SiteAsset.list(),
        base44.entities.Subscriber.list("-created_date", 100),
      ]);
      setAssets(assetList);
      setSubscribers(subList);
    } catch {
      setError("Failed to load data. Make sure you are logged in.");
    }
    setLoading(false);
  };

  const uploadFile = async (file, slot) => {
    setUploadingKey(slot.key);
    setError(null);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const existing = assets.find((a) => a.key === slot.key);
      if (existing) {
        await base44.entities.SiteAsset.update(existing.id, { url: file_url, label: slot.label, file_type: slot.type });
      } else {
        await base44.entities.SiteAsset.create({ key: slot.key, label: slot.label, url: file_url, file_type: slot.type });
      }
      await loadData();
    } catch (err) {
      setError("Upload failed: " + (err.message || "Unknown error"));
    }
    setUploadingKey(null);
  };

  const deleteAsset = async (id) => {
    if (!id) return;
    try {
      await base44.entities.SiteAsset.delete(id);
      await loadData();
    } catch (err) {
      setError("Delete failed: " + err.message);
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getAsset = (key) => assets.find((a) => a.key === key);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 size={32} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="ledger-label">Admin Panel</span>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">Content Manager</h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-body text-sm text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-sm border border-destructive/30 bg-destructive/5 p-4">
            <p className="font-body text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Essential Assets */}
        <section className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-foreground">Essential Assets</h2>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Upload your CV and profile portrait. These appear on the public site automatically.
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {ASSET_SLOTS.slice(0, 2).map((slot) => (
              <UploadSlot
                key={slot.key}
                asset={getAsset(slot.key)}
                uploading={uploadingKey === slot.key}
                accept={slot.accept}
                label={slot.label}
                hint={slot.hint}
                onUpload={(file) => uploadFile(file, slot)}
                onDelete={() => deleteAsset(getAsset(slot.key)?.id)}
                onCopy={copyUrl}
                copied={copiedUrl === getAsset(slot.key)?.url}
              />
            ))}
          </div>
        </section>

        {/* Portfolio Images */}
        <section className="mt-10">
          <h2 className="font-heading text-lg font-semibold text-foreground">Portfolio Images</h2>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            Upload project images. Click the copy icon to grab the URL for use in your content.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ASSET_SLOTS.slice(2).map((slot) => (
              <UploadSlot
                key={slot.key}
                asset={getAsset(slot.key)}
                uploading={uploadingKey === slot.key}
                accept={slot.accept}
                label={slot.label}
                hint={slot.hint}
                onUpload={(file) => uploadFile(file, slot)}
                onDelete={() => deleteAsset(getAsset(slot.key)?.id)}
                onCopy={copyUrl}
                copied={copiedUrl === getAsset(slot.key)?.url}
              />
            ))}
          </div>
        </section>

        {/* Subscribers */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">Newsletter Subscribers</h2>
            <span className="rounded-full border border-border bg-card px-3 py-1 font-mono-data text-[0.65rem] text-muted-foreground">
              {subscribers.length} total
            </span>
          </div>
          {subscribers.length === 0 ? (
            <div className="mt-5 rounded-sm border border-dashed border-border p-8 text-center">
              <Mail size={24} className="mx-auto text-muted-foreground/40" />
              <p className="mt-3 font-body text-sm text-muted-foreground">No subscribers yet.</p>
            </div>
          ) : (
            <div className="mt-5 overflow-hidden rounded-sm border border-border bg-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-3 text-left font-mono-data text-[0.6rem] tracking-wide text-muted-foreground">EMAIL</th>
                    <th className="px-4 py-3 text-left font-mono-data text-[0.6rem] tracking-wide text-muted-foreground">DATE</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-body text-sm text-foreground">{s.email}</td>
                      <td className="px-4 py-3 font-mono-data text-xs text-muted-foreground">
                        {new Date(s.created_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={async () => {
                            await base44.entities.Subscriber.delete(s.id);
                            loadData();
                          }}
                          className="text-destructive transition-colors hover:text-destructive/80"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}