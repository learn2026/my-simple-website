/* script1.js */

// ====================================================================
// مفاتيح التخزين المحلي (LOCAL STORAGE KEYS)
// ====================================================================
const STORAGE_KEY = 'userLastInput'; // المفتاح لحفظ آخر نص مكتوب للمفكرة

// ====================================================================
// 1. دوال خاصة بالحفظ والتحميل (Functions for Index2.html)
// ====================================================================

// الدالة الجديدة لحفظ النص في المتصفح
function saveReplyToLocal(replyText) {
    // حاول الحفظ، وفي حالة تجاوز الـ 5 ميغابايت سيطلق المتصفح خطأ
    try {
        localStorage.setItem(STORAGE_KEY, replyText);
        console.log("الرد محفوظ محلياً في جهازك.");
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('عذراً، لقد تجاوزت الحد الأقصى للتخزين المحلي (5 ميغابايت). لن يتم حفظ النص الجديد.');
        } else {
            console.error("حدث خطأ أثناء الحفظ المحلي:", e);
        }
    }
}

// الدالة الجديدة لتحميل النص عند فتح الصفحة
function loadReplyFromLocal() {
    // يجب التأكد أن عنصر مربع الإدخال موجود قبل محاولة التحميل (خاص بصفحة index2)
    const textarea = document.getElementById('userInput');
    if (!textarea) return; // الخروج إذا لم يكن المربع موجوداً (مثلاً في index1)

    const savedText = localStorage.getItem(STORAGE_KEY);
    
    if (savedText) {
        textarea.value = savedText;
        console.log("تم تحميل آخر رد محفوظ.");
    }
}


// ====================================================================
// 2. الدوال الخاصة بملف Index1.html (الرد المباشر والتقييم)
// ====================================================================
let postCounter = 0; 
function publishContent() {
    const inputText = document.getElementById('userInput').value.trim();
    
    if (inputText === "") {
        alert("الرجاء كتابة محتوى للرد قبل النشر.");
        return;
    }

    postCounter++;
    const postId = postCounter; 

    const displayArea = document.getElementById('contentDisplay');

    const formattedContent = inputText.replace(/\n/g, '<br>');

    const newPost = document.createElement('div');
    newPost.classList.add('post');
    newPost.innerHTML = `
        <p><strong>الرد #${postId}:</strong></p>
        <p>${formattedContent}</p>
        <div class="feedback">
            <p>هل كان هذا مفيداً؟</p>
            <button onclick="recordVote(${postId}, 'like')">👍 أعجبني (<span id="like-${postId}">0</span>)</button>
            <button onclick="recordVote(${postId}, 'dislike')">👎 لم يعجبني (<span id="dislike-${postId}">0</span>)</button>
        </div>
    `;
    
    displayArea.prepend(newPost);
    // لا نمسح مربع الإدخال هنا لكيلا يتعارض مع المفكرة إذا تم استخدام نفس الحقل
    // document.getElementById('userInput').value = ''; 
}

function recordVote(postId, type) {
    const elementId = `${type}-${postId}`;
    const counterElement = document.getElementById(elementId);
    
    if (counterElement) {
        let count = parseInt(counterElement.textContent) || 0;
        count++;
        counterElement.textContent = count;
        
        const feedbackDiv = counterElement.closest('.feedback');
        feedbackDiv.querySelectorAll('button').forEach(btn => btn.disabled = true);
    }
}

// ====================================================================
// 3. تعديل الدالة الخاصة بملف Index2.html (العرض في نافذة جديدة)
// ====================================================================
function publishToNewWindow() {
    const inputText = document.getElementById('userInput').value.trim();

    if (inputText === "") {
        alert("الرجاء كتابة محتوى للرد.");
        return;
    }
    
    // 1. **الخطوة الأولى والأسرع: محاولة فتح النافذة فوراً لضمان عدم حظرها**
    const newWindow = window.open(); 
    
    // 2. قم بالحفظ المحلي
    saveReplyToLocal(inputText); 
    
    const htmlFormattedContent = inputText.replace(/\n/g, '<br>');

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>الرد المنشور المستقل</title>
            <style>
                body { font-family: 'Tahoma', sans-serif; margin: 30px; background-color: #e9f5ff; }
                h2 { color: #007bff; }
                .response { border: 2px solid #007bff; padding: 25px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            </style>
        </head>
        <body>
            <h2>إجابتك المنشورة (صفحة مستقلة):</h2>
            <div class="response">
                ${htmlFormattedContent}
            </div>
        </body>
        </html>
    `;

    // 3. كتابة المحتوى وإغلاق المستند
    if (newWindow) { // التحقق للتأكد من أن المتصفح لم يحظرها
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    } else {
         alert("عذراً، المتصفح قام بحظر النافذة المنبثقة. يرجى السماح بها يدوياً.");
    }
    
    // نترك مربع الإدخال كما هو ليظل النص محفوظاً فيه بعد العرض
}

// ====================================================================
// 4. تشغيل وظيفة التحميل عند الانتهاء من تحميل الصفحة (لكل الصفحات)
// ====================================================================
window.addEventListener('DOMContentLoaded', loadReplyFromLocal);
