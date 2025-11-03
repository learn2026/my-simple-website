/* script4.js - منطق محرر Markdown الجديد مع العرض الفوري */

// ====================================================================
// مفاتيح التخزين المحلي (LOCAL STORAGE KEYS)
// ملاحظة: نستخدم مفتاح مختلف لتجنب التعارض مع index2.html
// ====================================================================
const STORAGE_KEY = 'markdownEditorInput'; 

// ====================================================================
// 1. دوال الحفظ والتحميل والمسح
// ====================================================================

// الدالة لحفظ النص في المتصفح
function saveReplyToLocal(replyText) {
    try {
        localStorage.setItem(STORAGE_KEY, replyText);
        // تم إزالة console.log لتقليل الرسائل في وحدة التحكم أثناء الكتابة الفورية
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('عذراً، تجاوزت الحد الأقصى للتخزين المحلي. لن يتم حفظ النص الجديد.');
        } else {
            console.error("حدث خطأ أثناء الحفظ المحلي:", e);
        }
    }
}

// الدالة لتحميل النص وعرض التنسيق عند فتح الصفحة
function loadReplyFromLocal() {
    const textarea = document.getElementById('userInput');
    if (!textarea) return;

    const savedText = localStorage.getItem(STORAGE_KEY);
    
    if (savedText) {
        textarea.value = savedText;
        console.log("تم تحميل آخر رد محفوظ.");
        
        // عرض التنسيق المحفوظ فور التحميل
        renderMarkdownContent(savedText); 
    }
}

// دالة مسح المفكرة المحفوظة (مخصصة لهذه الصفحة)
function clearLocalReply() {
    if (confirm("هل أنت متأكد من مسح التجربة المحفوظة من جهازك؟")) {
        localStorage.removeItem(STORAGE_KEY);
        
        const textarea = document.getElementById('userInput');
        if (textarea) {
            textarea.value = '';
        }
        // مسح منطقة العرض أيضاً
        const previewArea = document.getElementById('markdownPreview');
        if (previewArea) {
            previewArea.innerHTML = '<h2>النتيجة المنسقة ستظهر هنا:</h2>';
        }

        alert("تم مسح التجربة المحفوظة بنجاح!");
    }
}


// ====================================================================
// 2. دالة تحويل وعرض Markdown (الخاصية الجديدة)
// ====================================================================

// دالة: تحول نص Markdown إلى HTML وتعرضه
function renderMarkdownContent(markdownText) {
    const previewArea = document.getElementById('markdownPreview');
    if (previewArea) {
        // استخدام marked.js لتحويل النص
        // نستخدم marked.parse(markdownText)
        const htmlContent = marked.parse(markdownText || ''); 
        previewArea.innerHTML = htmlContent;
    }
}

// دالة وظيفة الزر/الإدخال: الحفظ والعرض الفوري
// هذه الدالة تعمل الآن مع oninput في index4.html
function renderAndSaveMarkdown() {
    // 💡 تم إزالة trim() لأنه قد يحذف المسافة النهائية التي يكتبها المستخدم
    const inputText = document.getElementById('userInput').value;

    // 1. عرض التنسيق في منطقة المعاينة أولاً
    renderMarkdownContent(inputText);
    
    // 2. قم بالحفظ المحلي للمذكرة (يتم الحفظ بعد كل تغيير)
    saveReplyToLocal(inputText); 
    
    // ❌ تم حذف رسالة التنبيه (alert) لمنع إزعاج المستخدم أثناء الكتابة الفورية
}


// ====================================================================
// 3. دالة النسخ الجديدة (وظيفة زر "نسخ النتيجة المنسقة")
// ====================================================================
function copyMarkdownResult() {
    const previewArea = document.getElementById('markdownPreview');
    if (previewArea) {
        
        // إنشاء عنصر مؤقت لنسخ محتوى HTML (لتجنب المشاكل)
        const range = document.createRange();
        range.selectNode(previewArea);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        try {
            // تنفيذ أمر النسخ
            document.execCommand('copy');
            alert('تم نسخ النص المنسق (HTML) بنجاح!');
        } catch (err) {
            console.error('فشل في محاولة النسخ:', err);
            alert('فشل النسخ. يرجى محاولة النسخ يدوياً.');
        }
        
        // إزالة التحديد المؤقت
        window.getSelection().removeAllRanges();
    }
}

// ====================================================================
// 4. تشغيل وظيفة التحميل عند الانتهاء من تحميل الصفحة
// ====================================================================
window.addEventListener('DOMContentLoaded', loadReplyFromLocal);
