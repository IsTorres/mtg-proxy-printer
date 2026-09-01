import { useState, useRef, useEffect, useCallback } from "react";
import { Crop, X } from "lucide-react";
import { CARD_ASPECT_RATIO } from "../constants";

const CROP_MIN_PX = 40;
const CROP_INIT_PX = 140;
const ZOOM_FACTOR = 0.08;

interface CropImageProps {
  imageUrl: string;
  onCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export function CropImage({ imageUrl, onCrop, onCancel }: CropImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const [cropOrigin, setCropOrigin] = useState({ x: 0, y: 0 });
  const [cropW, setCropW] = useState(CROP_INIT_PX);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, originX: 0, originY: 0 });

  const cropH = cropW / CARD_ASPECT_RATIO;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !imgNatural.w || !imgNatural.h) return;

    const containerW = el.clientWidth;
    const containerH = el.clientHeight;
    const scale = Math.min(containerW / imgNatural.w, containerH / imgNatural.h);
    const w = imgNatural.w * scale;
    const h = imgNatural.h * scale;
    setDisplaySize({ w, h });
  }, [imgNatural]);

  useEffect(() => {
    if (!displaySize.w || !displaySize.h) return;
    const maxW = Math.min(displaySize.w, CROP_INIT_PX);
    const initW = Math.max(CROP_MIN_PX, maxW);
    setCropW(initW);
    setCropOrigin({
      x: (displaySize.w - initW) / 2,
      y: (displaySize.h - initW / CARD_ASPECT_RATIO) / 2,
    });
  }, [displaySize]);

  const clampOrigin = useCallback(
    (x: number, y: number, cw: number) => {
      const ch = cw / CARD_ASPECT_RATIO;
      const clampedX = Math.max(0, Math.min(x, displaySize.w - cw));
      const clampedY = Math.max(0, Math.min(y, displaySize.h - ch));
      return { x: clampedX, y: clampedY };
    },
    [displaySize]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        originX: cropOrigin.x,
        originY: cropOrigin.y,
      };
    },
    [cropOrigin]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newPos = clampOrigin(
        dragStart.current.originX + dx,
        dragStart.current.originY + dy,
        cropW
      );
      setCropOrigin(newPos);
    },
    [dragging, cropW, clampOrigin]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newCropW = cropW * (1 - Math.sign(e.deltaY) * ZOOM_FACTOR);
      const clampedW = Math.max(CROP_MIN_PX, Math.min(newCropW, displaySize.w));
      const newCropH = clampedW / CARD_ASPECT_RATIO;

      const ratioX = (mouseX - cropOrigin.x) / cropW;
      const ratioY = (mouseY - cropOrigin.y) / cropH;
      const newX = mouseX - ratioX * clampedW;
      const newY = mouseY - ratioY * newCropH;

      setCropW(clampedW);
      setCropOrigin(clampOrigin(newX, newY, clampedW));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [cropW, cropH, cropOrigin, displaySize, clampOrigin]);

  const handleCrop = useCallback(() => {
    if (!imgNatural.w || !displaySize.w) return;

    const scale = imgNatural.w / displaySize.w;
    const srcX = cropOrigin.x * scale;
    const srcY = cropOrigin.y * scale;
    const srcW = cropW * scale;
    const srcH = (cropW / CARD_ASPECT_RATIO) * scale;

    const canvas = document.createElement("canvas");
    canvas.width = srcW;
    canvas.height = srcH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      imgRef.current!,
      srcX, srcY, srcW, srcH,
      0, 0, srcW, srcH
    );

    onCrop(canvas.toDataURL("image/png"));
  }, [imgNatural, displaySize, cropOrigin, cropW, onCrop]);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative w-full bg-surface-container-highest rounded-lg overflow-hidden select-none"
        style={{ height: "280px" }}
      >
        {displaySize.w > 0 && (
          <>
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop source"
              draggable={false}
              className="absolute"
              style={{
                width: displaySize.w,
                height: displaySize.h,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            <div
              className="absolute bg-black/60"
              style={{ top: 0, left: 0, right: 0, height: cropOrigin.y }}
            />
            <div
              className="absolute bg-black/60"
              style={{
                top: cropOrigin.y,
                left: 0,
                width: cropOrigin.x,
                height: cropH,
              }}
            />
            <div
              className="absolute bg-black/60"
              style={{
                top: cropOrigin.y,
                left: cropOrigin.x + cropW,
                right: 0,
                height: cropH,
              }}
            />
            <div
              className="absolute bg-black/60"
              style={{
                top: cropOrigin.y + cropH,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />

            <div
              className="absolute border-2 border-white cursor-grab active:cursor-grabbing"
              style={{
                left: cropOrigin.x,
                top: cropOrigin.y,
                width: cropW,
                height: cropH,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border border-white bg-surface/80" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border border-white bg-surface/80" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border border-white bg-surface/80" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border border-white bg-surface/80" />
            </div>
          </>
        )}
      </div>

      <div className="text-[9px] font-mono text-on-surface-variant/50 text-center -mt-1">
        Scroll to resize · Drag to move
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCrop}
          className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-on-primary text-[11px] font-mono font-medium tracking-wider py-2 rounded-lg hover:brightness-110 transition-all"
        >
          <Crop size={11} />
          CROP
        </button>
        <button
          onClick={onCancel}
          className="flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors px-2"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
