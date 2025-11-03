/* script1.js */

// الدوال الخاصة بملف Index1.html (الرد المباشر والتقييم)
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
    document.getElementById('userInput').value = '';
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

// الدالة الخاصة بملف Index2.html (العرض في نافذة جديدة)
function publishToNewWindow() {
    const inputText = document.getElementById('userInput').value.trim();

    if (inputText === "") {
        alert("الرجاء كتابة محتوى للرد.");
        return;
    }
    
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

    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    
    document.getElementById('userInput').value = '';
}
