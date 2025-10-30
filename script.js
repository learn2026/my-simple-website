// =======================================
// معالجة الخطأ 404 عبر الجافاسكربت (الحل الجذري)
// =======================================
if (document.title.includes("404")) {
    // 1. إخفاء محتوى الصفحة الرئيسية (main-content)
    var mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // 2. إظهار محتوى 404 المدمج (404-content)
    var errorContent = document.getElementById("404-content");
    if (errorContent) {
        // نستخدم 'flex' لأننا استخدمناه في CSS لمركزة المحتوى
        errorContent.style.display = 'flex';
    }
}

// =======================================
// دوال الوضع الداكن/الفاتح (Dark/Light Mode)
// =======================================

// الدالة المسؤولة عن تبديل الوضع
function toggleTheme() {
    var body = document.body;
    var toggleButton = document.getElementById('theme-toggle');
    
    // تبديل فئة dark-mode على وسم body
    body.classList.toggle('dark-mode');
    
    // حفظ الوضع الجديد في Local Storage
    var isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // تحديث رمز الزر
    toggleButton.innerText = isDarkMode ? '☀️' : '🌙';
}

// الدالة التي تعمل عند تحميل الصفحة للتحقق من الوضع المحفوظ
function checkTheme() {
    var savedTheme = localStorage.getItem('theme');
    var body = document.body;
    var toggleButton = document.getElementById('theme-toggle');

    // إذا كان الوضع المحفوظ هو "dark"، قم بتفعيله
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        // تحديث رمز الزر ليعكس الوضع الحالي
        if (toggleButton) {
            toggleButton.innerText = '☀️';
        }
    } else {
        // التأكد من أن الوضع هو فاتح وتحديث رمز الزر
        if (toggleButton) {
            toggleButton.innerText = '🌙';
        }
    }
}


// =======================================
// دوال تبديل اللغة (Translation Functions) - تدعم الآن 3 لغات
// =======================================

// الدالة المسؤولة عن تبديل المحتوى والاتجاه (RTL/LTR)
// تستقبل اللغة المطلوبة مباشرة من القائمة المنسدلة
function toggleLanguage(newLang) {
    var html = document.documentElement;
    
    // تحديث لغة الـ HTML والاتجاه بناءً على اللغة المختارة
    html.lang = newLang;
    html.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // حفظ اللغة الجديدة في التخزين المحلي (Local Storage)
    localStorage.setItem('lang', newLang);
    
    // إخفاء وإظهار المحتوى المناسب
    updateContentVisibility(newLang);
}

// الدالة المسؤولة عن إظهار وإخفاء المحتوى بناءً على اللغة
function updateContentVisibility(lang) {
    // الحصول على جميع عناصر اللغات
    var langAr = document.querySelectorAll('.lang-ar');
    var langEn = document.querySelectorAll('.lang-en');
    var langEs = document.querySelectorAll('.lang-es'); // الفئة الإسبانية الجديدة
    
    // إخفاء كل اللغات
    [...langAr, ...langEn, ...langEs].forEach(el => el.style.display = 'none');
    
    // إظهار اللغة المطلوبة فقط
    if (lang === 'ar') {
        langAr.forEach(el => el.style.display = 'inline');
    } else if (lang === 'en') {
        langEn.forEach(el => el.style.display = 'inline');
    } else if (lang === 'es') {
        langEs.forEach(el => el.style.display = 'inline');
    }
}

// الدالة التي تعمل عند تحميل الصفحة للتحقق من اللغة المحفوظة
function checkLanguage() {
    var savedLang = localStorage.getItem('lang') || 'ar'; // الافتراضي عربي
    
    // 1. تطبيق اللغة والاتجاه
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    
    // 2. تحديث قائمة الاختيار لتظهر اللغة المحفوظة
    var selectElement = document.getElementById('language-select');
    if (selectElement) {
        selectElement.value = savedLang;
    }
    
    // 3. عرض المحتوى باللغة الصحيحة
    updateContentVisibility(savedLang);
}


// =======================================
// دوال زر العودة للأعلى (Scroll To Top Functions)
// =======================================

// عند التمرير، يقوم بتشغيل الدالة scrollFunction
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var mybutton = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // إظهار الزر إذا تم التمرير لأسفل أكثر من 20 بكسل
    mybutton.style.display = "block";
  } else {
    // إخفاء الزر إذا كانت الصفحة في الأعلى
    mybutton.style.display = "none";
  }
}

// عند النقر على الزر، يعود للأعلى بسلاسة
function topFunction() {
  document.body.scrollTop = 0; // متصفح Safari
  document.documentElement.scrollTop = 0; // متصفحات Chrome, Firefox, IE, Opera
}
