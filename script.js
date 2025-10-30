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
// دوال تبديل اللغة (Translation Functions)
// (تم تعديلها للتعامل مع 3 لغات: ar, en, es)
// =======================================

// الدالة المسؤولة عن تبديل المحتوى والاتجاه (RTL/LTR)
function toggleLanguage() {
    var html = document.documentElement;
    var currentLang = html.lang;
    var newLang;
    
    // منطق التبديل التسلسلي بين اللغات الثلاث
    if (currentLang === 'ar') {
        newLang = 'en';
    } else if (currentLang === 'en') {
        newLang = 'es';
    } else { // إذا كانت اللغة الحالية إسبانية (es)
        newLang = 'ar';
    }
    
    // تحديث لغة الـ HTML والاتجاه
    html.lang = newLang;
    // العربية فقط هي RTL، باقي اللغات LTR
    html.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // حفظ اللغة الجديدة في التخزين المحلي (Local Storage)
    localStorage.setItem('lang', newLang);
    
    // إخفاء وإظهار المحتوى المناسب
    updateContentVisibility(newLang);
}

// الدالة المسؤولة عن إظهار وإخفاء المحتوى بناءً على اللغة
function updateContentVisibility(lang) {
    var langAr = document.querySelectorAll('.lang-ar');
    var langEn = document.querySelectorAll('.lang-en');
    var langEs = document.querySelectorAll('.lang-es'); // الفئة الجديدة للإسبانية
    var toggleButton = document.getElementById('language-toggle');
    
    // إخفاء جميع اللغات أولاً
    langAr.forEach(el => el.style.display = 'none');
    langEn.forEach(el => el.style.display = 'none');
    langEs.forEach(el => el.style.display = 'none');
    
    // إظهار المحتوى المناسب وتحديث نص الزر
    if (lang === 'ar') {
        langAr.forEach(el => el.style.display = 'inline');
        toggleButton.innerText = 'English / Español'; // الزر يعرض اللغات المتاحة التالية
    } else if (lang === 'en') {
        langEn.forEach(el => el.style.display = 'inline');
        toggleButton.innerText = 'Español / عربي';
    } else { // lang === 'es'
        langEs.forEach(el => el.style.display = 'inline');
        toggleButton.innerText = 'عربي / English';
    }
}

// الدالة التي تعمل عند تحميل الصفحة للتحقق من اللغة المحفوظة
function checkLanguage() {
    var savedLang = localStorage.getItem('lang');
    if (savedLang) {
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        updateContentVisibility(savedLang);
    }
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
