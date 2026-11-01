import React, { useState, useMemo } from 'react';
import { VocabularyItem } from '../types/heritage';
import { Volume2, Search, BookOpen, Info } from 'lucide-react';

interface VocabularySectionProps {
  items: VocabularyItem[];
  onSelectItem: (item: VocabularyItem) => void;
  onOpenContentManager: () => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  items,
  onSelectItem,
  onOpenContentManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const list = ['الكل', 'مفردات مكية', 'حكاية كلمة', 'المائدة المكية', 'البيت والمجلس', 'عادات اجتماعية'];
    items.forEach((item) => {
      const cat = item.category === 'أوصاف وأزياء' ? 'حكاية كلمة' : item.category;
      if (cat && !list.includes(cat) && cat !== 'مفردات يومية') {
        list.push(cat);
      }
    });
    return list;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemCat = item.category === 'أوصاف وأزياء' ? 'حكاية كلمة' : item.category;
      const matchCategory =
        selectedCategory === 'الكل' ||
        itemCat === selectedCategory ||
        (selectedCategory === 'مفردات مكية' && (item.category === 'مفردات مكية' || item.category === 'مفردات يومية')) ||
        (selectedCategory === 'حكاية كلمة' && (item.category === 'حكاية كلمة' || item.category === 'أوصاف وأزياء'));
      const matchSearch =
        searchQuery.trim() === '' ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.pronunciation && item.pronunciation.includes(searchQuery));
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const playPronunciation = (e: React.MouseEvent, item: VocabularyItem) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.term);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      setPlayingId(item.id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingId(item.id);
      setTimeout(() => setPlayingId(null), 1200);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5DDCF]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#9A7944] tracking-wider mb-1">
            <span>القسم الثاني</span>
            <span aria-hidden="true">·</span>
            <span>الأصالة اللغوية</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl font-heritage-heading font-bold text-[#254B3D]">
              لِسان مَكَّة
            </h2>
            <p className="text-lg sm:text-xl font-heritage-heading text-[#9A7944] font-medium">
              لكل كلمة حكاية، ولكل حكاية أثر.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#254B3D] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#5C584E] hover:text-[#254B3D] border border-[#E5DDCF]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-[#9A7944] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الكلمات أو المعاني..."
            className="w-full pl-4 pr-10 py-2 text-xs bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9A7944] text-[#1B2923] placeholder-[#5C584E]/60 shadow-inner"
          />
        </div>

      </div>

      {/* Vocabulary Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-[#9A7944] mx-auto opacity-70" />
          <p className="text-base font-bold text-[#254B3D]">لا توجد مفردات مطابقة للبحث</p>
          <p className="text-xs text-[#5C584E]">يمكنك إضافة كلمات جديدة من مواد كانفا في أي وقت</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isPlaying = playingId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] p-6 hover:border-[#9A7944] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Optional Heritage Image */}
                {item.image && (
                  <div className="relative aspect-[16/10] -mx-6 -mt-6 mb-4 overflow-hidden bg-[#254B3D]/10">
                    <img
                      src={item.image}
                      alt={item.term}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-[11px] font-medium text-[#FAF7F2] bg-[#254B3D]/80 backdrop-blur-sm px-2 py-0.5 rounded">
                        صورة توثيقية
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top line: term and pronunciation button */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs text-[#9A7944] font-medium block mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-2xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors">
                        {item.term}
                      </h3>
                      {item.pronunciation && (
                        <span className="text-xs text-[#5C584E] font-medium tracking-wide">
                          [{item.pronunciation}]
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => playPronunciation(e, item)}
                      className={`p-2 rounded-lg border border-[#E5DDCF] transition-colors ${
                        isPlaying
                          ? 'bg-[#9A7944] text-[#FAF7F2]'
                          : 'bg-[#F5F0E6] text-[#254B3D] hover:bg-[#EBE3D3]'
                      }`}
                      title="الاستماع لنطق المصطلح"
                      aria-label="نطق الكلمة"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>

                  {/* Meaning & Explanation */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1B2923] leading-relaxed">
                      {item.meaning}
                    </p>
                    <p className="text-xs text-[#5C584E] leading-normal line-clamp-2">
                      {item.context}
                    </p>
                  </div>
                </div>

                {/* Footer details affordance */}
                <div className="pt-4 mt-4 border-t border-[#E5DDCF] flex items-center justify-between text-xs text-[#9A7944] font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>عرض التفاصيل والتأصيل</span>
                  </span>
                  <span className="text-[11px] text-[#5C584E]">انقر للقراءة</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Editorial Footnote */}
      <div className="bg-[#FAF7F2] border border-[#E5DDCF] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C584E]">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#9A7944]" />
          <span>
            جميع مفردات «لسان مكة» قابلة للإضافة والتعديل وفق المواد المحضرة في مشروع كانفا دون أي قيد.
          </span>
        </div>
        <button
          onClick={onOpenContentManager}
          className="text-[#9A7944] hover:text-[#254B3D] font-bold underline whitespace-nowrap"
        >
          فتح محرر المفردات
        </button>
      </div>

    </div>
  );
};
