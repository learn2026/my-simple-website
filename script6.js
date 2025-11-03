/* script6.js - منطق المنبه الموقوت والساعة الرقمية */

let timerInterval; // متغير عالمي للاحتفاظ بمعرف المؤقت (لتمكين الإيقاف لاحقاً)

// ====================================================================
// 1. الدالة الرئيسية: جلب وعرض الوقت
// ====================================================================

function updateTime() {
    // 1. جلب التاريخ والوقت الحالي
    const now = new Date(); 

    // 2. استخراج المكونات
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // 3. تنسيق الوقت: إضافة صفر بادئ إذا كان الرقم أقل من 10 (هذه هي النقطة الاحترافية)
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // 4. بناء السلسلة الزمنية
    const timeString = `${hours}:${minutes}:${seconds}`;

    // 5. تحديث واجهة المستخدم (عرض الوقت)
    const clockElement = document.getElementById('digitalClock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}


// ====================================================================
// 2. دالة تشغيل وإيقاف الساعة
// ====================================================================

function startClock() {
    // تشغيل الدالة updateTime فوراً عند البدء
    updateTime(); 
    
    // تشغيل الدالة updateTime كل 1000 مللي ثانية (أي كل ثانية)
    // وحفظ معرف المؤقت في المتغير العالمي
    timerInterval = setInterval(updateTime, 1000); 
    console.log("تم تشغيل الساعة.");
}

function stopClock() {
    // إيقاف التحديث الدوري باستخدام المعرف المحفوظ
    if (timerInterval) {
        clearInterval(timerInterval);
        console.log("تم إيقاف الساعة.");
        alert("تم إيقاف الساعة! (انظر وحدة التحكم لمزيد من التفاصيل)");
    }
}


// ====================================================================
// 3. تشغيل وظيفة البدء عند تحميل الصفحة
// ====================================================================
window.addEventListener('DOMContentLoaded', startClock);
