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

  if (step === "name") {
    return (
      <div className="px-5 py-4 border-b border-outline-variant/30">
        <div className="text-[10px] font-mono text-primary tracking-[0.15em] mb-2 uppercase">
          Custom Card
        </div>
        <div className="flex gap-3">
          <img
            src={croppedImageUrl}
            alt="Preview"
            className="w-12 h-[67px] object-cover flex-shrink-0 border border-outline-variant/30 rounded"
          />
          <div className="flex-1 min-w-0">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleConfirm()}
              placeholder="Card name…"
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-2 py-1 text-[12px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all mb-1.5"
            />
            <div className="text-[9px] font-mono text-on-surface-variant/50 truncate mb-2">
              {fileName}
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handleConfirm}
                disabled={!name.trim()}
                className="flex-1 bg-primary text-on-primary text-[10px] font-mono font-medium tracking-wider py-1.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-30"
              >
                ADD
              </button>
              <button
                onClick={reset}
                className="text-on-surface-variant hover:text-on-surface transition-colors px-1.5"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "crop") {
    return (
      <div className="px-5 py-4 border-b border-outline-variant/30">
        <div className="text-[10px] font-mono text-primary tracking-[0.15em] mb-2 uppercase">
          Crop Your Card
        </div>
        <CropImage
          imageUrl={rawImageUrl}
          onCrop={handleCrop}
          onCancel={handleCancelCrop}
        />
      </div>
    );
  }

  return (
    <div className="px-5 py-4 border-b border-outline-variant/30">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-outline-variant/40 rounded-lg py-2.5 text-[11px] font-mono text-on-surface-variant hover:text-on-surface hover:border-primary/30 transition-colors"
      >
        <Upload size={12} />
        UPLOAD CUSTOM CARD
      </button>
    </div>
  );
}
