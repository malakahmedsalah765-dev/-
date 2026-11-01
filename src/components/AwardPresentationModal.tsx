import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Target, HeartHandshake, Printer } from 'lucide-react';
import { PlatformHeritageData } from '../types/heritage';

interface AwardPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PlatformHeritageData;
}

export const AwardPresentationModal: React.FC<AwardPresentationModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-4xl rounded-2xl border border-[#E5DDCF] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#254B3D] text-[#FAF7F2] p-6 sm:p-8 flex items-start justify-between border-b border-[#9A7944]/40 shrink-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2A066]">
              <Award className="w-4 h-4" />
              <span>ملف التقديم والعرض أمام لجنة التحكيم</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heritage-heading font-bold">
              مِداد مَكَّة – ذاكرة مكان بإنسان
            </h3>
            <p className="text-xs text-[#FAF7F2]/80">
              الملف التعريفي للمبادرة التراثية الرقمية لتوثيق الهوية المكية للأجيال القادمة
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm leading-relaxed text-[#1B2923]">
          
          {/* Executive Overview */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#9A7944] tracking-wider uppercase block">
              01. الملخص التنفيذي للمبادرة
            </span>
            <h4 className="text-xl font-heritage-heading font-bold text-[#254B3D]">
              لماذا «مداد مكة»؟
            </h4>
            <p className="text-[#5C584E]">
              تمثل مكة المكرمة المركز الروحي لمليار ونصف مسلم، وتمتلك تراثاً إنسانياً وحضارياً شديد
              الخصوصية تراكم على مدار آلاف السنين. ومع التحولات المعمارية والحضرية المتسارعة، نشأت
              حاجة ماسة إلى وثيقة رقمية تفاعلية تحفظ الذاكرة الشفهية لأهالي مكة، وتوثق أبعاد
              لهجتهم، وتخلد أزقتهم وأسواقهم، دون أن تترك هذا الإرث الثمين عرضة للنسيان.
            </p>
          </div>

          {/* Pillars of Excellence Grid */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#9A7944] tracking-wider uppercase block">
              02. ركائز التميز المؤسسي والتراثي
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#254B3D]">
                  <ShieldCheck className="w-4 h-4 text-[#9A7944]" />
                  <span>أصالة المصادر وموثوقيتها</span>
                </div>
                <p className="text-xs text-[#5C584E] leading-relaxed">
                  الاعتماد الصارم على الشهادات الشفهية الموثقة لكبار السن ووجهاء مكة، وتوثيق مفردات
                  اللسان المكي وسياقاتها الواقعية دون اختلاق أو تشويه تاريخي.
                </p>
              </div>

              <div className="bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#254B3D]">
                  <Target className="w-4 h-4 text-[#9A7944]" />
                  <span>التوافق مع مستهدفات رؤية 2030</span>
                </div>
                <p className="text-xs text-[#5C584E] leading-relaxed">
                  الانسجام الكامل مع برامج الرؤية وبرنامج خدمة ضيوف الرحمن لتعزيز الهوية الوطنية،
                  وربط المشاريع الحديثة بالجذور التاريخية الحجازية الأصيلة.
                </p>
              </div>

              <div className="bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#254B3D]">
                  <HeartHandshake className="w-4 h-4 text-[#9A7944]" />
                  <span>الوصول العام المجاني دون قيود</span>
                </div>
                <p className="text-xs text-[#5C584E] leading-relaxed">
                  إتاحة المنصة لعموم الزوار والباحثين وضيوف الرحمن مجاناً وبلا اشتراط تسجيل دخول،
                  ليكون التراث المكي متاحاً لكل مهتم في كافة أنحاء العالم.
                </p>
              </div>

              <div className="bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#254B3D]">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7944]" />
                  <span>المرونة والاستدامة التوثيقية</span>
                </div>
                <p className="text-xs text-[#5C584E] leading-relaxed">
                  تضمين نظام إداري مدمج يتيح لفريق العمل تحديث وتوسيع محتويات الأرشيف من مواد كانفا
                  المحضرة دون أي عوائق تقنية أو الحاجة لإعادة كتابة.
                </p>
              </div>
            </div>
          </div>

          {/* Current Archival Inventory */}
          <div className="bg-[#254B3D] text-[#FAF7F2] p-6 rounded-xl border border-[#9A7944]/50 space-y-4">
            <span className="text-xs font-bold text-[#C2A066] tracking-wider uppercase">
              03. إحصائيات الأرشيف الرقمي المتاح حالياً
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div className="p-3 bg-[#FAF7F2]/10 rounded-lg">
                <div className="text-2xl font-bold font-heritage-heading text-[#C2A066]">
                  {data.vocabulary.length}
                </div>
                <div className="text-[11px] text-[#FAF7F2]/80 mt-1">مصطلحاً في لسان مكة</div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/10 rounded-lg">
                <div className="text-2xl font-bold font-heritage-heading text-[#C2A066]">
                  {data.places.length}
                </div>
                <div className="text-[11px] text-[#FAF7F2]/80 mt-1">معلماً وحياً تاريخياً</div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/10 rounded-lg">
                <div className="text-2xl font-bold font-heritage-heading text-[#C2A066]">
                  {data.glimpses.length}
                </div>
                <div className="text-[11px] text-[#FAF7F2]/80 mt-1">ملفاً لعادات وماضي مكة</div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/10 rounded-lg">
                <div className="text-2xl font-bold font-heritage-heading text-[#C2A066]">
                  {data.vision2030.length}
                </div>
                <div className="text-[11px] text-[#FAF7F2]/80 mt-1">مشروعاً ومبادرة 2030</div>
              </div>
              <div className="p-3 bg-[#FAF7F2]/10 rounded-lg">
                <div className="text-2xl font-bold font-heritage-heading text-[#C2A066]">
                  {data.memories.length}
                </div>
                <div className="text-[11px] text-[#FAF7F2]/80 mt-1">شهادة شفهية لكبار السن</div>
              </div>
            </div>
          </div>

          {/* Institutional Closing */}
          <div className="pt-2 text-xs text-[#5C584E] space-y-1">
            <p className="font-bold text-[#254B3D]">
              «مداد مكة: وثيقة وفاء لمهبط الوحي، وإهداء مخلص لأجيال المستقبل»
            </p>
            <p>
              صُمم النظام ليكون ركيزة مستدامة في مبادرات حفظ التراث الوطني، ومرجعاً معتمداً للثقافة
              المكية.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#F5F0E6] px-6 py-3.5 border-t border-[#E5DDCF] flex items-center justify-between text-xs text-[#5C584E] shrink-0">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#254B3D] bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg hover:bg-[#EFE9DC] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة ملف الجائزة</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 font-bold text-[#FAF7F2] bg-[#254B3D] rounded-lg hover:bg-[#1b382d] transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
