import React from 'react';
import {
  VocabularyItem,
  PlaceItem,
  GlimpseItem,
  Vision2030Item,
  MemoryItem,
  ArabicLanguageItem,
} from '../types/heritage';
import { X, Volume2, MapPin, Calendar, Quote, Building2, CheckCircle2, Share2, Printer, BookOpen, Scroll, Languages } from 'lucide-react';

type AnyHeritageItem =
  | { type: 'vocabulary'; data: VocabularyItem }
  | { type: 'place'; data: PlaceItem }
  | { type: 'glimpse'; data: GlimpseItem }
  | { type: 'vision2030'; data: Vision2030Item }
  | { type: 'memory'; data: MemoryItem }
  | { type: 'arabicLanguage'; data: ArabicLanguageItem };

interface ItemDetailModalProps {
  item: AnyHeritageItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الصفحة لمشاركتها.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderContent = () => {
    switch (item.type) {
      case 'vocabulary': {
        const v = item.data;
        const playSpeech = () => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(v.term);
            u.lang = 'ar-SA';
            window.speechSynthesis.speak(u);
          }
        };

        return (
          <div className="space-y-6">
            {v.image && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#254B3D]/10">
                <img
                  src={v.image}
                  alt={v.term}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5DDCF]">
              <div>
                <span className="text-xs font-semibold text-[#9A7944] mb-1 block">
                  {v.category}
                </span>
                <h3 className="text-3xl font-heritage-heading font-bold text-[#254B3D]">
                  {v.term}
                </h3>
                {v.pronunciation && (
                  <span className="text-sm text-[#5C584E]">[{v.pronunciation}]</span>
                )}
              </div>

              <button
                onClick={playSpeech}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#254B3D] rounded-lg hover:bg-[#1b382d] transition-colors"
              >
                <Volume2 className="w-4 h-4 text-[#C2A066]" />
                <span>الاستماع للنطق</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">المعنى والدلالة التراثية:</h4>
                <p className="text-base text-[#1B2923] leading-relaxed">{v.meaning}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">سياق الاستخدام المكي:</h4>
                <p className="text-sm text-[#5C584E] leading-relaxed">{v.context}</p>
              </div>

              <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] space-y-1">
                <span className="text-xs font-bold text-[#254B3D] flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-[#9A7944]" />
                  <span>مثال مكي أصيل:</span>
                </span>
                <p className="text-base font-heritage-heading text-[#254B3D] italic leading-relaxed">
                  {v.example}
                </p>
              </div>

              {v.historicalNote && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-[#9A7944] mb-1">التأصيل التوثيقي:</h4>
                  <p className="text-xs text-[#5C584E] leading-relaxed">{v.historicalNote}</p>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'place': {
        const p = item.data;
        return (
          <div className="space-y-6">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#254B3D]/10">
              <img
                src={p.image}
                alt={p.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                <span className="text-xs font-bold text-[#C2A066] mb-1">{p.category}</span>
                <h3 className="text-2xl sm:text-3xl font-heritage-heading font-bold">{p.name}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#E5DDCF] mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9A7944]" />
                    <span>{p.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#9A7944]" />
                    <span>{p.era}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">النبذة التوثيقية:</h4>
                <p className="text-base text-[#1B2923] leading-relaxed">{p.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">القصة التاريخية والتراثية:</h4>
                <p className="text-sm sm:text-base text-[#5C584E] leading-relaxed whitespace-pre-line font-light">
                  {p.fullStory}
                </p>
              </div>

              {p.features && p.features.length > 0 && (
                <div className="bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-2">
                  <h4 className="text-xs font-bold text-[#254B3D]">
                    الميزات المعمارية والذاكرة العمرانية:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C584E]">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7944] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {p.photographerOrSource && (
                <div className="text-[11px] text-[#9A7944] pt-2 border-t border-[#E5DDCF]">
                  المصدر التوثيقي: {p.photographerOrSource}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'glimpse': {
        const g = item.data;
        return (
          <div className="space-y-6">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#254B3D]/10">
              <img
                src={g.image}
                alt={g.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                <span className="text-xs font-bold text-[#C2A066] mb-1">{g.category}</span>
                <h3 className="text-2xl sm:text-3xl font-heritage-heading font-bold">{g.title}</h3>
                <span className="text-xs text-[#E5DDCF]">{g.period}</span>
              </div>
            </div>

            <div className="space-y-4">
              {g.quote && (
                <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] flex items-start gap-3">
                  <Quote className="w-6 h-6 text-[#9A7944] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base font-heritage-heading text-[#254B3D] italic leading-relaxed">
                    {g.quote}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">ملخص الملمح التاريخي:</h4>
                <p className="text-base text-[#1B2923] leading-relaxed">{g.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">تفاصيل العادة أو الحرفة:</h4>
                <p className="text-sm sm:text-base text-[#5C584E] leading-relaxed whitespace-pre-line font-light">
                  {g.content}
                </p>
              </div>

              {g.traditionHighlights && g.traditionHighlights.length > 0 && (
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DDCF] space-y-2">
                  <h4 className="text-xs font-bold text-[#254B3D]">مظاهر وطقوس العادة:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C584E]">
                    {g.traditionHighlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#254B3D] shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'vision2030': {
        const vis = item.data;
        return (
          <div className="space-y-6">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#254B3D]/10">
              <img
                src={vis.image}
                alt={vis.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#C2A066]">{vis.pillar}</span>
                  <span className="text-xs bg-[#254B3D] px-2 py-0.5 rounded border border-[#9A7944]/50">
                    {vis.status}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heritage-heading font-bold">{vis.title}</h3>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] space-y-1">
                  <span className="text-xs font-bold text-[#9A7944]">الجذر التراثي المحفوظ:</span>
                  <p className="text-xs text-[#5C584E] leading-relaxed">{vis.heritageFoundation}</p>
                </div>
                <div className="bg-[#EFE9DC] p-4 rounded-xl border border-[#9A7944]/30 space-y-1">
                  <span className="text-xs font-bold text-[#254B3D]">الرؤية والابتكار المستقبلي:</span>
                  <p className="text-xs text-[#254B3D] leading-relaxed font-medium">{vis.futureVision}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">التفاصيل المعمارية والتنموية:</h4>
                <p className="text-sm sm:text-base text-[#5C584E] leading-relaxed font-light">
                  {vis.details}
                </p>
              </div>

              {vis.metrics && vis.metrics.length > 0 && (
                <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E5DDCF] space-y-2">
                  <h4 className="text-xs font-bold text-[#254B3D]">مستهدفات وأثر المبادرة:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C584E]">
                    {vis.metrics.map((m, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7944] shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'memory': {
        const mem = item.data;
        return (
          <div className="space-y-6">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#254B3D]/10">
              <img
                src={mem.image}
                alt={mem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                <span className="text-xs font-bold text-[#C2A066] mb-1">{mem.place}</span>
                <h3 className="text-2xl sm:text-3xl font-heritage-heading font-bold">{mem.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#E5DDCF] mt-1">
                  <span>الراوي: {mem.narrator}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mem.period}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] flex items-start gap-3">
                <Quote className="w-6 h-6 text-[#9A7944] shrink-0 mt-0.5" />
                <p className="text-base font-heritage-heading text-[#254B3D] italic leading-relaxed">
                  {mem.excerpt}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-2">النص الشفهي الموثق:</h4>
                <p className="text-sm sm:text-base text-[#1B2923] leading-relaxed whitespace-pre-line font-light">
                  {mem.fullNarrative}
                </p>
              </div>

              {mem.recordingNote && (
                <div className="text-[11px] text-[#9A7944] pt-2 border-t border-[#E5DDCF]">
                  ملاحظة الأرشفة: {mem.recordingNote}
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'arabicLanguage': {
        const arb = item.data;
        const playSpeech = () => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const textToSpeak = arb.arabicText || arb.title;
            const u = new SpeechSynthesisUtterance(textToSpeak);
            u.lang = 'ar-SA';
            window.speechSynthesis.speak(u);
          }
        };

        return (
          <div className="space-y-6">
            {arb.image && (
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#254B3D]/10">
                <img
                  src={arb.image}
                  alt={arb.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                  <span className="text-xs font-bold text-[#C2A066] mb-1">{arb.subsection}</span>
                  <h3 className="text-2xl sm:text-3xl font-heritage-heading font-bold">{arb.title}</h3>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#9A7944] font-medium block">القسم الفرعي</span>
                <span className="text-base font-bold text-[#254B3D]">{arb.subsection}</span>
              </div>
              <button
                type="button"
                onClick={playSpeech}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#254B3D] text-[#FAF7F2] text-xs font-semibold hover:bg-[#1b382d] transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع للنطق</span>
              </button>
            </div>

            {arb.arabicText && (
              <div className="bg-[#254B3D]/5 border border-[#9A7944]/40 p-5 rounded-xl text-center">
                {arb.verseDetails && (
                  <div className="text-xs font-bold text-[#9A7944] mb-2">
                    {arb.verseDetails.surah} • آية {arb.verseDetails.ayahNumber}
                  </div>
                )}
                <blockquote className="font-heritage-heading text-xl sm:text-2xl font-bold text-[#254B3D] leading-relaxed">
                  «{arb.arabicText}»
                </blockquote>
              </div>
            )}

            {arb.meaning && (
              <div>
                <h4 className="text-xs font-bold text-[#9A7944] mb-1">المعنى والدلالة:</h4>
                <p className="text-sm sm:text-base text-[#1B2923] leading-relaxed">
                  {arb.meaning}
                </p>
              </div>
            )}

            {arb.verseDetails?.tafsirSummary && (
              <div className="bg-white p-4 rounded-xl border border-[#E5DDCF] space-y-1">
                <h4 className="text-xs font-bold text-[#9A7944] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>بيان التفسير ({arb.verseDetails.tafsirSource}):</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5C584E] leading-relaxed">
                  {arb.verseDetails.tafsirSummary}
                </p>
              </div>
            )}

            {arb.linguisticContext && (
              <div className="bg-white p-4 rounded-xl border border-[#E5DDCF] space-y-1">
                <h4 className="text-xs font-bold text-[#254B3D] flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-[#9A7944]" />
                  <span>التأصيل اللغوي والبياني:</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5C584E] leading-relaxed">
                  {arb.linguisticContext}
                </p>
              </div>
            )}

            {arb.historicalContext && (
              <div className="bg-white p-4 rounded-xl border border-[#E5DDCF] space-y-1">
                <h4 className="text-xs font-bold text-[#254B3D] flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5 text-[#9A7944]" />
                  <span>السياق التاريخي والديني:</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5C584E] leading-relaxed">
                  {arb.historicalContext}
                </p>
              </div>
            )}

            {arb.example && (
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DDCF] space-y-1">
                <span className="text-xs font-bold text-[#9A7944] block">الشاهد والاستعمال:</span>
                <p className="text-sm font-heritage-heading italic text-[#254B3D]">
                  {arb.example}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-[#E5DDCF] flex items-center gap-2 text-xs text-[#5C584E]">
              <CheckCircle2 className="w-4 h-4 text-[#254B3D] shrink-0" />
              <span>المصدر والتوثيق المعتمد: <strong className="text-[#1B2923]">{arb.reference}</strong></span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-3xl rounded-2xl border border-[#E5DDCF] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 border-b border-[#E5DDCF] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9A7944]">
            <span>أرشيف مداد مكة للتوثيق</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#5C584E] hover:text-[#254B3D] rounded-lg hover:bg-[#EFE9DC] transition-colors"
              title="مشاركة"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-[#5C584E] hover:text-[#254B3D] rounded-lg hover:bg-[#EFE9DC] transition-colors"
              title="طباعة"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#254B3D] hover:bg-[#EFE9DC] rounded-lg transition-colors focus:outline-none"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F5F0E6] px-6 py-3.5 border-t border-[#E5DDCF] flex items-center justify-between text-xs text-[#5C584E]">
          <span>منصة مداد مكة – وثيقة تراثية قابلة للطباعة والبحث</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold text-[#254B3D] bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg hover:bg-[#EFE9DC] transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
