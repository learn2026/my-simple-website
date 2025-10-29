// =======================================
// معالجة الخطأ 404 عبر الجافاسكربت
// هذا الكود يتجاوز تعقيدات GitHub ويضمن ظهور صفحة 404 المدمجة.
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
