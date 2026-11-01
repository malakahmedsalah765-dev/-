import React, { useState, useMemo } from 'react';
import { PlaceItem } from '../types/heritage';
import { MapPin, Calendar, Compass, ChevronLeft, Landmark, ZoomIn } from 'lucide-react';
import { LightboxImage } from './ImageLightboxModal';

interface PlacesSectionProps {
  items: PlaceItem[];
  onSelectItem: (item: PlaceItem) => void;
  onOpenContentManager: () => void;
  onOpenLightbox?: (images: LightboxImage[], initialIndex: number) => void;
}

export const PlacesSection: React.FC<PlacesSectionProps> = ({
  items,
  onSelectItem,
  onOpenContentManager,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['الكل', ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'الكل') return items;
    return items.filter((p) => p.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DDCF]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9A7944] tracking-wider mb-1">
            <span>القسم الثالث</span>
            <span aria-hidden="true">·</span>
            <span>الأصالة المكانية والعمرانية</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-heritage-heading font-bold text-[#254B3D]">
              ذاكِرة المَكان
            </h2>
            <p className="text-lg sm:text-xl font-heritage-heading text-[#9A7944] font-medium">
              هنا تسكن الذكريات، وتحكي الحجارة تاريخ مكة.
            </p>
          </div>
          <p className="text-sm sm:text-base text-[#5C584E] mt-2 max-w-2xl leading-relaxed">
            نستكشف في هذا القسم ملامح مكة المكرمة قديمًا، ونتعرّف على أحيائها ومعالمها التاريخية، ونستحضر تفاصيل المكان التي حفظت ذاكرة أهلها عبر الأجيال.
          </p>
          <p className="text-sm sm:text-base font-heritage-heading font-bold text-[#254B3D] mt-2.5 max-w-2xl">
            «نحفظ ذاكرة المكان اليوم، لتبقى حاضرة في ذاكرة الأجيال غدًا.»
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

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((place) => (
          <div
            key={place.id}
            onClick={() => onSelectItem(place)}
            className="group bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] overflow-hidden hover:border-[#9A7944] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Media Container with Scrim */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#254B3D]/10">
                <img
                  src={place.image}
                  alt={place.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#FAF7F2] bg-[#254B3D]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#9A7944]/40">
                      {place.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenLightbox) {
                          const allPlaceImages = items.map((p) => ({
                            url: p.image,
                            title: p.name,
                            subtitle: p.description,
                            source: p.photographerOrSource || p.location,
                            category: p.category,
                          }));
                          const idx = items.findIndex((p) => p.id === place.id);
                          onOpenLightbox(allPlaceImages, idx >= 0 ? idx : 0);
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
                    <Calendar className="w-3.5 h-3.5 text-[#C2A066]" />
                    <span className="truncate">{place.era}</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-[#9A7944] font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{place.location}</span>
                  </div>
                  <h3 className="text-xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors leading-snug">
                    {place.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#5C584E] leading-relaxed line-clamp-3">
                  {place.description}
                </p>

                {/* Key Architectural & Heritage Features */}
                {place.features && place.features.length > 0 && (
                  <div className="pt-2 border-t border-[#E5DDCF]/80">
                    <div className="text-[11px] font-bold text-[#9A7944] mb-1.5">
                      عناصر الهوية المعمارية والتراثية:
                    </div>
                    <ul className="text-xs text-[#254B3D] space-y-1">
                      {place.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9A7944]" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Read Story Button */}
            <div className="p-6 pt-0 mt-2">
              <div className="pt-4 border-t border-[#E5DDCF] flex items-center justify-between text-xs font-bold text-[#254B3D] group-hover:text-[#9A7944]">
                <span className="inline-flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>قراءة التوثيق التاريخي الكامل</span>
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
