/* script4.js - منطق محرر Markdown الجديد مع العرض الفوري وأزرار التنسيق */

// ====================================================================
// مفاتيح التخزين المحلي (LOCAL STORAGE KEYS)
// ====================================================================
const STORAGE_KEY = 'markdownEditorInput'; 

// ====================================================================
// 1. دوال الحفظ والتحميل والمسح
// ====================================================================

// الدالة لحفظ النص في المتصفح
function saveReplyToLocal(replyText) {
    try {
        localStorage.setItem(STORAGE_KEY, replyText);
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
// 2. دالة تحويل وعرض Markdown
// ====================================================================

// دالة: تحول نص Markdown إلى HTML وتعرضه
function renderMarkdownContent(markdownText) {
    const previewArea = document.getElementById('markdownPreview');
    if (previewArea) {
        const htmlContent = marked.parse(markdownText || ''); 
        previewArea.innerHTML = htmlContent;
    }
}

// دالة وظيفة الزر/الإدخال: الحفظ والعرض الفوري
function renderAndSaveMarkdown() {
    const inputText = document.getElementById('userInput').value;

    // 1. عرض التنسيق في منطقة المعاينة أولاً
    renderMarkdownContent(inputText);
    
    // 2. قم بالحفظ المحلي للمذكرة (يتم الحفظ بعد كل تغيير)
    saveReplyToLocal(inputText); 
}


// ====================================================================
// 3. دالة النسخ الجديدة (وظيفة زر "نسخ النتيجة المنسقة")
// ====================================================================
function copyMarkdownResult() {
    const previewArea = document.getElementById('markdownPreview');
    if (previewArea) {
        
        // إنشاء عنصر مؤقت لنسخ محتوى HTML
        const range = document.createRange();
        range.selectNode(previewArea);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        try {
            document.execCommand('copy');
            alert('تم نسخ النص المنسق (HTML) بنجاح!');
        } catch (err) {
            console.error('فشل في محاولة النسخ:', err);
            alert('فشل النسخ. يرجى محاولة النسخ يدوياً.');
        }
        
        window.getSelection().removeAllRanges();
    }
}

// ====================================================================
// 5. دوال تحرير النص المتقدمة (أزرار التنسيق)
// ====================================================================
function applyFormat(type) {
    const textarea = document.getElementById('userInput');
    if (!textarea) return;

    // الحصول على معلومات النص المحدد وموقع المؤشر
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const allText = textarea.value;
    
    // النص المحدد حالياً
    const selectedText = allText.substring(start, end);
    let finalNewText = "";
    let formatStart = "";
    let formatEnd = "";
    let newCursorPosition = start; // لضبط موضع المؤشر بعد التنسيق

    switch (type) {
        case 'bold':
            formatStart = formatEnd = '**';
            // إذا لم يكن هناك تحديد، نضع المؤشر بين النجمتين
            newCursorPosition = start + (selectedText === "" ? formatStart.length : 0);
            break;
        case 'italic':
            formatStart = formatEnd = '*';
            newCursorPosition = start + (selectedText === "" ? formatStart.length : 0);
            break;
        case 'list':
            // إضافة رمز القائمة في سطر جديد إذا لم يكن هناك نص محدد
            formatStart = '* '; 
            
            // إذا لم يكن هناك تحديد، نضيف سطر جديد قبل الرمز إذا لم يكن النص يبدأ به
            if (start > 0 && allText.charAt(start - 1) !== '\n') {
                formatStart = '\n' + formatStart;
            }
            
            formatEnd = ''; // لا نهاية للتنسيق
            newCursorPosition = start + formatStart.length;
            break;
        default:
            return;
    }

    // بناء النص الجديد:
    finalNewText = formatStart + selectedText + formatEnd;

    // دمج النص الجديد مع بقية النص القديم
    textarea.value = allText.substring(0, start) + 
                     finalNewText + 
                     allText.substring(end, allText.length);

    // إعادة ضبط موضع المؤشر أو التحديد (للتجربة السلسة)
    if (selectedText === "") {
        // إذا لم يكن هناك تحديد، ضع المؤشر في الموضع الجديد
        textarea.selectionStart = textarea.selectionEnd = newCursorPosition;
    } else {
         // إذا كان هناك نص محدد، حدد النص بعد التنسيق ليتمكن المستخدم من إزالته أو إعادة تنسيقه
        textarea.selectionStart = start;
        textarea.selectionEnd = start + finalNewText.length;
    }

    // تشغيل العرض الفوري والحفظ مباشرة بعد التعديل
    renderAndSaveMarkdown();
    // تركيز المؤشر على مربع النص بعد التعديل
    textarea.focus(); 
}


// ====================================================================
// 4. تشغيل وظيفة التحميل عند الانتهاء من تحميل الصفحة
// ====================================================================
window.addEventListener('DOMContentLoaded', loadReplyFromLocal);
