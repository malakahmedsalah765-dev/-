import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PlatformHeritageData } from '../types/heritage';
import { Search, X, BookOpen, MapPin, Sparkles, Compass, Users, ChevronLeft } from 'lucide-react';

interface GlobalSearchResult {
  sectionType: 'vocabulary' | 'place' | 'glimpse' | 'vision2030' | 'memory' | 'arabicLanguage';
  sectionTitle: string;
  id: string;
  title: string;
  subtitle: string;
  snippet: string;
  original: any;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PlatformHeritageData;
  onSelectItem: (type: string, item: any) => void;
  initialQuery?: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectItem,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen, initialQuery]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matches: GlobalSearchResult[] = [];

    // Search Vocabulary
    data.vocabulary.forEach((v) => {
      if (
        v.term.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        v.example.toLowerCase().includes(q) ||
        v.context.toLowerCase().includes(q)
      ) {
        matches.push({
          sectionType: 'vocabulary',
          sectionTitle: 'لسان مكة',
          id: v.id,
          title: v.term,
          subtitle: v.category,
          snippet: v.meaning,
          original: v,
        });
      }
    });

    // Search Places
    data.places.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fullStory.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      ) {
        matches.push({
          sectionType: 'place',
          sectionTitle: 'ذاكرة المكان',
          id: p.id,
          title: p.name,
          subtitle: `${p.category} · ${p.location}`,
          snippet: p.description,
          original: p,
        });
      }
    });

    // Search Glimpses
    data.glimpses.forEach((g) => {
      if (
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.content.toLowerCase().includes(q) ||
        (g.quote && g.quote.toLowerCase().includes(q))
      ) {
        matches.push({
          sectionType: 'glimpse',
          sectionTitle: 'ملامح من الماضي',
          id: g.id,
          title: g.title,
          subtitle: `${g.category} · ${g.period}`,
          snippet: g.summary,
          original: g,
        });
      }
    });

    // Search Vision 2030
    data.vision2030.forEach((vis) => {
      if (
        vis.title.toLowerCase().includes(q) ||
        vis.details.toLowerCase().includes(q) ||
        vis.futureVision.toLowerCase().includes(q) ||
        vis.heritageFoundation.toLowerCase().includes(q)
      ) {
        matches.push({
          sectionType: 'vision2030',
          sectionTitle: 'مكة ورؤية 2030',
          id: vis.id,
          title: vis.title,
          subtitle: vis.pillar,
          snippet: vis.futureVision,
          original: vis,
        });
      }
    });

    // Search Memories
    data.memories.forEach((m) => {
      if (
        m.title.toLowerCase().includes(q) ||
        m.narrator.toLowerCase().includes(q) ||
        m.excerpt.toLowerCase().includes(q) ||
        m.fullNarrative.toLowerCase().includes(q)
      ) {
        matches.push({
          sectionType: 'memory',
          sectionTitle: 'من ذاكرة أهل مكة',
          id: m.id,
          title: m.title,
          subtitle: `${m.narrator} · ${m.place}`,
          snippet: m.excerpt,
          original: m,
        });
      }
    });

    // Search Arabic Language & Quran
    if (data.arabicLanguage) {
      data.arabicLanguage.forEach((arb) => {
        if (
          arb.title.toLowerCase().includes(q) ||
          arb.subsection.toLowerCase().includes(q) ||
          (arb.arabicText && arb.arabicText.toLowerCase().includes(q)) ||
          (arb.meaning && arb.meaning.toLowerCase().includes(q)) ||
          (arb.linguisticContext && arb.linguisticContext.toLowerCase().includes(q)) ||
          (arb.historicalContext && arb.historicalContext.toLowerCase().includes(q)) ||
          (arb.example && arb.example.toLowerCase().includes(q)) ||
          arb.reference.toLowerCase().includes(q)
        ) {
          matches.push({
            sectionType: 'arabicLanguage',
            sectionTitle: 'مكة واللغة العربية',
            id: arb.id,
            title: arb.title,
            subtitle: `${arb.subsection} · ${arb.reference}`,
            snippet: arb.meaning || arb.arabicText || arb.title,
            original: arb,
          });
        }
      });
    }

    return matches;
  }, [query, data]);

  if (!isOpen) return null;

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'vocabulary':
        return <BookOpen className="w-4 h-4 text-[#9A7944]" />;
      case 'place':
        return <MapPin className="w-4 h-4 text-[#9A7944]" />;
      case 'glimpse':
        return <Sparkles className="w-4 h-4 text-[#9A7944]" />;
      case 'vision2030':
        return <Compass className="w-4 h-4 text-[#9A7944]" />;
      case 'memory':
        return <Users className="w-4 h-4 text-[#9A7944]" />;
      case 'arabicLanguage':
        return <BookOpen className="w-4 h-4 text-[#254B3D]" />;
      default:
        return <Search className="w-4 h-4 text-[#9A7944]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-2xl rounded-2xl border border-[#E5DDCF] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5DDCF] bg-[#FAF7F2]">
          <Search className="w-5 h-5 text-[#9A7944] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في تراث مكة: كلمة، حي، عادة، مهنة، مشروع، أو رواية..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1B2923] placeholder-[#5C584E]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#5C584E] hover:text-[#254B3D] px-2 py-1"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C584E] hover:text-[#254B3D] hover:bg-[#EFE9DC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-12 text-xs text-[#5C584E] space-y-2">
              <Search className="w-8 h-8 text-[#9A7944] mx-auto opacity-50" />
              <p className="font-medium text-[#254B3D]">ابدأ بكتابة أي كلمة للبحث الشامل</p>
              <p className="text-[11px]">
                مثال: المركاز، الشامية، السقا، مسار، رمضان، الروشان، سيدي
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#5C584E] space-y-1">
              <p className="font-bold text-[#254B3D]">لم نجد نتائج مطابقة لـ «{query}»</p>
              <p className="text-[11px]">جرب البحث بكلمة مرادفة أو تصفح الأقسام مباشرة</p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={`${res.sectionType}-${res.id}`}
                onClick={() => {
                  onSelectItem(res.sectionType, res.original);
                  onClose();
                }}
                className="group p-3.5 rounded-xl hover:bg-[#F5F0E6] border border-transparent hover:border-[#E5DDCF] transition-all cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-[#9A7944]">
                    {getSectionIcon(res.sectionType)}
                    <span className="font-bold">{res.sectionTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#5C584E]">{res.subtitle}</span>
                  </div>
                  <h4 className="text-sm font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors">
                    {res.title}
                  </h4>
                  <p className="text-xs text-[#5C584E] line-clamp-1 leading-relaxed">
                    {res.snippet}
                  </p>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#9A7944] shrink-0 mt-2 transition-transform group-hover:-translate-x-1" />
              </div>
            ))
          )}
        </div>

        {/* Modal Quick Footer */}
        <div className="bg-[#F5F0E6] px-6 py-2.5 border-t border-[#E5DDCF] flex items-center justify-between text-[11px] text-[#5C584E]">
          <span>
            {results.length > 0 ? `${results.length} نتائج مطابقة` : 'البحث الموحد في التراث المكي'}
          </span>
          <span>اضغط ESC للإغلاق</span>
        </div>
      </div>
    </div>
  );
};
