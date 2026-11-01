export type SectionId = 
  | 'home' 
  | 'vocabulary' 
  | 'places' 
  | 'glimpses' 
  | 'vision2030' 
  | 'memories'
  | 'arabicLanguage';

export interface VocabularyItem {
  id: string;
  term: string; // الكلمة أو المصطلح
  pronunciation?: string; // طريقة النطق أو التشكيل
  category: string; // تحايا يومية، البيت والمجلس، أوصاف، عادات
  meaning: string; // المعنى الدقيق
  context: string; // سياق الاستخدام
  example: string; // جملة توضيحية مكية أصيلة
  historicalNote?: string; // تأصيل لغوي أو تاريخي
  image?: string; // رابط أو مسار الصورة
}

export interface PlaceItem {
  id: string;
  name: string; // اسم الحي أو المعلم أو السوق
  category: 'أحياء تاريخية' | 'أسواق عتيقة' | 'معالم تاريخية' | 'بيوت وأزقة' | string;
  era: string; // الحقبة التاريخية أو العهد
  location: string; // الموقع بمكة المكرمة
  description: string; // نبذة توثيقية
  fullStory: string; // القصة التاريخية الكاملة
  features: string[]; // ميزات معمارية وتراثية
  image: string; // رابط أو مسار الصورة
  photographerOrSource?: string; // المصدر التوثيقي
}

export interface GlimpseItem {
  id: string;
  title: string; // العنوان (مهنة، عادة، مظهر حياة)
  category: 'مهن وحرف' | 'عادات وتقاليد' | 'مواسم وأعياد' | 'المائدة المكية' | string;
  period: string; // الفترة التاريخية
  summary: string;
  content: string; // التفاصيل التراثية
  traditionHighlights: string[]; // مظاهر وطقوس العادة
  image: string;
  quote?: string; // مقولة أو مثل مكي مرتبط بها
}

export interface Vision2030Item {
  id: string;
  title: string; // المشروع أو المبادرة
  pillar: 'صون التراث العمراني' | 'المتاحف والمراكز الحضارية' | 'إثراء تجربة الزائر' | 'التنمية الحضرية المتوازنة' | string;
  heritageFoundation: string; // الأساس التراثي الذي ينطلق منه
  futureVision: string; // التطوير والابتكار وفق الرؤية
  status: string; // مرحلة الإنجاز
  details: string;
  image: string;
  metrics?: string[]; // مستهدفات
}

export interface MemoryItem {
  id: string;
  title: string; // عنوان القصة أو الشهادة
  narrator: string; // الراوي / الشاهد (مثال: العم أحمد بن سعيد، من كبار حارة الشامية)
  period: string; // الزمن الموثق (مثال: سبعينيات القرن العشرين)
  place: string; // الحي أو المكان المكي المرتبط
  excerpt: string; // مقتطف بارز من الرواية
  fullNarrative: string; // النص السردي الكامل
  image: string;
  recordingNote?: string; // ملاحظة التوثيق الشفهي
}

export type ArabicLanguageSubsection =
  | 'مكة في القرآن الكريم'
  | 'مكة واللغة العربية'
  | 'من الفصحى إلى اللهجة المكية'
  | 'كلمات عربية في الذاكرة المكية'
  | 'مكة جسر بين اللغة والثقافة';

export interface ArabicLanguageItem {
  id: string;
  title: string; // عنوان المبحث أو الآية أو المصطلح
  subsection: ArabicLanguageSubsection; // القسم الفرعي
  arabicText?: string; // النص القرآني أو اللفظ التراثي
  verseDetails?: {
    surah: string; // اسم السورة
    ayahNumber: number | string; // رقم الآية
    tafsirSource: string; // مصدر التفسير المعتمد (مثلاً: تفسير الطبري، القرطبي، ابن كثير)
    tafsirSummary: string; // بيان التفسير المعتمد
  };
  meaning?: string; // المعنى أو الدلالة اللغوية
  linguisticContext?: string; // التأصيل والتحليل اللغوي
  historicalContext?: string; // السياق التاريخي والثقافي
  example?: string; // مثال أو شاهد لغوي
  dialectUsage?: string; // الاستعمال في اللهجة المكية
  reference: string; // المرجع الموثق (معجم، كتاب تفسير، مصنف لغوي)
  tags: string[]; // وسوم تصنيفية
  image?: string; // صورة توثيقية أو مخطوطة
  badge?: string; // وسم مختصر
}

export interface PlatformHeritageData {
  vocabulary: VocabularyItem[];
  places: PlaceItem[];
  glimpses: GlimpseItem[];
  vision2030: Vision2030Item[];
  memories: MemoryItem[];
  arabicLanguage: ArabicLanguageItem[];
}
