/* script4.js - منطق محرر Markdown الجديد */

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
        console.log("الرد محفوظ محلياً.");
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
        const htmlContent = marked.parse(markdownText); 
        previewArea.innerHTML = htmlContent;
    }
}

// دالة وظيفة زر "عرض التنسيق وحفظ المفكرة"
function renderAndSaveMarkdown() {
    const inputText = document.getElementById('userInput').value.trim();

    if (inputText === "") {
        alert("الرجاء كتابة محتوى للمفكرة.");
        return;
    }
    
    // 1. قم بالحفظ المحلي للمذكرة
    saveReplyToLocal(inputText); 
    
    // 2. عرض التنسيق في منطقة المعاينة
    renderMarkdownContent(inputText);
    
    alert("تم حفظ المفكرة وعرض التنسيق!");
}

// ====================================================================
// 3. تشغيل وظيفة التحميل عند الانتهاء من تحميل الصفحة
// ====================================================================
window.addEventListener('DOMContentLoaded', loadReplyFromLocal);
