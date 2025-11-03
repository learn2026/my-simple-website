/* script5.js - منطق محلل النصوص الفوري */

// ====================================================================
// 1. الدالة الرئيسية للتحليل (تُستدعى مع كل إدخال)
// ====================================================================

function analyzeText() {
    // جلب النص من مربع الإدخال
    const text = document.getElementById('textInput').value;

    // 1. حساب الحروف الكلي (بما في ذلك المسافات والرموز)
    const charCount = text.length;

    // 2. حساب الحروف بدون مسافات: إزالة جميع المسافات البيضاء ثم عدّ الباقي
    const charNoSpaces = text.replace(/\s/g, '').length;

    // 3. حساب الكلمات: تقسيم النص بناءً على أي مسافات بيضاء (فراغات، أسطر جديدة، إلخ)
    // نستخدم filter(Boolean) لإزالة أي سلاسل فارغة (نتيجة مسافات متعددة متتالية)
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // 4. حساب الأسطر: تقسيم النص بناءً على محرف السطر الجديد
    const lineCount = text.split('\n').length;
    
    // 5. تحديث واجهة المستخدم بالنتائج المحسوبة
    document.getElementById('charCount').textContent = charCount;
    document.getElementById('charNoSpaces').textContent = charNoSpaces;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('lineCount').textContent = lineCount;
}


// ====================================================================
// 2. دوال مساعدة إضافية
// ====================================================================

// دالة مسح النص ووظائف التحليل
function clearText() {
    const textarea = document.getElementById('textInput');
    if (textarea) {
        textarea.value = '';
        // استدعاء دالة التحليل لتصفير العدادات فوراً
        analyzeText();
        alert('تم مسح النص بالكامل!');
    }
}

// ====================================================================
// 3. تشغيل وظيفة التحليل عند تحميل الصفحة (للتأكد من أن العدادات صفر)
// ====================================================================
window.addEventListener('DOMContentLoaded', analyzeText);
