import { useRef } from "react";
import { Upload, Loader2, Trash2, Copy, Check, ExternalLink, FileText, Image as ImageIcon } from "lucide-react";

// Reusable upload slot for the admin panel.
// Props: asset (SiteAsset record or undefined), onUpload(file), onDelete(), onCopy(url), copied (bool), uploading (bool), accept, label, hint
export default function UploadSlot({ asset, onUpload, onDelete, onCopy, copied, uploading, accept = "image/*", label, hint }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = "";
  };

  const isPdf = accept.includes("pdf");

  return (
    <div className="rounded-sm border border-border bg-card p-5">
      <div>
        <p className="font-heading text-sm font-semibold text-foreground">{label}</p>
        {hint && <p className="mt-0.5 font-body text-xs text-muted-foreground">{hint}</p>}
      </div>

      <div className="mt-4">
        {asset ? (
          <div className="space-y-3">
            {!isPdf && (
              <div className="aspect-video overflow-hidden rounded-sm border border-border bg-muted/40">
                <img src={asset.url} alt={asset.label} className="h-full w-full object-cover" />
              </div>
            )}
            {isPdf && (
              <div className="flex items-center gap-3 rounded-sm border border-border bg-muted/40 p-4">
                <FileText size={24} className="text-accent" />
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-foreground">{asset.label || "Uploaded file"}</p>
                  <a href={asset.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono-data text-[0.6rem] text-secondary hover:underline">
                    View file <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex-1 rounded-sm border border-border bg-background px-3 py-2 font-body text-xs text-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                {uploading ? <Loader2 size={14} className="animate-spin" /> : "Replace"}
              </button>
              <button
                onClick={() => onCopy(asset.url)}
                className="rounded-sm border border-border bg-background px-3 py-2 text-foreground transition-colors hover:bg-muted"
                title="Copy URL"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
              <button
                onClick={onDelete}
                className="rounded-sm border border-border bg-background px-3 py-2 text-destructive transition-colors hover:bg-destructive/5"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-secondary hover:bg-muted/50 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={24} className="animate-spin text-muted-foreground" />
            ) : isPdf ? (
              <Upload size={24} className="text-muted-foreground" />
            ) : (
              <ImageIcon size={24} className="text-muted-foreground" />
            )}
            <span className="font-body text-xs text-muted-foreground">
              {uploading ? "Uploading…" : "Click to upload"}
            </span>
          </button>
        )}
        <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
      </div>
    </div>
  );
}