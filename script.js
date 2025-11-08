// =======================================
// 1. وظيفة التحقق من الخطأ 404
// نستخدم DOMContentLoaded و Query Selector لزيادة الكفاءة والوضوح.
// =======================================
document.addEventListener('DOMContentLoaded', () => {
    // التحقق من أن الكود يعمل فقط بعد تحميل هيكل الصفحة بالكامل
    
    // التحقق من عنوان الصفحة لتحديد حالة 404 (خاص بـ GitHub Pages)
    if (document.title.includes("404")) {
        // نستخدم طريقة getElementById مباشرة لتقليل عمليات الاستعلام
        const mainContent = document.getElementById("main-content");
        const errorContent = document.getElementById("404-content");
        
        // التحقق من وجود العناصر وتطبيق التغييرات
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        if (errorContent) {
            // استخدام 'flex' كما هو محدد في CSS لصفحة 404
            errorContent.style.display = 'flex';
        }
    }
});


// =======================================
// 2. وظيفة زر العودة للأعلى (Back to Top)
// نستخدم خاصية التمرير السلس (Smooth Scroll) لـ UX أفضل
// =======================================

// إضافة مستمع حدث عند التمرير
window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  // استخدام const/let بدلاً من var هي ممارسة حديثة وأفضل
  const myButton = document.getElementById("myBtn");
  
  // التحقق من التمرير (بأقل من 50 بكسل لتقليل عمليات DOM المفرطة)
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

function topFunction() {
  // التحسين: استخدام دالة window.scrollTo() وخاصية behavior: 'smooth'
  // هذا يلغي الحاجة لسطرين من الكود القديم ويعطي تمريرًا أكثر سلاسة في كل المتصفحات الحديثة.
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}
