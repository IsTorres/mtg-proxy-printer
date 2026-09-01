import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { CropImage } from "./CropImage";

interface CustomCardUploadProps {
  onAddCustom: (name: string, url: string) => void;
}

type Step = "upload" | "crop" | "name";

export function CustomCardUpload({ onAddCustom }: CustomCardUploadProps) {
  const [step, setStep] = useState<Step>("upload");
  const [rawImageUrl, setRawImageUrl] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setName(file.name.replace(/\.[^.]+$/, ""));

    const reader = new FileReader();
    reader.onload = () => {
      setRawImageUrl(reader.result as string);
      setStep("crop");
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleCrop = (croppedUrl: string) => {
    setCroppedImageUrl(croppedUrl);
    setStep("name");
  };

  const handleConfirm = () => {
    if (!croppedImageUrl || !name.trim()) return;
    onAddCustom(name.trim(), croppedImageUrl);
    reset();
  };

  const handleCancelCrop = () => {
    setRawImageUrl("");
    setStep("upload");
  };

  const reset = () => {
    setStep("upload");
    setRawImageUrl("");
    setCroppedImageUrl("");
    setName("");
    setFileName("");
  };

  // Step 3: Name input with cropped preview
  if (step === "name") {
    return (
      <div className="px-4 py-3 border-b border-border">
        <div className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] mb-2">
          CUSTOM CARD
        </div>
        <div className="flex gap-3">
          <img
            src={croppedImageUrl}
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
                onClick={reset}
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

  // Step 2: Crop
  if (step === "crop") {
    return (
      <div className="px-4 py-3 border-b border-border">
        <div className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] mb-2">
          CROP YOUR CARD
        </div>
        <CropImage
          imageUrl={rawImageUrl}
          onCrop={handleCrop}
          onCancel={handleCancelCrop}
        />
      </div>
    );
  }

  // Step 1: Upload button
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
