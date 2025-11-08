// ===========================================
// 1. تعريف العناصر الأساسية والثوابت
// ===========================================
const langSwitcher = document.getElementById('language-switcher');
const elementsToTranslate = document.querySelectorAll('[data-i18n]');
const defaultLang = 'en'; // اللغة الافتراضية
const i18nFolder = './I18n/'; // مسار مجلد الترجمة

// قائمة بجميع اللغات المدعومة (نستخدمها لملء القائمة المنسدلة)
const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية', direction: 'rtl' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'ko', name: '한국어' },
    { code: 'ja', name: '日本語' },
    { code: 'pt', name: 'Português' },
    { code: 'ku', name: 'Kurdî' },
    { code: 'bg', name: 'Български' },
    { code: 'fa', name: 'فارسی', direction: 'rtl' },
    { code: 'tr', name: 'Türkçe' }
];

// ===========================================
// 2. وظائف التحميل والتطبيق
// ===========================================

// وظيفة تحميل ملف الترجمة
async function fetchTranslations(lang) {
    const filePath = `${i18nFolder}${lang}.json`;
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            // إذا لم يتم العثور على الملف، نعود للغة الإنجليزية
            console.error(`Translation file not found for: ${lang}. Falling back to default.`);
            return await fetchTranslations(defaultLang);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching translation:', error);
        return {};
    }
}

// وظيفة تطبيق الترجمة على عناصر الصفحة
function applyTranslations(translations, lang) {
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translatedText = translations[key];
        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    // تحديث اتجاه الصفحة (RTL / LTR)
    const currentLangInfo = supportedLanguages.find(l => l.code === lang);
    document.documentElement.setAttribute('lang', lang);
    document.body.style.direction = currentLangInfo && currentLangInfo.direction === 'rtl' ? 'rtl' : 'ltr';
    document.body.style.textAlign = currentLangInfo && currentLangInfo.direction === 'rtl' ? 'right' : 'left';
}

// وظيفة حفظ اللغة المختارة في ذاكرة المتصفح
function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    loadAndApplyLanguage(lang);
}

// وظيفة تحميل وتطبيق اللغة المحددة
async function loadAndApplyLanguage(lang) {
    const translations = await fetchTranslations(lang);
    applyTranslations(translations, lang);
    langSwitcher.value = lang; // تحديث القائمة المنسدلة
}

// ===========================================
// 3. الإعداد الأولي وتشغيل الأحداث
// ===========================================

// ملء قائمة تبديل اللغة باللغات المدعومة
function populateLanguageSwitcher() {
    // إزالة خيارات الـ HTML الثابتة (en, ar, fr) التي كتبناها سابقاً
    langSwitcher.innerHTML = ''; 

    supportedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        langSwitcher.appendChild(option);
    });
}

// ربط الحدث عند تغيير القائمة المنسدلة
langSwitcher.addEventListener('change', (event) => {
    setLanguage(event.target.value);
});

// تشغيل التطبيق عند تحميل الصفحة
function init() {
    populateLanguageSwitcher();

    // جلب اللغة المحفوظة أو استخدام الافتراضية
    const storedLang = localStorage.getItem('selectedLang') || defaultLang;
    loadAndApplyLanguage(storedLang);
}

// بدء تشغيل البرنامج
init();
