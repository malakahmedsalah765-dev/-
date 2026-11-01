import React from 'react';
import { SectionId } from '../types/heritage';
import { Landmark, BookOpen, MapPin, Sparkles, Compass, Users, Scroll } from 'lucide-react';

interface FooterProps {
  onSelectSection: (section: SectionId) => void;
  onOpenAwardModal?: () => void;
  onOpenContentManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
}) => {
  const sections: { id: SectionId; label: string; icon: any }[] = [
    { id: 'vocabulary', label: 'لسان مكة', icon: BookOpen },
    { id: 'places', label: 'ذاكرة المكان', icon: MapPin },
    { id: 'glimpses', label: 'ملامح من الماضي', icon: Sparkles },
    { id: 'vision2030', label: 'مكة ورؤية 2030', icon: Compass },
    { id: 'memories', label: 'من ذاكرة أهل مكة', icon: Users },
    { id: 'arabicLanguage', label: 'مكة واللغة العربية', icon: Scroll },
  ];

  const handleNav = (id: SectionId) => {
    onSelectSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E5DDCF] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand & Purpose Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#254B3D] text-[#FAF7F2] flex items-center justify-center border border-[#9A7944]/40">
                <Landmark className="w-5 h-5 text-[#9A7944]" />
              </div>
              <div>
                <span className="text-2xl font-bold font-heritage-heading text-[#254B3D] tracking-tight">
                  مِداد مَكَّة
                </span>
              </div>
            </div>

            <p className="text-sm text-[#5C584E] leading-relaxed max-w-md font-light">
              منصة تفاعلية رقمية لتوثيق التراث الثقافي لمكة المكرمة، والحفاظ على هويتها التاريخية،
              ونقل ذاكرتها الجمعية للأجيال القادمة. صُممت بهيكل مرن لاستيعاب وتوسيع كافة المواد
              التوثيقية دون عوائق.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#9A7944] font-medium">
              <span>أصالة المحتوى</span>
              <span aria-hidden="true">·</span>
              <span>توثيق شفهي ومعماري</span>
              <span aria-hidden="true">·</span>
              <span>رؤية السعودية 2030</span>
            </div>
          </div>

          {/* Quick Navigation Sections */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-[#9A7944] tracking-wider uppercase">
              أروقة المنصة التوثيقية
            </h4>
            <ul className="space-y-2.5 text-sm text-[#254B3D]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#9A7944] transition-colors"
                >
                  الصفحة الرئيسية والتعريف بالمشروع
                </button>
              </li>
              {sections.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => handleNav(sec.id)}
                    className="hover:text-[#9A7944] transition-colors inline-flex items-center gap-2"
                  >
                    <span>{sec.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Note */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-[#9A7944] tracking-wider uppercase">
              إتاحة وتوثيق
            </h4>
            <p className="text-xs text-[#5C584E] leading-relaxed pt-1">
              المنصة متاحة لعموم الزوار بدون اشتراط تسجيل دخول، ومجهزة للعرض وللاستخدام العام المستمر لحفظ وتوثيق الذاكرة المكية.
            </p>
          </div>

        </div>

        {/* Bottom Hairline */}
        <div className="pt-12 mt-12 border-t border-[#E5DDCF] flex items-center justify-center gap-4 text-xs text-[#5C584E]">
          <div className="flex items-center gap-3">
            <span>تراث مكة المكرمة</span>
            <span aria-hidden="true">·</span>
            <span>الهوية الحجازية</span>
            <span aria-hidden="true">·</span>
            <span>المملكة العربية السعودية</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
