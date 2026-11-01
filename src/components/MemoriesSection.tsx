import React, { useState } from 'react';
import { MemoryItem } from '../types/heritage';
import { Users, Quote, MapPin, Calendar, FileText, ChevronLeft, Mic, ZoomIn } from 'lucide-react';
import { LightboxImage } from './ImageLightboxModal';

interface MemoriesSectionProps {
  items: MemoryItem[];
  onSelectItem: (item: MemoryItem) => void;
  onOpenContentManager: () => void;
  onOpenLightbox?: (images: LightboxImage[], initialIndex: number) => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({
  items,
  onSelectItem,
  onOpenContentManager,
  onOpenLightbox,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<string>('الكل');

  const places = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((m) => {
      if (m.place) set.add(m.place.split('،')[0].trim());
    });
    return ['الكل', ...Array.from(set)];
  }, [items]);

  const filteredItems = React.useMemo(() => {
    if (selectedPlace === 'الكل') return items;
    return items.filter((m) => m.place.includes(selectedPlace));
  }, [items, selectedPlace]);

  return (
    <div className="space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DDCF]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9A7944] tracking-wider mb-1">
            <span>القسم السادس</span>
            <span aria-hidden="true">·</span>
            <span>التوثيق الشفهي والإنساني</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-heritage-heading font-bold text-[#254B3D]">
              مِنْ ذاكرةِ أَهْلِ مَكَّة
            </h2>
            <p className="text-lg sm:text-xl font-heritage-heading text-[#9A7944] font-medium">
              حكايات وذكريات تحفظ عبق الماضي
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#5C584E] mt-2 max-w-2xl leading-relaxed">
            لكل مكان حكاية، ولكل جيل ذكريات تستحق أن تُروى. وفي ذاكرة أهل مكة تفاصيل من الحياة القديمة، ومواقف بقيت حاضرة في القلوب، وحكايات تنقل لنا ملامح الزمن الجميل. هنا نفتح نافذة على ذكريات أهل مكة، لنقترب من ماضيها بعيون من عاشوه، ونحفظ حكاياتهم لتبقى جزءًا من ذاكرة المكان.
          </p>
          <p className="text-sm sm:text-base font-heritage-heading font-bold text-[#254B3D] mt-2.5 max-w-2xl">
            «حكاياتٌ تحفظها الذاكرة، ويرويها أهل المكان.»
          </p>
        </div>
      </div>

      {/* Place Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {places.map((pl) => {
          const isActive = selectedPlace === pl;
          return (
            <button
              key={pl}
              onClick={() => setSelectedPlace(pl)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#254B3D] text-[#FAF7F2] shadow-sm font-bold'
                  : 'bg-[#FAF7F2] text-[#5C584E] hover:text-[#254B3D] border border-[#E5DDCF]'
              }`}
            >
              {pl}
            </button>
          );
        })}
      </div>

      {/* Memories Narrative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] overflow-hidden hover:border-[#9A7944] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Media banner with narrator tag */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#254B3D]/10">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#254B3D]/90 backdrop-blur-sm px-3 py-1 rounded-md border border-[#9A7944]/40">
                      <Mic className="w-3.5 h-3.5 text-[#C2A066]" />
                      <span>شهادة شفهية موثقة</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenLightbox) {
                          const allMemImages = items.map((m) => ({
                            url: m.image,
                            title: m.title,
                            subtitle: `${m.narrator} · ${m.place}`,
                            source: m.period,
                            category: 'شهادة شفهية',
                          }));
                          const idx = items.findIndex((m) => m.id === item.id);
                          onOpenLightbox(allMemImages, idx >= 0 ? idx : 0);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-[#254B3D] text-white/90 hover:text-white backdrop-blur-sm transition-colors"
                      title="تكبير الصورة وعرض المعرض"
                      aria-label="تكبير الصورة"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#C2A066]">
                      <Users className="w-3.5 h-3.5" />
                      <span className="font-bold">{item.narrator}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[#FAF7F2]/80">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9A7944]" />
                        <span>{item.place}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#9A7944]" />
                        <span>{item.period}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Prominent Oral Excerpt */}
                <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] flex items-start gap-3">
                  <Quote className="w-6 h-6 text-[#9A7944] shrink-0 mt-0.5" />
                  <p className="text-sm font-heritage-heading font-medium text-[#254B3D] italic leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#5C584E] leading-relaxed line-clamp-3">
                  {item.fullNarrative}
                </p>

                {item.recordingNote && (
                  <div className="text-[11px] text-[#9A7944] font-medium flex items-center gap-1.5 pt-2 border-t border-[#E5DDCF]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.recordingNote}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Read full testimony */}
            <div className="p-6 sm:p-8 pt-0">
              <div className="pt-4 border-t border-[#E5DDCF] flex items-center justify-between text-xs font-bold text-[#254B3D] group-hover:text-[#9A7944]">
                <span>قراءة النص الشفهي الكامل</span>
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
