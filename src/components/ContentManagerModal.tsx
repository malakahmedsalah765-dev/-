import React, { useState } from 'react';
import {
  PlatformHeritageData,
  VocabularyItem,
  PlaceItem,
  GlimpseItem,
  Vision2030Item,
  MemoryItem,
} from '../types/heritage';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  RefreshCw,
  BookOpen,
  MapPin,
  Sparkles,
  Compass,
  Users,
  CheckCircle,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { HERO_IMAGE } from '../data/heritageData';

interface ContentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PlatformHeritageData;
  onSaveData: (newData: PlatformHeritageData) => void;
  onResetData: () => void;
}

type TabType = 'vocabulary' | 'places' | 'glimpses' | 'vision2030' | 'memories' | 'guide';

export const ContentManagerModal: React.FC<ContentManagerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('vocabulary');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for creating/editing items
  const [vocForm, setVocForm] = useState<Partial<VocabularyItem>>({
    term: '',
    pronunciation: '',
    category: 'البيت والمجلس',
    meaning: '',
    context: '',
    example: '',
    historicalNote: '',
  });

  const [placeForm, setPlaceForm] = useState<Partial<PlaceItem>>({
    name: '',
    category: 'أحياء تاريخية',
    era: '',
    location: '',
    description: '',
    fullStory: '',
    features: [],
    image: HERO_IMAGE,
  });

  const [glimpseForm, setGlimpseForm] = useState<Partial<GlimpseItem>>({
    title: '',
    category: 'مهن وحرف',
    period: '',
    summary: '',
    content: '',
    traditionHighlights: [],
    image: HERO_IMAGE,
    quote: '',
  });

  const [visionForm, setVisionForm] = useState<Partial<Vision2030Item>>({
    title: '',
    pillar: 'صون التراث العمراني',
    heritageFoundation: '',
    futureVision: '',
    status: 'قيد التطوير',
    details: '',
    metrics: [],
    image: HERO_IMAGE,
  });

  const [memForm, setMemForm] = useState<Partial<MemoryItem>>({
    title: '',
    narrator: '',
    period: '',
    place: '',
    excerpt: '',
    fullNarrative: '',
    image: HERO_IMAGE,
    recordingNote: '',
  });

  // Local image upload helper
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export JSON Archive
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `midad-makkah-archive-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Archive
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.vocabulary && parsed.places) {
          onSaveData(parsed);
          alert('تم استيراد مواد الأرشيف بنجاح وتحديث كافة الأقسام!');
        } else {
          alert('الملف لا يتطابق مع بنية أرشيف مداد مكة.');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Save / Update handlers
  const handleSaveVocabulary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vocForm.term || !vocForm.meaning) {
      alert('يرجى ملء اسم الكلمة ومعناها.');
      return;
    }

    let updatedVoc = [...data.vocabulary];
    if (editingId) {
      updatedVoc = updatedVoc.map((item) =>
        item.id === editingId ? ({ ...item, ...vocForm } as VocabularyItem) : item
      );
    } else {
      const newItem: VocabularyItem = {
        id: `voc-${Date.now()}`,
        term: vocForm.term || '',
        pronunciation: vocForm.pronunciation || '',
        category: vocForm.category || 'عام',
        meaning: vocForm.meaning || '',
        context: vocForm.context || '',
        example: vocForm.example || '',
        historicalNote: vocForm.historicalNote || '',
      };
      updatedVoc.unshift(newItem);
    }

    onSaveData({ ...data, vocabulary: updatedVoc });
    setEditingId(null);
    setVocForm({ term: '', pronunciation: '', category: 'البيت والمجلس', meaning: '', context: '', example: '', historicalNote: '' });
  };

  const handleDeleteVocabulary = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الكلمة؟')) {
      onSaveData({
        ...data,
        vocabulary: data.vocabulary.filter((item) => item.id !== id),
      });
    }
  };

  // Place Save / Delete
  const handleSavePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeForm.name || !placeForm.description) {
      alert('يرجى ملء اسم المعلم ونبذة عنه.');
      return;
    }

    let updatedPlaces = [...data.places];
    if (editingId) {
      updatedPlaces = updatedPlaces.map((item) =>
        item.id === editingId ? ({ ...item, ...placeForm } as PlaceItem) : item
      );
    } else {
      const newItem: PlaceItem = {
        id: `plc-${Date.now()}`,
        name: placeForm.name || '',
        category: placeForm.category || 'أحياء تاريخية',
        era: placeForm.era || 'حقبة تاريخية عريقة',
        location: placeForm.location || 'مكة المكرمة',
        description: placeForm.description || '',
        fullStory: placeForm.fullStory || placeForm.description || '',
        features: placeForm.features?.length ? placeForm.features : ['طابع معماري حجازي'],
        image: placeForm.image || HERO_IMAGE,
      };
      updatedPlaces.unshift(newItem);
    }

    onSaveData({ ...data, places: updatedPlaces });
    setEditingId(null);
    setPlaceForm({ name: '', category: 'أحياء تاريخية', era: '', location: '', description: '', fullStory: '', features: [], image: HERO_IMAGE });
  };

  const handleDeletePlace = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المعلم؟')) {
      onSaveData({
        ...data,
        places: data.places.filter((item) => item.id !== id),
      });
    }
  };

  // Glimpse Save / Delete
  const handleSaveGlimpse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!glimpseForm.title || !glimpseForm.summary) {
      alert('يرجى ملء عنوان الملمح وملخصه.');
      return;
    }

    let updatedGlimpses = [...data.glimpses];
    if (editingId) {
      updatedGlimpses = updatedGlimpses.map((item) =>
        item.id === editingId ? ({ ...item, ...glimpseForm } as GlimpseItem) : item
      );
    } else {
      const newItem: GlimpseItem = {
        id: `glm-${Date.now()}`,
        title: glimpseForm.title || '',
        category: glimpseForm.category || 'عادات وتقاليد',
        period: glimpseForm.period || 'زمن الطيبين',
        summary: glimpseForm.summary || '',
        content: glimpseForm.content || glimpseForm.summary || '',
        traditionHighlights: glimpseForm.traditionHighlights || [],
        image: glimpseForm.image || HERO_IMAGE,
        quote: glimpseForm.quote || '',
      };
      updatedGlimpses.unshift(newItem);
    }

    onSaveData({ ...data, glimpses: updatedGlimpses });
    setEditingId(null);
    setGlimpseForm({ title: '', category: 'مهن وحرف', period: '', summary: '', content: '', traditionHighlights: [], image: HERO_IMAGE, quote: '' });
  };

  const handleDeleteGlimpse = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملمح التراثي؟')) {
      onSaveData({
        ...data,
        glimpses: data.glimpses.filter((item) => item.id !== id),
      });
    }
  };

  // Vision 2030 Save / Delete
  const handleSaveVision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visionForm.title || !visionForm.details) {
      alert('يرجى ملء اسم المبادرة وتفاصيلها.');
      return;
    }

    let updatedVision = [...data.vision2030];
    if (editingId) {
      updatedVision = updatedVision.map((item) =>
        item.id === editingId ? ({ ...item, ...visionForm } as Vision2030Item) : item
      );
    } else {
      const newItem: Vision2030Item = {
        id: `vis-${Date.now()}`,
        title: visionForm.title || '',
        pillar: visionForm.pillar || 'صون التراث العمراني',
        heritageFoundation: visionForm.heritageFoundation || '',
        futureVision: visionForm.futureVision || '',
        status: visionForm.status || 'قيد التطوير',
        details: visionForm.details || '',
        metrics: visionForm.metrics || [],
        image: visionForm.image || HERO_IMAGE,
      };
      updatedVision.unshift(newItem);
    }

    onSaveData({ ...data, vision2030: updatedVision });
    setEditingId(null);
    setVisionForm({ title: '', pillar: 'صون التراث العمراني', heritageFoundation: '', futureVision: '', status: 'قيد التطوير', details: '', metrics: [], image: HERO_IMAGE });
  };

  const handleDeleteVision = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      onSaveData({
        ...data,
        vision2030: data.vision2030.filter((item) => item.id !== id),
      });
    }
  };

  // Memory Save / Delete
  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memForm.title || !memForm.narrator) {
      alert('يرجى ملء عنوان الرواية واسم الراوي.');
      return;
    }

    let updatedMemories = [...data.memories];
    if (editingId) {
      updatedMemories = updatedMemories.map((item) =>
        item.id === editingId ? ({ ...item, ...memForm } as MemoryItem) : item
      );
    } else {
      const newItem: MemoryItem = {
        id: `mem-${Date.now()}`,
        title: memForm.title || '',
        narrator: memForm.narrator || '',
        period: memForm.period || 'منتصف القرن الماضي',
        place: memForm.place || 'مكة المكرمة',
        excerpt: memForm.excerpt || '',
        fullNarrative: memForm.fullNarrative || memForm.excerpt || '',
        image: memForm.image || HERO_IMAGE,
        recordingNote: memForm.recordingNote || 'شهادة شفهية موثقة',
      };
      updatedMemories.unshift(newItem);
    }

    onSaveData({ ...data, memories: updatedMemories });
    setEditingId(null);
    setMemForm({ title: '', narrator: '', period: '', place: '', excerpt: '', fullNarrative: '', image: HERO_IMAGE, recordingNote: '' });
  };

  const handleDeleteMemory = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الشهادة الشفهية؟')) {
      onSaveData({
        ...data,
        memories: data.memories.filter((item) => item.id !== id),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] w-full max-w-5xl rounded-2xl border border-[#E5DDCF] shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#254B3D] text-[#FAF7F2] px-6 py-4 flex items-center justify-between border-b border-[#9A7944]/40 shrink-0">
          <div>
            <span className="text-xs text-[#C2A066] font-bold block mb-0.5">
              لوحة الإدارة وتوسيع المواد
            </span>
            <h3 className="text-xl font-heritage-heading font-bold">
              إدماج مواد كانفا وإدارة محتوى «مداد مكة»
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 rounded-lg text-[#C2A066] border border-[#9A7944]/40 transition-colors"
              title="تصدير نسخة احتياطية من الأرشيف كملف JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير الأرشيف</span>
            </button>

            <label className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 rounded-lg text-[#FAF7F2] border border-[#FAF7F2]/20 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>استيراد JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={onClose}
              className="p-1.5 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10 rounded-lg transition-colors mr-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-[#EFE9DC] px-6 py-2.5 border-b border-[#E5DDCF] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => { setActiveTab('vocabulary'); setEditingId(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'vocabulary'
                ? 'bg-[#254B3D] text-[#FAF7F2]'
                : 'text-[#254B3D] hover:bg-[#FAF7F2]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>لسان مكة ({data.vocabulary.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('places'); setEditingId(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'places'
                ? 'bg-[#254B3D] text-[#FAF7F2]'
                : 'text-[#254B3D] hover:bg-[#FAF7F2]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>ذاكرة المكان ({data.places.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('glimpses'); setEditingId(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'glimpses'
                ? 'bg-[#254B3D] text-[#FAF7F2]'
                : 'text-[#254B3D] hover:bg-[#FAF7F2]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ملامح من الماضي ({data.glimpses.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('vision2030'); setEditingId(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'vision2030'
                ? 'bg-[#254B3D] text-[#FAF7F2]'
                : 'text-[#254B3D] hover:bg-[#FAF7F2]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>مكة ورؤية 2030 ({data.vision2030.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('memories'); setEditingId(null); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'memories'
                ? 'bg-[#254B3D] text-[#FAF7F2]'
                : 'text-[#254B3D] hover:bg-[#FAF7F2]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ذاكرة أهل مكة ({data.memories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 mr-auto ${
              activeTab === 'guide'
                ? 'bg-[#9A7944] text-[#FAF7F2]'
                : 'text-[#9A7944] hover:bg-[#FAF7F2]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>دليل نقل مواد كانفا</span>
          </button>
        </div>

        {/* Scrollable Main Area */}
        <div className="p-6 overflow-y-auto space-y-6 grow">
          
          {/* TAB 1: VOCABULARY */}
          {activeTab === 'vocabulary' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Column */}
              <div className="lg:col-span-5 bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-4">
                <h4 className="text-sm font-bold text-[#254B3D] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#9A7944]" />
                  <span>{editingId ? 'تعديل كلمة مكية' : 'إضافة مصطلح جديد من كانفا'}</span>
                </h4>

                <form onSubmit={handleSaveVocabulary} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">الكلمة أو التعبير *</label>
                    <input
                      type="text"
                      required
                      value={vocForm.term || ''}
                      onChange={(e) => setVocForm({ ...vocForm, term: e.target.value })}
                      placeholder="مثال: المركاز، الروشان، كرويتة"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">طريقة النطق</label>
                      <input
                        type="text"
                        value={vocForm.pronunciation || ''}
                        onChange={(e) => setVocForm({ ...vocForm, pronunciation: e.target.value })}
                        placeholder="المِرْكاز"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">التصنيف</label>
                      <select
                        value={vocForm.category || 'البيت والمجلس'}
                        onChange={(e) => setVocForm({ ...vocForm, category: e.target.value })}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      >
                        <option value="مفردات مكية">مفردات مكية</option>
                        <option value="البيت والمجلس">البيت والمجلس</option>
                        <option value="عادات اجتماعية">عادات اجتماعية</option>
                        <option value="حكاية كلمة">حكاية كلمة</option>
                        <option value="المائدة المكية">المائدة المكية</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">المعنى والدلالة *</label>
                    <textarea
                      rows={2}
                      required
                      value={vocForm.meaning || ''}
                      onChange={(e) => setVocForm({ ...vocForm, meaning: e.target.value })}
                      placeholder="الشرح التراثي الدقيق للمصطلح..."
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">سياق الاستخدام المكي</label>
                    <textarea
                      rows={2}
                      value={vocForm.context || ''}
                      onChange={(e) => setVocForm({ ...vocForm, context: e.target.value })}
                      placeholder="أين ومتى تُقال هذه العبارة؟"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">مثال مكي أصيل</label>
                    <input
                      type="text"
                      value={vocForm.example || ''}
                      onChange={(e) => setVocForm({ ...vocForm, example: e.target.value })}
                      placeholder="«العصرية نلتقي كلنا في مركاز العمدة»"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">تأصيل تاريخي أو لغوي (اختياري)</label>
                    <input
                      type="text"
                      value={vocForm.historicalNote || ''}
                      onChange={(e) => setVocForm({ ...vocForm, historicalNote: e.target.value })}
                      placeholder="مرجع أو تأصيل للمصطلح..."
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#254B3D] text-[#FAF7F2] rounded-lg font-bold hover:bg-[#1b382d] transition-colors"
                    >
                      {editingId ? 'حفظ التعديلات' : 'إضافة للقاموس'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setVocForm({ term: '', pronunciation: '', category: 'البيت والمجلس', meaning: '', context: '', example: '', historicalNote: '' });
                        }}
                        className="px-3 py-2 bg-[#FAF7F2] text-[#5C584E] rounded-lg border border-[#E5DDCF]"
                      >
                        إلغاء التعديل
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Items List Column */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C584E]">
                  <span>المفردات المسجلة حالياً ({data.vocabulary.length})</span>
                  <span>يمكنك تعديل أو حذف أي مصطلح</span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {data.vocabulary.map((v) => (
                    <div
                      key={v.id}
                      className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DDCF] flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-heritage-heading font-bold text-base text-[#254B3D]">
                            {v.term}
                          </span>
                          <span className="text-[10px] text-[#9A7944] bg-[#F5F0E6] px-2 py-0.5 rounded">
                            {v.category}
                          </span>
                        </div>
                        <p className="text-[#5C584E] line-clamp-1">{v.meaning}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingId(v.id);
                            setVocForm(v);
                          }}
                          className="p-1.5 text-[#254B3D] hover:bg-[#EFE9DC] rounded-md transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVocabulary(v.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PLACES */}
          {activeTab === 'places' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form */}
              <div className="lg:col-span-5 bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-4">
                <h4 className="text-sm font-bold text-[#254B3D] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#9A7944]" />
                  <span>{editingId ? 'تعديل المعلم المكي' : 'إضافة حي أو معلم من كانفا'}</span>
                </h4>

                <form onSubmit={handleSavePlace} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">اسم الحي أو المعلم *</label>
                    <input
                      type="text"
                      required
                      value={placeForm.name || ''}
                      onChange={(e) => setPlaceForm({ ...placeForm, name: e.target.value })}
                      placeholder="مثال: حارة القرارة، سوق الصغير، بئر زمزم"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">التصنيف</label>
                      <select
                        value={placeForm.category || 'أحياء تاريخية'}
                        onChange={(e) => setPlaceForm({ ...placeForm, category: e.target.value })}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      >
                        <option value="أحياء تاريخية">أحياء تاريخية</option>
                        <option value="أسواق عتيقة">أسواق عتيقة</option>
                        <option value="معالم تاريخية">معالم تاريخية</option>
                        <option value="بيوت وأزقة">بيوت وأزقة</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">الموقع بمكة</label>
                      <input
                        type="text"
                        value={placeForm.location || ''}
                        onChange={(e) => setPlaceForm({ ...placeForm, location: e.target.value })}
                        placeholder="شمال المسجد الحرام"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">الحقبة أو التاريخ</label>
                    <input
                      type="text"
                      value={placeForm.era || ''}
                      onChange={(e) => setPlaceForm({ ...placeForm, era: e.target.value })}
                      placeholder="العصر العثماني / عهد متوارث"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">النبذة التوثيقية *</label>
                    <textarea
                      rows={2}
                      required
                      value={placeForm.description || ''}
                      onChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}
                      placeholder="نبذة موجزة تعرف بالمعلم..."
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">القصة التاريخية الكاملة</label>
                    <textarea
                      rows={3}
                      value={placeForm.fullStory || ''}
                      onChange={(e) => setPlaceForm({ ...placeForm, fullStory: e.target.value })}
                      placeholder="النص الموسع المجهز في كانفا..."
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">صورة المعلم (رابط أو رفع من جهازك)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={placeForm.image || ''}
                        onChange={(e) => setPlaceForm({ ...placeForm, image: e.target.value })}
                        placeholder="رابط الصورة أو ارفع ملفاً"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      />
                      <label className="p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg cursor-pointer hover:bg-[#EFE9DC] shrink-0" title="رفع صورة">
                        <ImageIcon className="w-4 h-4 text-[#9A7944]" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => setPlaceForm({ ...placeForm, image: url }))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#254B3D] text-[#FAF7F2] rounded-lg font-bold hover:bg-[#1b382d] transition-colors"
                    >
                      {editingId ? 'حفظ المعلم' : 'إضافة إلى ذاكرة المكان'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => { setEditingId(null); setPlaceForm({ name: '', description: '', features: [], image: HERO_IMAGE }); }}
                        className="px-3 py-2 bg-[#FAF7F2] text-[#5C584E] rounded-lg border border-[#E5DDCF]"
                      >
                        إلغاء
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C584E]">
                  <span>المعالم الموثقة ({data.places.length})</span>
                </div>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {data.places.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5DDCF] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover border border-[#E5DDCF]"
                        />
                        <div>
                          <h5 className="font-heritage-heading font-bold text-sm text-[#254B3D]">
                            {p.name}
                          </h5>
                          <p className="text-[11px] text-[#9A7944]">{p.category} · {p.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => { setEditingId(p.id); setPlaceForm(p); }}
                          className="p-1.5 text-[#254B3D] hover:bg-[#EFE9DC] rounded-md transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePlace(p.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GLIMPSES */}
          {activeTab === 'glimpses' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-4">
                <h4 className="text-sm font-bold text-[#254B3D] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#9A7944]" />
                  <span>{editingId ? 'تعديل الملمح التراثي' : 'إضافة ملمح أو عادة جديدة'}</span>
                </h4>
                <form onSubmit={handleSaveGlimpse} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">عنوان الملمح أو العادة *</label>
                    <input
                      type="text"
                      required
                      value={glimpseForm.title || ''}
                      onChange={(e) => setGlimpseForm({ ...glimpseForm, title: e.target.value })}
                      placeholder="مثال: مهنة السقا، زفة العريس المكية"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">التصنيف</label>
                      <select
                        value={glimpseForm.category || 'مهن وحرف'}
                        onChange={(e) => setGlimpseForm({ ...glimpseForm, category: e.target.value })}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      >
                        <option value="مهن وحرف">مهن وحرف</option>
                        <option value="عادات وتقاليد">عادات وتقاليد</option>
                        <option value="مواسم وأعياد">مواسم وأعياد</option>
                        <option value="المائدة المكية">المائدة المكية</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">الفترة الزمنية</label>
                      <input
                        type="text"
                        value={glimpseForm.period || ''}
                        onChange={(e) => setGlimpseForm({ ...glimpseForm, period: e.target.value })}
                        placeholder="حقبة متوارثة / الستينيات"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">مقولة أو مثل مكي مرتبط</label>
                    <input
                      type="text"
                      value={glimpseForm.quote || ''}
                      onChange={(e) => setGlimpseForm({ ...glimpseForm, quote: e.target.value })}
                      placeholder="«السقاية شرف وبركة»"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">الملخص *</label>
                    <textarea
                      rows={2}
                      required
                      value={glimpseForm.summary || ''}
                      onChange={(e) => setGlimpseForm({ ...glimpseForm, summary: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">التفاصيل التراثية</label>
                    <textarea
                      rows={3}
                      value={glimpseForm.content || ''}
                      onChange={(e) => setGlimpseForm({ ...glimpseForm, content: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#254B3D] text-[#FAF7F2] rounded-lg font-bold hover:bg-[#1b382d]"
                    >
                      {editingId ? 'حفظ' : 'إضافة'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => { setEditingId(null); setGlimpseForm({}); }}
                        className="px-3 py-2 bg-[#FAF7F2] text-[#5C584E] rounded-lg border border-[#E5DDCF]"
                      >
                        إلغاء
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-2 max-h-[500px] overflow-y-auto">
                {data.glimpses.map((g) => (
                  <div
                    key={g.id}
                    className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DDCF] flex items-center justify-between text-xs"
                  >
                    <div>
                      <h5 className="font-bold text-[#254B3D]">{g.title}</h5>
                      <span className="text-[11px] text-[#9A7944]">{g.category} · {g.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingId(g.id); setGlimpseForm(g); }} className="p-1.5 text-[#254B3D] hover:bg-[#EFE9DC] rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteGlimpse(g.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VISION 2030 */}
          {activeTab === 'vision2030' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-4">
                <h4 className="text-sm font-bold text-[#254B3D] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#9A7944]" />
                  <span>{editingId ? 'تعديل مشروع الرؤية' : 'إضافة مشروع رؤية 2030 جديد'}</span>
                </h4>
                <form onSubmit={handleSaveVision} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">اسم المشروع أو المبادرة *</label>
                    <input
                      type="text"
                      required
                      value={visionForm.title || ''}
                      onChange={(e) => setVisionForm({ ...visionForm, title: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">المحور</label>
                    <select
                      value={visionForm.pillar || 'صون التراث العمراني'}
                      onChange={(e) => setVisionForm({ ...visionForm, pillar: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    >
                      <option value="صون التراث العمراني">صون التراث العمراني</option>
                      <option value="التنمية الحضرية المتوازنة">التنمية الحضرية المتوازنة</option>
                      <option value="إثراء تجربة الزائر">إثراء تجربة الزائر</option>
                      <option value="المتاحف والمراكز الحضارية">المتاحف والمراكز الحضارية</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">الجذر التراثي المحفوظ</label>
                    <input
                      type="text"
                      value={visionForm.heritageFoundation || ''}
                      onChange={(e) => setVisionForm({ ...visionForm, heritageFoundation: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">الرؤية والابتكار 2030</label>
                    <input
                      type="text"
                      value={visionForm.futureVision || ''}
                      onChange={(e) => setVisionForm({ ...visionForm, futureVision: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">التفاصيل *</label>
                    <textarea
                      rows={3}
                      required
                      value={visionForm.details || ''}
                      onChange={(e) => setVisionForm({ ...visionForm, details: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button type="submit" className="px-4 py-2 bg-[#254B3D] text-[#FAF7F2] rounded-lg font-bold hover:bg-[#1b382d]">
                      {editingId ? 'حفظ' : 'إضافة'}
                    </button>
                    {editingId && (
                      <button type="button" onClick={() => { setEditingId(null); setVisionForm({}); }} className="px-3 py-2 bg-[#FAF7F2] text-[#5C584E] rounded-lg border border-[#E5DDCF]">
                        إلغاء
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-2 max-h-[500px] overflow-y-auto">
                {data.vision2030.map((v) => (
                  <div key={v.id} className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DDCF] flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-[#254B3D]">{v.title}</h5>
                      <span className="text-[11px] text-[#9A7944]">{v.pillar}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingId(v.id); setVisionForm(v); }} className="p-1.5 text-[#254B3D] hover:bg-[#EFE9DC] rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteVision(v.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MEMORIES */}
          {activeTab === 'memories' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-[#F5F0E6] p-5 rounded-xl border border-[#E5DDCF] space-y-4">
                <h4 className="text-sm font-bold text-[#254B3D] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#9A7944]" />
                  <span>{editingId ? 'تعديل الرواية الشفهية' : 'إضافة شهادة من ذاكرة أهل مكة'}</span>
                </h4>
                <form onSubmit={handleSaveMemory} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">عنوان القصة أو الشهادة *</label>
                    <input
                      type="text"
                      required
                      value={memForm.title || ''}
                      onChange={(e) => setMemForm({ ...memForm, title: e.target.value })}
                      placeholder="مثال: ذكريات الحج في حارة الشامية"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">اسم الراوي أو الشاهد *</label>
                      <input
                        type="text"
                        required
                        value={memForm.narrator || ''}
                        onChange={(e) => setMemForm({ ...memForm, narrator: e.target.value })}
                        placeholder="العم عبد الرزاق قطان"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#254B3D] block mb-1">المكان المكي</label>
                      <input
                        type="text"
                        value={memForm.place || ''}
                        onChange={(e) => setMemForm({ ...memForm, place: e.target.value })}
                        placeholder="حارة أجياد"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">مقتطف بارز من الرواية *</label>
                    <textarea
                      rows={2}
                      required
                      value={memForm.excerpt || ''}
                      onChange={(e) => setMemForm({ ...memForm, excerpt: e.target.value })}
                      placeholder="«كان البيت المكي يفتح بابه لكل قاصد...»"
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#254B3D] block mb-1">النص السردي الكامل</label>
                    <textarea
                      rows={3}
                      value={memForm.fullNarrative || ''}
                      onChange={(e) => setMemForm({ ...memForm, fullNarrative: e.target.value })}
                      className="w-full p-2 bg-[#FAF7F2] border border-[#E5DDCF] rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button type="submit" className="px-4 py-2 bg-[#254B3D] text-[#FAF7F2] rounded-lg font-bold hover:bg-[#1b382d]">
                      {editingId ? 'حفظ الشهادة' : 'إضافة للأرشيف'}
                    </button>
                    {editingId && (
                      <button type="button" onClick={() => { setEditingId(null); setMemForm({}); }} className="px-3 py-2 bg-[#FAF7F2] text-[#5C584E] rounded-lg border border-[#E5DDCF]">
                        إلغاء
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="lg:col-span-7 space-y-2 max-h-[500px] overflow-y-auto">
                {data.memories.map((m) => (
                  <div key={m.id} className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DDCF] flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-[#254B3D]">{m.title}</h5>
                      <span className="text-[11px] text-[#9A7944]">{m.narrator} · {m.place}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditingId(m.id); setMemForm(m); }} className="p-1.5 text-[#254B3D] hover:bg-[#EFE9DC] rounded">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteMemory(m.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CANVA INTEGRATION GUIDE */}
          {activeTab === 'guide' && (
            <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E5DDCF] space-y-6 text-sm text-[#1B2923]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#9A7944] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-heritage-heading font-bold text-xl text-[#254B3D]">
                    دليل نقل مواد كانفا الجاهزة إلى منصة مداد مكة
                  </h4>
                  <p className="text-xs text-[#5C584E]">
                    تم بناء المنصة بهيكل مرن ومفتوح ليتطابق تماماً مع شرائح وتصميمات مشروعكم في كانفا
                    دون الحاجة لأي برمجة أو كتابة إضافية.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] space-y-2">
                  <span className="w-6 h-6 rounded-full bg-[#254B3D] text-[#FAF7F2] flex items-center justify-center text-xs font-bold">1</span>
                  <h5 className="font-bold text-xs text-[#254B3D]">نسخ النصوص والمصطلحات</h5>
                  <p className="text-xs text-[#5C584E] leading-relaxed">
                    انسخ نصوص الشرائح التي أعددتموها في كانفا (الكلمات، شروح الأحياء، أو الحكايات)
                    والصقها في التبويب المناسب أعلاه.
                  </p>
                </div>

                <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] space-y-2">
                  <span className="w-6 h-6 rounded-full bg-[#254B3D] text-[#FAF7F2] flex items-center justify-center text-xs font-bold">2</span>
                  <h5 className="font-bold text-xs text-[#254B3D]">رفع أو استيراد الصور</h5>
                  <p className="text-xs text-[#5C584E] leading-relaxed">
                    صدّر الصور أو الرسومات من كانفا بصيغة JPG أو PNG وارفعها مباشرة عبر زر "رفع صورة"
                    ليتم حفظها فورياً في الأرشيف.
                  </p>
                </div>

                <div className="bg-[#F5F0E6] p-4 rounded-xl border border-[#E5DDCF] space-y-2">
                  <span className="w-6 h-6 rounded-full bg-[#254B3D] text-[#FAF7F2] flex items-center justify-center text-xs font-bold">3</span>
                  <h5 className="font-bold text-xs text-[#254B3D]">حفظ الأرشيف واسترجاعه</h5>
                  <p className="text-xs text-[#5C584E] leading-relaxed">
                    اضغط زر «تصدير الأرشيف» في الأعلى في أي وقت لتنزيل نسخة كاملة من جميع المواد على
                    جهازك والاحتفاظ بنسخة دائمة.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DDCF] flex items-center justify-between text-xs text-[#5C584E]">
                <span>هل تريد إعادة ضبط المنصة على البيانات التراثية الافتراضية الأولية؟</span>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من استعادة الأرشيف الأولي التراثي؟ سيتم مسح أي إضافات محلية.')) {
                      onResetData();
                      alert('تمت استعادة الأرشيف التراثي الافتراضي.');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>استعادة الأرشيف التأسيسي</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Actions Footer */}
        <div className="bg-[#F5F0E6] px-6 py-3 border-t border-[#E5DDCF] flex items-center justify-between text-xs text-[#5C584E] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>جميع التعديلات والإضافات تُحفظ تلقائياً في ذاكرة المتصفح.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 font-bold text-[#FAF7F2] bg-[#254B3D] rounded-lg hover:bg-[#1b382d] transition-colors"
          >
            إغلاق لوحة الإدارة
          </button>
        </div>
      </div>
    </div>
  );
};
