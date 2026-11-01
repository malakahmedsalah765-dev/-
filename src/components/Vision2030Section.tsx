import React, { useState, useMemo } from 'react';
import { Vision2030Item } from '../types/heritage';
import { Compass, Target, Sparkles, Building2, ChevronLeft, ZoomIn } from 'lucide-react';
import { LightboxImage } from './ImageLightboxModal';

interface Vision2030SectionProps {
  items: Vision2030Item[];
  onSelectItem: (item: Vision2030Item) => void;
  onOpenContentManager: () => void;
  onOpenLightbox?: (images: LightboxImage[], initialIndex: number) => void;
}

export const Vision2030Section: React.FC<Vision2030SectionProps> = ({
  items,
  onSelectItem,
  onOpenContentManager,
  onOpenLightbox,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('الكل');

  const pillars = useMemo(() => {
    const set = new Set<string>();
    items.forEach((v) => {
      if (v.pillar) set.add(v.pillar);
    });
    return ['الكل', ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedPillar === 'الكل') return items;
    return items.filter((v) => v.pillar === selectedPillar);
  }, [items, selectedPillar]);

  return (
    <div className="space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DDCF]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9A7944] tracking-wider mb-1">
            <span>القسم الخامس</span>
            <span aria-hidden="true">·</span>
            <span>الأصالة والمستقبل الحضاري</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-heritage-heading font-bold text-[#254B3D]">
              مَكَّة ورؤية 2030
            </h2>
            <p className="text-lg sm:text-xl font-heritage-heading text-[#9A7944] font-medium">
              رؤيةٌ تَحفظ الهَوِيَّة، وتَبنِي المُستقبل.
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#5C584E] mt-2 max-w-2xl leading-relaxed">
            التقاء عراقة الماضي بآفاق المستقبل! كيف تُحافظ رؤية السعودية 2030 على الهوية المكية التاريخية والمعمارية، وتوظفها في مشاريع نوعية تثري تجربة ضيوف الرحمن وأهالي مكة.
          </p>
          <p className="text-sm sm:text-base font-heritage-heading font-bold text-[#254B3D] mt-2.5 max-w-2xl">
            «نحفظ ذاكرة المكان اليوم، لتبقى حاضرة في ذاكرة الأجيال غدًا.»
          </p>
        </div>
      </div>

      {/* Pillars Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {pillars.map((pil) => {
          const isActive = selectedPillar === pil;
          return (
            <button
              key={pil}
              onClick={() => setSelectedPillar(pil)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#254B3D] text-[#FAF7F2] shadow-sm font-bold'
                  : 'bg-[#FAF7F2] text-[#5C584E] hover:text-[#254B3D] border border-[#E5DDCF]'
              }`}
            >
              {pil}
            </button>
          );
        })}
      </div>

      {/* Vision Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] overflow-hidden hover:border-[#9A7944] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Media Container with Scrim */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#254B3D]/10">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#FAF7F2] bg-[#254B3D]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#9A7944]/40">
                      {item.pillar}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenLightbox) {
                            const allVisionImages = items.map((v) => ({
                              url: v.image,
                              title: v.title,
                              subtitle: v.futureVision,
                              source: v.status,
                              category: v.pillar,
                            }));
                            const idx = items.findIndex((v) => v.id === item.id);
                            onOpenLightbox(allVisionImages, idx >= 0 ? idx : 0);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-black/40 hover:bg-[#254B3D] text-white/90 hover:text-white backdrop-blur-sm transition-colors"
                        title="تكبير الصورة وعرض المعرض"
                        aria-label="تكبير الصورة"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#FAF7F2] bg-[#9A7944]/90 backdrop-blur-sm px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-[#FAF7F2]/90 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#C2A066]" />
                    <span>مبادرات برنامج التحول الوطني وخدمة ضيوف الرحمن</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-5">
                <h3 className="text-2xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Dual-Perspective Comparison: Heritage vs Future */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#9A7944]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>الجذر التراثي الأصيل:</span>
                    </div>
                    <p className="text-xs text-[#5C584E] leading-relaxed">
                      {item.heritageFoundation}
                    </p>
                  </div>

                  <div className="bg-[#EFE9DC] p-4 rounded-xl border border-[#9A7944]/30 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#254B3D]">
                      <Compass className="w-3.5 h-3.5" />
                      <span>الرؤية والابتكار 2030:</span>
                    </div>
                    <p className="text-xs text-[#254B3D] leading-relaxed font-medium">
                      {item.futureVision}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5C584E] leading-relaxed">
                  {item.details}
                </p>

                {/* Target Metrics */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="pt-3 border-t border-[#E5DDCF]">
                    <div className="text-xs font-bold text-[#9A7944] mb-2">مستهدفات وأثر المبادرة:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {item.metrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#254B3D]">
                          <Target className="w-3.5 h-3.5 text-[#9A7944] shrink-0" />
                          <span className="truncate">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Read more affordance */}
            <div className="p-6 sm:p-8 pt-0">
              <div className="pt-4 border-t border-[#E5DDCF] flex items-center justify-between text-xs font-bold text-[#254B3D] group-hover:text-[#9A7944]">
                <span>استعراض ورقة المشروع الكاملة</span>
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
