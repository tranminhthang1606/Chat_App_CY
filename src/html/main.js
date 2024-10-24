// document.addEventListener("DOMContentLoaded", function () {
//     const chatMessages = document.querySelector('.flex-1.overflow-y-auto.p-8.pb-36'); 
//     const messageInput = document.getElementById('messageInput');
//     const sendButton = document.getElementById('sendButton'); 

//     sendButton.addEventListener('click', function () {
//         const messageText = messageInput.value.trim(); 
//         if (messageText !== '') {
//             const messageDiv = document.createElement('div');
//             messageDiv.classList.add('flex', 'justify-end', 'mb-4');
//             const messageBubble = document.createElement('div');
//             messageBubble.classList.add('flex', 'max-w-96', 'bg-blue-500', 'text-white', 
//                 'rounded-lg', 'p-3', 'gap-3', 'mr-3');
//             messageBubble.textContent = messageText; 
//             messageDiv.appendChild(messageBubble);
//             chatMessages.appendChild(messageDiv); 
//             chatMessages.scrollTop = chatMessages.scrollHeight;
//             messageInput.value = '';
//         }
//     });


//     messageInput.addEventListener('keypress', function (event) {
//         if (event.key === 'Enter') {
//             sendButton.click(); 
//         }
//     });
// });
