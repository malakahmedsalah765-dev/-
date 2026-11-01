import React, { useState, useMemo } from 'react';
import { ArabicLanguageItem, ArabicLanguageSubsection } from '../types/heritage';
import {
  Search,
  BookOpen,
  Volume2,
  Sparkles,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Compass,
  Scroll,
  Languages,
  CheckCircle2,
  FileText,
  Share2
} from 'lucide-react';
import { ARABIC_QURAN_IMAGE, ARABIC_CALLIGRAPHY_IMAGE } from '../data/heritageData';

interface ArabicLanguageSectionProps {
  items: ArabicLanguageItem[];
  onSelectItem?: (item: ArabicLanguageItem) => void;
  onOpenContentManager?: () => void;
}

const SUBSECTIONS: { id: 'all' | ArabicLanguageSubsection; label: string; countKey?: string }[] = [
  { id: 'all', label: 'كافة المباحث' },
  { id: 'مكة في القرآن الكريم', label: 'مكة في القرآن الكريم' },
  { id: 'مكة واللغة العربية', label: 'مكة واللغة العربية' },
  { id: 'من الفصحى إلى اللهجة المكية', label: 'من الفصحى إلى اللهجة المكية' },
  { id: 'كلمات عربية في الذاكرة المكية', label: 'كلمات عربية في الذاكرة المكية' },
  { id: 'مكة جسر بين اللغة والثقافة', label: 'مكة جسر بين اللغة والثقافة' },
];

export const ArabicLanguageSection: React.FC<ArabicLanguageSectionProps> = ({
  items,
  onSelectItem,
}) => {
  const [selectedSubsection, setSelectedSubsection] = useState<'all' | ArabicLanguageSubsection>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Filter items by subsection and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSubsection =
        selectedSubsection === 'all' || item.subsection === selectedSubsection;

      if (!matchesSubsection) return false;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const textMatch = item.arabicText?.toLowerCase().includes(q);
      const meaningMatch = item.meaning?.toLowerCase().includes(q);
      const lingMatch = item.linguisticContext?.toLowerCase().includes(q);
      const histMatch = item.historicalContext?.toLowerCase().includes(q);
      const exMatch = item.example?.toLowerCase().includes(q);
      const dialectMatch = item.dialectUsage?.toLowerCase().includes(q);
      const refMatch = item.reference.toLowerCase().includes(q);
      const tafsirMatch = item.verseDetails?.tafsirSummary.toLowerCase().includes(q) ||
        item.verseDetails?.tafsirSource.toLowerCase().includes(q) ||
        item.verseDetails?.surah.toLowerCase().includes(q);
      const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(q));

      return (
        titleMatch ||
        textMatch ||
        meaningMatch ||
        lingMatch ||
        histMatch ||
        exMatch ||
        dialectMatch ||
        refMatch ||
        tafsirMatch ||
        tagsMatch
      );
    });
  }, [items, selectedSubsection, searchQuery]);

  // Audio Speech Synthesis for Arabic pronunciation
  const handlePlayAudio = (id: string, textToRead: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('المتصفح لا يدعم القراءة الصوتية المباشرة.');
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9; // natural, articulate pace

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const getSubsectionBadgeColor = (sub: ArabicLanguageSubsection) => {
    switch (sub) {
      case 'مكة في القرآن الكريم':
        return 'bg-[#254B3D]/10 text-[#254B3D] border-[#254B3D]/20';
      case 'مكة واللغة العربية':
        return 'bg-[#9A7944]/10 text-[#9A7944] border-[#9A7944]/20';
      case 'من الفصحى إلى اللهجة المكية':
        return 'bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/20';
      case 'كلمات عربية في الذاكرة المكية':
        return 'bg-[#854D0E]/10 text-[#854D0E] border-[#854D0E]/20';
      case 'مكة جسر بين اللغة والثقافة':
        return 'bg-[#065F46]/10 text-[#065F46] border-[#065F46]/20';
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn" dir="rtl">
      
      {/* Editorial Header Monograph */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E5DDCF] bg-[#FAF7F2] shadow-sm p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Titles and Lead */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#254B3D]/10 text-[#254B3D] border border-[#254B3D]/20 text-xs font-bold tracking-wide">
              <Scroll className="w-3.5 h-3.5 text-[#9A7944]" />
              <span>القسم السابع والأصيل</span>
              <span className="text-[#9A7944]">•</span>
              <span>الأصالة اللغوية والقرآنية</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heritage-heading font-bold text-[#254B3D] leading-tight">
                مَكَّة واللُّغَة العَرَبِيَّة
              </h1>
              <p className="text-xl sm:text-2xl text-[#9A7944] font-heritage-heading font-medium">
                من مهبط الوحي إلى ذاكرة اللغة
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#3D3A34] leading-relaxed font-normal">
              في وادي مكة اختار الله تعالى لسان الضاد وعاءً لكتابه المعجز، ومن بطاحها انطلقت أفصح لغات العرب وتوحدت، لتظل مكة المكرمة عبر العصور مهداً للفصاحة، وجسراً يربط قداسة الوحي بثراء الهوية المكية وذاكرتها اللغوية الحية.
            </p>


          </div>

          {/* Visual Manuscript Archival Banner */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E5DDCF] shadow-md group">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#254B3D]/5">
              <img
                src={ARABIC_QURAN_IMAGE}
                alt="مخطوطة المصحف الشريف في مكة المكرمة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#254B3D]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
              <div className="bg-[#254B3D]/85 backdrop-blur-md p-3.5 rounded-xl border border-[#9A7944]/40">
                <p className="text-xs text-[#E5DDCF] font-semibold mb-1">
                  «إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ»
                </p>
                <p className="text-[11px] text-white/80">
                  توثيق أثر مهبط الوحي في خلود اللسان العربي وذاكرة المكان
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Control Bar: Subsections Tabs & Dedicated Section Search */}
      <section className="space-y-6">
        
        {/* Subsection Filters (Horizontal Pill Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#9A7944]/30">
          {SUBSECTIONS.map((sub) => {
            const isSelected = selectedSubsection === sub.id;
            const count = sub.id === 'all'
              ? items.length
              : items.filter((i) => i.subsection === sub.id).length;

            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubsection(sub.id);
                  setExpandedCardId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm border ${
                  isSelected
                    ? 'bg-[#254B3D] text-[#FAF7F2] border-[#254B3D]'
                    : 'bg-[#FAF7F2] text-[#3D3A34] hover:bg-white border-[#E5DDCF]'
                }`}
              >
                <span>{sub.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-[#FAF7F2]'
                      : 'bg-[#E5DDCF]/50 text-[#5C584E]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#9A7944]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في آيات مكة، مفردات اللهجة، جذور المعاجم، أو تفاسير الأئمة..."
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#E5DDCF] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9A7944] text-[#1B2923] shadow-sm transition-all placeholder:text-[#5C584E]/70"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-xs text-[#5C584E] hover:text-[#254B3D]"
            >
              مسح البحث
            </button>
          )}
        </div>

        {/* Results Counter if Filtered */}
        {(searchQuery || selectedSubsection !== 'all') && (
          <div className="flex items-center justify-between text-xs text-[#5C584E] px-1">
            <span>
              عرض {filteredItems.length} من أصل {items.length} مبحثاً لغوياً
            </span>
            {(searchQuery || selectedSubsection !== 'all') && (
              <button
                onClick={() => {
                  setSelectedSubsection('all');
                  setSearchQuery('');
                }}
                className="text-[#9A7944] hover:underline font-bold"
              >
                إعادة ضبط عوامل التصفية
              </button>
            )}
          </div>
        )}

      </section>

      {/* Grid of Interactive Content Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E5DDCF] p-8">
          <BookOpen className="w-12 h-12 text-[#9A7944] mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-[#254B3D] mb-1">لم نجد نتائج مطابقة</h3>
          <p className="text-sm text-[#5C584E] max-w-md mx-auto">
            جرّب البحث بكلمة أخرى مثل «بكة»، «دحين»، «المركاز»، أو «سوق عكاظ».
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredItems.map((item) => {
            const isExpanded = expandedCardId === item.id;
            const isSpeaking = speakingId === item.id;
            const isQuranSection = item.subsection === 'مكة في القرآن الكريم';
            const isWordsSection = item.subsection === 'كلمات عربية في الذاكرة المكية';
            const isShiftSection = item.subsection === 'من الفصحى إلى اللهجة المكية';

            const textForAudio = item.arabicText || item.title;

            return (
              <article
                key={item.id}
                onClick={() => onSelectItem && onSelectItem(item)}
                className={`group rounded-2xl bg-[#FAF7F2] border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isExpanded
                    ? 'border-[#9A7944] ring-1 ring-[#9A7944]/30'
                    : 'border-[#E5DDCF] hover:border-[#9A7944]/60'
                }`}
              >
                <div className="p-6 sm:p-7 space-y-4">
                  
                  {/* Top Badges & Audio Trigger */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getSubsectionBadgeColor(
                        item.subsection
                      )}`}
                    >
                      {item.subsection}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="text-[11px] font-bold text-[#9A7944] bg-[#9A7944]/10 px-2.5 py-0.5 rounded-md border border-[#9A7944]/20">
                          {item.badge}
                        </span>
                      )}

                      {/* Audio Button */}
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(item.id, textForAudio, e)}
                        title="استمع إلى النطق"
                        className={`p-1.5 rounded-lg border transition-all ${
                          isSpeaking
                            ? 'bg-[#254B3D] text-[#FAF7F2] border-[#254B3D] animate-pulse'
                            : 'bg-white text-[#254B3D] hover:bg-[#254B3D]/10 border-[#E5DDCF]'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quranic Verse Highlight Frame (If Quran Subsection) */}
                  {isQuranSection && item.arabicText && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#254B3D]/10 via-[#FAF7F2] to-[#254B3D]/10 border border-[#9A7944]/40 text-center relative overflow-hidden">
                      <div className="text-xs font-semibold text-[#9A7944] mb-1">
                        {item.verseDetails?.surah} • آية {item.verseDetails?.ayahNumber}
                      </div>
                      <blockquote className="font-heritage-heading text-lg sm:text-xl font-bold text-[#254B3D] leading-relaxed">
                        «{item.arabicText}»
                      </blockquote>
                    </div>
                  )}

                  {/* Vocabulary Word Frame (If Words Subsection) */}
                  {isWordsSection && item.arabicText && (
                    <div className="p-3.5 rounded-xl bg-[#9A7944]/10 border border-[#9A7944]/30 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#9A7944] font-medium block">المصطلح المكي الفصيح:</span>
                        <span className="text-xl font-heritage-heading font-bold text-[#254B3D]">
                          {item.arabicText}
                        </span>
                      </div>
                      <div className="text-left text-xs font-medium text-[#5C584E]">
                        موروث حجازي
                      </div>
                    </div>
                  )}

                  {/* Title & Core Meaning */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    {item.meaning && (
                      <p className="text-sm text-[#3D3A34] leading-relaxed font-normal">
                        {item.meaning}
                      </p>
                    )}
                  </div>

                  {/* Quran Tafsir Summary (If available) */}
                  {item.verseDetails?.tafsirSummary && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#E5DDCF] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#9A7944]">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>بيان التفسير ({item.verseDetails.tafsirSource}):</span>
                      </div>
                      <p className="text-xs text-[#5C584E] leading-relaxed">
                        {item.verseDetails.tafsirSummary}
                      </p>
                    </div>
                  )}

                  {/* Dialect Usage & Example */}
                  {item.example && (
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] text-xs space-y-1">
                      <span className="font-bold text-[#254B3D]">الشاهد والاستعمال:</span>
                      <p className="text-[#5C584E] italic font-heritage-heading text-sm">
                        {item.example}
                      </p>
                    </div>
                  )}

                  {/* Expandable Topic Details (In-Card Accordion) */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-[#E5DDCF] space-y-4 animate-fadeIn">
                      
                      {/* Linguistic Context / التأصيل اللغوي */}
                      {item.linguisticContext && (
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#254B3D] flex items-center gap-1">
                            <Languages className="w-3.5 h-3.5 text-[#9A7944]" />
                            <span>التأصيل والتحليل اللغوي:</span>
                          </h4>
                          <p className="text-xs text-[#5C584E] leading-relaxed bg-white p-3 rounded-xl border border-[#E5DDCF]">
                            {item.linguisticContext}
                          </p>
                        </div>
                      )}

                      {/* Historical Context / السياق التاريخي */}
                      {item.historicalContext && (
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#254B3D] flex items-center gap-1">
                            <Scroll className="w-3.5 h-3.5 text-[#9A7944]" />
                            <span>السياق التاريخي والديني:</span>
                          </h4>
                          <p className="text-xs text-[#5C584E] leading-relaxed bg-white p-3 rounded-xl border border-[#E5DDCF]">
                            {item.historicalContext}
                          </p>
                        </div>
                      )}

                      {/* Dialect Usage Details */}
                      {item.dialectUsage && (
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#254B3D] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#9A7944]" />
                            <span>في عادات ولسان أهل مكة:</span>
                          </h4>
                          <p className="text-xs text-[#5C584E] leading-relaxed bg-white p-3 rounded-xl border border-[#E5DDCF]">
                            {item.dialectUsage}
                          </p>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-[#E5DDCF]/50 text-[#5C584E]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Card Footer: Verified Reference and Expand/Modal Buttons */}
                <div className="px-6 py-4 bg-white/60 border-t border-[#E5DDCF] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#5C584E] overflow-hidden truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#254B3D] shrink-0" />
                    <span className="truncate font-medium text-[11px]" title={item.reference}>
                      {item.reference}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(item.id, e)}
                      className="inline-flex items-center gap-1 text-[#9A7944] hover:text-[#254B3D] font-bold py-1 px-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                    >
                      <span>{isExpanded ? 'إيجاز' : 'تفصيل'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* Institutional Linguistic Summary Banner */}
      <section className="rounded-2xl border border-[#E5DDCF] bg-[#FAF7F2] p-8 text-center space-y-4">
        <h3 className="text-xl font-heritage-heading font-bold text-[#254B3D]">
          «نزل القرآن بلسان عربي مبين، فخلّد الله به لسان مكة عبر الأزمان»
        </h3>
        <p className="text-sm text-[#5C584E] max-w-2xl mx-auto leading-relaxed">
          جميع النصوص القرآنية، والتفاسير المعتمدة، والتأصيلات المعجمية في هذا القسم مستقاة ومحققة من أمهات المصادر: تفسير الطبري، وتفسير ابن كثير، والجامع لأحكام القرآن للقرطبي، ولسان العرب لابن منظور، وتاج العروس للزبيدي، والمزهر للسيوطي.
        </p>
      </section>

    </div>
  );
};
