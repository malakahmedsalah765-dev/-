import React, { useState, useMemo } from 'react';
import { GlimpseItem } from '../types/heritage';
import { Sparkles, Quote, Clock, CheckCircle2, ChevronLeft, BookOpen, ZoomIn } from 'lucide-react';
import { LightboxImage } from './ImageLightboxModal';

interface GlimpsesSectionProps {
  items: GlimpseItem[];
  onSelectItem: (item: GlimpseItem) => void;
  onOpenContentManager: () => void;
  onOpenLightbox?: (images: LightboxImage[], initialIndex: number) => void;
}

export const GlimpsesSection: React.FC<GlimpsesSectionProps> = ({
  items,
  onSelectItem,
  onOpenContentManager,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((g) => {
      if (g.category) set.add(g.category);
    });
    return ['الكل', ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'الكل') return items;
    return items.filter((g) => g.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DDCF]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9A7944] tracking-wider mb-1">
            <span>القسم الرابع</span>
            <span aria-hidden="true">·</span>
            <span>الحياة الاجتماعية والمهنية</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-heritage-heading font-bold text-[#254B3D]">
              مَلامح من الماضي
            </h2>
            <p className="text-lg sm:text-xl font-heritage-heading text-[#9A7944] font-medium">
              رحلة إلى تفاصيل الحياة المكية قديمًا، حيث العادات والأماكن وذكريات الأجيال.
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#5C584E] mt-2 max-w-2xl leading-relaxed">
            نستمع هنا إلى حكايات من التراث المكي، ونستعيد قصص الحياة قديمًا، ونتعرّف على العادات والتجارب التي تناقلها أهل مكة عبر الأجيال.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#254B3D] text-[#FAF7F2] shadow-sm font-bold'
                  : 'bg-[#FAF7F2] text-[#5C584E] hover:text-[#254B3D] border border-[#E5DDCF]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Glimpses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] overflow-hidden hover:border-[#9A7944] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Media banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#254B3D]/10">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#FAF7F2] bg-[#254B3D]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#9A7944]/40">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenLightbox) {
                          const allGlimpseImages = items.map((g) => ({
                            url: g.image,
                            title: g.title,
                            subtitle: g.summary,
                            source: g.period,
                            category: g.category,
                          }));
                          const idx = items.findIndex((g) => g.id === item.id);
                          onOpenLightbox(allGlimpseImages, idx >= 0 ? idx : 0);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-[#254B3D] text-white/90 hover:text-white backdrop-blur-sm transition-colors"
                      title="تكبير الصورة وعرض المعرض"
                      aria-label="تكبير الصورة"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#E5DDCF]">
                    <Clock className="w-3.5 h-3.5 text-[#C2A066]" />
                    <span>{item.period}</span>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#1B2923] font-medium leading-relaxed">
                  {item.summary}
                </p>

                {/* Cultural Quote Callout */}
                {item.quote && (
                  <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#9A7944] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#254B3D] italic font-heritage-heading leading-relaxed">
                      {item.quote}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                {item.traditionHighlights && item.traditionHighlights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-[#9A7944]">
                      من معالم هذه العادة أو المهنة:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.traditionHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#5C584E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#254B3D] shrink-0" />
                          <span className="truncate">{hl}</span>
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
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>استعراض التفاصيل التراثية الموثقة</span>
                </span>
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
