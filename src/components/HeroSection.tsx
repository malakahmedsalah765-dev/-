import React, { useState } from 'react';
import { SectionId, PlatformHeritageData } from '../types/heritage';
import { HERO_IMAGE } from '../data/heritageData';
import { LightboxImage } from './ImageLightboxModal';
import {
  BookOpen,
  MapPin,
  Sparkles,
  Compass,
  Users,
  ChevronLeft,
  ShieldCheck,
  Scroll,
  Search,
  Image as ImageIcon,
  ZoomIn,
  ArrowRight,
} from 'lucide-react';

interface HeroSectionProps {
  data: PlatformHeritageData;
  onSelectSection: (section: SectionId) => void;
  onOpenAwardModal?: () => void;
  onOpenContentManager: () => void;
  onOpenSearch?: (initialQuery?: string) => void;
  onOpenLightbox?: (images: LightboxImage[], initialIndex: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onSelectSection,
  onOpenContentManager,
  onOpenSearch,
  onOpenLightbox,
}) => {
  const [heroSearchInput, setHeroSearchInput] = useState('');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim() && onOpenSearch) {
      onOpenSearch(heroSearchInput.trim());
    } else if (onOpenSearch) {
      onOpenSearch('');
    }
  };

  const handleChipClick = (term: string) => {
    if (onOpenSearch) {
      onOpenSearch(term);
    }
  };

  const sectionsList = [
    {
      id: 'vocabulary' as SectionId,
      title: 'لسان مكة',
      sub: 'كلمات وتعبيرات أهل مكة ومعانيها',
      count: data.vocabulary.length,
      unit: 'مصطلحاً موثقاً',
      icon: BookOpen,
      desc: 'أصالة اللهجة المكية، مفردات البيت والمجلس والمواسم، وسياقها اللغوي التراثي.',
    },
    {
      id: 'places' as SectionId,
      title: 'ذاكرة المكان',
      sub: 'الأحياء التاريخية والأسواق والمعالم',
      count: data.places.length,
      unit: 'معلماً وحياً عريقاً',
      icon: MapPin,
      desc: 'توثيق العمارة الحجازية، الرواشين، الأزقة الحجرية، وقصص الدروب التي احتضنت الحجيج.',
    },
    {
      id: 'glimpses' as SectionId,
      title: 'ملامح من الماضي',
      sub: 'المهن المكية، العادات، والحياة اليومية',
      count: data.glimpses.length,
      unit: 'ملفاً توثيقياً',
      icon: Sparkles,
      desc: 'شرف السقاية والطوافة، مجلس المركاز، عادات يوم الخليف، ومواسم الخير المكية.',
    },
    {
      id: 'vision2030' as SectionId,
      title: 'مكة ورؤية 2030',
      sub: 'صون الهوية ومشاريع التطوير المستقبلية',
      count: data.vision2030.length,
      unit: 'مبادرة حضارية',
      icon: Compass,
      desc: 'التناغم بين الحفاظ على الإرث التاريخي العتيق وإطلاق أحدث المشاريع الحضرية والثقافية.',
    },
    {
      id: 'memories' as SectionId,
      title: 'من ذاكرة أهل مكة',
      sub: 'شهادات شفهية وقصص الآباء والأجداد',
      count: data.memories.length,
      unit: 'شهادة مسجلة',
      icon: Users,
      desc: 'حكايات كبار السن، ذكريات ليالي رمضان وأيام الحج في أزقة الشامية وأجياد وسوق الليل.',
    },
    {
      id: 'arabicLanguage' as SectionId,
      title: 'مكة واللغة العربية',
      sub: 'من مهبط الوحي إلى ذاكرة اللغة',
      count: data.arabicLanguage ? data.arabicLanguage.length : 24,
      unit: 'مبحثاً لغوياً وقرآنياً',
      icon: Scroll,
      desc: 'مكة في القرآن، فصاحة قريش، من الفصحى للهجة، وتأصيل كلمات الذاكرة المكية.',
    },
  ];

  // Curated gallery images from across the platform
  const galleryImages: LightboxImage[] = [
    {
      url: HERO_IMAGE,
      title: 'أزقة ورواشين مكة المكرمة العتيقة',
      subtitle: 'توثيق الطراز المعماري الحجازي الفريد والرواشين الخشبية المحفورة في أزقة مكة القديمة.',
      source: 'أرشيف مداد مكة للذاكرة الحضرية',
      category: 'العمارة الحجازية',
    },
    ...data.places.map((p) => ({
      url: p.image,
      title: p.name,
      subtitle: p.description,
      source: p.photographerOrSource || p.location,
      category: p.category,
    })),
    ...data.glimpses.slice(0, 3).map((g) => ({
      url: g.image,
      title: g.title,
      subtitle: g.summary,
      source: g.period,
      category: g.category,
    })),
  ];

  const handleOpenGalleryImage = (idx: number) => {
    if (onOpenLightbox) {
      onOpenLightbox(galleryImages, idx);
    }
  };

  return (
    <div className="space-y-16">
      
      {/* Editorial Hero Monograph */}
      <section className="relative overflow-hidden rounded-2xl border border-[#E5DDCF] bg-[#FAF7F2] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[560px]">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Primary Headline & Subtitle */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#254B3D]/10 text-[#254B3D] border border-[#254B3D]/15">
                  <span className="w-2 h-2 rounded-full bg-[#9A7944] animate-pulse"></span>
                  <span>المنصة التفاعلية الموحدة للتراث المكي</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heritage-heading font-bold text-[#254B3D] leading-tight">
                  مِداد مَكَّة
                </h1>
                <p className="text-xl sm:text-2xl text-[#9A7944] font-heritage-heading font-medium">
                  ذاكرةٌ تُروى، وهويةٌ تبقى
                </p>
              </div>

              {/* Project Principles Highlights */}
              <div className="pt-2 border-t border-[#E5DDCF] space-y-3">
                <div>
                  <div className="text-xs text-[#9A7944] font-semibold mb-1">الهدف الأسمى</div>
                  <div className="text-base text-[#254B3D] font-medium leading-relaxed">
                    منصة ثقافية توثّق ذاكرة مكة المكرمة، ومفرداتها الشعبية، وحكاياتها المتوارثة، لتبقى تفاصيل المكان حاضرة في وجدان الأجيال.
                  </div>
                </div>
              </div>

              {/* Interactive Platform Search Bar */}
              <div className="pt-2 space-y-2.5">
                <form
                  onSubmit={handleHeroSearchSubmit}
                  className="flex items-center gap-2 bg-[#F5F0E6] p-1.5 rounded-xl border border-[#E5DDCF] focus-within:border-[#9A7944] focus-within:ring-2 focus-within:ring-[#9A7944]/20 transition-all shadow-inner"
                >
                  <Search className="w-5 h-5 text-[#9A7944] ml-2 shrink-0" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder="ابحث في التراث المكي... كلمات، أحياء عتيقة، معالم، حكايات، أو مباحث لغوية"
                    className="w-full bg-transparent text-sm text-[#1B2923] placeholder-[#5C584E]/70 focus:outline-none py-1.5"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-[#FAF7F2] bg-[#254B3D] hover:bg-[#1b382d] rounded-lg transition-colors whitespace-nowrap shadow-sm shrink-0"
                  >
                    بحث فوري
                  </button>
                </form>

                {/* Quick Discovery Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[#5C584E] text-[11px] ml-1">استكشف سريعاً:</span>
                  {[
                    'الأحياء التاريخية',
                    'المصطلحات المكية',
                    'العمارة الحجازية',
                    'مكة في القرآن الكريم',
                    'رؤية 2030',
                    'شهادات الأجداد',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className="px-2.5 py-1 text-[11px] font-medium text-[#254B3D] bg-[#F5F0E6] hover:bg-[#9A7944] hover:text-[#FAF7F2] rounded-md border border-[#E5DDCF] transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Actions Ribbon */}
            <div className="pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectSection('vocabulary')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#FAF7F2] bg-[#254B3D] rounded-xl hover:bg-[#1b382d] transition-all shadow-sm group"
              >
                <span>ابدأ استكشاف مكة</span>
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => onOpenLightbox && onOpenLightbox(galleryImages, 0)}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#254B3D] bg-[#FAF7F2] border border-[#E5DDCF] hover:border-[#9A7944] rounded-xl transition-all shadow-sm group"
              >
                <ImageIcon className="w-4 h-4 text-[#9A7944]" />
                <span>معرض الصور التراثية</span>
              </button>
            </div>

          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
            <img
              src={HERO_IMAGE}
              alt="أزقة ورواشين مكة المكرمة التاريخية العتيقة"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#254B3D]/70 via-transparent to-transparent flex flex-col justify-end p-6 lg:p-8 text-[#FAF7F2]">
              <div className="space-y-1 bg-[#254B3D]/80 backdrop-blur-sm p-4 rounded-xl border border-[#9A7944]/30 max-w-sm">
                <span className="text-xs uppercase tracking-widest text-[#B8965D]">توثيق بصري ومعماري</span>
                <p className="text-sm font-heritage-heading font-medium leading-snug">
                  «أزقة مكة ورواشينها.. كل حجر يروي حكاية مجاورة وبركة»
                </p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px] text-[#FAF7F2]/80">أرشيف مداد مكة للذاكرة الحضرية</p>
                  <button
                    onClick={() => onOpenLightbox && onOpenLightbox(galleryImages, 0)}
                    className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title="تكبير الصورة وعرض المعرض"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The Core Heritage Sections Grid */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#9A7944] tracking-wide mb-1">
              أقسام المنصة الرئيسية
            </div>
            <h2 className="text-2xl sm:text-3xl font-heritage-heading font-bold text-[#254B3D]">
              أروقة الذاكرة المكية والمباحث الأصيلة
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C584E] max-w-md">
            سبعة أروقة توثيقية رئيسية تحفظ مفردات المكان، وحياة الإنسان، وتاريخ البلد الحرام.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className="group relative bg-[#FAF7F2] rounded-xl border border-[#E5DDCF] p-6 hover:border-[#9A7944] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F0E6] border border-[#E5DDCF] flex items-center justify-center text-[#254B3D] group-hover:bg-[#254B3D] group-hover:text-[#FAF7F2] transition-colors">
                      <Icon className="w-6 h-6 text-[#9A7944] group-hover:text-[#C2A066]" />
                    </div>
                    <span className="text-xs font-medium text-[#9A7944] bg-[#F5F0E6] px-2.5 py-1 rounded-md border border-[#E5DDCF]">
                      {sec.count} {sec.unit}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-heritage-heading font-bold text-[#254B3D] group-hover:text-[#9A7944] transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-[#9A7944] font-medium mt-0.5">{sec.sub}</p>
                    <p className="text-sm text-[#5C584E] mt-3 leading-relaxed">{sec.desc}</p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E5DDCF] flex items-center justify-between text-xs font-bold text-[#254B3D] group-hover:text-[#9A7944]">
                  <span>فتح وتصفح القسم</span>
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            );
          })}

          {/* Canva Material Integration & Expansion Card */}
          <div
            onClick={onOpenContentManager}
            className="group relative bg-[#254B3D] text-[#FAF7F2] rounded-xl border border-[#9A7944]/50 p-6 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2]/10 border border-[#9A7944]/40 flex items-center justify-center text-[#B8965D]">
                  <ShieldCheck className="w-6 h-6 text-[#C2A066]" />
                </div>
                <span className="text-xs font-medium text-[#C2A066] bg-[#FAF7F2]/10 px-2.5 py-1 rounded-md">
                  مرن وقابل للتوسيع
                </span>
              </div>

              <div>
                <h3 className="text-xl font-heritage-heading font-bold text-[#FAF7F2] group-hover:text-[#C2A066] transition-colors mb-2">
                  إدارة المحتوى وتوسيع المواد
                </h3>
                <p className="text-sm text-[#FAF7F2]/80 mt-1 leading-relaxed">
                  هيكل المنصة صُمم ليمكنكم من إضافة المواد والنصوص والصور التي جهزتموها في كانفا، وتعديل
                  أو إضافة أي عناصر جديدة وتصدير الأرشيف كاملاً بضغطة زر.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#FAF7F2]/20 flex items-center justify-between text-xs font-bold text-[#C2A066]">
              <span>فتح لوحة إدارة وتوسيع المواد</span>
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
          </div>

        </div>
      </section>

      {/* Visual Heritage Gallery Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#9A7944] tracking-wide mb-1">
              معرض الروائع البصرية
            </div>
            <h2 className="text-2xl sm:text-3xl font-heritage-heading font-bold text-[#254B3D]">
              شواهد بصرية من ذاكرة مكة المكرمة
            </h2>
          </div>
          <button
            onClick={() => onOpenLightbox && onOpenLightbox(galleryImages, 0)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A7944] hover:text-[#254B3D] transition-colors"
          >
            <span>استعراض كافة الصور ({galleryImages.length} صور)</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.slice(0, 8).map((img, i) => (
            <div
              key={i}
              onClick={() => handleOpenGalleryImage(i)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#254B3D]/10 border border-[#E5DDCF] cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/90 group-hover:bg-[#254B3D] transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  {img.category && (
                    <span className="text-[10px] text-[#C2A066] font-semibold block mb-0.5">
                      {img.category}
                    </span>
                  )}
                  <h4 className="text-xs font-bold font-heritage-heading line-clamp-1">{img.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-[#FAF7F2] border border-[#E5DDCF] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold text-[#9A7944] tracking-widest uppercase">
            فلسفة مداد مكة
          </span>
          <blockquote className="text-2xl sm:text-3xl font-heritage-heading font-bold text-[#254B3D] leading-snug">
            «المكان في مكة لا تصنعه الجغرافيا وحدها، بل يصنعه الإنسان الذي سكن شعابها، وسقى حجاجها،
            وحفظ في صدره أمانة البلد الحرام»
          </blockquote>
          <p className="text-sm text-[#5C584E] leading-relaxed">
            من هذا المنطلق، لم تكن «مداد مكة» مجرد جرد للآثار الصامتة، بل توثيقاً ينبض بالروح لكل
            كلمة نطق بها لسان أهلها، ولكل حرفة صاغتها أيدي حِرفييها، ولكل حارة كانت ملاذاً للألفة
            والأمان.
          </p>
        </div>
      </section>

    </div>
  );
};
