/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SectionId, PlatformHeritageData } from './types/heritage';
import {
  getStoredHeritageData,
  saveHeritageData,
  resetHeritageDataToDefault,
} from './data/heritageData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { VocabularySection } from './components/VocabularySection';
import { PlacesSection } from './components/PlacesSection';
import { GlimpsesSection } from './components/GlimpsesSection';
import { Vision2030Section } from './components/Vision2030Section';
import { MemoriesSection } from './components/MemoriesSection';
import { ArabicLanguageSection } from './components/ArabicLanguageSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ContentManagerModal } from './components/ContentManagerModal';
import { AwardPresentationModal } from './components/AwardPresentationModal';
import { ImageLightboxModal, LightboxImage } from './components/ImageLightboxModal';
import { ChevronRight, ChevronLeft, Home, ArrowRight, BookOpen, MapPin, Sparkles, Compass, Users, Scroll } from 'lucide-react';

const SECTIONS_ORDER: { id: SectionId; title: string; subtitle: string; icon: any }[] = [
  { id: 'vocabulary', title: 'لسان مكة', subtitle: 'الكلمات والتعبيرات', icon: BookOpen },
  { id: 'places', title: 'ذاكرة المكان', subtitle: 'الأحياء والمعالم العتيقة', icon: MapPin },
  { id: 'glimpses', title: 'ملامح من الماضي', subtitle: 'المهن والعادات المكية', icon: Sparkles },
  { id: 'vision2030', title: 'مكة ورؤية 2030', subtitle: 'مشاريع التطوير وصون الهوية', icon: Compass },
  { id: 'memories', title: 'من ذاكرة أهل مكة', subtitle: 'شهادات شفهية وحكايات', icon: Users },
  { id: 'arabicLanguage', title: 'مكة واللغة العربية', subtitle: 'من مهبط الوحي إلى ذاكرة اللغة', icon: Scroll },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [heritageData, setHeritageData] = useState<PlatformHeritageData>(getStoredHeritageData);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [isContentManagerOpen, setIsContentManagerOpen] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<any>(null);

  // Image Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // URL Hash synchronization for multi-page feel & back button support
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as SectionId;
      const validSections: SectionId[] = [
        'home',
        'vocabulary',
        'places',
        'glimpses',
        'vision2030',
        'memories',
        'arabicLanguage',
      ];
      if (hash && validSections.includes(hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update data and persist
  const handleSaveData = (newData: PlatformHeritageData) => {
    setHeritageData(newData);
    saveHeritageData(newData);
  };

  const handleResetData = () => {
    const defaultData = resetHeritageDataToDefault();
    setHeritageData(defaultData);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchInitialQuery('');
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    if (section === 'home') {
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = section;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = (initialQuery?: string) => {
    setSearchInitialQuery(initialQuery || '');
    setIsSearchOpen(true);
  };

  // Open item from search or section
  const handleOpenSearchItem = (type: string, item: any) => {
    setSelectedDetailItem({ type, data: item });
  };

  // Open Lightbox
  const handleOpenLightbox = (images: LightboxImage[], initialIndex: number) => {
    setLightboxImages(images);
    setLightboxIndex(initialIndex);
    setIsLightboxOpen(true);
  };

  const getSectionTitle = (id: SectionId) => {
    switch (id) {
      case 'home':
        return 'الرئيسية';
      case 'vocabulary':
        return 'لسان مكة';
      case 'places':
        return 'ذاكرة المكان';
      case 'glimpses':
        return 'ملامح من الماضي';
      case 'vision2030':
        return 'مكة ورؤية 2030';
      case 'memories':
        return 'من ذاكرة أهل مكة';
      case 'arabicLanguage':
        return 'مكة واللغة العربية';
    }
  };

  // Section Pagination helpers
  const currentSectionIdx = SECTIONS_ORDER.findIndex((s) => s.id === activeSection);
  const prevSection = currentSectionIdx > 0 ? SECTIONS_ORDER[currentSectionIdx - 1] : null;
  const nextSection =
    currentSectionIdx >= 0 && currentSectionIdx < SECTIONS_ORDER.length - 1
      ? SECTIONS_ORDER[currentSectionIdx + 1]
      : null;

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#1B2923] flex flex-col font-sans selection:bg-[#9A7944]/20 selection:text-[#254B3D]">
      
      {/* Top Header Bar */}
      <Header
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => handleOpenSearch('')}
        onOpenContentManager={() => setIsContentManagerOpen(true)}
        onOpenAwardModal={() => setIsAwardModalOpen(true)}
      />

      {/* Main Container */}
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-8">
        
        {/* Dedicated Section Page Breadcrumb & Quick Switch Bar */}
        {activeSection !== 'home' && (
          <div className="bg-[#FAF7F2] border border-[#E5DDCF] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Breadcrumb Trail & Home Button */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <button
                  onClick={() => handleSelectSection('home')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F0E6] hover:bg-[#254B3D] text-[#254B3D] hover:text-[#FAF7F2] font-semibold border border-[#E5DDCF] transition-all shadow-sm"
                  title="العودة للصفحة الرئيسية"
                >
                  <ArrowRight className="w-4 h-4 text-[#9A7944]" />
                  <span>العودة للرئيسية</span>
                </button>
                <span className="text-[#9A7944] font-bold">/</span>
                <span className="font-bold text-[#254B3D]">{getSectionTitle(activeSection)}</span>
              </div>

              {/* Quick Jump Section Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-[#5C584E] text-[11px] whitespace-nowrap ml-1">انتقال سريع:</span>
                {SECTIONS_ORDER.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleSelectSection(sec.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                      activeSection === sec.id
                        ? 'bg-[#254B3D] text-[#FAF7F2] border-[#254B3D] font-bold'
                        : 'bg-[#F5F0E6] text-[#5C584E] hover:text-[#254B3D] border-[#E5DDCF]'
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Section Views Rendering */}
        {activeSection === 'home' && (
          <HeroSection
            data={heritageData}
            onSelectSection={handleSelectSection}
            onOpenAwardModal={() => setIsAwardModalOpen(true)}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
            onOpenSearch={handleOpenSearch}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeSection === 'vocabulary' && (
          <VocabularySection
            items={heritageData.vocabulary}
            onSelectItem={(item) => setSelectedDetailItem({ type: 'vocabulary', data: item })}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
          />
        )}

        {activeSection === 'places' && (
          <PlacesSection
            items={heritageData.places}
            onSelectItem={(item) => setSelectedDetailItem({ type: 'place', data: item })}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeSection === 'glimpses' && (
          <GlimpsesSection
            items={heritageData.glimpses}
            onSelectItem={(item) => setSelectedDetailItem({ type: 'glimpse', data: item })}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeSection === 'vision2030' && (
          <Vision2030Section
            items={heritageData.vision2030}
            onSelectItem={(item) => setSelectedDetailItem({ type: 'vision2030', data: item })}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeSection === 'memories' && (
          <MemoriesSection
            items={heritageData.memories}
            onSelectItem={(item) => setSelectedDetailItem({ type: 'memory', data: item })}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activeSection === 'arabicLanguage' && (
          <ArabicLanguageSection
            items={heritageData.arabicLanguage || []}
            onSelectItem={(item) => setSelectedDetailItem({ type: 'arabicLanguage', data: item })}
            onOpenContentManager={() => setIsContentManagerOpen(true)}
          />
        )}

        {/* Section Bottom Pagination & Return Navigation */}
        {activeSection !== 'home' && (
          <section className="pt-8 border-t border-[#E5DDCF] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Previous Section */}
            {prevSection ? (
              <button
                onClick={() => handleSelectSection(prevSection.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] hover:border-[#9A7944] text-[#254B3D] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4 text-[#9A7944]" />
                <div className="text-right">
                  <span className="block text-[10px] text-[#9A7944]">القسم السابق</span>
                  <span>{prevSection.title}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleSelectSection('home')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDCF] hover:border-[#9A7944] text-[#254B3D] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <Home className="w-4 h-4 text-[#9A7944]" />
                <span>العودة للرئيسية</span>
              </button>
            )}

            {/* Back to Home Central Button */}
            <button
              onClick={() => handleSelectSection('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F5F0E6] border border-[#E5DDCF] hover:bg-[#254B3D] hover:text-[#FAF7F2] text-xs font-bold text-[#254B3D] transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#9A7944]" />
              <span>الصفحة الرئيسية</span>
            </button>

            {/* Next Section */}
            {nextSection ? (
              <button
                onClick={() => handleSelectSection(nextSection.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#254B3D] text-[#FAF7F2] hover:bg-[#1b382d] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <div className="text-left">
                  <span className="block text-[10px] text-[#C2A066]">القسم التالي</span>
                  <span>{nextSection.title}</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#C2A066]" />
              </button>
            ) : (
              <button
                onClick={() => handleSelectSection('home')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#254B3D] text-[#FAF7F2] hover:bg-[#1b382d] text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                <span>العودة للرئيسية</span>
                <ChevronLeft className="w-4 h-4 text-[#C2A066]" />
              </button>
            )}
          </section>
        )}

      </main>

      {/* Global Heritage Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={heritageData}
        onSelectItem={handleOpenSearchItem}
        initialQuery={searchInitialQuery}
      />

      {/* Item Detail Reader Modal */}
      <ItemDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      {/* Content & Canva Integration Manager */}
      <ContentManagerModal
        isOpen={isContentManagerOpen}
        onClose={() => setIsContentManagerOpen(false)}
        data={heritageData}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />

      {/* Award Presentation Dossier Modal */}
      <AwardPresentationModal
        isOpen={isAwardModalOpen}
        onClose={() => setIsAwardModalOpen(false)}
        data={heritageData}
      />

      {/* Image Lightbox Gallery Modal */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />

      {/* Institutional Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenAwardModal={() => setIsAwardModalOpen(true)}
        onOpenContentManager={() => setIsContentManagerOpen(true)}
      />

    </div>
  );
}
