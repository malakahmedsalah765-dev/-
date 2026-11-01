import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Image as ImageIcon, Download, Share2 } from 'lucide-react';

export interface LightboxImage {
  url: string;
  title: string;
  subtitle?: string;
  source?: string;
  category?: string;
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex: initialIndex,
  onIndexChange,
}) => {
  const [index, setIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  const currentImage = images[index] || images[0];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    const nextIdx = (index - 1 + images.length) % images.length;
    setIndex(nextIdx);
    setIsZoomed(false);
    onIndexChange?.(nextIdx);
  }, [index, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    const nextIdx = (index + 1) % images.length;
    setIndex(nextIdx);
    setIsZoomed(false);
    onIndexChange?.(nextIdx);
  }, [index, images.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        // In RTL, right arrow goes to previous
        handlePrev();
      } else if (e.key === 'ArrowLeft') {
        // In RTL, left arrow goes to next
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="معرض الصور التراثية"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between py-3 px-4 bg-black/40 rounded-t-xl text-white border-b border-white/10 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#254B3D] border border-[#9A7944]/60 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-[#C2A066]" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heritage-heading line-clamp-1">{currentImage.title}</h4>
              <p className="text-xs text-white/70">
                {currentImage.category && <span className="ml-2 text-[#C2A066] font-medium">{currentImage.category}</span>}
                صورة {index + 1} من {images.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isZoomed ? 'تصغير' : 'تكبير'}
              aria-label={isZoomed ? 'تصغير' : 'تكبير'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="إغلاق"
              aria-label="إغلاق المعرض"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Showcase Area */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto p-2">
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#254B3D] border border-white/20 text-white flex items-center justify-center transition-all shadow-lg focus:outline-none"
              title="الصورة السابقة"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className={`relative max-h-full max-w-full flex items-center justify-center transition-all duration-300 ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setIsZoomed(!isZoomed)}>
            <img
              src={currentImage.url}
              alt={currentImage.title}
              referrerPolicy="no-referrer"
              className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#254B3D] border border-white/20 text-white flex items-center justify-center transition-all shadow-lg focus:outline-none"
              title="الصورة التالية"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Image Caption & Meta Footer */}
        <div className="bg-black/75 backdrop-blur-md rounded-b-xl p-4 text-white border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 max-w-3xl">
            <p className="text-sm font-medium leading-relaxed">{currentImage.subtitle || currentImage.title}</p>
            {currentImage.source && (
              <p className="text-[#C2A066] font-mono text-[11px]">
                المصدر والتوثيق: {currentImage.source}
              </p>
            )}
          </div>

          {/* Quick thumbnail strip if multiple images */}
          {images.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-xs scrollbar-none">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    setIsZoomed(false);
                    onIndexChange?.(i);
                  }}
                  className={`w-10 h-10 rounded shrink-0 overflow-hidden border transition-all ${
                    i === index ? 'border-[#C2A066] scale-105 shadow-md' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
