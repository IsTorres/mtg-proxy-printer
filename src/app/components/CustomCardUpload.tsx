import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

interface CustomCardUploadProps {
  onAddCustom: (name: string, url: string) => void;
}

export function CustomCardUpload({ onAddCustom }: CustomCardUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setName(file.name.replace(/\.[^.]+$/, ""));

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleConfirm = () => {
    if (!preview || !name.trim()) return;
    onAddCustom(name.trim(), preview);
    setPreview(null);
    setName("");
    setFileName("");
  };

  const handleCancel = () => {
    setPreview(null);
    setName("");
    setFileName("");
  };

  if (preview) {
    return (
      <div className="px-4 py-3 border-b border-border">
        <div className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] mb-2">
          CUSTOM CARD
        </div>
        <div className="flex gap-3">
          <img
            src={preview}
            alt="Preview"
            className="w-12 h-[67px] object-cover flex-shrink-0 border border-border"
          />
          <div className="flex-1 min-w-0">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleConfirm()}
              placeholder="Card name…"
              className="w-full bg-input-background border border-border px-2 py-1 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors mb-1.5"
            />
            <div className="text-[9px] font-mono text-muted-foreground/50 truncate mb-2">
              {fileName}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handleConfirm}
                disabled={!name.trim()}
                className="flex-1 bg-accent text-[#0c0c11] text-[10px] font-mono font-medium tracking-wider py-1 hover:bg-accent/80 transition-colors disabled:opacity-30"
              >
                ADD
              </button>
              <button
                onClick={handleCancel}
                className="text-muted-foreground hover:text-foreground transition-colors px-1.5"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-border">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 border border-border border-dashed py-2 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors"
      >
        <Upload size={12} />
        UPLOAD CUSTOM CARD
      </button>
    </div>
  );
}
