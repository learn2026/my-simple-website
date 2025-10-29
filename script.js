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
