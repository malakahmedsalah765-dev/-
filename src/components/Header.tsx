import React, { useState } from 'react';
import { SectionId } from '../types/heritage';
import { Search, Settings, Menu, X, Landmark, Award } from 'lucide-react';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenSearch: () => void;
  onOpenContentManager: () => void;
  onOpenAwardModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenContentManager,
  onOpenAwardModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'vocabulary', label: 'لسان مكة' },
    { id: 'places', label: 'ذاكرة المكان' },
    { id: 'glimpses', label: 'ملامح من الماضي' },
    { id: 'vision2030', label: 'مكة ورؤية 2030' },
    { id: 'memories', label: 'من ذاكرة أهل مكة' },
    { id: 'arabicLanguage', label: 'مكة واللغة العربية' },
  ];

  const handleNavClick = (id: SectionId) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Single text element wordmark with heritage motif */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7944] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-[#254B3D] text-[#FAF7F2] flex items-center justify-center border border-[#9A7944]/40 shrink-0 shadow-sm transition-transform group-hover:scale-105">
              <Landmark className="w-5 h-5 text-[#9A7944]" />
            </div>
            <span className="text-2xl font-bold font-heritage-heading text-[#254B3D] tracking-tight whitespace-nowrap">
              مِداد مَكَّة
            </span>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 whitespace-nowrap transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7944] rounded ${
                    isActive
                      ? 'text-[#254B3D] font-bold'
                      : 'text-[#5C584E] hover:text-[#254B3D]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9A7944] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search, Content Manager, Award Dossier) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg text-[#254B3D] hover:bg-[#EBE3D3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7944]"
              title="البحث في الأرشيف المكي (Ctrl+K)"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Award Presentation Button */}
            <button
              onClick={onOpenAwardModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#9A7944] bg-[#FAF7F2] border border-[#9A7944]/40 rounded-lg hover:bg-[#9A7944] hover:text-[#FAF7F2] transition-colors shadow-sm whitespace-nowrap"
              title="ملف التقديم لجائزة مكة للتميز"
            >
              <Award className="w-4 h-4" />
              <span>ملف الجائزة</span>
            </button>

            {/* Content Manager Trigger (Canva Material Integration) */}
            <button
              onClick={onOpenContentManager}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#FAF7F2] bg-[#254B3D] rounded-lg hover:bg-[#1b382d] transition-colors shadow-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A7944]"
              title="إدارة وتوسيع مواد كانفا"
            >
              <Settings className="w-4 h-4 text-[#C2A066]" />
              <span className="hidden md:inline">إدارة مواد كانفا</span>
              <span className="md:hidden">المحتوى</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#254B3D] hover:bg-[#EBE3D3] rounded-lg focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E5DDCF] px-4 pt-3 pb-6 shadow-md transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-right px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#254B3D] text-[#FAF7F2]'
                    : 'text-[#254B3D] hover:bg-[#EFE9DC]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#E5DDCF] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAwardModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#9A7944] bg-[#F5F0E6] border border-[#9A7944]/40 rounded-lg"
              >
                <Award className="w-4 h-4" />
                <span>ملف جائزة مكة للتميز</span>
              </button>
              <button
                onClick={() => {
                  onOpenContentManager();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#FAF7F2] bg-[#254B3D] rounded-lg"
              >
                <Settings className="w-4 h-4 text-[#C2A066]" />
                <span>إدارة وإضافة مواد كانفا (Canva Editor)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
